import React from "react";
// import { Link } from "react-router-dom";
import "./SuccessStyle.css";

function Success() {
  return (
    <div className="SuccessMainDiv">
      <div className="card SucessMain">
        <div className="SuccessDD">
          <i className="checkmarkDD">✓</i>
        </div>
        <h1 className="SuccessH1DD">Success</h1>
        <p>We received your form data !</p>
        <br />
        {/* <Link to="/">
        <button
          style={{
            color: "#88b04b",
            fontFamily: "Verdana",
            font: "bold"
          }}
        >
          Submit another form
        </button>
      </Link> */}
      </div>
    </div>
  );
}

export default Success;
