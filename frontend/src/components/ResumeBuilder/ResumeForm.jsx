import React, { useState } from 'react';

export default function ResumeForm({ resumeData, setResumeData }) {
  // Track open accordion section(s)
  const [openSection, setOpenSection] = useState('personal');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Helper for nested personalInfo updates
  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Helper for single fields (like summary)
  const handleDirectFieldChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Dynamic Array Handlers
  const handleArrayItemChange = (arrayKey, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddItem = (arrayKey, defaultItem) => {
    const newItem = {
      ...defaultItem,
      id: Date.now().toString()
    };
    setResumeData(prev => ({
      ...prev,
      [arrayKey]: [...(prev[arrayKey] || []), newItem]
    }));
  };

  const handleDeleteItem = (arrayKey, id) => {
    setResumeData(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter(item => item.id !== id)
    }));
  };

  return (
    <div className="resume-form-container">
      {/* 1. PERSONAL INFORMATION */}
      <div className={`accordion-card ${openSection === 'personal' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('personal')}
        >
          <div className="accordion-title">
            <span className="section-icon">👤</span>
            <span>Personal Information</span>
          </div>
          <span className="accordion-chevron">{openSection === 'personal' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'personal' && (
          <div className="accordion-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Morgan" 
                  value={resumeData.personalInfo.fullName} 
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Job Title / Target Role *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Full Stack Software Engineer" 
                  value={resumeData.personalInfo.jobTitle} 
                  onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. alex@example.com" 
                  value={resumeData.personalInfo.email} 
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. +1 (555) 019-2834" 
                  value={resumeData.personalInfo.phone} 
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Location (City, Country)</label>
                <input 
                  type="text" 
                  placeholder="e.g. New York, NY / Bengaluru, IN" 
                  value={resumeData.personalInfo.location} 
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Portfolio / Website URL</label>
                <input 
                  type="text" 
                  placeholder="e.g. https://alexmorgan.dev" 
                  value={resumeData.personalInfo.website} 
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input 
                  type="text" 
                  placeholder="e.g. linkedin.com/in/alexmorgan" 
                  value={resumeData.personalInfo.linkedin} 
                  onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>GitHub Profile</label>
                <input 
                  type="text" 
                  placeholder="e.g. github.com/alexmorgan" 
                  value={resumeData.personalInfo.github} 
                  onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className={`accordion-card ${openSection === 'summary' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('summary')}
        >
          <div className="accordion-title">
            <span className="section-icon">📝</span>
            <span>Professional Summary</span>
          </div>
          <span className="accordion-chevron">{openSection === 'summary' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'summary' && (
          <div className="accordion-body">
            <div className="form-group">
              <div className="label-with-tip">
                <label>Summary / About Me</label>
                <span className="helper-tag">2-4 impactful sentences</span>
              </div>
              <textarea 
                rows="4" 
                placeholder="Highlight your strongest technical strengths, total years of experience, core domains, and major value you bring..." 
                value={resumeData.summary} 
                onChange={(e) => handleDirectFieldChange('summary', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. WORK EXPERIENCE */}
      <div className={`accordion-card ${openSection === 'experience' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('experience')}
        >
          <div className="accordion-title">
            <span className="section-icon">💼</span>
            <span>Work Experience ({resumeData.experience?.length || 0})</span>
          </div>
          <span className="accordion-chevron">{openSection === 'experience' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'experience' && (
          <div className="accordion-body">
            {resumeData.experience?.map((exp, index) => (
              <div key={exp.id} className="dynamic-entry-box">
                <div className="entry-card-header">
                  <span className="entry-card-title">Experience #{index + 1} {exp.role ? `(${exp.role})` : ''}</span>
                  {resumeData.experience.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-delete-entry"
                      onClick={() => handleDeleteItem('experience', exp.id)}
                      title="Delete this role"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Job Title / Role *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Software Engineer" 
                      value={exp.role} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'role', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Google / Microsoft / Startup" 
                      value={exp.company} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Jan 2022" 
                      value={exp.startDate} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input 
                      type="text" 
                      placeholder={exp.isCurrent ? 'Present' : 'e.g. Dec 2023'} 
                      disabled={exp.isCurrent}
                      value={exp.isCurrent ? 'Present' : exp.endDate} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Remote / NYC" 
                      value={exp.location} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="checkbox-row">
                  <label className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={exp.isCurrent || false} 
                      onChange={(e) => handleArrayItemChange('experience', exp.id, 'isCurrent', e.target.checked)}
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                <div className="form-group">
                  <label>Key Responsibilities & Achievements (One bullet per line)</label>
                  <textarea 
                    rows="3" 
                    placeholder="• Built feature X using React & TypeScript resulting in 30% performance boost&#10;• Led team of 4 engineers to deliver MVP ahead of schedule" 
                    value={exp.description} 
                    onChange={(e) => handleArrayItemChange('experience', exp.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button 
              type="button" 
              className="btn-add-entry"
              onClick={() => handleAddItem('experience', {
                role: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                isCurrent: false,
                description: ''
              })}
            >
              + Add Another Experience
            </button>
          </div>
        )}
      </div>

      {/* 4. EDUCATION */}
      <div className={`accordion-card ${openSection === 'education' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('education')}
        >
          <div className="accordion-title">
            <span className="section-icon">🎓</span>
            <span>Education ({resumeData.education?.length || 0})</span>
          </div>
          <span className="accordion-chevron">{openSection === 'education' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'education' && (
          <div className="accordion-body">
            {resumeData.education?.map((edu, index) => (
              <div key={edu.id} className="dynamic-entry-box">
                <div className="entry-card-header">
                  <span className="entry-card-title">Education #{index + 1} {edu.degree ? `(${edu.degree})` : ''}</span>
                  {resumeData.education.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-delete-entry"
                      onClick={() => handleDeleteItem('education', edu.id)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Degree / Certificate *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech / B.S." 
                      value={edu.degree} 
                      onChange={(e) => handleArrayItemChange('education', edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Field of Study / Major</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Computer Science & Engineering" 
                      value={edu.field} 
                      onChange={(e) => handleArrayItemChange('education', edu.id, 'field', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label>College / University *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Stanford University" 
                      value={edu.institution} 
                      onChange={(e) => handleArrayItemChange('education', edu.id, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Graduation Year / Range</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2020 - 2024" 
                      value={edu.endYear} 
                      onChange={(e) => handleArrayItemChange('education', edu.id, 'endYear', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>GPA / Grade / Percentage</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 8.8 CGPA / 3.9 GPA" 
                      value={edu.score} 
                      onChange={(e) => handleArrayItemChange('education', edu.id, 'score', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button" 
              className="btn-add-entry"
              onClick={() => handleAddItem('education', {
                degree: '',
                field: '',
                institution: '',
                location: '',
                startYear: '',
                endYear: '',
                score: ''
              })}
            >
              + Add Another Education
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS */}
      <div className={`accordion-card ${openSection === 'skills' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('skills')}
        >
          <div className="accordion-title">
            <span className="section-icon">⚡</span>
            <span>Skills & Tech Stack</span>
          </div>
          <span className="accordion-chevron">{openSection === 'skills' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'skills' && (
          <div className="accordion-body">
            <p className="section-guidance">Separate individual skills with commas (e.g., React, Node.js, Python, Docker).</p>
            {resumeData.skills?.map((skillGroup) => (
              <div key={skillGroup.id} className="dynamic-entry-box skill-entry-box">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Languages / Tools / Frameworks" 
                      value={skillGroup.category} 
                      onChange={(e) => handleArrayItemChange('skills', skillGroup.id, 'category', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="entry-card-header" style={{ marginBottom: 4 }}>
                      <label>Skills (Comma-separated)</label>
                      {resumeData.skills.length > 1 && (
                        <button 
                          type="button" 
                          className="btn-delete-entry inline-del"
                          onClick={() => handleDeleteItem('skills', skillGroup.id)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <input 
                      type="text" 
                      placeholder="e.g. JavaScript, TypeScript, React, Python" 
                      value={skillGroup.items} 
                      onChange={(e) => handleArrayItemChange('skills', skillGroup.id, 'items', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button 
              type="button" 
              className="btn-add-entry"
              onClick={() => handleAddItem('skills', {
                category: 'Additional Skills',
                items: ''
              })}
            >
              + Add Skill Category
            </button>
          </div>
        )}
      </div>

      {/* 6. PROJECTS */}
      <div className={`accordion-card ${openSection === 'projects' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('projects')}
        >
          <div className="accordion-title">
            <span className="section-icon">🚀</span>
            <span>Projects ({resumeData.projects?.length || 0})</span>
          </div>
          <span className="accordion-chevron">{openSection === 'projects' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'projects' && (
          <div className="accordion-body">
            {resumeData.projects?.map((proj, index) => (
              <div key={proj.id} className="dynamic-entry-box">
                <div className="entry-card-header">
                  <span className="entry-card-title">Project #{index + 1} {proj.name ? `(${proj.name})` : ''}</span>
                  {resumeData.projects.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-delete-entry"
                      onClick={() => handleDeleteItem('projects', proj.id)}
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AI Resume Builder" 
                      value={proj.name} 
                      onChange={(e) => handleArrayItemChange('projects', proj.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tech Stack Used</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React, Node.js, Express, MongoDB" 
                      value={proj.technologies} 
                      onChange={(e) => handleArrayItemChange('projects', proj.id, 'technologies', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Project / Demo / GitHub Link</label>
                  <input 
                    type="text" 
                    placeholder="e.g. https://github.com/username/project" 
                    value={proj.link} 
                    onChange={(e) => handleArrayItemChange('projects', proj.id, 'link', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Project Description & Impact</label>
                  <textarea 
                    rows="3" 
                    placeholder="• Built a full-stack real-time collaboration tool with live updates&#10;• Deployed on AWS with 99.9% uptime" 
                    value={proj.description} 
                    onChange={(e) => handleArrayItemChange('projects', proj.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button 
              type="button" 
              className="btn-add-entry"
              onClick={() => handleAddItem('projects', {
                name: '',
                technologies: '',
                link: '',
                description: ''
              })}
            >
              + Add Another Project
            </button>
          </div>
        )}
      </div>

      {/* 7. CERTIFICATIONS & LANGUAGES */}
      <div className={`accordion-card ${openSection === 'extra' ? 'is-open' : ''}`}>
        <button 
          type="button" 
          className="accordion-header"
          onClick={() => toggleSection('extra')}
        >
          <div className="accordion-title">
            <span className="section-icon">🏆</span>
            <span>Certifications & Languages</span>
          </div>
          <span className="accordion-chevron">{openSection === 'extra' ? '▲' : '▼'}</span>
        </button>

        {openSection === 'extra' && (
          <div className="accordion-body">
            <h4 className="sub-section-title">Certifications</h4>
            {resumeData.certifications?.map((cert, index) => (
              <div key={cert.id} className="dynamic-entry-box">
                <div className="entry-card-header">
                  <span className="entry-card-title">Certificate #{index + 1}</span>
                  {resumeData.certifications.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-delete-entry"
                      onClick={() => handleDeleteItem('certifications', cert.id)}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Certification Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AWS Solutions Architect" 
                      value={cert.name} 
                      onChange={(e) => handleArrayItemChange('certifications', cert.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Amazon / Google" 
                      value={cert.issuer} 
                      onChange={(e) => handleArrayItemChange('certifications', cert.id, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Year / Date</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2023" 
                      value={cert.date} 
                      onChange={(e) => handleArrayItemChange('certifications', cert.id, 'date', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              className="btn-add-entry small"
              onClick={() => handleAddItem('certifications', {
                name: '',
                issuer: '',
                date: '',
                link: ''
              })}
            >
              + Add Certification
            </button>

            <h4 className="sub-section-title" style={{ marginTop: '20px' }}>Languages Known</h4>
            {resumeData.languages?.map((lang) => (
              <div key={lang.id} className="form-grid-2" style={{ marginBottom: '10px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. English, Hindi, Spanish" 
                  value={lang.language} 
                  onChange={(e) => handleArrayItemChange('languages', lang.id, 'language', e.target.value)}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select 
                    value={lang.proficiency} 
                    onChange={(e) => handleArrayItemChange('languages', lang.id, 'proficiency', e.target.value)}
                    className="lang-select"
                  >
                    <option value="Native">Native / Fluent</option>
                    <option value="Professional">Professional Working</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Basic">Basic</option>
                  </select>
                  {resumeData.languages.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-delete-entry inline-del"
                      onClick={() => handleDeleteItem('languages', lang.id)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button 
              type="button" 
              className="btn-add-entry small"
              onClick={() => handleAddItem('languages', {
                language: '',
                proficiency: 'Fluent'
              })}
            >
              + Add Language
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
