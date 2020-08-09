import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import axios from "axios";
import Profile from "./components/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");

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
            setEmail(response.data.user.email);
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
  console.log(email);

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
                email={email}
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
              <Dashboard
                {...props}
                email={email}
                loggedInStatus={loggedIn}
                user={user}
                handleLogin={handleLogin}
              />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                user={user}
                email={email}
                loggedInStatus={loggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            )}
          />
          <Route
            path="/profile/:id"
            render={(props) => (
              <Profile
                {...props}
                user={user}
                email={email}
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
