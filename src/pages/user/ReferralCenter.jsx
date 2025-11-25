import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import Budgeting from "../../assets/Budgeting.json"; 

export default function ReferralCenter() {
  const referralCode = "ABCD-9283";
  const referralLink = "https://yourapp.com/register?ref=ABCD-9283";

  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    setTimeout(() => setCopiedField(null), 1200);
  };

  return (
    <div className="main-card">
      <h5 className="text-purple mb-3">
        Invite friends & earn rewards. Share your referral code or link below.
      </h5>

      <Row className="justify-content-between">
        <Col xl={6}>
          {/* Referral Code */}
          <div className="ref-item">
            <label>Referral Code</label>
            <div className="ref-box">
              <span>{referralCode}</span>
              <button
                onClick={() => copyToClipboard(referralCode, "code")}
                className="copy-btn"
              >
                {copiedField === "code" ? (
                  <i className="bi bi-check2-circle text-purple"></i>
                ) : (
                  <i className="bi bi-clipboard"></i>
                )}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="ref-item">
            <label>Referral Link</label>
            <div className="ref-box">
              <span className="truncate-text">{referralLink}</span>
              <button
                onClick={() => copyToClipboard(referralLink, "link")}
                className="copy-btn"
              >
                {copiedField === "link" ? (
                  <i className="bi bi-check2-circle text-purple"></i>
                ) : (
                  <i className="bi bi-clipboard"></i>
                )}
              </button>
            </div>
          </div>
        </Col>
        <Col xl={4}>
          <Lottie animationData={Budgeting} loop={true} />
        </Col>
      </Row>
    </div>
  );
}
