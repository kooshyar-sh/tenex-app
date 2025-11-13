import React from "react";
import LiquidEther from "../components/liquidEther/LiquidEther";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/home");
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        autoDemo={true}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1>Welcome to Tenex</h1>
        <button
          className="shining-button btn-lg mt-3"
          onClick={handleLaunch}
        >
          Launch App
        </button>
      </div>
    </div>
  );
}
