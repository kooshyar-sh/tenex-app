import { useState } from "react";

export default function CapUpgrade() {
  // -----------------------------
  // 🔮 Fake User Progress (قابل‌تغییر)
  // -----------------------------
  const userCurrentCap = 0.5; // مقدار فعلی کاربر (BNB)
  const steps = [
    {
      cap: 0.5,
      label: "Reach cap limit for 3 payment cycles",
      progress: 1,
      total: 3,
    },
    {
      cap: 0.75,
      label: "Reach cap limit for 5 payment cycles",
      progress: 0,
      total: 5,
    },
    {
      cap: 1.1,
      label: "Reach cap limit for 7 payment cycles",
      progress: 0,
      total: 7,
    },
    {
      cap: 2.1,
      label: "Reach cap limit for 10 payment cycles",
      progress: 0,
      total: 10,
    },
    {
      cap: 4,
      label: "Increase your cap by using XOX Tokens (Coming Soon)",
      progress: 0,
      total: 1,
    },
  ];

  return (
    <>
      <h5 className="text-purple mb-3">
        <i className="bi bi-lightning-charge-fill"></i>
        Upgrade Weekly Maximum Reward
      </h5>

      <p className="text-muted mb-4 fw-semibold">
        You can upgrade your weekly maximum reward by completing these tasks:
      </p>
      <div className="cap-upgrade-container">
        {/* ---------------- Sidebar Stepper ---------------- */}
        <aside className="cap-stepper">
          {/* خط عمودی پشت دایره‌ها */}
          <div className="stepper-line"></div>

          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`step-circle ${
                userCurrentCap >= s.cap ? "active" : ""
              }`}
            >
              {s.cap} BNB
            </div>
          ))}
        </aside>

        {/* ---------------- Content ---------------- */}
        <div className="cap-tasks-wrapper">
          {steps.map((task, idx) => (
            <div key={idx} className="main-card task-card">
              <div className="task-text">{task.label}</div>

              <div className="simple-progress-container mt-3">
                <div className="simple-progress-bar">
                  <div
                    className="simple-progress-fill"
                    style={{ width: `${(task.progress / task.total) * 100}%` }}
                  ></div>
                </div>

                <div className="progress-count">
                  {task.progress}/{task.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
