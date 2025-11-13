import { useEffect, useState } from "react";

export default function OurVision() {
  // درصد پیشرفت اعضا (فعلاً فیک)
  const [progress, setProgress] = useState(0);
  const totalMembers = 330000;
  const currentMembers = 62750; // بعداً از API یا Smart Contract میاد

  useEffect(() => {
    // شبیه‌سازی لود شدن مقدار پروگرس
    const percentage = (currentMembers / totalMembers) * 100;
    setProgress(percentage);
  }, []);

  return (
    <section className="text-center py-5 mt-5">
      <h1 className="fw-bold text-purple mb-3">Our Vision</h1>

      <p className="text-muted mx-auto mb-4" style={{ maxWidth: "700px" }}>
        Our vision is to create a <span className="fw-semibold text-blue">community-oriented</span> 
        & <span className="fw-semibold text-blue">community-owned</span> DeFi project that empowers users 
        through innovation, fairness, and transparent tokenomics. Together we’re building the next 
        generation of decentralized finance with real growth and shared success.
      </p>

      <h5 className="fw-bold text-dark mt-5 mb-3">Members Progress Bar</h5>

      {/* Progress Container */}
      <div className="custom-progress-container mx-auto" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-semibold text-muted">0</span>
          <span className="fw-semibold text-muted">330,000</span>
        </div>

        <div className="custom-progress-bar">
          <div
            className="custom-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 small text-muted">
          Current members: <span className="fw-bold text-blue">{currentMembers.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}
