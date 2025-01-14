import "./layout.scss";
import Header from "./header/header.jsx";
import Sidebar from "./sidebar/sidebar.jsx";
import { Outlet } from "react-router-dom";

/**
 * Layout component that includes a Header, Sidebar, and main content area.
 * Uses React Router's Outlet to render nested routes.
 *
 * @component
 */
function Layout() {
  return (
    <div>
      <Header />
      <main className="main">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
