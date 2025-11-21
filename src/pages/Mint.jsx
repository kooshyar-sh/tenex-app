import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import Countdown from "react-countdown";
import TooltipCard from "../components/TooltipCard/TooltipCard";

export default function Mint() {
  const [step, setStep] = useState(1); // کنترل استپ‌ها
  const [selectedTier, setSelectedTier] = useState(null);
  const [referral, setReferral] = useState("");

  const userNumber = 62751; // شماره کاربر داینامیک

  const tiers = [
    {
      name: "Bronze",
      price: "0.1 BNB",
      mint: "100 TENEX",
      direct: "4%",
      balance: "8%",
    },
    {
      name: "Silver",
      price: "0.3 BNB",
      mint: "330 TENEX",
      direct: "6%",
      balance: "10%",
    },
    {
      name: "Gold",
      price: "1 BNB",
      mint: "1210 TENEX",
      direct: "8%",
      balance: "13%",
    },
  ];

  return (
    <Container className="py-5">
      {/* ====================== STEPPER ====================== */}
      <div className="d-flex justify-content-center align-items-center mb-5 position-relative">
        {/* خط پس‌زمینه */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "3px",
            background: "#d0c4e9",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        ></div>

        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="d-flex justify-content-center align-items-center rounded-circle fw-bold mx-4"
            style={{
              width: "45px",
              height: "45px",
              zIndex: 2,
              color: step === s ? "#fff" : "#6f42c1",
              background: step === s ? "#6f42c1" : "#e9e2f8",
              transition: "0.3s",
              border: "2px solid #6f42c1",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* ====================== STEP 1 — Tier Selection ====================== */}
      {step === 1 && (
        <>
          <h3 className="fw-bold text-purple mb-4 text-center">
            Select a Tier
          </h3>

          <Row className="justify-content-center">
            {tiers.map((t, index) => {
              // ===== محاسبات داینامیک =====
              const teamBalanceAmount = 1; // مثال: 1 BNB تعادل تیم
              const balancePercentage = parseFloat(t.balance) || 0; // درصد هر Tier
              const balanceEarned =
                (teamBalanceAmount * balancePercentage) / 100; // پورسانت دریافتی

              // ===== تعیین Badge هر Tier =====
              const tierBadge =
                index === 0
                  ? {
                      text: "Most Used",
                      className: "custom-badge-light-warning",
                    } // Bronze
                  : index === 1
                  ? {
                      text: "Medium Profit",
                      className: "custom-badge-light-info",
                    } // Silver
                  : {
                      text: "Best Value",
                      className: "custom-badge-light-success",
                    }; // Gold

              return (
                <Col md={4} key={index} className="mb-4">
                  <div className="main-card animated-border text-center h-100 p-4">
                    {/* Tier Badge */}
                    <div
                      className={`tier-badge custom-badge ${tierBadge.className}`}
                    >
                      {tierBadge.text}
                    </div>

                    {/* Tier Info */}
                    <h4 className="fw-bold text-purple mb-3">{t.name}</h4>
                    <p className="text-muted mb-1">
                      <strong>Pay:</strong> {t.price}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Mint:</strong> {t.mint}
                    </p>

                    {/* Direct Sales */}
                    <p className="text-muted mb-1">
                      <strong>Earn:</strong> {t.direct} direct sales
                      <TooltipCard
                        title="Direct Sales"
                        description="Direct sales represent the percentage you earn from users who joined using your referral code. This commission is generated instantly from their purchases and does not require any team balance or structure."
                        badge="Instant Commission"
                      >
                        <i
                          className="bi bi-question-circle-fill text-muted small ms-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </TooltipCard>
                    </p>

                    {/* Weekly Team Balance */}
                    <p className="text-muted mb-0">
                      <strong>Earn:</strong> {t.balance} weekly team balance
                      <TooltipCard
                        title="Weekly Team Balance"
                        description={`This percentage represents the earnings you get from one side of your team each week. For example, if your team's balance on that side reaches ${teamBalanceAmount} BNB, and your balance percentage is ${balancePercentage}%, you earn ${balanceEarned} BNB. This is calculated from a single side only, not both sides of the team.`}
                        badge="Weekly Payout"
                        mobileHorizontalPosition="left"
                      >
                        <i
                          className="bi bi-question-circle-fill text-muted small ms-2"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </TooltipCard>
                    </p>

                    {/* Select Button */}
                    <Button
                      className="shining-button mt-3"
                      onClick={() => {
                        setSelectedTier(t.name);
                        setStep(2); // رفتن به Step2 بعد انتخاب
                      }}
                    >
                      Select {t.name} (no: {userNumber.toLocaleString()})
                    </Button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      )}

      {/* ====================== STEP 2 — Referral Input ====================== */}
      {step === 2 && (
        <div className="main-card col-md-6 mx-auto animated-border position-relative p-4">
          {/* Top-left user number */}
          <div className="user-number-label rounded">
            #{userNumber.toLocaleString()}
          </div>

          <h5 className="fw-bold text-purple mb-3 mt-5">
            Who introduced you? (Referral Code)
          </h5>
          <input
            type="text"
            className="number-input w-100 mb-3"
            placeholder="Enter referral code"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          />

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <Button className="pulse-button-outline" onClick={() => setStep(1)}>
              <i className="bi bi-chevron-left me-2"></i> Back
            </Button>
            <Button className="pulse-button" onClick={() => setStep(3)}>
              Next <i className="bi bi-chevron-right ms-2"></i>
            </Button>
          </div>
        </div>
      )}

      {/* ====================== STEP 3 — Subscription ====================== */}
      {step === 3 && selectedTier && (
        <div className="main-card col-md-6 mx-auto animated-border step3-card position-relative p-4">
          {/* Top-left user number */}
          <div className="user-number-label rounded">
            #{userNumber.toLocaleString()}
          </div>

          <h5 className="fw-bold text-purple mb-3 mt-5">
            Your selected tier: {selectedTier}{" "}
            {selectedTier === "Bronze" && "(0.1 BNB)"}
            {selectedTier === "Silver" && "(0.3 BNB)"}
            {selectedTier === "Gold" && "(1 BNB)"}
          </h5>

          {/* Subscribe Button */}
          <Button className="pulse-button mt-3">
            <i className="bi bi-bag-check me-2"></i> Subscribe
          </Button>

          {/* Info Text */}
          <div className="mt-4 text-start">
            <p>
              You will be the member number:{" "}
              <strong>{userNumber.toLocaleString()}</strong>
            </p>
            <p>
              Your first earning will be claimable in the next payment cycle:{" "}
              <Countdown date={Date.now() + 5 * 24 * 60 * 60 * 1000} />{" "}
              {/* مثال 5 روز */}
            </p>
            <p>10X tokens into circulation (in your wallet)</p>
          </div>

          {/* Back button */}
          <div className="d-flex justify-content-start mt-3">
            <Button className="pulse-button-outline" onClick={() => setStep(2)}>
              <i className="bi bi-chevron-left me-2"></i> Back
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
