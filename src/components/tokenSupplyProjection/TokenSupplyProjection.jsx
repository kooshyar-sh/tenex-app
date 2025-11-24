import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function TokenSupplyProjectionRecharts() {
  const [offset, setOffset] = useState(3000);

  useEffect(() => {
    const timer = setTimeout(() => setOffset(0), 150);
    return () => clearTimeout(timer);
  }, []);

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

  const chartData = xLabels.map((label, i) => ({
    level: label,
    min: cumMin[i],
    max: cumMax[i],
    dynamic: dynamicCurve[i] ?? null,
  }));

  // Y Axis Number Format
  const formatYAxis = (value) => {
    if (value >= 1_000_000) return Math.round(value / 1_000_000) + "M";
    if (value >= 1_000) return Math.round(value / 1_000) + "K";
    return value;
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(100, 72, 119, 0.529), rgba(228, 99, 235, 0.693))",
            padding: "16px",
            borderRadius: "16px",
            color: "#fff",
            fontSize: "13px",
            pointerEvents: "none",
            boxShadow: "0 0 25px rgb(98 5 120 / 26%)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div>
            <strong>{label}</strong>
          </div>
          {payload.map((p) => (
            <div key={p.dataKey}>
              {p.name}: {p.value.toLocaleString()}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mt-5 pt-4">
      <h1 className="fw-bold text-purple mb-4">Token Supply Projection</h1>

      <div className="row align-items-center text-muted">
        {/* Left Column */}
        <div className="col-md-5 mb-4 text-start">
          <h4 className="fw-bold mb-3 text-purple">What This Chart Shows</h4>
          <p>
            This chart illustrates how token supply evolves based on the
            membership packages chosen by users. Each curve reflects a different
            scenario depending on the package investment.
          </p>
          <ul className="px-0">
            <li>
              <b>Min Projection:</b> Conservative cumulative supply for Bronze
              Package users.
            </li>
            <li>
              <b>Max Projection:</b> High cumulative supply for Gold Package
              users.
            </li>
            <li>
              <b>Dynamic Projection:</b> Smooth mid-range realistic adoption.
            </li>
          </ul>
        </div>

        {/* Right Column: Chart */}
        <div className="col-md-7">
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* X Axis */}
                <XAxis
                  dataKey="level"
                  interval="preserveStartEnd"
                  tick={{ fontSize: 12 }}
                />

                {/* Y Axis FIXED */}
                <YAxis tickFormatter={formatYAxis} />

                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />

                <Line
                  type="monotone"
                  dataKey="min"
                  name="Min Projection"
                  stroke="#7A3FFF"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="max"
                  name="Max Projection"
                  stroke="#FF4F81"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="dynamic"
                  name="Dynamic Projection"
                  stroke="#00D1C1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  strokeDasharray="6 6"
                  className="dynamic-pulse-line"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
