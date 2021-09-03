import React, { useContext } from "react";
import "./Account.css";
import AuthContext from "../../context/authContext";
import { useHistory } from "react-router";
import Favorites from "../../components/account/Favorites/Favorites";
import Messages from "../../components/account/Messages/Messages";
import logoutIcon from "./logout.png";

const Account = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    authContext.logOut();
    history.push("/");
  };

  return (
    <div className="container py-5">
      <div className="row">
        <Favorites authContext={authContext} />
        <Messages authContext={authContext} />
      </div>
      <p onClick={handleLogout} className="logout text-end py-5 fw-bold fs-5">
        <img src={logoutIcon} className="logout-icon" alt="" />
        <span>Log out</span>
      </p>
    </div>
  );
};

export default Account;
