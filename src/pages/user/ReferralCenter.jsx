import { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import { QRCodeCanvas } from "qrcode.react";
import Budgeting from "../../assets/Budgeting.json";
import { useToast } from "../../components/Toast/ToastContext";

export default function ReferralCenter() {
  const referralCode = "ABCD-9283";
  const referralLink = "https://yourapp.com/register?ref=ABCD-9283";

  const [copiedField, setCopiedField] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const toast = useToast();

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    toast.success(
      field === "code" ? "Referral code copied!" : "Referral link copied!",
      { duration: 2500 }
    );

    setTimeout(() => setCopiedField(null), 1200);
  };

  const shareOptions = [
    {
      label: "Telegram",
      icon: "bi bi-telegram",
      color: "#229ED9",
      url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`,
    },
    {
      label: "WhatsApp",
      icon: "bi bi-whatsapp",
      color: "#25D366",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        referralLink
      )}`,
    },
    {
      label: "Facebook",
      icon: "bi bi-facebook",
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
    },
    {
      label: "Twitter",
      icon: "bi bi-twitter-x",
      color: "#000",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        referralLink
      )}`,
    },
    {
      label: "Instagram",
      icon: "bi bi-instagram",
      color: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
      url: `https://www.instagram.com/`,
    },
  ];

  return (
    <div className="main-card">
      <h5 className="text-purple mb-3">
        Invite friends & earn rewards. Share your referral code or link below.
      </h5>

      <p className="text-muted mb-4 fw-semibold" style={{ lineHeight: "1.6" }}>
        Each account can directly invite two members using its own referral
        code. To grow your team further, visit the{" "}
        <span className="fw-semibold text-blue">Open Referral Slots</span> section, where you can access
        referral codes of your downline members. Share those codes with new
        users so they can join your team through available slots.
      </p>

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

            {/* QR Modal Button */}
            <Button
              className="pulse-button mt-3 w-100 w-lg-50 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setShowQR(true)}
            >
              <i className="bi bi-qr-code"></i> Show QR Code
            </Button>
          </div>
        </Col>

        <Col xl={4}>
          <Lottie animationData={Budgeting} loop={true} />
        </Col>
      </Row>

      {/* QR Code Modal */}
      <Modal centered show={showQR} onHide={() => setShowQR(false)}>
        <Modal.Body className="text-center p-4">
          <h5 className="fw-bold text-purple mb-3">Your Referral QR Code</h5>

          <div
            className="qr-wrapper p-3 rounded-4 mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(100,72,160,0.4), rgba(228,99,235,0.3))",
              backdropFilter: "blur(8px)",
              width: "240px",
            }}
          >
            <QRCodeCanvas
              value={referralLink}
              size={200}
              bgColor="transparent"
              fgColor="#ffffff"
              level="H"
              includeMargin={true}
            />
          </div>

          <h6 className="text-muted mb-3">
            Share your link via social platforms
          </h6>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            {shareOptions.map((s) => (
              <button
                key={s.label}
                onClick={() => window.open(s.url, "_blank")}
                className="share-icon" // ← کلاس مشترک
                style={{
                  background: s.color,
                }}
              >
                <i className={s.icon}></i>
              </button>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQR(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
