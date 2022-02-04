import React, { useState } from "react";
import "./FarmerProfile.css";
import axios from "axios";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";

function FarmerPersonalInfoCard(props) {
  console.log(props);
  const [isDisabled, setIsDisabled] = useState(true);

  const farmerAllData = props.farmerAllData;
  const sendBackFarmerAllData = props.sendBackFarmerAllData;

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
    <div className="MyCardColumn" style={{ display: "inline-block" }}>
      <div className="MyCard">
        <img
          src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
          width="250px"
          height="300px"
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
            <input
              type="text"
              disabled={isDisabled}
              size="80"
              value={farmerAllData.name}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  name: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">Family Name : </label>
            <input
              type="text"
              disabled={true}
              size="80"
              value={farmerAllData.familyName}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  familyName: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">Mobile Number : </label>
            <input
              type="text"
              disabled={isDisabled}
              size="80"
              value={farmerAllData.mobileNumber}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  mobileNumber: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">Email ID : </label>
            <input
              type="text"
              disabled={isDisabled}
              size="80"
              value={farmerAllData.email}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  email: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">GGN Number : </label>
            <input
              type="text"
              disabled={true}
              size="80"
              value={farmerAllData.GGN}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  GGN: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">Consultant Name : </label>
            <input
              type="text"
              disabled={isDisabled}
              size="80"
              value={farmerAllData.consultantName}
              onChange={(event) => {
                sendBackFarmerAllData({
                  ...farmerAllData,
                  consultantName: event.target.value,
                });
              }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel">Farm Map Link : </label>
            {isDisabled ? (
              <a href={farmerAllData.farmMap}>
                <input
                  type="url"
                  disabled={true}
                  size="80"
                  value={farmerAllData.farmMap}
                  className="FarmerProfileLink"
                ></input>
              </a>
            ) : (
              <input
                type="url"
                size="80"
                value={farmerAllData.farmMap}
                onChange={(event) => {
                  sendBackFarmerAllData({
                    ...farmerAllData,
                    farmMap: event.target.value,
                  });
                }}
              ></input>
            )}
            <br />
            <br />
            {!isDisabled && farmerAllData.farmerId !== "" ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsDisabled(true);

                  const { farmerId, ...tempObj } = farmerAllData;
                  // console.log("Sending Data", tempObj, farmerId);

                  axios
                    .post(
                      "https://immense-beach-88770.herokuapp.com/farmers/edit/" +
                        farmerId,
                      {
                        personalInformation: tempObj,
                      }
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
            {isDisabled && farmerAllData.farmerId !== "" ? (
              <button
                className="deleteButtonPersonalInfoCard"
                onClick={() => {
                  axios
                    .post(
                      "https://immense-beach-88770.herokuapp.com/farmers/delete/" +
                        farmerAllData.farmerId
                    )
                    .then((res) => {
                      CustomToast(
                        "Farmer deleted Successfully ! Page will be reloaded",
                        "black",
                        "#1cd855"
                      );
                      console.log("Res", res);
                    })
                    .catch((err) => {
                      FailureToast();
                      console.log("Err", err);
                    });
                }}
              >
                <i className="fa fa-trash"></i> Delete Farmer
              </button>
            ) : null}
          </form>
        </div>
        {/* <button className="deleteButtonPersonalInfoCard">Delete Farmer</button> */}
      </div>
    </div>
  );
}

export default FarmerPersonalInfoCard;
