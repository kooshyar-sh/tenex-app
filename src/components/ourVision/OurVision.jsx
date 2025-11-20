import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TokenSupplyProjection from "../tokenSupplyProjection/TokenSupplyProjection";

export default function OurVision() {
  const totalMembers = 330000;
  const currentMembers = 62750;
  const [progress, setProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const milestoneValues = [
    500, 2500, 7000, 13000, 21000, 33000, 63000, 163000, 330000,
  ];

  const milestones = milestoneValues.map((value, index) => {
    const labels = [
      "Bronze",
      "Silver",
      "Gold",
      "Platinum",
      "Diamond",
      "Elite",
      "Master",
      "Legend",
      "Ultimate",
    ];
    const multipliers = [1, 0.95, 0.9, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35];
    const start = index === 0 ? 1 : milestoneValues[index - 1];
    const end = value;
    return {
      value,
      label: labels[index],
      baseMultiplier: multipliers[index],
      start,
      end,
    };
  });

  const supplyData = {
    min: "24,278,543",
    mid: "80,119,191",
    max: "293,770,369",
  };

  const baseRewards = {
    bronze: 100,
    silver: 330,
    gold: 1210,
  };

  useEffect(() => {
    const percentage = getMilestonePosition(currentMembers);
    setProgress(percentage);
  }, []);

  const handleMilestoneClick = (index) => {
    setActiveMilestone(index);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const getAdjustedRewards = (multiplier) => ({
    bronze: Math.round(baseRewards.bronze * multiplier),
    silver: Math.round(baseRewards.silver * multiplier),
    gold: Math.round(baseRewards.gold * multiplier),
  });

  // ===== تابع محاسبه موقعیت غیرخطی برای نمایش بهتر =====
  const getMilestonePosition = (value) => {
    const minDisplay = milestoneValues[0]; // 500
    const maxDisplay = milestoneValues[milestoneValues.length - 1]; // 330000

    // لگاریتمی کردن مقادیر + exponent برای کشش نقاط ابتدایی
    const exponent = 0.6; // عدد بین 0 و 1 => کشش ابتدایی
    const adjustedValue = Math.pow(value, exponent);

    const adjustedMin = Math.pow(minDisplay, exponent);
    const adjustedMax = Math.pow(maxDisplay, exponent);

    const normalized =
      (adjustedValue - adjustedMin) / (adjustedMax - adjustedMin);

    const minOffset = 0.05; // فاصله اولین نقطه از ابتدا
    const leftPercent = minOffset * 100 + normalized * (100 - minOffset * 100);

    return leftPercent;
  };

  return (
    <section className="text-center py-5 mt-5">
      <h1 className="fw-bold text-purple mb-3">Our Vision</h1>

      <p className="text-muted fw-semibold mx-auto mb-4" style={{ maxWidth: "700px" }}>
        Our vision is to create a{" "}
        <span className="fw-semibold text-blue">community-oriented</span> &{" "}
        <span className="fw-semibold text-blue">community-owned</span> DeFi
        project that empowers users through innovation, fairness, and
        transparent tokenomics. Together we’re building the next generation of
        decentralized finance with real growth and shared success.
      </p>

      <h5 className="fw-bold text-dark mt-5 mb-3">Members Progress Bar</h5>

      <div
        className="milestone-progress-container mx-auto"
        style={{ position: "relative" }}
      >
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-semibold text-muted">0</span>
          <span className="fw-semibold text-muted">330,000</span>
        </div>

        <div className="milestone-progress-bar position-relative">
          <div
            className="milestone-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>

          {milestones.map((m, index) => {
            const leftPercent = getMilestonePosition(m.value);
            return (
              <div
                key={index}
                className="milestone"
                style={{ left: `${leftPercent}%` }}
                onClick={() => handleMilestoneClick(index)}
                title={`${m.label} (${m.start} - ${m.end})`}
              ></div>
            );
          })}
        </div>

        <div className="mt-2 small text-muted">
          Current members:{" "}
          <span className="fw-bold text-blue">
            {currentMembers.toLocaleString()}
          </span>
        </div>
      </div>

      <TokenSupplyProjection />

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="fade-scale-modal"
        contentClassName="custom-modal-content"
      >
        {activeMilestone !== null && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-purple">
                <span className="fs-6 text-muted fw-normal">
                  From{" "}
                  <span className="fw-semibold text-blue">
                    {milestones[activeMilestone].start.toLocaleString()}
                  </span>{" "}
                  to{" "}
                  <span className="fw-semibold text-blue">
                    {milestones[activeMilestone].end.toLocaleString()}
                  </span>{" "}
                  Members
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="row">
                <div className="col-md-6 border-end">
                  <h6 className="fw-semibold mb-3">Rewards</h6>
                  {(() => {
                    const multiplier =
                      milestones[activeMilestone].baseMultiplier;
                    const rewards = getAdjustedRewards(multiplier);
                    return (
                      <>
                        <p className="mb-1">
                          Bronze Mint:{" "}
                          <span className="fw-bold text-blue">
                            {rewards.bronze} TENEX
                          </span>{" "}
                          <span className="custom-badge custom-badge-light-warning">
                            ×{multiplier.toFixed(2)}
                          </span>
                        </p>
                        <p className="mb-1">
                          Silver Mint:{" "}
                          <span className="fw-bold text-blue">
                            {rewards.silver} TENEX
                          </span>{" "}
                          <span className="custom-badge custom-badge-light-warning">
                            ×{multiplier.toFixed(2)}
                          </span>
                        </p>
                        <p className="mb-0">
                          Gold Mint:{" "}
                          <span className="fw-bold text-blue">
                            {rewards.gold} TENEX
                          </span>{" "}
                          <span className="custom-badge custom-badge-light-warning">
                            ×{multiplier.toFixed(2)}
                          </span>
                        </p>
                      </>
                    );
                  })()}
                </div>

                <div className="col-md-6">
                  <h6 className="fw-semibold mb-3">Supply Data</h6>
                  <p className="mb-1">
                    Min Supply:{" "}
                    <span className="fw-semibold">{supplyData.min}</span>
                  </p>
                  <p className="mb-1">
                    Mid Supply:{" "}
                    <span className="fw-semibold">{supplyData.mid}</span>
                  </p>
                  <p className="mb-0">
                    Max Supply:{" "}
                    <span className="fw-semibold">{supplyData.max}</span>
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
}
