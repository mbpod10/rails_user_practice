import React from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  console.log("props", props);

  return (
    <>
      <h1>Dashboard</h1>
      <h4>Status: {props.loggedInStatus}</h4>
      <br />
      <Link to="/">Home</Link> <br />
      <Link to="/login">Login</Link>
    </>
  );
};

export default Dashboard;
