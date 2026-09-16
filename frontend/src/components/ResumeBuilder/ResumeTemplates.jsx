import React from 'react';

// Helper function to format bullet points or multi-line strings cleanly
const renderBulletPoints = (text) => {
  if (!text) return null;
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length === 0) return null;
  
  return (
    <ul className="resume-bullet-list">
      {lines.map((line, idx) => (
        <li key={idx}>
          {line.replace(/^[•\-*]\s*/, '')}
        </li>
      ))}
    </ul>
  );
};

// 1. MODERN TWO-COLUMN TEMPLATE
export function ModernTemplate({ data, theme, font }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="resume-sheet modern-template" style={{ fontFamily: font.fontFamily }}>
      {/* Left Sidebar */}
      <aside className="modern-sidebar" style={{ backgroundColor: theme.light, borderColor: theme.primary }}>
        <div className="modern-sidebar-content">
          {/* Contact Details */}
          <div className="resume-section">
            <h3 className="section-title-sidebar" style={{ color: theme.primary, borderColor: theme.secondary }}>
              Contact
            </h3>
            <div className="contact-list">
              {personalInfo.email && (
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="contact-item">
                  <span className="contact-label">Portfolio:</span>
                  <a href={personalInfo.website} target="_blank" rel="noreferrer">
                    {personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="contact-item">
                  <span className="contact-label">LinkedIn:</span>
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="contact-item">
                  <span className="contact-label">GitHub:</span>
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.some(s => s.items && s.items.trim()) && (
            <div className="resume-section">
              <h3 className="section-title-sidebar" style={{ color: theme.primary, borderColor: theme.secondary }}>
                Skills
              </h3>
              {skills.map((skill) => (
                skill.items && (
                  <div key={skill.id} className="skill-group">
                    <strong className="skill-cat-title">{skill.category || 'Skills'}:</strong>
                    <div className="skill-pills">
                      {skill.items.split(',').map((item, i) => (
                        item.trim() ? (
                          <span key={i} className="skill-pill" style={{ borderColor: theme.secondary, color: theme.primary }}>
                            {item.trim()}
                          </span>
                        ) : null
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.some(e => e.institution || e.degree) && (
            <div className="resume-section">
              <h3 className="section-title-sidebar" style={{ color: theme.primary, borderColor: theme.secondary }}>
                Education
              </h3>
              {education.map((edu) => (
                (edu.institution || edu.degree) && (
                  <div key={edu.id} className="sidebar-edu-item">
                    <div className="edu-degree" style={{ color: theme.primary }}>{edu.degree}</div>
                    {edu.field && <div className="edu-field">{edu.field}</div>}
                    <div className="edu-school">{edu.institution}</div>
                    {(edu.startYear || edu.endYear) && (
                      <div className="edu-dates">{edu.startYear} - {edu.endYear || 'Present'}</div>
                    )}
                    {edu.score && <div className="edu-score">{edu.score}</div>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Languages */}
          {languages && languages.some(l => l.language && l.language.trim()) && (
            <div className="resume-section">
              <h3 className="section-title-sidebar" style={{ color: theme.primary, borderColor: theme.secondary }}>
                Languages
              </h3>
              <div className="languages-list">
                {languages.map((lang) => (
                  lang.language ? (
                    <div key={lang.id} className="language-item">
                      <span className="lang-name">{lang.language}</span>
                      {lang.proficiency && <span className="lang-level">({lang.proficiency})</span>}
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="modern-main">
        {/* Header Name & Title */}
        <header className="modern-header" style={{ borderBottomColor: theme.primary }}>
          <h1 className="resume-name" style={{ color: theme.primary }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="resume-target-title" style={{ color: theme.secondary }}>
            {personalInfo.jobTitle || 'Target Professional Title'}
          </p>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="resume-section">
            <h2 className="section-title-main" style={{ color: theme.primary, borderColor: theme.primary }}>
              Professional Summary
            </h2>
            <p className="resume-summary-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.some(exp => exp.role || exp.company) && (
          <section className="resume-section">
            <h2 className="section-title-main" style={{ color: theme.primary, borderColor: theme.primary }}>
              Work Experience
            </h2>
            {experience.map((exp) => (
              (exp.role || exp.company) && (
                <div key={exp.id} className="timeline-entry">
                  <div className="entry-header">
                    <div className="entry-title-wrap">
                      <h4 className="entry-role" style={{ color: theme.primary }}>{exp.role || 'Position'}</h4>
                      <span className="entry-company">{exp.company}</span>
                    </div>
                    <div className="entry-meta">
                      {(exp.startDate || exp.endDate) && (
                        <span className="entry-dates">
                          {exp.startDate} - {exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}
                        </span>
                      )}
                      {exp.location && <span className="entry-location"> • {exp.location}</span>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="entry-desc">
                      {renderBulletPoints(exp.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects.some(p => p.name) && (
          <section className="resume-section">
            <h2 className="section-title-main" style={{ color: theme.primary, borderColor: theme.primary }}>
              Key Projects
            </h2>
            {projects.map((proj) => (
              proj.name && (
                <div key={proj.id} className="timeline-entry">
                  <div className="entry-header">
                    <div className="entry-title-wrap">
                      <h4 className="entry-role" style={{ color: theme.primary }}>
                        {proj.name}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="entry-link" style={{ color: theme.secondary }}>
                            🔗 Link
                          </a>
                        )}
                      </h4>
                    </div>
                  </div>
                  {proj.technologies && (
                    <div className="proj-tech">
                      <strong>Tech:</strong> {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <div className="entry-desc">
                      {renderBulletPoints(proj.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.some(c => c.name) && (
          <section className="resume-section">
            <h2 className="section-title-main" style={{ color: theme.primary, borderColor: theme.primary }}>
              Certifications & Achievements
            </h2>
            <div className="certs-grid">
              {certifications.map((cert) => (
                cert.name && (
                  <div key={cert.id} className="cert-item">
                    <div className="cert-title" style={{ color: theme.primary }}>{cert.name}</div>
                    <div className="cert-sub">
                      {cert.issuer && <span>{cert.issuer}</span>}
                      {cert.date && <span> ({cert.date})</span>}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// 2. EXECUTIVE CLASSIC TEMPLATE (Single Column, ATS-Optimized)
export function ClassicTemplate({ data, theme, font }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-sheet classic-template" style={{ fontFamily: font.fontFamily }}>
      {/* Centered Top Header */}
      <header className="classic-header" style={{ borderBottomColor: theme.primary }}>
        <h1 className="resume-name centered" style={{ color: theme.primary }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p className="resume-target-title centered" style={{ color: theme.secondary }}>
          {personalInfo.jobTitle || 'Target Professional Title'}
        </p>

        <div className="classic-contact-bar">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="resume-summary-text">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.some(e => e.role || e.company) && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            EXPERIENCE
          </h2>
          {experience.map((exp) => (
            (exp.role || exp.company) && (
              <div key={exp.id} className="classic-entry">
                <div className="classic-entry-head">
                  <div>
                    <strong className="entry-role" style={{ color: theme.primary }}>{exp.role || 'Position'}</strong>, 
                    <span className="entry-company"> {exp.company}</span>
                  </div>
                  <div className="entry-dates">
                    {(exp.startDate || exp.endDate) && (
                      <span>{exp.startDate} – {exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}</span>
                    )}
                    {exp.location && <span> | {exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(exp.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.some(p => p.name) && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            KEY PROJECTS
          </h2>
          {projects.map((proj) => (
            proj.name && (
              <div key={proj.id} className="classic-entry">
                <div className="classic-entry-head">
                  <div>
                    <strong className="entry-role" style={{ color: theme.primary }}>{proj.name}</strong>
                    {proj.technologies && <span className="entry-company"> ({proj.technologies})</span>}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="entry-link" style={{ color: theme.secondary }}>
                      {proj.link.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                {proj.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(proj.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.some(e => e.institution || e.degree) && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            EDUCATION
          </h2>
          {education.map((edu) => (
            (edu.institution || edu.degree) && (
              <div key={edu.id} className="classic-entry-head">
                <div>
                  <strong className="edu-degree" style={{ color: theme.primary }}>{edu.degree}</strong>
                  {edu.field && <span> in {edu.field}</span>} – <span className="edu-school">{edu.institution}</span>
                </div>
                <div className="entry-dates">
                  {(edu.startYear || edu.endYear) && (
                    <span>{edu.startYear} – {edu.endYear || 'Present'}</span>
                  )}
                  {edu.score && <span> | {edu.score}</span>}
                </div>
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.some(s => s.items && s.items.trim()) && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            CORE SKILLS & TECHNOLOGIES
          </h2>
          <div className="classic-skills">
            {skills.map((skill) => (
              skill.items && (
                <div key={skill.id} className="classic-skill-line">
                  <strong style={{ color: theme.primary }}>{skill.category || 'Skills'}: </strong>
                  <span>{skill.items}</span>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.some(c => c.name) && (
        <section className="classic-section">
          <h2 className="classic-section-title" style={{ color: theme.primary, borderColor: theme.primary }}>
            CERTIFICATIONS
          </h2>
          <div className="classic-certs">
            {certifications.map((cert) => (
              cert.name && (
                <div key={cert.id} className="classic-cert-row">
                  <strong style={{ color: theme.primary }}>{cert.name}</strong>
                  {cert.issuer && <span> — {cert.issuer}</span>}
                  {cert.date && <span> ({cert.date})</span>}
                </div>
              )
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// 3. TECH MINIMALIST TEMPLATE (Developer & Engineer focus)
export function TechTemplate({ data, theme, font }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-sheet tech-template" style={{ fontFamily: font.fontFamily }}>
      {/* Tech Top Card */}
      <header className="tech-header" style={{ borderLeftColor: theme.primary }}>
        <div className="tech-header-left">
          <h1 className="resume-name" style={{ color: theme.primary }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <div className="tech-badge" style={{ backgroundColor: theme.light, color: theme.primary, borderColor: theme.secondary }}>
            {'< '}
            {personalInfo.jobTitle || 'Full Stack Engineer'}
            {' />'}
          </div>
        </div>
        <div className="tech-header-right">
          {personalInfo.email && <div><span className="dim">email:</span> {personalInfo.email}</div>}
          {personalInfo.phone && <div><span className="dim">phone:</span> {personalInfo.phone}</div>}
          {personalInfo.location && <div><span className="dim">loc:</span> {personalInfo.location}</div>}
          {personalInfo.github && <div><span className="dim">github:</span> {personalInfo.github}</div>}
          {personalInfo.linkedin && <div><span className="dim">in:</span> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div><span className="dim">web:</span> {personalInfo.website}</div>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="tech-section">
          <div className="tech-section-title" style={{ color: theme.primary }}>
            <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> ABOUT
          </div>
          <p className="resume-summary-text">{summary}</p>
        </section>
      )}

      {/* Skills Bar */}
      {skills && skills.some(s => s.items && s.items.trim()) && (
        <section className="tech-section">
          <div className="tech-section-title" style={{ color: theme.primary }}>
            <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> TECH STACK
          </div>
          <div className="tech-skill-cards">
            {skills.map((skill) => (
              skill.items && (
                <div key={skill.id} className="tech-skill-row">
                  <span className="tech-cat-label" style={{ color: theme.primary }}>{skill.category}:</span>
                  <div className="tech-pill-wrap">
                    {skill.items.split(',').map((item, i) => (
                      item.trim() ? (
                        <span key={i} className="tech-pill" style={{ backgroundColor: theme.light, borderColor: theme.secondary }}>
                          {item.trim()}
                        </span>
                      ) : null
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.some(e => e.role || e.company) && (
        <section className="tech-section">
          <div className="tech-section-title" style={{ color: theme.primary }}>
            <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> EXPERIENCE
          </div>
          {experience.map((exp) => (
            (exp.role || exp.company) && (
              <div key={exp.id} className="tech-entry">
                <div className="tech-entry-top">
                  <div>
                    <span className="tech-role" style={{ color: theme.primary }}>{exp.role}</span>
                    <span className="tech-at" style={{ color: theme.secondary }}> @ </span>
                    <span className="tech-company">{exp.company}</span>
                  </div>
                  <span className="tech-dates">
                    [{exp.startDate} - {exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}]
                  </span>
                </div>
                {exp.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(exp.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.some(p => p.name) && (
        <section className="tech-section">
          <div className="tech-section-title" style={{ color: theme.primary }}>
            <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> PROJECTS
          </div>
          {projects.map((proj) => (
            proj.name && (
              <div key={proj.id} className="tech-entry">
                <div className="tech-entry-top">
                  <div>
                    <span className="tech-role" style={{ color: theme.primary }}>{proj.name}</span>
                    {proj.technologies && <span className="tech-stack-tag"> [{proj.technologies}]</span>}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="entry-link" style={{ color: theme.secondary }}>
                      &rarr; source
                    </a>
                  )}
                </div>
                {proj.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(proj.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Education & Certs Split */}
      <div className="tech-two-col">
        {education && education.some(e => e.institution || e.degree) && (
          <section className="tech-section half">
            <div className="tech-section-title" style={{ color: theme.primary }}>
              <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> EDUCATION
            </div>
            {education.map((edu) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id} className="tech-small-entry">
                  <div style={{ fontWeight: 600, color: theme.primary }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                  <div>{edu.institution} ({edu.startYear} - {edu.endYear || 'Present'})</div>
                  {edu.score && <div className="dim">{edu.score}</div>}
                </div>
              )
            ))}
          </section>
        )}

        {certifications && certifications.some(c => c.name) && (
          <section className="tech-section half">
            <div className="tech-section-title" style={{ color: theme.primary }}>
              <span className="tech-slash" style={{ color: theme.secondary }}>{'//'}</span> CERTIFICATIONS
            </div>
            {certifications.map((cert) => (
              cert.name && (
                <div key={cert.id} className="tech-small-entry">
                  <div style={{ fontWeight: 600, color: theme.primary }}>{cert.name}</div>
                  <div className="dim">{cert.issuer} {cert.date && `(${cert.date})`}</div>
                </div>
              )
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

// 4. CREATIVE HEADER TEMPLATE
export function CreativeTemplate({ data, theme, font }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-sheet creative-template" style={{ fontFamily: font.fontFamily }}>
      {/* Top Banner Card */}
      <header className="creative-banner" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
        <h1 className="creative-name">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="creative-title">{personalInfo.jobTitle || 'Target Role'}</p>
        <div className="creative-contacts">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && <span>💼 {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>💻 {personalInfo.github}</span>}
        </div>
      </header>

      <div className="creative-body">
        {summary && (
          <section className="creative-section">
            <h2 className="creative-heading" style={{ color: theme.primary }}>
              <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> About Me
            </h2>
            <p className="resume-summary-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.some(e => e.role || e.company) && (
          <section className="creative-section">
            <h2 className="creative-heading" style={{ color: theme.primary }}>
              <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> Experience
            </h2>
            {experience.map((exp) => (
              (exp.role || exp.company) && (
                <div key={exp.id} className="creative-card" style={{ borderLeftColor: theme.secondary }}>
                  <div className="entry-header">
                    <div>
                      <h4 className="entry-role" style={{ color: theme.primary }}>{exp.role}</h4>
                      <span className="entry-company">{exp.company}</span>
                      {exp.location && <span className="dim"> • {exp.location}</span>}
                    </div>
                    <span className="creative-badge" style={{ backgroundColor: theme.light, color: theme.primary }}>
                      {exp.startDate} - {exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="entry-desc">
                      {renderBulletPoints(exp.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects.some(p => p.name) && (
          <section className="creative-section">
            <h2 className="creative-heading" style={{ color: theme.primary }}>
              <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> Projects
            </h2>
            {projects.map((proj) => (
              proj.name && (
                <div key={proj.id} className="creative-card" style={{ borderLeftColor: theme.secondary }}>
                  <div className="entry-header">
                    <div>
                      <h4 className="entry-role" style={{ color: theme.primary }}>{proj.name}</h4>
                      {proj.technologies && <span className="dim"> ({proj.technologies})</span>}
                    </div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="entry-link" style={{ color: theme.primary }}>
                        Explore Project ↗
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <div className="entry-desc">
                      {renderBulletPoints(proj.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Skills & Education Grid */}
        <div className="creative-grid">
          {skills && skills.some(s => s.items && s.items.trim()) && (
            <div className="creative-col">
              <h2 className="creative-heading" style={{ color: theme.primary }}>
                <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> Skills
              </h2>
              {skills.map((skill) => (
                skill.items && (
                  <div key={skill.id} className="creative-skill-box">
                    <strong style={{ color: theme.primary }}>{skill.category}:</strong>
                    <div className="skill-pills">
                      {skill.items.split(',').map((item, i) => (
                        item.trim() ? (
                          <span key={i} className="skill-pill" style={{ borderColor: theme.secondary, color: theme.primary, backgroundColor: theme.light }}>
                            {item.trim()}
                          </span>
                        ) : null
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {education && education.some(e => e.institution || e.degree) && (
            <div className="creative-col">
              <h2 className="creative-heading" style={{ color: theme.primary }}>
                <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> Education
              </h2>
              {education.map((edu) => (
                (edu.institution || edu.degree) && (
                  <div key={edu.id} className="creative-edu-box" style={{ borderLeftColor: theme.secondary }}>
                    <strong style={{ color: theme.primary }}>{edu.degree}</strong>
                    {edu.field && <div>{edu.field}</div>}
                    <div>{edu.institution}</div>
                    <div className="dim">{edu.startYear} - {edu.endYear || 'Present'} {edu.score && `• ${edu.score}`}</div>
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Certifications in Creative Template */}
        {certifications && certifications.some(c => c.name) && (
          <section className="creative-section">
            <h2 className="creative-heading" style={{ color: theme.primary }}>
              <span className="creative-icon-dot" style={{ backgroundColor: theme.secondary }}></span> Certifications
            </h2>
            <div className="certs-grid">
              {certifications.map((cert) => (
                cert.name && (
                  <div key={cert.id} className="cert-item">
                    <div className="cert-title" style={{ color: theme.primary }}>{cert.name}</div>
                    <div className="cert-sub">
                      {cert.issuer && <span>{cert.issuer}</span>}
                      {cert.date && <span> ({cert.date})</span>}
                    </div>
                  </div>
                )
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// 5. COMPACT GRID TEMPLATE
export function CompactTemplate({ data, theme, font }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-sheet compact-template" style={{ fontFamily: font.fontFamily }}>
      <header className="compact-header" style={{ borderBottom: `2px solid ${theme.primary}` }}>
        <div className="compact-name-row">
          <h1 className="resume-name" style={{ color: theme.primary }}>{personalInfo.fullName || 'Your Full Name'}</h1>
          <span className="compact-title" style={{ color: theme.secondary }}>{personalInfo.jobTitle || 'Target Role'}</span>
        </div>
        <div className="compact-meta">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {summary && (
        <section className="compact-sec">
          <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>SUMMARY</div>
          <p className="resume-summary-text compact-text">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.some(e => e.role || e.company) && (
        <section className="compact-sec">
          <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>EXPERIENCE</div>
          {experience.map((exp) => (
            (exp.role || exp.company) && (
              <div key={exp.id} className="compact-item">
                <div className="compact-item-head">
                  <strong style={{ color: theme.primary }}>{exp.role}</strong> — {exp.company} {exp.location && `(${exp.location})`}
                  <span className="compact-date">{exp.startDate} - {exp.isCurrent ? 'Present' : (exp.endDate || 'Present')}</span>
                </div>
                {exp.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(exp.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.some(p => p.name) && (
        <section className="compact-sec">
          <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>PROJECTS</div>
          {projects.map((proj) => (
            proj.name && (
              <div key={proj.id} className="compact-item">
                <div className="compact-item-head">
                  <strong style={{ color: theme.primary }}>{proj.name}</strong> {proj.technologies && `[${proj.technologies}]`}
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: theme.secondary }}> link</a>}
                </div>
                {proj.description && (
                  <div className="entry-desc">
                    {renderBulletPoints(proj.description)}
                  </div>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {/* Skills, Education & Certs */}
      <div className="compact-dual">
        {skills && skills.some(s => s.items && s.items.trim()) && (
          <div className="compact-half">
            <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>SKILLS</div>
            {skills.map((skill) => (
              skill.items && (
                <div key={skill.id} className="compact-skill-row">
                  <strong>{skill.category}:</strong> {skill.items}
                </div>
              )
            ))}
          </div>
        )}

        {education && education.some(e => e.institution || e.degree) && (
          <div className="compact-half">
            <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>EDUCATION</div>
            {education.map((edu) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id} className="compact-edu-row">
                  <div><strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`}</div>
                  <div className="dim">{edu.institution} ({edu.startYear} - {edu.endYear || 'Present'})</div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {certifications && certifications.some(c => c.name) && (
        <section className="compact-sec" style={{ marginTop: '10px' }}>
          <div className="compact-tag" style={{ backgroundColor: theme.primary, color: '#fff' }}>CERTIFICATIONS</div>
          {certifications.map((cert) => (
            cert.name && (
              <div key={cert.id} className="compact-skill-row">
                <strong>{cert.name}</strong> {cert.issuer && `— ${cert.issuer}`} {cert.date && `(${cert.date})`}
              </div>
            )
          ))}
        </section>
      )}
    </div>
  );
}
