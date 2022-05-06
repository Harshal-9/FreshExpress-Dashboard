import axios from "axios";
import React, { useEffect, useState } from "react";

function LoginPage(props) {
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    const fd = new FormData();
    fd.append("userId", event.target.username.value);
    fd.append("password", event.target.password.value);

    axios
      .post("https://immense-beach-88770.herokuapp.com/login", fd, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Result", res);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/login", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Res", res);

        // if(res.)
      })
      .catch((err) => {
        console.log("Err", err);
      });
  });

  return (
    <div className="LoginMainDiv">
      <form onSubmit={handleSubmit}>
        <p>Username : </p>
        <input type="text" name="username" />
        <p>Password : </p>
        <input type="password" name="password" />
        <button
          // onClick={() => {
          // props.setMyState(true);
          // }}
          type="submit"
        >
          Submit
        </button>
        <br />
        <a href="/">
          <u>Forgot Password</u>
        </a>
      </form>
    </div>
  );
}

export default LoginPage;
