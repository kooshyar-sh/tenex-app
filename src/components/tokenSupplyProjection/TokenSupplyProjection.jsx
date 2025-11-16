import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function TokenSupplyProjection() {

  const xLabels = [
    "1–500",
    "501–2,500",
    "2,501–7,000",
    "7,001–13,000",
    "13,001–21,000",
    "21,001–33,000",
    "33,001–63,000",
    "63,001–163,000",
    "163,001–330,000"
  ];

  // ---- Min / Max ----
  const cumMin = [83981,402947,1083039,1939641,2821437,4131534,6902801,14460978,24278543];
  const cumMax = [1016165,4875662,13104769,23469653,34139386,49991561,83523889,174977829,293770369];

  // ---- MEMBERS AT BREAKPOINTS ----
  const membersAtEachLevel = [500, 2500, 7000, 13000, 21000, 33000, 63000, 163000, 330000];

  // ---- DYNAMIC CURVE (S-CURVE / SOFT EXPO CURVE) ----
  const dynamicLimit = 62750;
  const dynamicFinal = 120_000_000;

  const sCurveProjection = (x) => {
    const maxX = membersAtEachLevel[membersAtEachLevel.length - 1];
    const t = x / maxX;

    // S-curve smooth ease-out
    const eased = 1 - Math.pow(1 - t, 3);

    return Math.round(eased * dynamicFinal);
  };

  const dynamicCurve = membersAtEachLevel.map((x) =>
    x <= dynamicLimit ? sCurveProjection(x) : null
  );

  // ---- CUSTOM COLORS ----
  const colors = {
    min: "#7A3FFF",
    max: "#FF4F81",
    dynamic: "#00D1C1"
  };

  // ---- CHART DATA ----
  const data = {
    labels: xLabels,
    datasets: [
      {
        label: "Min Projection",
        data: cumMin,
        borderWidth: 3,
        tension: 0.35,
        borderColor: colors.min,
        pointBackgroundColor: colors.min,
      },
      {
        label: "Max Projection",
        data: cumMax,
        borderWidth: 3,
        tension: 0.35,
        borderColor: colors.max,
        pointBackgroundColor: colors.max,
      },
      {
        label: "Dynamic Projection (Smooth)",
        data: dynamicCurve,
        borderDash: [5, 5],
        borderWidth: 3,
        tension: 0.4,
        borderColor: colors.dynamic,
        pointBackgroundColor: colors.dynamic,
      }
    ],
  };

  // ---- OPTIONS WITH FADE-IN ----
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: { display: true, text: "Cumulative Tokens" },
      },
      x: {
        title: { display: true, text: "User Levels" },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
      delay: (context) => {
        if (context.datasetIndex === 0) return 0;     // Min
        if (context.datasetIndex === 1) return 300;   // Max
        if (context.datasetIndex === 2) return 600;   // Dynamic
        return 0;
      }
    }
  };

  return (
    <section className="mt-5 pt-4">
      <h3 className="fw-bold text-purple mb-4">Token Supply Projection</h3>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
