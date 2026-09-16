import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Global.css';

export default function Watchlist() {
  const location = useLocation();
  const isJobWatchlist = location.state?.type !== 'news';
  const storageKey = isJobWatchlist ? 'job_watchlist' : 'news_watchlist';
  const itemLabel = isJobWatchlist ? 'job' : 'article';
  
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [searchFilter, setSearchFilter] = useState('');

  const updateWatchlist = (updated) => {
    setSavedJobs(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      window.dispatchEvent(new Event('watchlistUpdated'));
    } catch (e) {
      console.error('Failed to update localStorage:', e);
    }
  };

  const removeJob = (jobId) => {
    const updated = savedJobs.filter((job) => job.id !== jobId);
    updateWatchlist(updated);
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      updateWatchlist([]);
    }
  };

  const filteredJobs = savedJobs.filter((job) => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    const titleMatch = job.title && job.title.toLowerCase().includes(query);
    const companyMatch = job.company && job.company.toLowerCase().includes(query);
    const locMatch = job.location && job.location.toLowerCase().includes(query);
    const descriptionMatch = job.description && job.description.toLowerCase().includes(query);
    return titleMatch || companyMatch || locMatch || descriptionMatch;
  });
  let h1;
let p;

if (isJobWatchlist) {
  h1 = "My Job Watchlist";
  p = "Keep track of opportunities you've saved. Review details, compare roles, and apply when you're ready.";
} else {
  h1 = "My News Watchlist";
  p = "Keep track of news you've saved. Review details, compare stories, and stay informed.";
}


  return (
    <div className="watchlist-page">
      {/* Hero Header */}
      <section className="watchlist-hero">
        <h1>{h1}</h1>
      <p>{p}</p>


        {savedJobs.length > 0 && (
          <div className="watchlist-search-row">
            <input
              type="text"
              className="watchlist-search-input"
              placeholder={isJobWatchlist ? 'Filter saved jobs by title, company, location...' : 'Filter saved news by title or description...'}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <button
              type="button"
              className="clear-watchlist-btn"
              onClick={clearAll}
              title={`Clear all saved ${itemLabel}s`}
            >
              🗑️ Clear Watchlist
            </button>
          </div>
        )}
      </section>

      {/* Status Bar */}
      <div className="results-status-bar">
        <div className="results-count">
          <span>
            You have <strong>{savedJobs.length}</strong> saved {savedJobs.length === 1 ? itemLabel : `${itemLabel}s`}
            {searchFilter && <span> (showing {filteredJobs.length} filtered)</span>}
          </span>
        </div>
        <Link to={isJobWatchlist ? '/jobs' : '/news'} className="browse-more-link">
          + Explore More {isJobWatchlist ? 'Jobs' : 'News'}
        </Link>
      </div>

      {/* Empty State */}
      {savedJobs.length === 0 && (
        <div className="state-container empty-watchlist">
          <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '12px' }}>🔖</div>
          <h3>Your Watchlist is Empty</h3>
          <p>
            You haven't saved any {itemLabel}s yet. Browse {isJobWatchlist ? 'jobs' : 'news'} and save items you're interested in!
          </p>
          <Link to={isJobWatchlist ? '/jobs' : '/news'} className="action-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Explore {isJobWatchlist ? 'Jobs' : 'News'} Now
          </Link>
        </div>
      )}

      {/* No Filter Results State */}
      {savedJobs.length > 0 && filteredJobs.length === 0 && (
        <div className="state-container">
          <h3>No matching saved {itemLabel}s</h3>
          <p>None of your saved jobs match "{searchFilter}".</p>
          <button type="button" className="action-btn" onClick={() => setSearchFilter('')}>
            Reset Filter
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {filteredJobs.length > 0 && (
        <div className={isJobWatchlist ? 'jobs-grid' : 'news-grid'} id="watchlist-container">
          {isJobWatchlist ? filteredJobs.map((job) => (
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
                  className="watchlist-heart-btn saved"
                  onClick={() => removeJob(job.id)}
                  title="Remove from Watchlist"
                  aria-label="Remove from Watchlist"
                >
                  <span className="heart-icon">❌</span>
                  <span className="heart-text">Remove</span>
                </button>
              </div>
            </article>
          )) : filteredJobs.map((article) => (
            <article key={article.id} className="news-card">
              <div>
                {article.date && (
                  <div className="news-card-date">
                    <span>📅</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                )}
                <h2 className="news-card-title">{article.title}</h2>
                {article.description && <p className="news-card-description">{article.description}</p>}
              </div>
              <div className="watchlist-news-footer">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-read-more">
                  Read Full Article ↗
                </a>
                <button type="button" className="watchlist-heart-btn saved" onClick={() => removeJob(article.id)} title="Remove from Watchlist" aria-label="Remove from Watchlist">
                  <span className="heart-icon">❌</span>
                  <span className="heart-text">Remove</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
