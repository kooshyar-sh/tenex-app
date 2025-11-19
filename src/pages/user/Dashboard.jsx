import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import { currentUser, referralList } from "../../data/mockData";
import { Modal } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard() {
  const [showVolumeModal, setShowVolumeModal] = useState(false);

  return (
    <Container>
      <Row className="mb-4">
        <Col md={3} className="p-0 px-md-2">
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

        <Col md={3} className="p-0 px-md-2 mt-2 mt-md-0">
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

        <Col md={3} className="p-0 px-md-2 mt-2 mt-md-0">
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

        <Col md={3} className="p-0 px-md-2 mt-2 mt-md-0">
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

            <hr />
            <small>
              Referral code: <code>{currentUser.referralCode}</code>
            </small>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="p-0 px-md-2 mt-2 mt-md-0">
          <div className="main-card">
            <h5 className="text-purple mb-3">
              <i className="bi bi-diagram-3 me-2 text-blue"></i> Referral List
            </h5>

            <Table hover responsive bordered className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Level</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {referralList.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.name}</td>
                    <td className="text-muted">{r.address}</td>
                    <td>
                      <Badge
                        bg="light"
                        text="dark"
                        className="badge-light-purple"
                      >
                        {r.level}
                      </Badge>
                    </td>
                    <td>{r.volume}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      <Modal
        show={showVolumeModal}
        onHide={() => setShowVolumeModal(false)}
        centered
        dialogClassName="volume-modal-sm"
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
