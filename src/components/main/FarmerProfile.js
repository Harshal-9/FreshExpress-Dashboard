import React, { useState } from "react";
import Select from "react-select";
import "./FarmerProfile.css";
function FarmerProfile() {
  const [isDisabled, setIsDisabled] = useState(true);

  function handleEdit(event) {
    event.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return (
    <div className="FarmerProfile">
      <br />
      <div>
        <div className="FarmerSelectDiv">
          <h2>Select Farmer:</h2>
          <Select
            options={[
              { label: "one", value: 1 },
              { label: "two", value: 2 },
              { label: "three", value: 3 },
            ]}
            className="FarmerSelect"
          />
        </div>

        <div className="PlotSelectDiv">
          <h2>Select Plot:</h2>
          <Select
            options={[
              { label: "one", value: 1 },
              { label: "two", value: 2 },
              { label: "three", value: 3 },
            ]}
            className="PlotSelect"
          />
        </div>
      </div>
      <br />
      <div
        className="MyCardColumn"
        style={{ display: "inline-block", margin: "10px" }}
      >
        <div className="MyCard">
          <img
            src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
            width="250px"
            height="250px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
          <div style={{ display: "inline-block" }}>
            <div style={{ textAlign: "right" }}>
              <i
                className="fa fa-edit fa-lg"
                aria-hidden="true"
                onClick={handleEdit}
              ></i>
            </div>
            <form>
              <label className="FarmerProfileLabel">Farmer Name : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Family Name : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Mobile Number : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Email ID : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">GCN Number : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Consultant Name : </label>
              <input type="text" disabled={isDisabled} size="100"></input>
              <br />
              <br />
              {isDisabled ? null : <button>Save Changes</button>}
            </form>
          </div>
        </div>
      </div>
      <hr />
      <br />
    </div>
  );
}

export default FarmerProfile;
