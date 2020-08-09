import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddInfo from "../components/info/AddInfo";
import axios from "axios";

const Dashboard = (props) => {
  console.log("user", props);
  const [info, setInfo] = useState(null);
  const [userId, setUserId] = useState(props.user.id);
  // console.log(userId);

  const [input, setInput] = useState({
    name: "",
    address: "",
    age: 0,
    marital_status: "",
    citizen: false,
    dependent: false,
  });

  console.log(input);

  const handleChange = (event) => {
    console.log("event", event.target.name, event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    // setInput((input.user_id = props.user.id));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Handle Submit");
  //   axios({
  //     url: `http://localhost:3000/information`,
  //     method: "POST",
  //     data: input,
  //   })
  //     .then((res) => {
  //       setInfo({ createdItem: res.data.information });
  //       // props.history.push(`/products/${props.match.params.id}/reviews`);
  //     })
  //     .catch(console.error);
  // };

  const handleSubmit = (event) => {
    console.log("form submitted");
    event.preventDefault();
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
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  return (
    <>
      <h1>Dashboard</h1>
      <h4>Status: {props.loggedInStatus}</h4>
      <br />
      <Link to="/">Home</Link> <br />
      <Link to="/login">Login</Link>
      <h3>Let's Add Some Information</h3>
      <AddInfo
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        information={input}
      />
    </>
  );
};

export default Dashboard;
