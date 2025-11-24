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

export default function Dashboard() {
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [earningsPeriod, setEarningsPeriod] = useState("weekly");
  const [referralsPeriod, setReferralsPeriod] = useState("weekly");

  const periods = ["weekly", "monthly", "all"];

  // داده‌های فرضی نمودارها
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

  // ---------- Custom Tooltip ----------
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

  return (
    <Container>
      {/* ---------- چهار باکس بالایی ---------- */}
      <Row className="mb-4 dashboard-top-row">
        <Col md={6} lg={3} className="p-0 px-md-2">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-coin me-2 text-blue"></i> 10X Balance
            </h5>
            <h3>{currentUser.balance} 10X</h3>
            <small className="text-muted">
              Minted: {currentUser.minted} 10X
            </small>
          </div>
        </Col>

        <Col md={6} lg={3} className="p-0 px-md-2 mt-2 mt-md-0">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-cash-stack me-2 text-blue"></i> BNB Earnings
            </h5>
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

        <Col md={6} lg={3} className="p-0 px-md-2 mt-2 mt-lg-0">
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-graph-up-arrow me-2 text-blue"></i> Total Team
              Volume
            </h5>
            <h4>{currentUser.binaryVolume} BNB</h4>
            <button
              className="btn btn-link p-0 mt-2 text-purple fw-bold"
              onClick={() => setShowVolumeModal(true)}
            >
              Show Details <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </Col>

        <Col md={6} lg={3} className="p-0 px-md-2 mt-2 mt-lg-0">
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

      {/* ---------- ردیف نمودارها ---------- */}
      <Row className="mt-4">
        {/* نمودار BNB Earnings */}
        <Col md={6} className="p-0 px-md-2 mb-3">
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

        {/* نمودار تعداد افراد جدید */}
        <Col md={6} className="p-0 px-md-2 mb-3">
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

      {/* ---------- Modal Team Volume ---------- */}
      <Modal
        show={showVolumeModal}
        onHide={() => setShowVolumeModal(false)}
        centered
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
    </Container>
  );
}
