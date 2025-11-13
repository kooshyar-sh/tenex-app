import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import { currentUser, referralList } from "../data/mockData";

export default function Dashboard() {
  return (
    <Container>
      <Row className="mb-4">
        <Col md={4}>
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-coin me-2 text-blue"></i> Token Balance
            </h5>
            <h3>{currentUser.balance} 10X</h3>
            <small className="text-muted">
              Minted: {currentUser.minted} 10X
            </small>
          </div>
        </Col>

        <Col md={4}>
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-graph-up-arrow me-2 text-blue"></i> Binary
              Volume
            </h5>
            <h4>{currentUser.binaryVolume} USD</h4>
            <ProgressBar
              now={(currentUser.binaryVolume / 100000) * 100}
              label={`${currentUser.binaryVolume}`}
              className="mt-2"
            />
          </div>
        </Col>

        <Col md={4}>
          <div className="main-card">
            <h5 className="text-purple mb-2">
              <i className="bi bi-people-fill me-2 text-blue"></i> Referrals
            </h5>
            <p className="mb-1">
              Total referrals: <strong>{currentUser.referralsCount}</strong>
            </p>
            <small>
              Referral code: <code>{currentUser.referralCode}</code>
            </small>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="main-card">
            <h5 className="text-purple mb-3">
              <i className="bi bi-diagram-3 me-2 text-blue"></i> Referral List
            </h5>

            {/* ✅ اضافه شدن کلاس جدید custom-table */}
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
    </Container>
  );
}
