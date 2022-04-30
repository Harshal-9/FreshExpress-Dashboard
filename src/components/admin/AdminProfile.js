import React, { useState } from "react";
import "./AdminProfile.css";
import axios from "axios";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";

function AdminProfile(props) {
  console.log(props);
  const [isDisabled, setIsDisabled] = useState(true);

  // Function to handle edit of FarmerData form
  function handleEdit(event) {
    event.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return (
    <div>
      <br />
      <div
        className="MyCardColumn"
        style={{ display: "inline-block", verticalAlign: "top" }}
      >
        <div className="MyCard">
          <img
            src="https://www.pngitem.com/pimgs/m/146-1468465_early-signs-of-conception-user-profile-icon-hd.png"
            width="175px"
            height="175px"
            alt="AdminImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
          <br />
          <div style={{ display: "inline-block" }}>
            <div style={{ textAlign: "right" }}>
              <i
                className="fa fa-edit fa-lg"
                aria-hidden="true"
                onClick={handleEdit}
              ></i>
            </div>
            <form>
              <label className="AdminProfileLabel">Admin Name : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Email : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Mobile No : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Role : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              {!isDisabled ? (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setIsDisabled(true);

                    // const { farmerId, ...tempObj } = farmerAllData;
                    // console.log("Sending Data", tempObj, farmerId);

                    axios
                      .post(
                        "https://immense-beach-88770.herokuapp.com/farmers/edit/",
                        {}
                      )
                      .then((res) => {
                        console.log("Response", res);
                        UpdateSuccessToast();
                      })
                      .catch((err) => {
                        console.log("Error", err);
                        FailureToast();
                      });
                  }}
                >
                  Save Changes
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
