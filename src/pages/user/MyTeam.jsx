import { leftWingList, rightWingList } from "../../data/mockData";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState } from "react";
import GlassAlert from "../../components/GlassAlert/GlassAlert";

// کوتاه‌سازی آدرس‌ها
const shorten = (txt) => (txt ? `${txt.slice(0, 6)}...${txt.slice(-4)}` : "");

export default function MyTeam() {
  const [activeWing, setActiveWing] = useState("left");

  // برای نمایش آیکون "کپی شد"
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (value, fieldKey) => {
    navigator.clipboard.writeText(value);
    setCopiedField(fieldKey);

    setTimeout(() => setCopiedField(null), 1200);
  };

  // هیچ فیلتری نمی‌کنیم
  const cleanedLeft = leftWingList;
  const cleanedRight = rightWingList;

  const getReferralLink = (address) => `https://yourapp.com/?ref=${address}`;

  return (
    <>
      <GlassAlert type="success" dismissible>
        This page displays the wallet addresses and referral links of your
        direct team members. You can copy and use them to fill empty positions.
        In the future, these referral links can also be listed in the Referral
        Market and sold for 10X tokens.
      </GlassAlert>

      {/* دکمه‌های موبایل برای تغییر تب */}
      <Row className="d-lg-none mb-3">
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

      <Row className="g-3">
        {/* LEFT TABLE - DESKTOP */}
        <Col lg={6} className="d-none d-lg-block">
          <div className="main-card">
            <h5 className="text-purple mb-3">
              <i className="bi bi-diagram-3 me-2 text-blue"></i>
              Left Wing Referral List
            </h5>

            <Table hover responsive bordered className="custom-table">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th>Referral Link</th>
                </tr>
              </thead>

              <tbody>
                {cleanedLeft.map((item, idx) => {
                  const referral = getReferralLink(item.address);

                  return (
                    <tr key={idx}>
                      {/* WALLET ADDRESS */}
                      <td>
                        <div className="wallet-cell">
                          {shorten(item.address)}

                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(item.address, `addr-left-${idx}`)
                            }
                          >
                            {copiedField === `addr-left-${idx}` ? (
                              <i className="bi bi-check2-circle text-purple"></i>
                            ) : (
                              <i className="bi bi-clipboard"></i>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* REFERRAL LINK */}
                      <td>
                        <div className="wallet-cell">
                          {shorten(referral)}

                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(referral, `ref-left-${idx}`)
                            }
                          >
                            {copiedField === `ref-left-${idx}` ? (
                              <i className="bi bi-check2-circle text-purple"></i>
                            ) : (
                              <i className="bi bi-clipboard"></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* RIGHT TABLE - DESKTOP */}
        <Col lg={6} className="d-none d-lg-block">
          <div className="main-card">
            <h5 className="text-purple mb-3">
              <i className="bi bi-diagram-3 me-2 text-blue"></i>
              Right Wing Referral List
            </h5>

            <Table hover responsive bordered className="custom-table">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th>Referral Link</th>
                </tr>
              </thead>

              <tbody>
                {cleanedRight.map((item, idx) => {
                  const referral = getReferralLink(item.address);

                  return (
                    <tr key={idx}>
                      {/* WALLET ADDRESS */}
                      <td>
                        <div className="wallet-cell">
                          {shorten(item.address)}

                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(item.address, `addr-right-${idx}`)
                            }
                          >
                            {copiedField === `addr-right-${idx}` ? (
                              <i className="bi bi-check2-circle text-purple"></i>
                            ) : (
                              <i className="bi bi-clipboard"></i>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* REFERRAL LINK */}
                      <td>
                        <div className="wallet-cell">
                          {shorten(referral)}

                          <button
                            className="copy-btn"
                            onClick={() =>
                              copyToClipboard(referral, `ref-right-${idx}`)
                            }
                          >
                            {copiedField === `ref-right-${idx}` ? (
                              <i className="bi bi-check2-circle text-purple"></i>
                            ) : (
                              <i className="bi bi-clipboard"></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>

        {/* MOBILE MODE */}
        <Col xs={12} className="d-lg-none">
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
                  <th>Wallet Address</th>
                  <th>Referral Link</th>
                </tr>
              </thead>

              <tbody>
                {(activeWing === "left" ? cleanedLeft : cleanedRight).map(
                  (item, idx) => {
                    const referral = getReferralLink(item.address);
                    const prefix = activeWing === "left" ? "left" : "right";

                    return (
                      <tr key={idx}>
                        {/* WALLET ADDRESS */}
                        <td>
                          <div className="wallet-cell">
                            {shorten(item.address)}

                            <button
                              className="copy-btn"
                              onClick={() =>
                                copyToClipboard(
                                  item.address,
                                  `addr-${prefix}-${idx}`
                                )
                              }
                            >
                              {copiedField === `addr-${prefix}-${idx}` ? (
                                <i className="bi bi-check2-circle text-purple"></i>
                              ) : (
                                <i className="bi bi-clipboard"></i>
                              )}
                            </button>
                          </div>
                        </td>

                        {/* REFERRAL LINK */}
                        <td>
                          <div className="wallet-cell">
                            {shorten(referral)}

                            <button
                              className="copy-btn"
                              onClick={() =>
                                copyToClipboard(
                                  referral,
                                  `ref-${prefix}-${idx}`
                                )
                              }
                            >
                              {copiedField === `ref-${prefix}-${idx}` ? (
                                <i className="bi bi-check2-circle text-purple"></i>
                              ) : (
                                <i className="bi bi-clipboard"></i>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
}
