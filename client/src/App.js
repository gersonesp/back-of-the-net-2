import React, { useEffect, useState } from "react";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserContext from "./context/UserContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Matches from "./pages/Matches";
import Livewatch from "./pages/Livewatch";
import Table from "./pages/Table";
import { remove } from "./utils/storage";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const AuthStr = localStorage.token;
      async function getUserData() {
        const { data } = await axios.get("/api/users/me", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setUser(data);
      }

      if (localStorage.token) {
        getUserData();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout: () => {
          setUser(null);
          remove("token");
          delete axios.defaults.headers.common.Authorization;
        },
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {user && (
            <>
              <Navbar />
              <Route path="/livewatch" component={Livewatch} />
              <Route path="/table" component={Table} />
              <Route exact path="/" component={Matches} />
              {/* <Route component={Matches} /> */}
            </>
          )}

          {!user && (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Signup} />
              <Route component={Login} />
            </Switch>
          )}
        </BrowserRouter>
      </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
