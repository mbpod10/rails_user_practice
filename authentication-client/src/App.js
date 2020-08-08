import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
function App() {
  const [loggedIn, setLoggedIn] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedIn("LOGGED_IN");
    setUser(data.user);
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
              />
            )}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props} loggedInStatus={loggedIn} />
            )}
          />
        </>
      </Switch>
    </div>
  );
}

export default App;
