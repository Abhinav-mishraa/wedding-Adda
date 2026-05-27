import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="overlay"></div>

        <div className="hero-content">
          <p className="hero-tag">Luxury Wedding Venue Platform</p>

          <h1>
            Make Your Wedding
            <br />
            Truly Memorable
          </h1>

          <p className="hero-description">
            Wedding Adda helps you discover the perfect wedding venues
            with elegance, trust, and simplicity.
          </p>

          <div className="hero-buttons">
            <button className="explore-btn">Explore Venues</button>

            <button className="learn-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop"
            alt="Wedding"
          />
        </div>

        <div className="about-content">
          <p className="section-tag">ABOUT WEDDING ADDA</p>

          <h2>
            India’s Modern Platform
            <br />
            For Wedding Venue Discovery
          </h2>

          <p>
            Wedding Adda helps users discover beautiful and verified
            wedding venues with a premium experience.
          </p>

          <p>
            From banquet halls to luxury resorts and destination
            weddings — everything is available in one place.
          </p>

          <div className="features">
            <div className="feature-card">
              <h3>Verified Venues</h3>
              <p>Trusted and genuine venue listings.</p>
            </div>

            <div className="feature-card">
              <h3>Easy Booking</h3>
              <p>Smooth and hassle-free process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="feature-section">
        <div className="feature-heading">
          <p>OUR FEATURES</p>

          <h2>Why People Choose Wedding Adda</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-box">
            <h3>Premium Experience</h3>

            <p>
              Elegant and modern platform design for users.
            </p>
          </div>

          <div className="feature-box">
            <h3>Multiple Cities</h3>

            <p>
              Discover wedding venues across different cities.
            </p>
          </div>

          <div className="feature-box">
            <h3>Trusted Platform</h3>

            <p>
              Helping couples find memorable wedding spaces.
            </p>
          </div>

        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">

        <h2>
          “Every Love Story Deserves
          <br />
          A Beautiful Beginning.”
        </h2>

        <p>
          Wedding Adda helps turn wedding dreams into unforgettable memories.
        </p>

      </section>

    </div>
  );
}

export default Home;