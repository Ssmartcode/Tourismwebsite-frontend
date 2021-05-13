import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// auth context
import AuthContext from "./context/authContext";
// css
import "./App.css";
// components
import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
// pages
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import DashboardCreate from "./pages/dashboard/dashboardCreate/DashboardCreate";
import DashboardUpdate from "./pages/dashboard/dashboardUpdate/DashboardUpdate";
import SingleOffer from "./pages/singleOffer/SingleOffer";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const logIn = useCallback((token, userId, experationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExperationDate =
      experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    console.log(experationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token, userId, tokenExperationDate })
    );
  }, []);
  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && new Date(userData.tokenExperationDate) > new Date())
      logIn(userData.token, userData.userId, userData.tokenExperationDate);
  }, [logIn]);
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{ token, isLoggedIn: !!token, userId, logIn, logOut }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <Header />
              <Home />
              <Footer />
            </Route>
            <Route path="/offers/:id" exact>
              <Header />
              <SingleOffer />
              <Footer />
            </Route>
            <Route path="/user/account" exact>
              <Header />
              <Account />
              <Footer />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard>
                <DashboardHome />
              </Dashboard>
            </Route>
            <Route path="/dashboard/create">
              <Dashboard>
                <DashboardCreate />
              </Dashboard>
            </Route>
            <Route path="/dashboard/offers/:id">
              <Dashboard>
                <DashboardUpdate />
              </Dashboard>
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
