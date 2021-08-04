import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// context
import AuthContext from "../../../context/authContext";
// css
import "./Header.css";
const Header = () => {
  const authContext = useContext(AuthContext);
  const [displayMovingNav, setDisplayMovingNav] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView ? setDisplayMovingNav(false) : setDisplayMovingNav(true);
  }, [inView]);

  return (
    <React.Fragment>
      {/* MOVING NAVIGATION */}
      <motion.nav
        animate={{
          opacity: displayMovingNav ? 1 : 0,
          zIndex: displayMovingNav ? 1000 : -1,
        }}
        className="moving-navigation"
      >
        <div className="navbar-brand">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <div className="link-item">
          <Link to="/offers/category/city-break">City Break</Link>
        </div>
        <div className="link-item">
          <Link to="/offers/category/beach">Beach</Link>
        </div>
        <div className="link-item">
          <Link to="/offers/category/trip">Trip</Link>
        </div>
      </motion.nav>

      {/* STANDARD NAVIGATION */}
      <nav ref={ref} className="navbar navbar-expand-lg navbar-light bg-light ">
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
              <div className="li nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu m-0 border-0 p-0">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/offers/category/city-break"
                    >
                      City Break
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/offers/category/beach">
                      Beach
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/offers/category/trip">
                      Trip
                    </Link>
                  </li>
                </ul>
              </div>

              {/* display these links based on whether the user is authenticated or not */}
              {!authContext.token && (
                <li className="nav-item">
                  <Link to="/user/authentication" className="nav-link">
                    Authentication
                  </Link>
                </li>
              )}
              {authContext.token && !authContext.isAdmin && (
                <li className="nav-item">
                  <Link to="/user/account" className="nav-link">
                    Account
                  </Link>
                </li>
              )}
              {authContext.token && authContext.isAdmin && (
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
    </React.Fragment>
  );
};

export default Header;
