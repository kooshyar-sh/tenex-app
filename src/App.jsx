import { Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Mint from "./pages/Mint";
import Referrals from "./pages/Referrals";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  // بررسی می‌کنیم آیا کاربر در صفحه Landing هست یا نه
  const isLanding = location.pathname === "/";

  // حذف رنگ بنفش body در Landing
  useEffect(() => {
    if (isLanding) {
      document.body.style.background = "#000"; // پس‌زمینه تیره ساده برای افکت LiquidEther
    } else {
      document.body.style.background = "#dac9f3"; // رنگ بنفش روشن برای بقیه صفحات
    }
  }, [isLanding]);

  return (
    <>
      {/* فقط در صورتی Navbar نشون بده که صفحه Landing نباشه */}
      {!isLanding && <AppNavbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/referrals" element={<Referrals />} />
      </Routes>
    </>
  );
}
