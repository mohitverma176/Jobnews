import React, { useState, useEffect, useCallback } from 'react';
import FloatingWatchlist from './FloatingWatchlist';
import Pagination from './Pagination';
import './Global.css';
import bg from '../assets/bg.mp4';
import { BASE_URL } from '../config';

const baseurl = BASE_URL;
// Helper to strip HTML tags for clean card description previews
function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// Normalize various job schemas from the backend datasets
function normalizeJob(rawJob, index) {
  const title = rawJob.title || rawJob.job_title || 'Untitled Opportunity';
  const company = rawJob.company_name || rawJob.company || rawJob.companyName || 'Featured Employer';
  
  let jobType = 'Full Time';
  if (Array.isArray(rawJob.job_types) && rawJob.job_types.length > 0) {
    jobType = rawJob.job_types.join(', ');
  } else if (rawJob.job_type) {
    jobType = rawJob.job_type;
  } else if (rawJob.employmentType) {
    jobType = rawJob.employmentType;
  }

  let location = 'Remote / Unspecified';
  if (rawJob.location) {
    location = rawJob.location;
  } else if (Array.isArray(rawJob.locationRestrictions) && rawJob.locationRestrictions.length > 0) {
    location = rawJob.locationRestrictions.join(', ');
  }

  const applyUrl = rawJob.url || rawJob.apply_link || rawJob.applicationLink || '#';
  const rawDesc = rawJob.job_description || rawJob.excerpt || rawJob.description || '';
  const description = stripHtml(rawDesc);

  let tags = [];
  if (Array.isArray(rawJob.tags)) {
    tags = rawJob.tags.slice(0, 4);
  } else if (Array.isArray(rawJob.categories)) {
    tags = rawJob.categories.slice(0, 3);
  }

  return {
    id: rawJob.id || rawJob.slug || `job-${index}`,
    title,
    company,
    jobType,
    location,
    applyUrl,
    description,
    tags,
    experience: rawJob.experience || '',
    postedDate: rawJob.posted_date || rawJob.created_at || null
  };
}

