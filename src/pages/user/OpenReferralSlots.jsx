import { leftWingList, rightWingList } from "../../data/mockData";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { useToast } from "../../components/Toast/ToastContext";

// کوتاه‌سازی آدرس‌ها
const shorten = (txt) => (txt ? `${txt.slice(0, 6)}...${txt.slice(-4)}` : "");

export default function OpenReferralSlots() {
  const [activeWing, setActiveWing] = useState("left");

  const toast = useToast();

  // برای نمایش آیکون "کپی شد"
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (
    value,
    fieldKey,
    type = "success",
    prefix = "Copied"
  ) => {
    navigator.clipboard.writeText(value);
    setCopiedField(fieldKey);

    const message = `${prefix}: ${value}`;
    toast?.showToast(type, message);

    setTimeout(() => setCopiedField(null), 1200);
  };

  const cleanedLeft = leftWingList;
  const cleanedRight = rightWingList;

  const getReferralLink = (address) => `https://yourapp.com/?ref=${address}`;

  return (
    <>
      <p className="text-muted mb-4 fw-semibold" style={{ lineHeight: "1.6" }}>
        This section displays the wallet addresses and referral links of your
        direct team members. You can use these links to fill your empty referral
        positions. In the upcoming <span className="fw-semibold text-blue">Referral Market</span>, you will be
        able to list your own referral link with a{" "}
        <span className="fw-semibold text-blue">10X token reward</span>. Users without an upline can browse
        these offers and join through the link that provides the most attractive
        incentive.
      </p>

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
                              copyToClipboard(
                                item.address,
                                `addr-left-${idx}`,
                                "info",
                                "Wallet address copied"
                              )
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
                              copyToClipboard(
                                referral,
                                `ref-left-${idx}`,
                                "success",
                                "Referral link copied"
                              )
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
                              copyToClipboard(
                                item.address,
                                `addr-left-${idx}`,
                                "info",
                                "Wallet address copied"
                              )
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
                              copyToClipboard(
                                referral,
                                `ref-left-${idx}`,
                                "success",
                                "Referral link copied"
                              )
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
                                  `addr-left-${idx}`,
                                  "info",
                                  "Wallet address copied"
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
                                  `ref-left-${idx}`,
                                  "success",
                                  "Referral link copied"
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
