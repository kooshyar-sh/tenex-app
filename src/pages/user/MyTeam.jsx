import { referralList } from "../../data/mockData";
import {
  Container,
  Row,
  Col,
  Table,
  Badge,
} from "react-bootstrap";

export default function MyTeam() {
  return (
    <Container>
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
    </Container>
  );
}
