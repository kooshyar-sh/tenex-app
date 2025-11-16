import { Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BsPeopleFill, BsCoin, BsAward } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsPanel() {
  const stats = [
    { label: "Members", value: 62751, icon: <BsPeopleFill size={24} /> },
    { label: "Tokens Minted", value: 1210000, icon: <BsCoin size={24} /> },
    { label: "No. Max Payout Members", value: 330000, icon: <BsAward size={24} /> },
    { label: "Holders Count", value: 15800, icon: <BsPeopleFill size={24} /> },
    { label: "New Members 24h", value: 152, icon: <BsPeopleFill size={24} /> },
    { label: "New Members 7d", value: 890, icon: <BsPeopleFill size={24} /> },
    { label: "New Members 1M", value: 32000, icon: <BsPeopleFill size={24} /> },
  ];

  const pieData = {
    labels: ["0.1 BNB", "0.3 BNB", "1 BNB"],
    datasets: [
      {
        data: [35000, 18000, 9700],
        backgroundColor: ["#FFD700", "#C0C0C0", "#cd7f32"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Row className="mt-5 g-4">
      {stats.map((s, idx) => (
        <Col md={4} lg={3} key={idx}>
          <div className="main-card text-center p-4 h-100 stats-card">
            <div className="d-flex justify-content-center align-items-center mb-2">
              {s.icon}
              <h6 className="text-muted mb-0 ms-2">{s.label}</h6>
            </div>
            <h3 className="fw-bold text-purple">
              <CountUp
                end={s.value}
                duration={2}
                separator=","
                enableScrollSpy
                scrollSpyOnce
              />
            </h3>
          </div>
        </Col>
      ))}

      {/* نمودار دایره‌ای */}
      <Col md={4} lg={3}>
        <div className="main-card text-center p-4 h-100 stats-card">
          <h6 className="text-muted mb-3">User Tier Distribution</h6>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </Col>
    </Row>
  );
}
