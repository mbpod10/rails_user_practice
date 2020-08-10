import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = (props) => {
  //console.log("Add props", props.match.params.id);
  console.log("user", props.user);
  console.log(props);
  const [input, setInput] = useState({
    user: {
      email: "",
      password: "",
    },
  });
  //const [user, setReview] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    window.location.reload();
    props.history.push("/");
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
        "http://localhost:3000/sessions",
        {
          user: {
            email: input.email,
            password: input.password,
          },
        },
        { withCredentials: true }
      )
      .then((resonse) => {
        console.log("res from  login", resonse);
        if (resonse.data.logged_in) {
          handleSuccessfulAuth(resonse.data);
          // window.location.reload();
          // props.history.push("/");
        } else {
          setErrorStatus(resonse.data.status);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };
  return (
    <>
      <h4>Status: {props.loggedInStatus}</h4>
      <h1>Login</h1>
      {props.loggedInStatus === "LOGGED_IN" ? (
        "Successful Login!"
      ) : (
        <LoginForm
          user={input}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSuccessfulAuth={handleSuccessfulAuth}
        />
      )}
      <br />
      {/* <h4>Status: {props.loggedInStatus}</h4> */}
      <Link to="/">Home</Link> <br />
      <h4>{errorStatus}</h4>
    </>
  );
};

export default Login;
