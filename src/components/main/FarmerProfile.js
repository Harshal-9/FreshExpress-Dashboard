import React, { useState } from "react";
import Select from "react-select";
import "./FarmerProfile.css";
function FarmerProfile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledPlot, setIsDisabledPlot] = useState(true);

  // Function to handle edit of FarmerData form
  function handleEdit(event) {
    event.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  // Function to handle edit of PlotData form
  function handleEditPlot(event) {
    event.preventDefault();
    if (isDisabledPlot) {
      setIsDisabledPlot(false);
    } else {
      setIsDisabledPlot(true);
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
              {isDisabled ? null : (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setIsDisabled(true);
                  }}
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <hr />
      <br />

      <div
        className="MyCardColumn"
        style={{ display: "inline-block", margin: "10px" }}
      >
        <div className="MyCard">
          <div style={{ display: "inline-block" }}>
            <div style={{ textAlign: "right" }}>
              <i
                className="fa fa-edit fa-lg"
                aria-hidden="true"
                onClick={handleEditPlot}
              ></i>
            </div>
            <form>
              <div style={{ display: "inline-block", marginRight: "85px" }}>
                <label className="FarmerProfileLabel">Plot Number : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Variety : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Soil Type : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Plot Area : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Map Link : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Latitude : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Longitude : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">
                  Crop Spacing (Betweeen two Rows) :{" "}
                </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
              </div>
              <div style={{ display: "inline-block" }}>
                <label className="FarmerProfileLabel">MH Code : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Village : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Taluka : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">District : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Pin Code : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Tags : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Notes : </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">
                  Crop Spacing (Betweeen two crops ) :{" "}
                </label>
                <input type="text" disabled={isDisabledPlot} size="50"></input>
                <br />
                <br />
              </div>
              <br />
            </form>
            {isDisabledPlot ? null : (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsDisabledPlot(true);
                }}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
