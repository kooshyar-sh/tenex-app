import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useRef } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function TokenSupplyProjection() {
  const chartRef = useRef(null);

  const xLabels = [
    "1–500",
    "501–2,500",
    "2,501–7,000",
    "7,001–13,000",
    "13,001–21,000",
    "21,001–33,000",
    "33,001–63,000",
    "63,001–163,000",
    "163,001–330,000",
  ];

  const cumMin = [
    83981, 402947, 1083039, 1939641, 2821437, 4131534, 6902801, 14460978,
    24278543,
  ];
  const cumMax = [
    1016165, 4875662, 13104769, 23469653, 34139386, 49991561, 83523889,
    174977829, 293770369,
  ];

  const membersAtEachLevel = [
    500, 2500, 7000, 13000, 21000, 33000, 63000, 163000, 330000,
  ];

  const dynamicLimit = 62750;
  const dynamicFinal = 120_000_000;

  const sCurveProjection = (x) => {
    const maxX = membersAtEachLevel[membersAtEachLevel.length - 1];
    const t = x / maxX;
    const eased = 1 - Math.pow(1 - t, 3);
    return Math.round(eased * dynamicFinal);
  };

  const dynamicCurve = membersAtEachLevel.map((x) =>
    x <= dynamicLimit ? sCurveProjection(x) : null
  );

  // ---- Format Y axis (max 3 digits + K/M) ----
  const formatY = (value) => {
    if (value >= 1_000_000) return Math.round(value / 1_000_000) + "M";
    if (value >= 1_000) return Math.round(value / 1_000) + "K";
    return value.toString();
  };

  // ---- Animated Gradient (3D Effect + Shadow) ----
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    let t = 0;
    let lastFrame = 0;

    const animate = (timestamp) => {
      if (timestamp - lastFrame < 33) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;

      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;

      t += 0.01;
      if (t > 1) t = 0;

      // ---- Animated 3D Gradient ----
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop((t + 0) % 1, "rgba(0, 209, 193, 0.05)");
      grad.addColorStop((t + 0.3) % 1, "rgba(0, 209, 193, 0.6)");
      grad.addColorStop((t + 0.6) % 1, "rgba(0, 209, 193, 1)");
      grad.addColorStop((t + 0.9) % 1, "rgba(0, 209, 193, 0.4)");

      chart.data.datasets[2].borderColor = grad;

      // ---- 3D glow fill ----
      const fillGrad = ctx.createLinearGradient(0, 0, 0, height);
      fillGrad.addColorStop(0, "rgba(0, 209, 193, 0.20)");
      fillGrad.addColorStop(1, "rgba(0, 209, 193, 0.0)");

      chart.data.datasets[2].backgroundColor = fillGrad;

      chart.update();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "Min Projection",
        data: cumMin,
        borderWidth: 3,
        tension: 0.35,
        borderColor: "#7A3FFF",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#7A3FFF",
      },
      {
        label: "Max Projection",
        data: cumMax,
        borderWidth: 3,
        tension: 0.35,
        borderColor: "#FF4F81",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#FF4F81",
      },
      {
        label: "Dynamic Projection",
        data: dynamicCurve,
        borderDash: [5, 5],
        borderWidth: 4,
        tension: 0.5,
        fill: true,
        pointBackgroundColor: "#00D1C1",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { family: "Segoe UI", size: 14, weight: "600" },
          color: "#333", // back to normal (not white)
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: true,
        backgroundColor: "rgba(137, 61, 141, 0.69)",
        titleColor: "#fff",
        bodyColor: "#eee",
        borderColor: "#7f3cff",
        borderWidth: 1.5,
        padding: 10,
        titleFont: { family: "Segoe UI", size: 15, weight: "600" },
        bodyFont: { family: "Segoe UI", size: 13 },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#444",
          font: { family: "Segoe UI", size: 12 },
          callback: formatY,
        },
        title: {
          display: true,
          text: "Cumulative Tokens",
          color: "#222", // reverted to non-white
          font: { family: "Segoe UI", size: 16 },
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: {
          color: "#444",
          font: { family: "Segoe UI", size: 12 },
        },
        title: {
          display: true,
          text: "User Levels",
          color: "#222", // reverted
          font: { family: "Segoe UI", size: 16 },
        },
        grid: { color: "rgba(0,0,0,0.04)" },
      },
    },
  };

  return (
    <section className="mt-5 pt-4">
      <h1 className="fw-bold text-purple mb-4">Token Supply Projection</h1>

      <div className="row align-items-center text-muted">
        {/* --- Left Column: Description --- */}
        <div className="col-md-5 mb-4 text-start">
          <div>
            <h4 className="fw-bold mb-3 text-purple">What This Chart Shows</h4>

            <p>
              This chart illustrates how token supply evolves based on the
              membership packages chosen by users. Each curve reflects a
              different scenario depending on the package investment.
            </p>

            <ul className="px-0">
              <li>
                <b>Min Projection:</b> Occurs when users choose the{" "}
                <b>Bronze Package</b> and mint tokens with 0.1 BNB, resulting in
                a conservative cumulative supply.
              </li>
              <li>
                <b>Max Projection:</b> Happens when users select the{" "}
                <b>Gold Package</b> and mint tokens with 1 BNB, producing a
                higher cumulative supply.
              </li>
              <li>
                <b>Dynamic Projection:</b> Represents a smooth mid-range
                scenario, showing realistic supply growth as adoption increases
                across all packages.
              </li>
            </ul>

            <p>
              The dynamic projection provides a balanced view between the
              minimum and maximum outcomes, reflecting typical adoption trends
              as more users mint tokens through different packages.
            </p>
          </div>
        </div>

        {/* --- Right Column: Chart --- */}
        <div className="col-md-7">
          <div style={{ maxWidth: "100%", margin: "0 auto" }}>
            <Line
              ref={chartRef}
              data={data}
              options={{ ...options, maintainAspectRatio: false }}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
