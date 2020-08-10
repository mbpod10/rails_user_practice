import React, { useState, useEffect } from "react";
import Registration from "../components/auth/Registration";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [id, setID] = useState(props.user.id);
  const [information, setInfo] = useState([]);
  //   console.log("user", user);
  //   console.log("id", id);
  console.log(props);

  useEffect(() => {
    setUser(props.user);
    console.log("user", user);
    const makeAPICall = async () => {
      //console.log(props.match.params);
      try {
        const response = await axios(
          `http://localhost:3000/users/${props.match.params.id}}`
        );
        //console.log("response", response);
        console.log("response", response);
        setInfo(response.data.information);
      } catch (err) {
        console.error(err);
      }
    };
    makeAPICall();
  }, []);
  console.log("information", information);

  const informationArray = information.map((element, index) => {
    return (
      <div key={element.id}>
        <h4>Name: {element.name}</h4>
        <h4>Address: {element.address}</h4>
        <h4>Age: {element.age}</h4>
        <h4>US Citizen: {JSON.stringify(element.citizen)}</h4>
        <h4>Dependent: {JSON.stringify(element.dependent)}</h4>
        <h4>Martial Status: {element.marital_status}</h4>
      </div>
    );
  });

  return (
    <>
      {props.email ? <h5>{props.email} Logged In</h5> : null}
      <h1>Profile</h1>
      <h1>Page</h1>
      <h4>Status: {props.loggedInStatus}</h4>
      <Link to="/">Home</Link> <br />
      {user ? informationArray : null}
    </>
  );
};

export default Profile;
