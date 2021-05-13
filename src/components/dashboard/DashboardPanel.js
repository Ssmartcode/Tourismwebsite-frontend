import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// context
import AuthContext from "../../context/authContext";
//css
import "./DashboardPanel.css";

const DashboardPanel = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const handleLogOut = () => {
    authContext.logOut();
    history.push("/");
  };
  return (
    <aside>
      <Link to="/dashboard">
        <i className="fas fa-folder-open fa-2x"></i>
      </Link>
      <Link to="/dashboard/create">
        <i className="fas fa-folder-plus fa-2x"></i>
      </Link>
      <Link to="" onClick={handleLogOut}>
        <i className="fas fa-user-slash fa-2x"></i>
      </Link>
    </aside>
  );
};

export default DashboardPanel;
