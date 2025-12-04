import React from "react";
import { FaBolt, FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";

/**
 * توضیح تابع دانلود roadmap:
 * فعلاً تابع یک fetch روی آدرس /assets/tenex-roadmap.pdf انجام میده،
 * اگر فایل موجود باشه، به صورت blob دانلود میشه با نام TENEX-Roadmap.pdf.
 * اگر fetch ناموفق باشه، fallback اینه که فایل در new tab باز بشه.
 *
 * قرار بده فایل roadmap توی public/assets/tenex-roadmap.pdf
 */
async function handleDownloadRoadmap() {
  const url = "/assets/tenex-roadmap.pdf"; // ← در صورت نیاز این مسیر رو عوض کن
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch roadmap");
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "TENEX-Roadmap.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download roadmap error:", err);
    // fallback: باز کردن در تب جدید (اگر فایل در public باشه ممکنه باز بشه)
    window.open(url, "_blank", "noopener");
  }
}

export default function FooterTenex() {
  return (
    <footer className="footer-tenex pt-5">
        <div className="footer-card roun p-4">
          <div className="row align-items-center gy-3">
            {/* LEFT: logo + text */}
            <div className="col-12 col-md-4 d-flex align-items-start gap-3">
              <div className="logo-placeholder d-flex align-items-center justify-content-center">
                <FaBolt size={26} />
              </div>
              <div className="footer-intro">
                <h5 className="mb-1 fw-bold">TENEX</h5>
                <p className="mb-0 small">
                  Let’s Discuss Your Software Vision.
                </p>
                <button
                  className="btn btn-sm btn-outline-light mt-3"
                  onClick={() => {
                    // مثال: بعدا می‌تونی این رو به صفحه تماس هدایت کنی
                    window.location.href = "/contact";
                  }}
                >
                  Schedule a call →
                </button>
              </div>
            </div>

            {/* MIDDLE: links */}
            <div className="col-12 col-md-4">
              <h6 className="text-uppercase mb-3">Resources</h6>
              <ul className="list-unstyled footer-links mb-0">
                <li>
                  <a
                    href="/assets/tenex-presentation.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Presentation
                  </a>
                </li>
                <li>
                  <a
                    href="/assets/tenex-doc.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Doc
                  </a>
                </li>
                <li>
                  <a href="/faq" target="_blank" rel="noopener noreferrer">
                    Help &amp; Support
                  </a>
                </li>
              </ul>
            </div>

            {/* RIGHT: button + social */}
            <div className="col-12 col-md-4 text-md-end">
              <div className="d-flex flex-column align-items-start align-items-md-end">
                <button
                  className="btn btn-primary btn-download mb-2"
                  onClick={handleDownloadRoadmap}
                  aria-label="Download TENEX roadmap"
                >
                  Download Roadmap
                </button>

                <div className="socials mt-3">
                  <a
                    className="social-link"
                    href="https://t.me/your_channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                  >
                    <FaTelegramPlane />
                  </a>
                  <a
                    className="social-link"
                    href="https://twitter.com/your_profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    className="social-link"
                    href="https://discord.gg/your_invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                  >
                    <FaDiscord />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom text-center mt-4">
            <hr className="footer-hr" />
            <small>© TENEX 2025. All rights reserved.</small>
          </div>
        </div>
    </footer>
  );
}
