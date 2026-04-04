import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Star, Users, Calendar, Clock, Globe, Laptop, Gift, ArrowRight, Instagram, Youtube, Award } from "lucide-react";
import "./TemplatePage.css";

function TemplatePage() {
  const navigate = useNavigate();
  const [data] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("webinarData"));
    const defaultData = {
      title: "Social Media Marketing Mastery",
      subtitle: "Unlock the knowledge to scale your business",
      description: "Learn the secrets of the gods of marketing. This comprehensive guide will take you through the fastest ways to grow your audience and protect your brand's reputation online.",
      categories: ["Marketing", "Business", "Finance"],
      webinarDateTime: "2026-03-22T10:00",
      durationMinutes: "120",
      capacity: "130,000",
      language: "English",
      price: "99",
      originalPrice: "999",
      registrationsEnd: "18 MAR"
    };
    return savedData || defaultData;
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    title,
    subtitle,
    description,
    categories = [],
    webinarDateTime,
    durationMinutes,
    capacity,
    language,
    price = "99",
    registrationsEnd = "18 MAR",
    bannerImage,
    meetingLink
  } = data;

  const primaryCategory = categories[0] || "Marketing";
  
  const defaultTestimonials = [
    { name: "DR. SUBHASH CHANDRA", role: "CHAIRMAN EMERITUS | ZEE", text: "The training was transformative. He not only sharpened our public speaking skills but also helped us let go.", img: "https://i.pravatar.cc/150?u=subhash" },
    { name: "MR. MANISH SHUKLA", role: "GENERAL MANAGER | ONGC", text: "It was a very introspective session... really an eyeopener.", img: "https://i.pravatar.cc/150?u=manish" },
    { name: "MR. FREDERIC CAHAREL", role: "PARTNER | KPMG UK", text: "Helped us understand what leadership really means in a global context.", img: "https://i.pravatar.cc/150?u=frederic" }
  ];

  const contentMap = {
    "Marketing": {
      outcomes: [
        "Influence outcomes in meetings and high-stakes conversations",
        "Speak with clarity, claim authority, and presence",
        "Build Confidence and fluency in your professional domain",
        "Communicate confidently in front of Senior Leaders"
      ],
      testimonials: defaultTestimonials
    },
    "Business": {
      outcomes: [
        "Develop strategic thinking for business growth",
        "Master negotiation and deal-closing techniques",
        "Build and scale high-performance teams",
        "Create sustainable competitive advantages"
      ],
      testimonials: defaultTestimonials
    },
    "Technology": {
      outcomes: [
        "Stay ahead with emerging tech trends and tools",
        "Build scalable and production-ready applications",
        "Master modern development workflows and best practices",
        "Solve complex technical challenges with confidence"
      ],
      testimonials: defaultTestimonials
    },
    "Finance": {
      outcomes: [
        "Understand financial markets and investment strategies",
        "Master budgeting, forecasting, and financial planning",
        "Build wealth through smart financial decisions",
        "Navigate risk management and portfolio diversification"
      ],
      testimonials: defaultTestimonials
    },
    "Startup": {
      outcomes: [
        "Validate your startup idea and find product-market fit",
        "Build an MVP and launch with limited resources",
        "Master fundraising and investor pitching",
        "Scale operations from zero to growth stage"
      ],
      testimonials: defaultTestimonials
    },
    "Design": {
      outcomes: [
        "Create user-centric designs that convert",
        "Master modern design tools and workflows",
        "Build consistent and scalable design systems",
        "Communicate design decisions with stakeholders"
      ],
      testimonials: defaultTestimonials
    },
    "Health": {
      outcomes: [
        "Understand holistic approaches to wellness",
        "Build sustainable healthy habits and routines",
        "Master stress management and mental resilience",
        "Navigate the latest health and nutrition science"
      ],
      testimonials: defaultTestimonials
    },
    "Education": {
      outcomes: [
        "Master effective teaching and facilitation techniques",
        "Design engaging and impactful curriculum",
        "Leverage technology for better learning outcomes",
        "Build communities of engaged learners"
      ],
      testimonials: defaultTestimonials
    },
  };

  // Fallback for banner image if not provided
  const displayImage = bannerImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  const currentContent = contentMap[primaryCategory] || contentMap["Marketing"];
  const learningOutcomes = currentContent.outcomes;
  const testimonials = currentContent.testimonials;

  const logos = [
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Goldman Sachs", url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Goldman_Sachs_logo.svg" },
    { name: "Deloitte", url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Deloitte.svg" },
    { name: "KPMG", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg" }
  ];

  return (
    <div className="v2-template-wrapper">
      {/* Top Floating Badge */}
      <div className="v2-floating-header">
        <div className="v2-badge-box">
          <span className="v2-badge-main">{title}</span>
          <span className="v2-badge-sub">{Math.floor(durationMinutes/60)}-Hour Exclusive Workshop</span>
        </div>
      </div>

      <div className="v2-hero-section">
        <p className="v2-participants-count">
          <strong>{capacity}+ Reserved Seats</strong> Join our global community of learners
        </p>
        
        <h1 className="v2-main-title">
          {title}
        </h1>

        <p className="v2-subtitle">
          {subtitle || description.substring(0, 150) + "..."}
        </p>

        <div className="v2-hero-grid">
          {/* Left: Banner Image / Speaker Image */}
          <div className="v2-speaker-container">
            <div className="v2-speaker-circle dynamic-banner-container">
              <img src={displayImage} alt="Webinar Banner" className="v2-speaker-img dynamic-banner-img" />
              
              {/* Conditional Social overlays - only if it looks like a person */}
              {!bannerImage && (
                <>
                  <div className="v2-social-card v2-insta">
                    <Instagram size={16} className="v2-icon-insta" />
                    <div className="v2-social-info">
                      <span className="v2-handle">expert_session <Award size={12}/></span>
                      <span className="v2-stats">1.1M followers</span>
                    </div>
                  </div>
                  <div className="v2-social-card v2-yt">
                    <Youtube size={16} className="v2-icon-yt" />
                    <div className="v2-social-info">
                      <span className="v2-handle">Masterclass <CheckCircle2 size={12}/></span>
                      <span className="v2-stats">435K subscribers</span>
                    </div>
                  </div>
                </>
              )}

              <div className="v2-speaker-badge">
                <span className="v2-name">Workshop Host</span>
                <span className="v2-achievements">Industry Expert</span>
                <span className="v2-role">{categories.join(" | ")}</span>
              </div>
            </div>
            
            <div className="v2-trust-row">
              <div className="v2-stars">
                <Star size={16} fill="#fbbf24" color="#fbbf24"/>
                <Star size={16} fill="#fbbf24" color="#fbbf24"/>
                <Star size={16} fill="#fbbf24" color="#fbbf24"/>
                <Star size={16} fill="#fbbf24" color="#fbbf24"/>
                <Star size={16} fill="#fbbf24" color="#fbbf24"/>
                <span>4.7/5 Trusted by {capacity}+ Students</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Registration */}
          <div className="v2-details-container">
            <h3 className="v2-details-title">Webinar Details</h3>
            
            <div className="v2-details-grid">
              <div className="v2-detail-box">
                <Calendar className="v2-detail-icon" />
                <div>
                  <label>Date</label>
                  <strong>{webinarDateTime ? new Date(webinarDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "TBD"}</strong>
                </div>
              </div>
              <div className="v2-detail-box">
                <Clock className="v2-detail-icon" />
                <div>
                  <label>Time</label>
                  <strong>{webinarDateTime ? new Date(webinarDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : "TBD"}</strong>
                </div>
              </div>
              <div className="v2-detail-box">
                <Laptop className="v2-detail-icon" />
                <div>
                  <label>Workshop</label>
                  {meetingLink ? (
                    <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link-text">Join Meeting 🔗</a>
                  ) : (
                    <strong>Online Session</strong>
                  )}
                </div>
              </div>
              <div className="v2-detail-box">
                <Globe className="v2-detail-icon" />
                <div>
                  <label>Language</label>
                  <strong>{language}</strong>
                </div>
              </div>
              <div className="v2-detail-box v2-price-box">
                <div className="v2-detail-icon price-icon">{price === "0" || price === 0 ? "★" : "₹"}</div>
                <div>
                  <label>Joining Fee</label>
                  <strong>{price === "0" || price === 0 ? "FREE" : `₹${price}/-`}</strong>
                </div>
              </div>
            </div>

            <div className="v2-bonus-box">
              <Gift size={20}/> <span>FREE Bonus: Course Materials Included</span>
            </div>

            <button className="v2-cta-button" onClick={() => navigate("/register")}>
              {price === "0" || price === 0 ? "Register For FREE" : `Register Now at ₹${price}/-`}
            </button>
            <p className="v2-timer-text">Registrations End on <span className="text-red">{registrationsEnd}</span></p>
          </div>
        </div>
      </div>

      {/* About Section (Description) */}
      <div className="v2-about-section">
        <div className="v2-about-container">
          <h2>About this Webinar</h2>
          <p className="v2-description-text">{description}</p>
        </div>
      </div>

      {/* Learning Outcomes Section */}
      <div className="v2-outcomes-section">
        <h2>In this workshop, you'll learn:</h2>
        <div className="v2-outcomes-list">
          {learningOutcomes.map((item, i) => (
            <div key={i} className="v2-outcome-item">
              <CheckCircle2 size={24} className="v2-check-icon"/>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Trust Section */}
      <div className="v2-corporate-section">
        <h2>Trained Professionals from Top Companies Including</h2>
        <div className="v2-logo-grid">
          {logos.map((logo, i) => (
            <div key={i} className="v2-logo-card">
              <img src={logo.url} alt={logo.name} />
            </div>
          ))}
        </div>
        <button className="v2-secondary-cta" onClick={() => navigate("/register")}>
          {price === "0" || price === 0 ? "Claim Your FREE Seat Now" : `Register Now for ₹${price}/- Only`}
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="v2-testimonials-section">
        <h2>WHAT STUDENTS ARE SAYING</h2>
        <div className="v2-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="v2-testimonial-card">
              <div className="v2-quote-icon">“</div>
              <p className="v2-testimonial-text">{t.text}</p>
              <div className="v2-testimonial-author">
                <img src={t.img} alt={t.name} />
                <div className="v2-author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Urgency Bar */}
      <div className={`v2-sticky-bar ${scrolled ? 'visible' : ''}`}>
        <div className="v2-sticky-content">
          <div className="v2-urgency-info">
            <span className="v2-urgency-main text-red">Almost Full</span>
            <span className="v2-urgency-sub">Selling Fast!</span>
            <span className="v2-urgency-timer">Ends on <strong>{registrationsEnd}</strong></span>
          </div>
          <button className="v2-sticky-cta" onClick={() => navigate("/register")}>
            {price === "0" || price === 0 ? "Register for FREE" : `Register for ₹${price}/-`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplatePage;