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
import Authentication from "./pages/authentication/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/dashboardHome/DashboardHome";
import DashboardCreate from "./pages/dashboard/dashboardCreate/DashboardCreate";
import DashboardUpdate from "./pages/dashboard/dashboardUpdate/DashboardUpdate";
import SingleOffer from "./pages/singleOffer/SingleOffer";
import OffersByCategory from "./pages/OffersByCategory/OffersByCategory";
import DashboardMessages from "./pages/dashboard/dashboardMessages/DashboardMessages";
import Account from "./pages/account/Account";

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const logIn = useCallback((token, isAdmin, userId, experationDate) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setUserId(userId);
    const tokenExperationDate =
      experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token, isAdmin, userId, tokenExperationDate })
    );
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsAdmin(false);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData)
      logIn(
        userData.token,
        userData.isAdmin,
        userData.userId,
        userData.tokenExperationDate
      );
  }, [logIn]);

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ token, isAdmin, userId, logIn, logOut }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Header />
              <Home />
              <Footer />
            </Route>
            <Route path="/offers/category/:category" exact>
              <Header />
              <OffersByCategory />
            </Route>
            <Route path="/offers/:id" exact>
              <Header />
              <SingleOffer />
            </Route>
            <Route path="/user/authentication" exact>
              <Header />
              <Authentication />
            </Route>
          </Switch>

          {/* Render if user is logged in but not admin */}
          {token && !isAdmin && (
            <Switch>
              <Route path="/user/account" exact>
                <Header />
                <Account />
              </Route>
            </Switch>
          )}

          {/* Render if user is logged in and it is an admin */}
          {token && isAdmin && (
            <Switch>
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
              <Route path="/dashboard/messages">
                <Dashboard>
                  <DashboardMessages />
                </Dashboard>
              </Route>
            </Switch>
          )}
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
