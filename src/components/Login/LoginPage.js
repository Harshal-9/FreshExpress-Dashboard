import axios from "axios";
import React, { useEffect, useState } from "react";
import "./LoginPage.css";

function LoginPage(props) {
  const [showPage, setShowPage] = useState(false);
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
        if (res.data.loggedIn) {
          props.setLoginData({ isLogin: true, data: res.data.data });
        } else {
          setShowPage(true);
          props.setLoginData({ isLogin: false, data: {} });
        }
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

        if (res.data.loggedIn) {
          props.setLoginData({ isLogin: true, data: res.data.data });
        } else {
          props.setLoginData({ isLogin: false, data: {} });
          setShowPage(true);
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div style={{ display: "block", width: "100%" }}>
      {showPage ? (
        <div className="mainLogin">
          <p className="sign">Sign In</p>

          <form className="form1" onSubmit={handleSubmit}>
            <input
              className="userName"
              placeholder="Username"
              type="text"
              name="username"
            />
            <br />
            <br />
            <input
              className="password"
              placeholder="Password"
              type="password"
              name="password"
            />
            <br />
            <br />
            <button type="submit" className="submit">
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
      ) : (
        <div className="loadingDiv"></div>
      )}
    </div>
  );
}

export default LoginPage;
