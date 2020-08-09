import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddInfo from "../components/info/AddInfo";
import axios from "axios";

const Dashboard = (props) => {
  console.log("user", props);
  const [info, setInfo] = useState(null);
  const [userId, setUserId] = useState(props.user.id);
  // console.log(userId);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  console.log("usestate user", user);
  const [input, setInput] = useState({
    name: "",
    address: "",
    age: 0,
    marital_status: "",
    citizen: false,
    dependent: false,
  });

  console.log(input);

  useEffect(() => {
    const createUser = () => {
      setUser(props.user);
    };
    createUser();
  }, []);

  const handleChange = (event) => {
    console.log("event", event.target.name, event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log("form submitted");
    event.preventDefault();
    setUser(props.user);
    if (user.information) {
      setError("You Already Have Information");
    } else {
      axios
        .post("http://localhost:3000/information", {
          name: input.name,
          address: input.address,
          age: input.age,
          marital_status: input.marital_status,
          citizen: false,
          dependent: false,
          user_id: props.user.id,
        })
        .then((resonse) => {
          console.log("res from  login", resonse);
          props.history.push("/profile");
        })
        .catch((error) => {
          console.log("login error", error);
        });
    }
  };
  console.log("PROPS USER", user);

  return (
    <>
      {props.email ? <h5>{props.email} Logged In</h5> : null}
      <h1>Dashboard</h1>
      <h4>Status: {props.loggedInStatus}</h4>
      <br />
      <Link to="/">Home</Link> <br />
      <Link to="/login">Login</Link>
      <h3>Let's Add Some Information</h3>
      {props.user.information == null || props.user.information.length < 0 ? (
        <AddInfo
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          information={input}
        />
      ) : (
        <h4>You Have Info</h4>
      )}
      {error ? error : null}
    </>
  );
};

export default Dashboard;
