import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { currentUser } from "../../data/mockData";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import BNBLogo from "../../../src/assets/bnb.png";
import EthLogo from "../../../src/assets/eth.png";
import TooltipCard from "../../components/TooltipCard/TooltipCard";

export default function Dashboard() {
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [earningsPeriod, setEarningsPeriod] = useState("weekly");
  const [referralsPeriod, setReferralsPeriod] = useState("weekly");

  const periods = ["weekly", "monthly", "all"];

  // sample chart data...
  const earningsData = {
    weekly: [
      { time: "Week1", BNB: 1 },
      { time: "Week2", BNB: 1.2 },
      { time: "Week3", BNB: 0.8 },
      { time: "Week4", BNB: 1.5 },
    ],
    monthly: [
      { time: "Jan", BNB: 4 },
      { time: "Feb", BNB: 3.5 },
      { time: "Mar", BNB: 5 },
      { time: "Apr", BNB: 4.2 },
    ],
    all: [
      { time: "2022", BNB: 20 },
      { time: "2023", BNB: 25 },
      { time: "2024", BNB: 18 },
    ],
  };

  const referralsData = {
    weekly: [
      { time: "Week1", newUsers: 8 },
      { time: "Week2", newUsers: 12 },
      { time: "Week3", newUsers: 9 },
      { time: "Week4", newUsers: 15 },
    ],
    monthly: [
      { time: "Jan", newUsers: 40 },
      { time: "Feb", newUsers: 35 },
      { time: "Mar", newUsers: 50 },
      { time: "Apr", newUsers: 42 },
    ],
    all: [
      { time: "2022", newUsers: 400 },
      { time: "2023", newUsers: 520 },
      { time: "2024", newUsers: 450 },
    ],
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(100, 72, 119, 0.529), rgba(228, 99, 235, 0.693))",
            padding: "16px",
            borderRadius: "16px",
            color: "#fff",
            fontSize: "13px",
            pointerEvents: "none",
            boxShadow: "0 0 25px rgb(98 5 120 / 26%)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div>
            <strong>{label}</strong>
          </div>
          {payload.map((p) => (
            <div key={p.dataKey}>
              {p.name}: {p.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatBNB = (val) =>
    Number(val).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <Row className="mb-4 dashboard-top-row">
        <Col md={6} lg={3} className="px-md-2">
          <div className="main-card">
            <div className="d-flex align-items-center gap-3">
              <div className="rank-circle">#{currentUser.rank}</div>
              <div>
                <h5 className="text-purple mb-1">{currentUser.packageName}</h5>
              </div>
            </div>

            <hr className="my-2" />

            <p className="mb-2">
              <span className="text-muted">All-Time Reward:</span>{" "}
              <span className="text-success fw-bold">
                {currentUser.allTimeReward} BNB
              </span>
            </p>

            <p className="mb-0">
              <span className="text-muted">This Week’s Accumulated:</span>{" "}
              <span className="text-info fw-bold">
                {currentUser.weeklyReward} BNB
              </span>
            </p>
          </div>
        </Col>

        <Col md={6} lg={3} className="px-md-2 mt-2 mt-md-0">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-coin me-2 text-blue"></i> 10X Balance
            </h5>
            <h3>
              {currentUser.balance} 10X
              <img src={EthLogo} alt="TENEX" className="token-logo" />
            </h3>
            <small className="text-muted">
              Minted: {currentUser.minted} 10X
            </small>
          </div>
        </Col>

        {/* Total Team Volume with Carry Over below the volume */}
        <Col md={6} lg={3} className="px-md-2 mt-2 mt-lg-0">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-graph-up-arrow me-2 text-blue"></i> Total Team
              Volume
            </h5>

            <div>
              <h4 style={{ margin: 0 }}>
                {currentUser.binaryVolume} BNB
                <img src={BNBLogo} alt="BNB" className="token-logo" />
              </h4>

              {/* Carry Over: placed under total volume */}
              {Number(currentUser.carryOverAmount) > 0 &&
                currentUser.carryOverSide && (
                  <p className="mt-2 mb-0">
                    <span className="text-muted">
                      <TooltipCard
                        title="Carry Over — Saved Balance"
                        description={`Carry Over is the excess BNB that has accumulated on one side of your team and hasn't been balanced yet. This amount is held in your account and will remain saved indefinitely (it does not expire). Once the opposite side grows and the teams balance, the Carry Over amount becomes eligible for weekly team rewards and payouts. Note: Carry Over is not counted toward weekly payouts until it is balanced.`}
                        badge="Saved Balance"
                        verticalPosition="bottom"
                        mobileHorizontalPosition="right"
                        mobileVerticalPosition="bottom"
                      >
                        <i
                          className="bi bi-question-circle-fill text-muted small me-2"
                          style={{ cursor: "pointer" }}
                        />
                      </TooltipCard>
                      Carry Over :
                    </span>{" "}
                    <span className="mt-1">
                      <strong className="me-3 text-success">
                        {formatBNB(currentUser.carryOverAmount)} BNB
                      </strong>

                      <span
                        className={`custom-badge ${
                          currentUser.carryOverSide === "L"
                            ? "custom-badge-light-purple"
                            : "custom-badge-light-info"
                        }`}
                      >
                        {currentUser.carryOverSide}
                      </span>
                    </span>
                  </p>
                )}
            </div>

            <div className="mt-3">
              <button
                className="btn btn-link p-0 mt-2 text-purple fw-bold"
                onClick={() => setShowVolumeModal(true)}
                style={{ textDecoration: "none" }}
              >
                Show Details <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} className="px-md-2 mt-2 mt-lg-0">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-people-fill me-2 text-blue"></i> Referrals
            </h5>
            <p className="mb-1">
              Total referrals: <strong>{currentUser.referralsCount}</strong>
            </p>
            <p className="mb-1">
              <small className="text-muted">New (24h):</small>{" "}
              <strong className="text-success">{currentUser.new24h}</strong>
            </p>
            <p className="mb-0">
              <small className="text-muted">New (7d):</small>{" "}
              <strong className="text-info">{currentUser.new7d}</strong>
            </p>
          </div>
        </Col>
      </Row>

      {/* Charts (unchanged) */}
      <Row className="mt-4">
        <Col md={6} className="px-md-2 mb-3">
          <div className="main-card p-3">
            <h5 className="text-purple mb-3">BNB Earnings</h5>
            <div className="mb-2">
              {periods.map((p) => {
                const isActive = earningsPeriod === p;
                return (
                  <Button
                    key={p}
                    size="sm"
                    className={`me-1 ${
                      isActive ? "btn-blue" : "btn-outline-blue"
                    }`}
                    onClick={() => setEarningsPeriod(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                );
              })}
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earningsData[earningsPeriod]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="BNB"
                  stroke="#6f42c1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>

        <Col md={6} className="px-md-2 mb-3">
          <div className="main-card p-3">
            <h5 className="text-purple mb-3">New Team Members</h5>
            <div className="mb-2">
              {periods.map((p) => {
                const isActive = referralsPeriod === p;
                return (
                  <Button
                    key={p}
                    size="sm"
                    className={`me-1 ${
                      isActive ? "btn-blue" : "btn-outline-blue"
                    }`}
                    onClick={() => setReferralsPeriod(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                );
              })}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={referralsData[referralsPeriod]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="newUsers" fill="#7f3cff" barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      <Modal
        show={showVolumeModal}
        onHide={() => setShowVolumeModal(false)}
        centered
        contentClassName="custom-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-purple">Team Volume Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong>Left wing:</strong>
              <div>{currentUser.leftWing} BNB</div>
            </div>
            <div className="text-end">
              <strong>Right wing:</strong>
              <div>{currentUser.rightWing} BNB</div>
            </div>
          </div>
          <hr />
          <p className="text-muted mb-1">This week</p>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong>Left wing:</strong>
              <div>{currentUser.weekLeft} BNB</div>
            </div>
            <div className="text-end">
              <strong>Right wing:</strong>
              <div>{currentUser.weekRight} BNB</div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total:</strong>
            <span>{currentUser.binaryVolume} BNB</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
