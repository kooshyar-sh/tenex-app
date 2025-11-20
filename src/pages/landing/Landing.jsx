import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "../../components/liquidEther/LiquidEther";
import "./Landing.scss";

export default function Landing() {
  const navigate = useNavigate();
  const sectionTwoRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0); // 0: section1, 1-3: کارت‌ها, 4: section3
  const totalCards = 3;
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      e.preventDefault(); // جلوگیری از scroll پیشفرض

      // اگر هنوز step قبل کامل نشده است، هیچ کاری نکن
      if (isScrollingRef.current) return;

      isScrollingRef.current = true; // شروع scroll کنترل‌شده

      setActiveStep((prev) => {
        let next = prev + (e.deltaY > 0 ? 1 : -1);
        if (next < 0) next = 0;
        if (next > totalCards + 1) next = totalCards + 1;
        return next;
      });

      // بعد از 600ms اجازه scroll بعدی داده می‌شود
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
      container.scrollTo({ top: sectionTwoRef.current.offsetTop, behavior: "smooth" });
    } else if (activeStep === totalCards + 1) {
      container.scrollTo({ top: container.scrollHeight - container.clientHeight, behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <div className="snap-container" ref={containerRef}>
      {/* SECTION ONE */}
      <section className="snap-section">
        <div className="canvas-wrapper">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            autoDemo={true}
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
              <p className={`slogan-item delay-${i}`} key={i}>{s}</p>
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

      {/* SECTION TWO */}
      <section className="snap-section section-two" ref={sectionTwoRef}>
        <div className="section-two-wrapper">
          <div className="card-row">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`info-card ${activeStep - 1 === idx ? "active" : ""}`}
              >
                <h3>Card {idx + 1}</h3>
                <p>Some description for card {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION THREE */}
      <section className="snap-section section-three"></section>
    </div>
  );
}
