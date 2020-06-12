import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { remove } from "./utils/storage";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const prevRedirect = useRef();

  useEffect(() => {
    prevRedirect.current = redirect;
    try {
      // const AuthStr = localStorage.token;
      // async function getUserData() {
      //   const { data } = await axios.get("/api/users/me", {
      //     headers: { Authorization: "Bearer " + AuthStr },
      //   });
      //   setUser(data);
      // }
      // if (localStorage.token && redirect === prevRedirect.current) {
      //   getUserData();
      // }
    } catch (err) {
      console.error(err);
    }
  }, [redirect]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout: () => {
          setUser(null);
          setRedirect(!redirect);
          remove("token"); // TO DO: agree on a name for this token
          delete axios.defaults.headers.common.Authorization;
        },
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {user && (
            <Switch>
              <Route path="/" component={Navbar} />
            </Switch>
          )}

          {!user && (
            <Switch>
              <Route path="/login" component={Login} />
              <Redirect from="/" exact to="/login" />
            </Switch>
          )}
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
