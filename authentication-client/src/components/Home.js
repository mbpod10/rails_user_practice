import React, { useState } from "react";
import Registration from "../components/auth/Registration";
import axios from "axios";
// import Login from "./Login";
import { Link } from "react-router-dom";

const Home = (props) => {
  //console.log("Add props", props.match.params.id);
  console.log("user", props.user);
  console.log(props);
  const [input, setInput] = useState({
    user: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  //const [user, setReview] = useState(null);

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  };

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then((response) => {
        console.log("logout", response);
        props.handleLogout();
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
  };

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
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            email: input.email,
            password: input.password,
            password_confirmation: input.password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((resonse) => {
        if (resonse.data.status === "created") {
          handleSuccessfulAuth(resonse.data);
        }
        console.log("registration log", resonse);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };
  return (
    <>
      <h1>Home</h1>
      <Registration
        user={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleSuccessfulAuth={handleSuccessfulAuth}
      />
      <h4>Status: {props.loggedInStatus}</h4>
      <button onClick={() => handleLogoutClick()}>Logout</button> <br />
      {/* <Login handleSuccessfulAuth={handleSuccessfulAuth} /> */}
      <Link to="/login">Login</Link> <br />
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default Home;
