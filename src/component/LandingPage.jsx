import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";








const LandingPage = () => {
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState(null);  const toggleCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

 useEffect(() => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  const handleScroll = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);



  return (
    <div className="landing">



      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Enrollify" className="navbar-logo" />
          Enrollify
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#workflow">Workflow</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>


        <button
          className="login-btn"
          onClick={() => navigate("/signup")}
        >
          Login
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>
            Turn Your Course Promotion <br />
            <span>Into Smart Revenue</span>
          </h1>

          <p>
            Enrollify is a premium course advertisement & enrollment platform
            that helps creators reach the right learners using smart targeting
            and real-time analytics.
          </p>
        </div>

        <img
          src="/hero-image.png"
          alt="platform preview"
          className="hero-image"
        />

        {/* Premium Horizontal Creators */}
        <div className="creators-wrapper">

          <div className="glow-left"></div>
          <div className="glow-right"></div>

          <div className="creators-slider">
            <div className="creators-track">
              {[...Array(20)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="creator"
                />
              ))}

              {/* duplicate for infinite effect */}
              {[...Array(20)].map((_, i) => (
                <img
                  key={"dup" + i}
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="creator"
                />
              ))}
            </div>
          </div>

          <h2 className="creators-title">
            Empowering <span>10K+ Creator</span>
          </h2>

        </div>
      </section>

      <section className="problem-solution-section" id="about">
        <h2 className="section-title">
          The Challenges Creators Face & How Enrollify Solves Them
        </h2>

        <div className="ps-container">

          {/* LEFT SIDE - PROBLEMS */}
          <div className="ps-column">
            <h3 className="column-heading">Problems Creators Face</h3>

            <div
              className={`ps-card ${activeCard === 1 ? "active" : ""}`}
              onClick={() => toggleCard(1)}
            >
              <h4>Monetization Is Complicated</h4>
              {activeCard === 1 && (
                <p>
                  Many creators struggle to monetize their knowledge because most platforms
                  either charge high commissions or limit pricing flexibility. This results
                  in unstable income and restricted growth opportunities.
                </p>
              )}
            </div>

            <div
              className={`ps-card ${activeCard === 2 ? "active" : ""}`}
              onClick={() => toggleCard(2)}
            >
              <h4>Lack of Secure Access Control</h4>
              {activeCard === 2 && (
                <p>
                  Without secure authentication and OTP verification systems, premium
                  content becomes vulnerable to unauthorized access and distribution.
                </p>
              )}
            </div>

            <div
              className={`ps-card ${activeCard === 3 ? "active" : ""}`}
              onClick={() => toggleCard(3)}
            >
              <h4>Poor User Experience</h4>
              {activeCard === 3 && (
                <p>
                  Complicated dashboards and outdated UI designs reduce engagement,
                  lower retention rates, and negatively impact brand perception.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - SOLUTIONS */}
          <div className="ps-column">
            <h3 className="column-heading">How Enrollify Solves It</h3>

            <div
              className={`ps-card solution ${activeCard === 4 ? "active" : ""}`}
              onClick={() => toggleCard(4)}
            >
              <h4>Flexible Monetization System</h4>
              {activeCard === 4 && (
                <p>
                  Enrollify gives creators complete pricing freedom including subscriptions,
                  one-time purchases, and tier-based plans without hidden fees.
                </p>
              )}
            </div>

            <div
              className={`ps-card solution ${activeCard === 5 ? "active" : ""}`}
              onClick={() => toggleCard(5)}
            >
              <h4>Advanced Secure Authentication</h4>
              {activeCard === 5 && (
                <p>
                  With OTP-based verification and protected login systems, Enrollify ensures
                  that only verified users can access premium learning materials.
                </p>
              )}
            </div>

            <div
              className={`ps-card solution ${activeCard === 6 ? "active" : ""}`}
              onClick={() => toggleCard(6)}
            >
              <h4>Premium Liquid UI Experience</h4>
              {activeCard === 6 && (
                <p>
                  Inspired by modern Apple-style liquid interfaces, Enrollify delivers
                  a smooth, responsive, and visually engaging learning experience.
                </p>
              )}
            </div>
          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="workflow-section" id="workflow">

        <h2 className="section-title">
          Build, Launch & Scale <span>Superfast</span>
        </h2>

        <div className="workflow-container">

          <div className="workflow-card">
            <div className="step-number">01</div>
            <h3>Create Your Course</h3>
            <p>Upload videos, add modules, design learning paths and build your premium knowledge product in minutes.</p>
          </div>

          <div className="workflow-card">
            <div className="step-number">02</div>
            <h3>Set Pricing & Plans</h3>
            <p>Choose subscriptions, one-time payments or tier models with complete pricing freedom.</p>
          </div>

          <div className="workflow-card">
            <div className="step-number">03</div>
            <h3>Promote Smartly</h3>
            <p>Reach the right learners using intelligent targeting and creator-focused promotions.</p>
          </div>

          <div className="workflow-card">
            <div className="step-number">04</div>
            <h3>Track & Scale Revenue</h3>
            <p>Analyze performance using real-time dashboards and scale your income confidently.</p>
          </div>

        </div>
      </section>


      {/* ================= FEATURES SECTION ================= */}
      <section className="features-section" id="features">

        <h2 className="section-title">
          Powerful Features For <span>Modern Creators</span>
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>Smart Targeted Ads</h3>
            <p>AI-driven audience targeting that connects your course with the right learners.</p>
          </div>

          <div className="feature-card">
            <h3>Real-Time Analytics</h3>
            <p>Monitor revenue, conversions and learner engagement instantly.</p>
          </div>

          <div className="feature-card">
            <h3>OTP Secure Access</h3>
            <p>Advanced authentication ensures premium content stays protected.</p>
          </div>

          <div className="feature-card">
            <h3>Flexible Monetization</h3>
            <p>Subscriptions, bundles, and one-time pricing — full freedom.</p>
          </div>

          <div className="feature-card">
            <h3>Affiliate System</h3>
            <p>Boost revenue by letting others promote your courses.</p>
          </div>

          <div className="feature-card">
            <h3>Premium Liquid UI</h3>
            <p>Apple-inspired smooth interface for creators and learners.</p>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="testimonial-section">

        <h2 className="section-title">
          Loved By <span>Top Creators</span>
        </h2>

        <div className="testimonial-container">

          <div className="testimonial-card">
            <img src="https://i.pravatar.cc/100?img=30" alt="creator" />
            <h4>Billie Alice</h4>
            <p>“Enrollify completely changed how I monetize my courses. Revenue doubled in just 3 months.”</p>
          </div>

          <div className="testimonial-card">
            <img src="https://i.pravatar.cc/100?img=45" alt="creator" />
            <h4>Ananya Mehta</h4>
            <p>“The analytics dashboard is insanely powerful and easy to use. Feels premium.”</p>
          </div>

          <div className="testimonial-card">
            <img src="https://i.pravatar.cc/100?img=12" alt="creator" />
            <h4>Vikram Patel</h4>
            <p>“Secure access and smooth UI make this platform stand out from others.”</p>
          </div>

        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section className="pricing-section" id="pricing">

        <h2 className="section-title">
          Simple Pricing. <span>Real Value.</span>
        </h2>

        <div className="pricing-wrapper">

          {/* BASIC PLAN */}
          <div className="pricing-card">
            <h3>Basic</h3>
            <h1>₹699</h1>
            <p className="per-month">per month</p>

            <ul>
              <li>1 Active Webinar</li>
              <li>Enrollify Subdomain</li>
              <li>Basic Landing Page Builder</li>
              <li>Email Reminders</li>
              <li>Razorpay Integration</li>
              <li>8% Transaction Fee</li>
              <li>Standard Support</li>
            </ul>

            <button className="pricing-btn">Start Basic</button>
          </div>


          {/* GROWTH PLAN */}
          <div className="pricing-card featured">
            <div className="badge">Most Popular</div>
            <h3>Growth</h3>
            <h1>₹1499</h1>
            <p className="per-month">per month</p>

            <ul>
              <li>5 Active Webinars</li>
              <li>Advanced Page Builder</li>
              <li>Email + WhatsApp Automation</li>
              <li>Razorpay & Stripe</li>
              <li>Analytics Dashboard</li>
              <li>Meta Pixel Tracking</li>
              <li>5% Transaction Fee</li>
              <li>Priority Support</li>
            </ul>

            <button className="pricing-btn featured-btn">Go Growth</button>
          </div>


          {/* ELITE PLAN */}
          <div className="pricing-card">
            <h3>Elite</h3>
            <h1>₹1999</h1>
            <p className="per-month">per month</p>

            <ul>
              <li>Unlimited Webinars</li>
              <li>Custom Domain</li>
              <li>Advanced Revenue Analytics</li>
              <li>Conversion Tracking Dashboard</li>
              <li>Affiliate System</li>
              <li>API Access</li>
              <li>2% Transaction Fee</li>
              <li>Dedicated Support</li>
            </ul>

            <button className="pricing-btn">Upgrade to Elite</button>
          </div>

        </div>
      </section>

      {/* ===== PREMIUM FOOTER SECTION START ===== */}
      <footer className="premium-footer">

        <div className="footer-top">
          <h2>Let’s Build Something Big 🚀</h2>
          <p>
            We don’t just provide tools. We build scalable revenue engines
            for creators who are serious about growth.
          </p>
        </div>

        <div className="footer-grid">

          <div className="footer-col">
            <div className="footer-logo">
              <img src="/logo.png" alt="Enrollify" className="footer-mini-logo" />
              <h3 className="logo-text">Enrollify</h3>
            </div>
            <p>
              Powering creators with automation,
              premium funnels & serious growth systems.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#workflow">Workflow</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Stay Updated</h4>
            <div className="subscribe-box">
              <input type="email" placeholder="Enter your email" />
              <button>Join</button>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Enrollify. Built for serious creators.</p>
        </div>

      </footer>
      {/* ===== PREMIUM FOOTER SECTION END ===== */}

    </div>




  );
};

export default LandingPage;