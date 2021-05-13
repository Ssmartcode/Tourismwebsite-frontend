import React from "react";
import "./Dashboard.css";

// components
import DashboardPanel from "../../components/dashboard/DashboardPanel";

const Dashboard = (props) => {
  return (
    <div className="d-flex dashboard-container">
      <DashboardPanel />
      <main className="d-flex align-items-center justify-content-center w-100">
        {props.children}
      </main>
    </div>
  );
};

export default Dashboard;
