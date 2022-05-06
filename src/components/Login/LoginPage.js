import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LoginPage.css"

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
    <div className="mainLogin">
      <p className="sign">Sign In</p>
      <form className="form1" onSubmit={handleSubmit}>
        {/* <p>Username : </p> */}
        <input className="userName" placeholder="Username" type="text" name="username" />
        <br />
        <br />
        {/* <p>Password : </p> */}
        <input className="password" placeholder="Password" type="password" name="password" />
        <br />
        <br />
        <button
          // onClick={() => {
          // props.setMyState(true);
          // }}
          className="submit"
          type="submit"
        >
          Submit
        </button>
        <br />
        <br />
        <p className="forgot">
          <a className="anchorForgot" href="/">
            <u> Forgot Password?</u>
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
