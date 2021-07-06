import { createContext } from "react";
const context = createContext({
  token: null,
  isLoggedIn: false,
  isAdmin: false,
  userName: "",
  userId: "",
  logIn: () => {},
  logOut: () => {},
});

export default context;
