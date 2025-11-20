import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "../../components/liquidEther/LiquidEther";
import "./Landing.scss";

export default function Landing() {
  const navigate = useNavigate();
  const sectionTwoRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const totalCards = 4;
  const isScrollingRef = useRef(false);

  const cards = [
    {
      title: "Sign Up & Get Referral Code",
      desc: "Register to receive your unique referral code and start building your community path.",
      icon: "bi-person-plus",
    },
    {
      title: "Buy Package & Mint Token",
      desc: "Select a package, mint your token, and become part of our investment network.",
      icon: "bi-box-seam",
    },
    {
      title: "Invite Others & Build Your Network",
      desc: "Invite at least two more people to complete your set and grow your share in the community.",
      icon: "bi-people",
    },
    {
      title: "Token Share & Earn Commission",
      desc: "As your network grows, claim your token share and receive commissions for referrals.",
      icon: "bi-cash-stack",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      setActiveStep((prev) => {
        let next = prev + (e.deltaY > 0 ? 1 : -1);
        if (next < 0) next = 0;
        if (next > totalCards + 1) next = totalCards + 1;
        return next;
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (activeStep === 0) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else if (activeStep >= 1 && activeStep <= totalCards) {
      container.scrollTo({
        top: sectionTwoRef.current.offsetTop,
        behavior: "smooth",
      });
    } else if (activeStep === totalCards + 1) {
      container.scrollTo({
        top: container.scrollHeight - container.clientHeight,
        behavior: "smooth",
      });
    }
  }, [activeStep]);

  return (
    <div className="snap-container" ref={containerRef}>
      <section className="snap-section position-relative">
        <div className="canvas-wrapper">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            autoDemo
          />
        </div>
        <div className="landing-content">
          <h1 className="fade-in-title">Welcome to Tenex</h1>
          <div className="slogan-list">
            {[
              "10X your seed investment",
              "Have a share in building our community",
              "Grow with the future of finance",
              "Invest smart, evolve faster",
            ].map((s, i) => (
              <p className={`slogan-item delay-${i}`} key={i}>
                {s}
              </p>
            ))}
          </div>
          <button
            className="shining-button btn-lg mt-3 fade-in-button"
            onClick={() => navigate("/home")}
          >
            Launch App
          </button>
        </div>
      </section>

      <section className="snap-section section-two" ref={sectionTwoRef}>
        <div className="section-two-wrapper container">
          <div className="card-row my-auto">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`info-card ${
                  activeStep - 1 === idx ? "active" : ""
                }`}
                style={{ zIndex: activeStep - 1 === idx ? 10 : 1 }}
              >
                <div className="icon-wrapper">
                  <i
                    className={`bi ${card.icon} card-icon ${
                      activeStep - 1 === idx ? "icon-active" : ""
                    }`}
                  ></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section section-three"></section>
    </div>
  );
}
