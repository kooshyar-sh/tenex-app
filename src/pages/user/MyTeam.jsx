import { leftWingList, rightWingList } from "../../data/mockData";
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

const shortenAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

export default function MyTeam() {
  const [activeWing, setActiveWing] = useState("left"); // left یا right
  const [copied, setCopied] = useState(null);

  const [sortBy, setSortBy] = useState(""); 
const [filterFilled, setFilterFilled] = useState(null); 

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const currentList = activeWing === "left" ? leftWingList : rightWingList;

  return (
    <Container>
      <Row className="mb-3">
        <Col className="d-flex gap-2">
          <Button
            className={activeWing === "left" ? "btn-blue" : "btn-outline-blue"}
            onClick={() => setActiveWing("left")}
          >
            Left Wing
          </Button>
          <Button
            className={activeWing === "right" ? "btn-blue" : "btn-outline-blue"}
            onClick={() => setActiveWing("right")}
          >
            Right Wing
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="p-0 px-md-2">
          <div className="main-card">
            <h5 className="text-purple mb-3">
              <i className="bi bi-diagram-3 me-2 text-blue"></i>
              {activeWing === "left"
                ? "Left Wing Referral List"
                : "Right Wing Referral List"}
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
                {currentList.map((r, idx) => (
                  <tr key={idx}>
                    {/* Popover */}
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
                            <Popover.Header as="h6">
                              Additional Info
                            </Popover.Header>
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
