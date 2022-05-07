import React from "react";
import "./FailureStyle.css";


// function to display failure message
function Failure() {
    return (
        <div className="FailureMainDiv">
            <div className="card FailureMain">
                <div className="FailureDD">
                    <i className="crossDD">X</i>
                </div>
                <h1 className="FailureH1DD">Failure</h1>
                <p className="failureParaDD">You form data was not submitted !</p>
                <br />
            </div>
        </div>
    );
}

export default Failure;
