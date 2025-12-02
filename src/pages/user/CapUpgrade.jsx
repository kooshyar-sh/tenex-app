export default function CapUpgrade() {
  const userCurrentCap = 0.5;

  const steps = [
    { cap: 0.5, label: "Reach cap limit for 3 payment cycles", progress: 1, total: 3 },
    { cap: 0.75, label: "Reach cap limit for 5 payment cycles", progress: 0, total: 5 },
    { cap: 1.1, label: "Reach cap limit for 7 payment cycles", progress: 0, total: 7 },
    { cap: 2.1, label: "Reach cap limit for 10 payment cycles", progress: 0, total: 10 },
    { cap: 4, label: "Increase your cap by using 1OX Tokens (Coming Soon)", progress: 0, total: 1 },
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

      {/* container اصلی */}
      <div className="cap-upgrade-container">

        {/* عنوان */}
        <div className="stepper-header">Your Current Cap (BNB)</div>

        {/* خط عمودی بین همه‌ی استپ‌ها */}
        <div className="global-step-line"></div>

        {/* ردیف‌های استپ + کارت */}
        {steps.map((task, idx) => (
          <div key={idx} className="step-row">

            {/* استپ */}
            <div className={`step-circle ${userCurrentCap >= task.cap ? "active" : ""}`}>
              {task.cap}
            </div>

            {/* کارت */}
            <div className="main-card task-card">
              <div className="task-text">{task.label}</div>

              <div className="simple-progress-container mt-3">
                <div className="simple-progress-bar">
                  <div
                    className="simple-progress-fill"
                    style={{ width: `${(task.progress / task.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="progress-count">
                {task.progress}/{task.total}
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}
