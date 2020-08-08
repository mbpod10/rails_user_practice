import React, { useState } from "react";
import Registration from "../components/auth/Registration";
import axios from "axios";

const Home = (props) => {
  //console.log("Add props", props.match.params.id);

  const [input, setInput] = useState({
    user: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const [user, setReview] = useState(null);

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
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };
  return (
    <>
      <h1>Home</h1>
      <h1>Page</h1>
      <Registration
        user={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
