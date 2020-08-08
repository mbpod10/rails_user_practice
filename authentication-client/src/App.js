import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className="App">
      <Switch>
        <>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </>
      </Switch>
    </div>
  );
}

export default App;
