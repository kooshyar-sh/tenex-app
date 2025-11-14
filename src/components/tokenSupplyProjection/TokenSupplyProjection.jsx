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
import { useMemo } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function TokenSupplyProjection() {
  const totalMembers = 330000;

  // -------- Fake dynamic data (بعداً واقعی جایگزین میشه) --------
  const dynamicFinal = 38000000;

  // تقسیم داده‌ها برای نمودار
  const labels = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= totalMembers; i += 10000) {
      arr.push(i);
    }
    return arr;
  }, []);

  const generateCurve = (finalValue) =>
    labels.map((x) => Math.round((x / totalMembers) * finalValue));

  const data = {
    labels,
    datasets: [
      {
        label: "Max Projection",
        data: generateCurve(70726194),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        tension: 0.25,
      },
      {
        label: "Min Projection",
        data: generateCurve(5845140),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        tension: 0.25,
      },
      {
        label: "Dynamic Projection (Fake)",
        data: generateCurve(dynamicFinal),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Members Count" },
        ticks: { maxTicksLimit: 12 },
      },
      y: {
        title: { display: true, text: "Token Minted" },
      },
    },
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
