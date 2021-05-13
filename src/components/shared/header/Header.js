import React, { useContext } from "react";
import { Link } from "react-router-dom";
// context
import AuthContext from "../../../context/authContext";
// css
import "./Header.css";
const Header = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container">
        <div className="navbar-brand">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {!authContext.token && (
              <li className="nav-item">
                <Link to="/user/account" className="nav-link">
                  Account
                </Link>
              </li>
            )}
            {authContext.token && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
