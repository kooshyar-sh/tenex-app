import { Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Landing from "./pages/landing/Landing";
import Mint from "./pages/Mint";
import Dashboard from "./pages/user/Dashboard";
import UserLayout from "./pages/user/UserLayout";
import ReferralCenter from "./pages/user/ReferralCenter";
import OpenReferralSlots from "./pages/user/OpenReferralSlots";
import CapUpgrade from "./pages/user/CapUpgrade";
import { useEffect } from "react";
import { ToastProvider } from "./components/Toast/ToastContext";
import FooterTenex from "./components/FooterTenex";
import ToolbarBottom from "./components/ToolbarBottom/ToolbarBottom";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const showHeaderAndFooter = !isLanding;
  const showNavBar = true;

  useEffect(() => {
    if (isLanding) {
      document.body.style.background = "#000";
    } else {
      document.body.style.background = "#e7ddf6ff";
    }
  }, [isLanding]);

  return (
    <ToastProvider>
      {/* Navbar مخفی روی لندینگ */}
      {!isLanding && <AppNavbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mint" element={<Mint />} />

        {/* User Panel */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="referral" element={<ReferralCenter />} />
          <Route path="open-referral-slots" element={<OpenReferralSlots />} />
          <Route path="cap-upgrade" element={<CapUpgrade />} />
        </Route>
      </Routes>

      {!isLanding && <FooterTenex />}

      <ToolbarBottom
        showHeaderAndFooter={showHeaderAndFooter}
        showNavBar={showNavBar}
      />
    </ToastProvider>
  );
}
