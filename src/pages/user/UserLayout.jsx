import { NavLink, Outlet } from "react-router-dom";
import "./user-layout.scss";

export default function UserLayout() {
  return (
    <div className="user-layout-container">
      {/* Sidebar → تبدیل به navbar افقی در موبایل */}
      <aside className="sidebar main-card mobile-scroll">
        <ul className="menu-list">
          <li>
            <NavLink end to="" className="nav-item">
              <i className="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="referral" className="nav-item">
              <i className="bi bi-share"></i>
              <span>Referral Center</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="open-referral-slots" className="nav-item">
              <i className="bi bi-people"></i>
              <span>Open Referral Slots</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="cap-upgrade" className="nav-item">
              <i className="bi bi-arrow-up-square"></i>
              <span>Cap Upgrade</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
