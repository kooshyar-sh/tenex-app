import { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import businessDeal from "../assets/Chart.json"; // مسیر فایل لاتی
import OurVision from "../components/ourVision/OurVision";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // حالت‌ها
  const [walletAddress, setWalletAddress] = useState("");
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  // دیتای فیک
  const fakeWallet = "0x1234...ABCD";
  const memberCount = 62751; // بعداً از API میاد

  // هندل‌ها
  const handleConnectWallet = () => {
    setWalletAddress(fakeWallet);
  };

  const handleGetStarted = () => {
    setRegistered(true);
    navigate("/mint");
  };

  return (
    <Container className="py-5 text-center">
      {/* Header */}
      <h1 className="fw-bold text-purple mb-3">
        <i className="bi bi-stars me-2 text-blue"></i> Welcome to TENEX
      </h1>

      {/* دکمه یا آدرس ولت */}
      {!walletAddress ? (
        <Button onClick={handleConnectWallet} className="shining-button mb-3">
          <i className="bi bi-wallet2 me-2"></i> Connect Wallet
        </Button>
      ) : (
        <p className="fw-semibold fs-5 text-dark mb-3">
          Wallet address:{" "}
          <span className="fw-bold text-blue">{walletAddress}</span>
        </p>
      )}

      {/* شرط ثبت نام */}
      {!registered && walletAddress && (
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-3">
          <span className="fs-5 fw-semibold text-dark">
            Be the <span className="fw-bold text-blue">{memberCount}th</span>{" "}
            TENEX member
          </span>
          <Button onClick={handleGetStarted} className="pulse-button">
            <i className="bi bi-rocket-takeoff-fill me-2"></i>
            Get Started
          </Button>
        </div>
      )}

      {/* توضیح زیر عنوان */}
      <p className="text-muted mt-4">
        The official token launch platform of TENEX. Earn and mint tokens by
        growing your binary network.
      </p>

      {/* بخش توضیحات و انیمیشن */}
      <Row className="align-items-center mt-5">
        <Col md={7} className="mb-4 mb-md-0 text-start">
          <ul className="list-unstyled fs-5 fw-semibold">
            <li className="mb-3">• Join the deflationary mint progress</li>
            <li className="mb-3">• Mint 10X tokens</li>
            <li className="mb-3">• Build your own team</li>
          </ul>
        </Col>
        <Col md={5}>
          <Lottie animationData={businessDeal} loop={true} />
        </Col>
      </Row>

      <OurVision />
    </Container>
  );
}
