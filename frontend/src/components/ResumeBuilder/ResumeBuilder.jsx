import React, { useState, useEffect } from 'react';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import {
  sampleResumeData,
  emptyResumeData,
  resumeTemplatesList,
  colorPalettes,
  fontOptions
} from './resumeInitialData';
import './ResumeBuilder.css';

export default function ResumeBuilder() {
  // Main Resume Data State - Start with sample data so user immediately sees a live preview
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('jobnews_resume_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return sampleResumeData;
      }
    }
    return sampleResumeData;
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState(colorPalettes[0].id);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].id);
  const [zoomLevel, setZoomLevel] = useState(0.85);
  const [activeMobileTab, setActiveMobileTab] = useState('edit'); // 'edit' or 'preview'
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [notification, setNotification] = useState('');

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jobnews_resume_data', JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Could not save resume to localStorage', e);
    }
  }, [resumeData]);

  const activeTheme = colorPalettes.find(c => c.id === selectedColor) || colorPalettes[0];
  const activeFont = fontOptions.find(f => f.id === selectedFont) || fontOptions[0];

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLoadSample = () => {
    if (window.confirm('Load sample developer resume data? This will overwrite your current draft.')) {
      setResumeData(sampleResumeData);
      triggerNotification('Loaded sample resume data successfully!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all fields and start a fresh resume?')) {
      setResumeData(emptyResumeData);
      triggerNotification('Cleared form. Ready for your details!');
    }
  };

  const handlePrintDownload = () => {
    // Save document title temporarily for PDF filename
    const prevTitle = document.title;
    const applicantName = resumeData.personalInfo.fullName.trim() || 'Resume';
    document.title = `${applicantName.replace(/\s+/g, '_')}_Resume`;
    
    // Trigger native browser print dialog (Save as PDF)
    window.print();
    
    // Restore title
    setTimeout(() => {
      document.title = prevTitle;
    }, 1000);
  };

  return (
    <div className="resume-builder-page">
      {/* Top Banner / Hero Header */}
      <div className="rb-hero-header no-print">
        <div className="rb-hero-content">
          <div className="rb-badge">✨ Free AI-Ready Resume Builder</div>
          <h1 className="rb-title">Build Your Professional Resume in Real-Time</h1>
          <p className="rb-subtitle">
            Fill in your details on the left, watch your resume format live on the right, and download a polished PDF instantly.
          </p>
        </div>

        <div className="rb-hero-actions">
          <button 
            type="button" 
            className="btn-hero-layout"
            onClick={() => setShowLayoutModal(true)}
          >
            🎨 Switch Layout Template ({resumeTemplatesList.find(t => t.id === selectedTemplate)?.name})
          </button>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="rb-toolbar no-print">
        <div className="toolbar-section">
          <label className="toolbar-label">Template:</label>
          <div className="template-chips">
            {resumeTemplatesList.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                className={`template-chip-btn ${selectedTemplate === tpl.id ? 'active' : ''}`}
                onClick={() => setSelectedTemplate(tpl.id)}
              >
                <span>{tpl.name}</span>
                {tpl.badge && <span className="chip-badge">{tpl.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar-section">
          <label className="toolbar-label">Color Theme:</label>
          <div className="color-palette-picker">
            {colorPalettes.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`color-dot ${selectedColor === c.id ? 'active' : ''}`}
                style={{ backgroundColor: c.primary }}
                title={c.name}
                onClick={() => setSelectedColor(c.id)}
              />
            ))}
          </div>
        </div>

        <div className="toolbar-section">
          <label className="toolbar-label">Font:</label>
          <select 
            value={selectedFont} 
            onChange={(e) => setSelectedFont(e.target.value)}
            className="font-dropdown"
          >
            {fontOptions.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="toolbar-actions">
          <button 
            type="button" 
            className="btn-toolbar btn-secondary"
            onClick={handleLoadSample}
            title="Fill with sample data to test"
          >
            📄 Sample Data
          </button>
          <button 
            type="button" 
            className="btn-toolbar btn-ghost"
            onClick={handleClearAll}
            title="Clear all fields"
          >
            🧹 Clear
          </button>
          <button 
            type="button" 
            className="btn-toolbar btn-primary-action"
            onClick={handlePrintDownload}
            title="Download or Print Resume as PDF"
          >
            ⬇ Download / Print PDF
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="rb-notification-toast no-print">
          <span>{notification}</span>
        </div>
      )}

      {/* Responsive View Tabs (for small screen / mobile) */}
      <div className="rb-mobile-tabs no-print">
        <button 
          type="button" 
          className={`mobile-tab-btn ${activeMobileTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveMobileTab('edit')}
        >
          ✏️ Edit Details
        </button>
        <button 
          type="button" 
          className={`mobile-tab-btn ${activeMobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveMobileTab('preview')}
        >
          👁️ Live Preview
        </button>
      </div>

      {/* Main Side-by-Side Workspace */}
      <div className="rb-workspace">
        {/* Left Side: Form Editor */}
        <div className={`rb-pane rb-pane-form ${activeMobileTab === 'edit' ? 'mobile-visible' : 'mobile-hidden'}`}>
          <div className="pane-header no-print">
            <h2 className="pane-title">Resume Information</h2>
            <span className="pane-sub">Sections automatically format on the live sheet</span>
          </div>
          <ResumeForm 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        </div>

        {/* Right Side: Live Interactive Preview */}
        <div className={`rb-pane rb-pane-preview ${activeMobileTab === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
          <ResumePreview
            resumeData={resumeData}
            selectedTemplate={selectedTemplate}
            activeTheme={activeTheme}
            activeFont={activeFont}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </div>
      </div>

      {/* Layout Template Selector Modal */}
      {showLayoutModal && (
        <div className="rb-modal-backdrop no-print" onClick={() => setShowLayoutModal(false)}>
          <div className="rb-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Choose a Resume Layout Template</h3>
              <button 
                type="button" 
                className="btn-close-modal"
                onClick={() => setShowLayoutModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="modal-desc">
              Select a style layout for your resume. You can switch at any time without losing any of your typed information!
            </p>
            <div className="template-gallery-grid">
              {resumeTemplatesList.map((tpl) => (
                <div 
                  key={tpl.id} 
                  className={`template-card ${selectedTemplate === tpl.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(tpl.id);
                    setShowLayoutModal(false);
                    triggerNotification(`Switched to ${tpl.name} layout!`);
                  }}
                >
                  <div className="template-card-preview-thumb">
                    <div className={`thumb-layout thumb-${tpl.id}`}>
                      <div className="thumb-bar" style={{ backgroundColor: activeTheme.primary }}></div>
                      <div className="thumb-lines">
                        <div className="t-line long"></div>
                        <div className="t-line med"></div>
                        <div className="t-line short"></div>
                      </div>
                    </div>
                  </div>
                  <div className="template-card-meta">
                    <div className="template-card-name">
                      {tpl.name}
                      {tpl.badge && <span className="chip-badge">{tpl.badge}</span>}
                    </div>
                    <div className="template-card-desc">{tpl.description}</div>
                  </div>
                  <button type="button" className="btn-select-tpl">
                    {selectedTemplate === tpl.id ? '✓ Selected' : 'Select Layout'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
