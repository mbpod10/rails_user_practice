import React from "react";

const Dashboard = (props) => {
  console.log("props", props);
  return (
    <>
      <h1>Dashboard</h1>
      <h4>Status: {props.loggedInStatus}</h4>
    </>
  );
};

export default Dashboard;
