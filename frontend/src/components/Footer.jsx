import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>JobNews</h2>

          <p>
            Your trusted source for the latest jobs, career opportunities,
            employment news and updates.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">in</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/news">News</Link>
          <Link to="/resume">Resume Builder</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>

        {/* Job Categories */}
        <div className="footer-column">
          <h3>Job Categories</h3>

          <Link to="/jobs/government">Government Jobs</Link>
          <Link to="/jobs/private">Private Jobs</Link>
          <Link to="/jobs/it">IT Jobs</Link>
          <Link to="/jobs/fresher">Fresher Jobs</Link>
        </div>

        {/* Languages */}
        <div className="footer-column">
          <h3>Languages</h3>

          <a href="#">English</a>
          <a href="#">हिन्दी</a>
          <a href="#">தமிழ்</a>
          <a href="#">मराठी</a>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 JobNews. All rights reserved.</p>

        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
