import React from "react";
// import { Link } from "react-router-dom";
import "./SuccessStyle.css";


// Component to display success message if data is sent succcessfully
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
      </div>
    </div>
  );
}

export default Success;
