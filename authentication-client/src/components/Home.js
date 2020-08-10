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
  const [errorStatus, setErrorStatus] = useState("");

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
        window.location.reload();
        props.history.push("/");
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
        console.log("registration log", resonse);
        if (resonse.data.status === "created") {
          handleSuccessfulAuth(resonse.data);
        } else {
          setErrorStatus(resonse.data.status);
        }
      })
      .catch((response) => {
        console.log("registration error", response);
        // console.log(response.data.status);
        // setErrorStatus(response.data.status);
      });
  };
  return (
    <>
      {props.email ? <h5>{props.email} </h5> : null}
      <h1>Home</h1>
      {props.loggedInStatus === "LOGGED_IN" ? null : (
        <Registration
          user={input}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSuccessfulAuth={handleSuccessfulAuth}
        />
      )}
      <h4>Status: {props.loggedInStatus}</h4>
      {/* <Login handleSuccessfulAuth={handleSuccessfulAuth} /> */}
      {props.loggedInStatus === "LOGGED_IN" ? null : (
        <Link to="/login">Login</Link>
      )}{" "}
      <br />
      {props.loggedInStatus === "LOGGED_IN" ? (
        <>
          <Link to={`/profile/${props.user.id}`}> View Profile</Link> <br />
          <Link to="/dashboard">Dashboard</Link> <br />
          <button onClick={() => handleLogoutClick()}>Logout</button> <br />
        </>
      ) : null}
      <h4>{errorStatus}</h4>
    </>
  );
};

export default Home;
