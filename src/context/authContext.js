import { createContext } from "react";
const context = createContext({
  isLoggedIn: false,
  token: null,
  userId: "",
  logIn: () => {},
  logOut: () => {},
});

export default context;
