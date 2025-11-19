import { Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Landing from "./pages/landing/Landing";
import Mint from "./pages/Mint";
import Referrals from "./pages/Referrals";
import Dashboard from "./pages/user/Dashboard";
import UserLayout from "./pages/user/UserLayout";
import Statistics from "./pages/user/Statistics";
import MyTeam from "./pages/user/MyTeam";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    if (isLanding) {
      document.body.style.background = "#000";
    } else {
      document.body.style.background = "#e7ddf6ff";
    }
  }, [isLanding]);

  return (
    <>
      {!isLanding && <AppNavbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/referrals" element={<Referrals />} />

        {/* User Panel */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="my-team" element={<MyTeam />} />
        </Route>
      </Routes>
    </>
  );
}
