import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedIn("LOGGED_IN");
    setUser(data.user);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      axios
        .get("http://localhost:3000/logged_in", { withCredentials: true })
        .then((response) => {
          //console.log("logged in?", response);
          if (response.data.logged_in && loggedIn === "NOT_LOGGED_IN") {
            setLoggedIn("LOGGED_IN");
            setUser(response.data.user);
          } else if (!response.data.logged_in && loggedIn === "LOGGED_IN") {
            setLoggedIn("NOT_LOGGED_IN");
            setUser({});
          }
        })
        .catch((error) => {
          console.log("log in error", error);
        });
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setLoggedIn("NOT_LOGGED_IN");
    setUser({});
  };

  return (
    <div className="App">
      <Switch>
        <>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                user={user}
                loggedInStatus={loggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props} loggedInStatus={loggedIn} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                user={user}
                loggedInStatus={loggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            )}
          />
        </>
      </Switch>
    </div>
  );
}

export default App;