export default function Job({options,setoptions}) {
  const [currtext, setCurrtext] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('job_watchlist') || '[]');
      return Array.isArray(saved) ? saved.map(j => j.id) : [];
    } catch {
      return [];
    }
  });

  const toggleWatchlist = (jobToToggle) => {
    try {
        setoptions(true);
      const saved = JSON.parse(localStorage.getItem('job_watchlist') || '[]');
      const exists = saved.some(item => item.id === jobToToggle.id);
      let updated;
      if (exists) {
        updated = saved.filter(item => item.id !== jobToToggle.id);
      } else {
        updated = [...saved, jobToToggle];
      }
      localStorage.setItem('job_watchlist', JSON.stringify(updated));
      setSavedJobIds(updated.map(j => j.id));
      window.dispatchEvent(new Event('watchlistUpdated'));
    } catch (err) {
      console.error('Error updating watchlist:', err);
    }
  };

  const quickFilters = ['All', 'Software Engineer', 'Writer', 'Sales', 'Developer', 'Intern', 'Talent'];

  const fetchJobs = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    try {
      let response;
      const requestPayload = {
        jobName: searchTerm,
        currtext: searchTerm
      };
      const apiPath = '/search';
      const targetEndpoint = baseurl ? `${baseurl}${apiPath}` : apiPath;

      try {
        response = await fetch(targetEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestPayload)
        });
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
      } catch (err) {
        if (baseurl) {
          response = await fetch(apiPath, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
          });
        } else {
          throw err;
        }
      }

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }

      if (Array.isArray(data)) {
        const normalized = data.map(normalizeJob);
        setJobs(normalized);
      } else {
        setJobs([]);
      }
      setHasSearched(true);
      setActiveQuery(searchTerm);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to fetch jobs from server. Please ensure backend is running.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all jobs on initial mount
  useEffect(() => {
    fetchJobs('');
  }, [fetchJobs]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchJobs(currtext);
  };

  const handleQuickFilter = (tag) => {
    const query = tag === 'All' ? '' : tag;
    setCurrtext(query);
    fetchJobs(query);
  };

  const handleClear = () => {
    setCurrtext('');
    fetchJobs('');
  };

  // Pagination slicing
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="jobs-page">
      <video
        className="jobs-background-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={bg} type="video/mp4" />
      </video>
      <div className="jobs-background-overlay" aria-hidden="true" />

      {/* Hero Header & Search Section */}
      <section className="jobs-hero">
        <h1>Explore Job Opportunities</h1>
        <p>
          Search thousands of curated job openings across top technology companies, government sectors, and innovative startups.
        </p>

        <form className="jobs-search-form" onSubmit={handleSearchSubmit}>
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="job-input"
            className="jobs-search-input"
            type="text"
            placeholder="Search by job title, skill, company or role (e.g. Software Engineer, Writer)..."
            value={currtext}
            onChange={(e) => setCurrtext(e.target.value)}
          />
          {currtext && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" id="submit-btn" className="jobs-submit-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>

        {/* Quick Filter Tags */}
        <div className="quick-tags">
          <span className="quick-tag-label">Popular Searches:</span>
          {quickFilters.map((filter) => {
            const isActive = filter === 'All' ? activeQuery === '' : activeQuery.toLowerCase() === filter.toLowerCase();
            return (
              <button
                key={filter}
                type="button"
                className={`quick-tag-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleQuickFilter(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Status Bar */}
      <div className="results-status-bar">
        <div className="results-count">
          {loading ? (
            <span>Searching opportunities...</span>
          ) : (
            <span>
              Showing <strong>{jobs.length > 0 ? `${indexOfFirstJob + 1}-${Math.min(indexOfLastJob, jobs.length)}` : 0}</strong> of <strong>{jobs.length}</strong> {jobs.length === 1 ? 'job opportunity' : 'job opportunities'}
              {activeQuery && <span> for "<strong>{activeQuery}</strong>"</span>}
            </span>
          )}
        </div>
        <button
          type="button"
          className="refresh-btn"
          onClick={() => fetchJobs(currtext)}
          title="Refresh jobs"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <h3>Loading Opportunities</h3>
          <p>Fetching the latest job listings from our database...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="state-container error-state">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button type="button" className="action-btn" onClick={() => fetchJobs(currtext)}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && hasSearched && jobs.length === 0 && (
        <div className="state-container">
          <h3>No jobs found</h3>
          <p>
            We couldn't find any job opportunities matching "{activeQuery}". Try searching with different keywords or clear filters.
          </p>
          <button type="button" className="action-btn" onClick={handleClear}>
            View All Jobs
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && !error && currentJobs.length > 0 && (
        <>
          <div className="jobs-grid" id="jobs-container">
            {currentJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-company-badge">
                    <span>🏢</span> {job.company}
                  </div>
                  <h2 className="job-card-title" title={job.title}>
                    {job.title}
                  </h2>
                  <div className="job-meta-row">
                    <span className="job-meta-item job-type">
                      ⚡ {job.jobType}
                    </span>
                    <span className="job-meta-item">
                      📍 {job.location}
                    </span>
                    {job.experience && (
                      <span className="job-meta-item">
                        🎓 {job.experience}
                      </span>
                    )}
                  </div>
                </div>

                <div className="job-card-body">
                  {job.description ? (
                    <p className="job-card-snippet">{job.description}</p>
                  ) : (
                    <p className="job-card-snippet" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                      Click below to view full job description, requirements, and apply directly.
                    </p>
                  )}

                  {job.tags && job.tags.length > 0 && (
                    <div className="job-tags-row">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="job-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="job-card-footer">
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-apply-link"
                  >
                    Apply Now ↗
                  </a>
                  <button
                    type="button"
                    className={`watchlist-heart-btn ${savedJobIds.includes(job.id) ? 'saved' : ''}`}
                    onClick={() => toggleWatchlist(job)}
                    title={savedJobIds.includes(job.id) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                    aria-label={savedJobIds.includes(job.id) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                  >
                    <span className="heart-icon">{savedJobIds.includes(job.id) ? '❤️' : '🤍'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Floating Circular Watchlist Button */}
      <FloatingWatchlist />
    </div>
  );
}
