import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import UserContext from "./context/UserContext";
import TeamsContext from "./context/TeamsContext";
import DarkModeContext from "./context/DarkModeContext";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Matches from "./pages/Matches";
import Livewatch from "./pages/Livewatch";
import Table from "./pages/Table";
import { remove } from "./utils/storage";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const prevUser = useRef();
  useEffect(() => {
    prevUser.current = user;

    try {
      const AuthStr = localStorage.token;
      const getUserData = async () => {
        const { data } = await axios.get("/api/users/me", {
          headers: { Authorization: "Bearer " + AuthStr },
        });
        setUser(data);
        if (data.darkMode) {
          const body = document.getElementsByClassName("body")[0];
          setDarkMode(data.darkMode);
          body.className += " dark";
        }
      };

      const getTeams = async () => {
        const { data } = await axios.get("/api/teams", {
          headers: { Authorization: "Bearer " + AuthStr },
        });

        setTeams(data);
      };

      if (localStorage.token && user === prevUser.current) {
        getUserData();
        getTeams();
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [prevUser.current]);

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
      <TeamsContext.Provider value={{ teams, setTeams }}>
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
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
        </DarkModeContext.Provider>
      </TeamsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
