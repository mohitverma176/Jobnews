import React from 'react';
import {
  ModernTemplate,
  ClassicTemplate,
  TechTemplate,
  CreativeTemplate,
  CompactTemplate
} from './ResumeTemplates';

export default function ResumePreview({
  resumeData,
  selectedTemplate,
  activeTheme,
  activeFont,
  zoomLevel,
  setZoomLevel
}) {
  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
      case 'tech':
        return <TechTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
      case 'compact':
        return <CompactTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
      default:
        return <ModernTemplate data={resumeData} theme={activeTheme} font={activeFont} />;
    }
  };

  return (
    <div className="resume-preview-container">
      {/* Canvas Top Bar / Zoom Bar */}
      <div className="preview-toolbar no-print">
        <div className="preview-status-indicator">
          <span className="live-dot"></span>
          <span>Live Preview (Real-Time)</span>
        </div>

        <div className="zoom-controls">
          <button 
            type="button" 
            className="btn-zoom"
            onClick={() => setZoomLevel(prev => Math.max(0.6, Math.round((prev - 0.1) * 10) / 10))}
            title="Zoom Out"
            disabled={zoomLevel <= 0.6}
          >
            －
          </button>
          <span className="zoom-value">{Math.round(zoomLevel * 100)}%</span>
          <button 
            type="button" 
            className="btn-zoom"
            onClick={() => setZoomLevel(prev => Math.min(1.2, Math.round((prev + 0.1) * 10) / 10))}
            title="Zoom In"
            disabled={zoomLevel >= 1.2}
          >
            ＋
          </button>
          <button 
            type="button" 
            className="btn-zoom-reset"
            onClick={() => setZoomLevel(0.9)}
          >
            Fit
          </button>
        </div>
      </div>

      {/* Preview Paper Area */}
      <div className="preview-paper-stage">
        <div 
          id="printable-resume-sheet" 
          className="printable-resume-wrapper"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          {renderSelectedTemplate()}
        </div>
      </div>
    </div>
  );
}
