import React from "react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "../../components/liquidEther/LiquidEther";
import "./Landing.scss";

export default function Landing() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/home");
  };

  const slogans = [
    "10X your seed investment",
    "Have a share in building our community",
    "Grow with the future of finance",
    "Invest smart, evolve faster",
  ];

  return (
    <div className="landing-container">
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        autoDemo={true}
      />

      <div className="landing-content">
        <h1 className="fade-in-title">Welcome to Tenex</h1>

        <div className="slogan-list">
          {slogans.map((s, i) => (
            <p className={`slogan-item delay-${i}`} key={i}>
              {s}
            </p>
          ))}
        </div>

        <button
          className="shining-button btn-lg mt-3 fade-in-button"
          onClick={handleLaunch}
        >
          Launch App
        </button>
      </div>
    </div>
  );
}