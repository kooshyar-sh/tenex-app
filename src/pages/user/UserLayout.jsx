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
            <NavLink to="statistics" className="nav-item">
              <i className="bi bi-graph-up"></i>
              <span>Statistics</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="my-team" className="nav-item">
              <i className="bi bi-people"></i>
              <span>My Team</span>
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
