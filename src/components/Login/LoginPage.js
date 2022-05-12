import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "./LoginPage.css";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import dotenv from "dotenv";
dotenv.config();

function LoginPage(props) {
  const [showPage, setShowPage] = useState(false);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    const fd = new FormData();
    fd.append("userId", event.target.username.value);
    fd.append("password", event.target.password.value);

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/login", fd, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Result", res);
        if (res.data.loggedIn) {
          props.setLoginData({ isLogin: true, data: res.data.data });
          window.location.assign("/");
        } else {
          setShowPage(true);
          props.setLoginData({ isLogin: false, data: {} });
          CustomToast("Invalid Credentials !", "white", "red");
        }
      })
      .catch((err) => {
        console.log("Err", err);
        CustomToast("User does not exists !", "white", "red");
      });
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/login", {
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
    <div
      className="LoginBackground"
      style={{ display: "block", width: "100%" }}
    >
      {showPage ? (
        <>
          <div className="upperDiv">
            <img
              src="https://lh3.googleusercontent.com/d/1h_-I5hSBA5T5WEHDq-NmmLi55DyHE7w_=s220?authuser=0"
              alt="FE_IMG"
              style={{ display: "inline-block" }}
              // height="50px"
            />
            {/* <h1 style={{ display: "inline-block" }} className="FEHeading">
              FRESH EXPRESS
            </h1> */}
          </div>
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
        </>
      ) : (
        <div className="loadingDiv"></div>
      )}
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
