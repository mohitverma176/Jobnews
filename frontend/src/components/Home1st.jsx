import React from 'react';
import { Link } from 'react-router-dom';
import './Global.css';
import jobVideo from '../assets/jobnews-video.mp4';
import { useState, useEffect } from 'react';

const words = ['Opportunity', 'Jobs', 'Career'];

export default function Home1st() {
  const tickerItems = [
    '🔥 Discover 200+ verified tech & private opportunities',
    '⚡ Real-time industry news feeds scraped daily from Wired & Ars Technica',
    '🤖 AI Career Assistant is online — ask questions, get resume & interview help anytime',
    '💼 Remote, Fresher & Experienced roles available across top global firms',
    '🚀 Bookmark your favorite jobs to your personalized Watchlist with 1-click'
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];

    const isWordComplete = !deleting && text.length === current.length;
    const isWordEmpty = deleting && text.length === 0;
    const delay = isWordComplete ? 1100 : isWordEmpty ? 350 : deleting ? 75 : 115;

    const timer = setTimeout(() => {
      if (isWordComplete) {
        setDeleting(true);
      } else if (isWordEmpty) {
        setDeleting(false);
        setIndex((currentIndex) => (currentIndex + 1) % words.length);
      } else if (deleting) {
        setText(current.slice(0, text.length - 1));
      } else {
        setText(current.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <section className="home1st">
      {/* Dynamic Marquee Headline Bar */}
      <div className="headline-bar">
        <div className="headline-label">
          <span className="headline-pulse" />
          <span>LATEST</span>
        </div>

        <div className="headline-wrapper">
          <div className="headline-track">
            {tickerItems.map((item, idx) => (
              <span key={`ticker-1-${idx}`} className="headline-item">
                {item}
              </span>
            ))}
            {tickerItems.map((item, idx) => (
              <span key={`ticker-2-${idx}`} className="headline-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Video Section */}
      <div className="video-container">
        <video
          className="home-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={jobVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Mesh Overlay */}
        <div className="video-gradient-overlay" />

        {/* Content Box */}
        <div className="video-overlay">
          <div className="hero-pill-badge">
            <span className="pill-sparkle">✨</span>
            <span>AI-POWERED CAREER & JOB INTELLIGENCE</span>
          </div>

          <h1 className="hero-main-title">
            Find Your Next <br />
            <span className="hero-gradient-text hero-typed-word">{text}</span>
            <span className="hero-typed-cursor" aria-hidden="true">|</span>
          </h1>

          <p className="hero-subtext">
            Search thousands of curated job openings across top technology companies, startups, and government sectors. Stay ahead with real-time news and smart AI career coaching.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions-row">
            <Link to="/jobs" className="hero-btn-primary">
              <span>Explore Jobs</span>
              <span className="btn-arrow">↗</span>
            </Link>
            <Link to="/news" className="hero-btn-secondary">
              <span>Read Tech News</span>
              <span className="btn-icon">📰</span>
            </Link>
          </div>

          {/* Value Highlights */}
          <div className="hero-highlights">
            <div className="hero-stat-card">
              <span className="stat-icon">🏢</span>
              <div>
                <strong>200+</strong>
                <p>Curated Roles</p>
              </div>
            </div>

            <div className="hero-stat-card">
              <span className="stat-icon">⚡</span>
              <div>
                <strong>Daily</strong>
                <p>Live News Feeds</p>
              </div>
            </div>

            <div className="hero-stat-card">
              <span className="stat-icon">🤖</span>
              <div>
                <strong>24/7</strong>
                <p>AI Career Bot</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="home-tools-section">
        <div className="home-section-heading">
          <span className="home-section-kicker">YOUR NEXT MOVE</span>
          <h2>Everything you need to move forward</h2>
          <p>Find the opportunity, understand the market, and show up prepared.</p>
        </div>

        <div className="home-tools-grid">
          <Link to="/jobs" className="home-tool-card home-tool-jobs">
            <span className="home-tool-icon">⌕</span>
            <span className="home-tool-content">
              <strong>Search smarter</strong>
              <span>Filter fresh roles by title, skill, and location.</span>
            </span>
            <span className="home-tool-arrow">↗</span>
          </Link>
          <Link to="/news" className="home-tool-card home-tool-news">
            <span className="home-tool-icon">◈</span>
            <span className="home-tool-content">
              <strong>Track what is changing</strong>
              <span>Catch the technology stories shaping hiring.</span>
            </span>
            <span className="home-tool-arrow">↗</span>
          </Link>
          <Link to="/resume" className="home-tool-card home-tool-resume">
            <span className="home-tool-icon">📝</span>
            <span className="home-tool-content">
              <strong>Build your resume</strong>
              <span>Interactive real-time builder with 5 layouts & PDF download.</span>
            </span>
            <span className="home-tool-arrow">↗</span>
          </Link>
          <button type="button" className="home-tool-card home-tool-ai" onClick={() => document.querySelector('.chatbot-trigger-btn')?.click()}>
            <span className="home-tool-icon">✦</span>
            <span className="home-tool-content">
              <strong>Ask JobNews AI</strong>
              <span>Get focused help with career, resumes and interviews.</span>
            </span>
            <span className="home-tool-arrow">↗</span>
          </button>
        </div>
      </section>
    </section>
  );
}
