import React, { useState } from "react";

function LoginPage(props) {
  return (
    <div className="LoginMainDiv">
      <p>Username : </p>
      <input type="text" />
      <p>Password : </p>
      <input type="text" />
      <button
        onClick={() => {
          props.setMyState(true);
        }}
      >
        Submit
      </button>
      <br />
      <a href="/">
        <u>Forgot Password</u>
      </a>
    </div>
  );
}

export default LoginPage;
