import { referralList } from "../../data/mockData";
import {
  Container,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { BiCopy, BiShow } from "react-icons/bi";

const shortenAddress = (addr) => {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export default function MyTeam() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

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
                  <th style={{ width: "30px", textAlign: "center" }}>
                    <i
                      className="bi bi-question-circle-fill text-muted small"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </th>
                  <th>Wallet Address</th>
                  <th>Level</th>
                  <th>BNB Volume</th>
                </tr>
              </thead>
              <tbody>
                {referralList.map((r, idx) => (
                  <tr key={idx}>
                    <td className="text-center">
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        rootClose
                        overlay={
                          <Popover
                            id={`popover-${idx}`}
                            className="custom-popover"
                          >
                            <Popover.Body>
                              <div className="mb-2">
                                <strong>Joined Date:</strong> {r.joinedDate}
                              </div>
                              {r.referralCode ? (
                                <div className="d-flex align-items-center">
                                  <span className="me-2">{r.referralCode}</span>
                                  <BiCopy
                                    className="copy-icon"
                                    onClick={() =>
                                      copyToClipboard(
                                        r.referralCode,
                                        `code-${idx}`
                                      )
                                    }
                                  />
                                </div>
                              ) : (
                                <span className="custom-badge custom-badge-light-success">
                                  filled
                                </span>
                              )}
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button variant="light" size="sm">
                          <BiShow />
                        </Button>
                      </OverlayTrigger>
                    </td>

                    {/* Wallet Address */}
                    <td>
                      <div className="wallet-cell">
                        <span className="address-text">
                          {shortenAddress(r.address)}
                        </span>
                        <BiCopy
                          className={`copy-icon ${
                            copied === idx ? "copied" : ""
                          }`}
                          onClick={() => copyToClipboard(r.address, idx)}
                        />
                      </div>
                    </td>

                    {/* Level */}
                    <td>
                      <span className="custom-badge custom-badge-light-purple">
                        {r.level}
                      </span>
                    </td>

                    {/* BNB Volume */}
                    <td>{r.volume} BNB</td>
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
