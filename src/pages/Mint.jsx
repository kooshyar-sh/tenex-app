import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import TooltipCard from "../components/TooltipCard/TooltipCard";
import Loader from "../components/loader/Loader";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import BNBLogo from "../assets/bnb.png";
import EthLogo from "../assets/eth.png";

export default function Mint() {
  // step control
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(null);
  const [referral, setReferral] = useState("");
  const [showModal, setShowModal] = useState(false);

  // modal / transaction states
  const [agree, setAgree] = useState(false);
  const [txInProgress, setTxInProgress] = useState(false);
  const [txResult, setTxResult] = useState(null); // 'success' | 'failure' | null

  const navigate = useNavigate();

  const userNumber = 62751; // dynamic user number (example)

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

  const handleSubscribe = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    // reset modal states
    setShowModal(false);
    setAgree(false);
    setTxInProgress(false);
    setTxResult(null);
  };

  const handleApprove = () => {
    // simulate wallet approval & transaction
    setTxInProgress(true);
    setTxResult(null);

    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% chance of success (simulation)
      setTxInProgress(false);
      setTxResult(success ? "success" : "failure");

      if (success) {
        // after showing success, redirect to dashboard
        setTimeout(() => {
          setShowModal(false);
          navigate("/user"); // adjust route if needed
        }, 1400);
      }
    }, 3000);
  };

  // find currently selected tier object for dynamic texts
  const currentTier = tiers.find((t) => t.name === selectedTier) || null;

  return (
    <Container className="py-5">
      {/* ========== STEPPER ========== */}
      <div className="d-flex justify-content-center align-items-center mb-5 position-relative">
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
        />
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

      {/* ========== STEP 1 — Tier Selection ========== */}
      {step === 1 && (
        <>
          <h3 className="fw-bold text-purple mb-4 text-center">
            Select a Tier
          </h3>

          <Row className="justify-content-center">
            {tiers.map((t, index) => {
              // dynamic calculations (example)
              const teamBalanceAmount = 1; // example: 1 BNB
              const balancePercentage = parseFloat(t.balance) || 0;
              const balanceEarned =
                (teamBalanceAmount * balancePercentage) / 100;

              const tierBadge =
                index === 0
                  ? {
                      text: "Most Used",
                      className: "custom-badge-light-warning",
                    }
                  : index === 1
                  ? {
                      text: "Medium Profit",
                      className: "custom-badge-light-info",
                    }
                  : {
                      text: "Best Value",
                      className: "custom-badge-light-success",
                    };

              return (
                <Col md={4} key={index} className="mb-4">
                  <div className="main-card animated-border text-center h-100 p-4">
                    <div
                      className={`tier-badge custom-badge ${tierBadge.className}`}
                    >
                      {tierBadge.text}
                    </div>

                    <h4 className="fw-bold text-purple mb-3">{t.name}</h4>
                    <p className="text-muted mb-1">
                      <strong>Pay:</strong> {t.price}
                      <img src={BNBLogo} alt="BNB" className="token-logo token-logo-small" />
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Mint:</strong> {t.mint}
                      <img src={EthLogo} alt="TENEX" className="token-logo token-logo-small" />
                    </p>

                    <div className="text-muted mb-1">
                      <strong>Earn:</strong> {t.direct} direct sales
                      <TooltipCard
                        title="Direct Sales"
                        description="Direct sales represent the percentage you earn from users who joined using your referral code. This commission is generated instantly from their purchases and does not require any team balance or structure."
                        badge="Instant Commission"
                      >
                        <i
                          className="bi bi-question-circle-fill text-muted small ms-2"
                          style={{ cursor: "pointer" }}
                        />
                      </TooltipCard>
                    </div>

                    <div className="text-muted mb-0">
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
                        />
                      </TooltipCard>
                    </div>

                    <Button
                      className="shining-button mt-3"
                      onClick={() => {
                        setSelectedTier(t.name);
                        setStep(2);
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

      {/* ========== STEP 2 — Referral Input ========== */}
      {step === 2 && (
        <div className="main-card col-md-6 mx-auto animated-border position-relative p-4">
          {/* top-left user number */}
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

          <div className="d-flex justify-content-between mt-3">
            <Button className="pulse-button-outline" onClick={() => setStep(1)}>
              <i className="bi bi-chevron-left me-2" /> Back
            </Button>
            <Button className="pulse-button" onClick={() => setStep(3)}>
              Next <i className="bi bi-chevron-right ms-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ========== STEP 3 — Subscription ========== */}
      {step === 3 && selectedTier && (
        <div className="main-card col-md-6 mx-auto animated-border step3-card position-relative p-4">
          <div className="user-number-label rounded">
            #{userNumber.toLocaleString()}
          </div>

          <h5 className="fw-bold text-purple mb-3 mt-5">
            Your selected tier: {selectedTier}{" "}
            {selectedTier === "Bronze" && (
              <>
                0.1 BNB
                <img src={BNBLogo} alt="BNB" className="token-logo" />
              </>
            )}
            {selectedTier === "Silver" && (
              <>
                0.3 BNB
                <img src={BNBLogo} alt="BNB" className="token-logo" />
              </>
            )}
            {selectedTier === "Gold" && (
              <>
                1 BNB
                <img src={BNBLogo} alt="BNB" className="token-logo" />
              </>
            )}
          </h5>

          <Button className="pulse-button mt-3" onClick={handleSubscribe}>
            <i className="bi bi-bag-check me-2" /> Subscribe
          </Button>

          <div className="mt-4 text-start">
            <h5 className="fw-bold text-purple mb-3">
              Tokens to be minted:{" "}
              {tiers.find((t) => t.name === selectedTier)?.mint ?? "—"}
              <img src={EthLogo} alt="TENEX" className="token-logo" />
            </h5>

            <p>
              You will be the member number:{" "}
              <strong className="text-blue">
                {userNumber.toLocaleString()}
              </strong>
            </p>
            <p>10X tokens into circulation (in your wallet)</p>
          </div>

          <Button className="pulse-button-outline" onClick={() => setStep(2)}>
            <i className="bi bi-chevron-left me-2" /> Back
          </Button>
        </div>
      )}

      {/* ========== Modal: confirmation, wallet approval & results ========== */}
      <Modal
        show={showModal}
        centered
        onHide={handleModalClose}
        backdrop="static"
        keyboard={!txInProgress} // disable ESC while transaction is in progress
      >
        {/* If transaction is in progress, show loader */}
        {txInProgress ? (
          <Modal.Body className="text-center">
            <Loader />
            <p className="mt-3 fw-bold">Waiting for wallet approval...</p>
            <p className="text-muted small">
              Please confirm the signature in your wallet. This behavior is
              currently simulated.
            </p>
          </Modal.Body>
        ) : txResult === "success" ? (
          <Modal.Body className="text-center p-4">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                background: "#dff0d8",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <i
                className="bi bi-check-lg text-success"
                style={{ fontSize: 28 }}
              />
            </div>
            <h5 className="fw-bold">Transaction successful!</h5>
            <p className="text-muted">
              Your transaction was recorded successfully. Redirecting to the
              dashboard...
            </p>
          </Modal.Body>
        ) : txResult === "failure" ? (
          <Modal.Body className="text-center p-4">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                background: "#f8d7da",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <i className="bi bi-x-lg text-danger" style={{ fontSize: 24 }} />
            </div>
            <h5 className="fw-bold">Transaction failed</h5>
            <p className="text-muted">
              The transaction did not complete. Please check your wallet and try
              again.
            </p>
            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button
                className="pulse-button-outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        ) : (
          // initial modal: show explanatory text, checkbox and Approve button
          <Modal.Body className="p-4">
            <h5 className="fw-bold text-purple mb-3">Confirm transaction</h5>

            <p>
              By signing the transaction, you will pay{" "}
              <strong className="text-blue">
                {currentTier ? currentTier.price : "—"}
              </strong>{" "}
              and mint{" "}
              <strong className="text-blue">
                {currentTier ? currentTier.mint : "—"}
              </strong>
              . This mint represents{" "}
              <strong className="text-blue">10X Token</strong> that will be
              deposited to your wallet.
            </p>

            <p className="text-muted small">
              By clicking Approve and signing the transaction, you acknowledge
              that you have read and accept the project's terms and agree that
              you are responsible for any decisions or risks associated with
              this transaction and the custody of the tokens. Please verify your
              wallet and balance before continuing.
            </p>

            {/* Custom checkbox: assumed props: checked, onChange, label */}
            <div className="d-flex align-items-center my-3">
              <CustomCheckbox
                checked={agree}
                onChange={() => setAgree((p) => !p)}
                label="I accept the project's terms and take responsibility for this transaction"
              />
            </div>

            <div className="d-flex justify-content-between mt-3 gap-2">
              <Button
                className="pulse-button-outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                className="pulse-button"
                onClick={handleApprove}
                disabled={!agree}
                title={
                  !agree
                    ? "You must agree to the terms before approving"
                    : "Approve"
                }
              >
                Approve
              </Button>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
}
