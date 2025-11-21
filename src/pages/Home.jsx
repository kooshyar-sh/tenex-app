import { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import businessDeal from "../assets/Chart.json"; // مسیر فایل لاتی
import OurVision from "../components/ourVision/OurVision";
import StatsPanel from "../components/statsPanel/statsPanel";
import { useNavigate } from "react-router-dom";
import TextType from "../components/TextType/TextType"; // مسیر صحیح TextType

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
        <i className="bi bi-stars me-2 text-blue"></i>
        <TextType
          text={[
            "Welcome to TENEX",
            "Grow Your Investment",
            "Join the Future!",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
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
      <p className="text-muted fw-semibold mt-4">
        The official token launch platform of TENEX. Earn and mint tokens by
        growing your binary network.
      </p>

      {/* بخش توضیحات و انیمیشن */}
      <Row className="align-items-center mt-5">
        <Col md={7} className="mb-4 mb-md-0 text-start">
          <div className="text-muted fw-semibold">
            <h2 className="text-purple fw-bold"> TENEX</h2>

            <h5 className="mb-3">Revolutionizing the Token Ecosystem</h5>

            <p>
              TENEX is on a mission to revolutionize the token ecosystem by
              launching a deflationary minting system, allowing users to earn
              and mint tokens while growing their networks.
              <br />
              Our token will be listed on multiple decentralized and centralized
              exchanges to ensure liquidity and accessibility for all members.
              <br />
              We are actively collaborating with other blockchain projects to
              integrate innovative DeFi solutions and expand the utility of our
              token across ecosystems.
              <br />
              Our long-term vision includes creating additional decentralized
              platforms and tools, empowering our community to build, trade, and
              interact within a secure and scalable environment.
              <br />
              Join TENEX today and become part of a growing network that merges
              investment opportunities with decentralized technology
              innovations.
            </p>
          </div>
        </Col>
        <Col md={5}>
          <Lottie animationData={businessDeal} loop={true} />
        </Col>
      </Row>

      <OurVision />

      <StatsPanel />
    </Container>
  );
}
