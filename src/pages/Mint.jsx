import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

export default function Mint() {
  const [step] = useState(1); // فقط استپ 1 فعال است

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
      <h3 className="fw-bold text-purple mb-4 text-center">Select a Tier</h3>

      <Row className="justify-content-center">
        {tiers.map((t, index) => (
          <Col md={4} key={index} className="mb-4">
            <div className="main-card animated-border text-center h-100 p-4">

              <h4 className="fw-bold text-purple mb-3">{t.name}</h4>

              <p className="text-muted mb-1">
                <strong>Pay:</strong> {t.price}
              </p>

              <p className="text-muted mb-1">
                <strong>Mint:</strong> {t.mint}
              </p>

              <p className="text-muted mb-1">
                <strong>Earn:</strong> {t.direct} direct sales
              </p>

              <p className="text-muted mb-0">
                <strong>Earn:</strong> {t.balance} weekly team balance
              </p>

              <Button className="shining-button mt-3">
                Select {t.name}
              </Button>

            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
