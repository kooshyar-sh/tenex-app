import React from "react";
import { useNavigate } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import LiquidEther from "../../components/liquidEther/LiquidEther";
import "./Landing.scss";

export default function Landing() {
  return (
    <div className="snap-container">

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
            {["10X your seed investment", "Have a share in building our community",
              "Grow with the future of finance", "Invest smart, evolve faster"].map((s, i) => (
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

      <section className="snap-section section-two"></section>
      <section className="snap-section section-three"></section>

    </div>
  );
}

