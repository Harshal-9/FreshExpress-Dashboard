import React, { useState } from "react";
import "./FarmerProfile.css";
import axios from "axios";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import dotenv from "dotenv";
dotenv.config();

// This component is used for showing farmers personal data
function FarmerPersonalInfoCard(props) {
  // Handle image change
  const handleFileChange = (event) => {
    const handleChangeSelectedFile = event.target.files[0];
    const fd = new FormData();
    if (handleChangeSelectedFile)
      fd.append(
        "image",
        handleChangeSelectedFile,
        handleChangeSelectedFile.name
      );

    // Getting link of uploaded image
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/uploadFile/PROFILE_FOLDER",
        fd
      )
      .then((res) => {
        UpdateSuccessToast(
          "File : " + handleChangeSelectedFile.name + " uploaded successfully !"
        );

        if (farmerAllData.profileId !== "") {
          axios
            .delete(" https://immense-beach-88770.herokuapp.com/uploadFile", {
              data: {
                id: farmerAllData.profileId,
              },
            })
            .then((res2) => {
              // console.log("Res", res2);
            })
            .catch((err) => {
              // console.log("Err", err);
              CustomToast("Error" + err, "white", "red");
            });
        }

        setSelectedImage({
          link: res.data.link,
          id: res.data.id,
        });
        sendBackFarmerAllData({
          ...farmerAllData,
          profileId: res.data.id,
          profileUrl: res.data.link,
        });
      })
      .catch((err) => {
        // console.log("error", err);
        CustomToast("Error" + err, "white", "red");
      });
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
        {props.farmerAllData.profileId ? (
          <iframe
            title="img"
            src={
              "https://drive.google.com/file/d/" +
              props.farmerAllData.profileId +
              "/preview"
            }
            width="250px"
            height="325px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          />
        ) : (
          <img
            src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
            width="250px"
            height="325px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
        )}
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
            <label className="FarmerProfileLabel">Farmer UserId : </label>
            <input
              type="text"
              disabled={true}
              size="80"
              value={farmerAllData.userId}
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
              <a href={farmerAllData.farmMap} target="_blank">
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
              <>
                <label className="FarmerProfileLabel">Upload Image :</label>
                <input
                  type="file"
                  alt="select Image"
                  size="80"
                  value={farmerAllData.selectedImage}
                  onChange={handleFileChange}
                ></input>
                <br />
                <br />
              </>
            ) : (
              ""
            )}
            {!isDisabled && farmerAllData.farmerId !== "" ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setIsDisabled(true);

                  const { farmerId, ...tempObj } = farmerAllData;
                  // console.log("Sending Data", tempObj, farmerId);

                  axios
                    .post(
                      process.env.REACT_APP_BACKEND_URL +
                        "/farmers/edit/" +
                        farmerId,
                      {
                        personalInformation: tempObj,
                      }
                    )
                    .then((res) => {
                      // console.log("Response", res);
                      UpdateSuccessToast();
                    })
                    .catch((err) => {
                      // console.log("Error", err);
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
                      process.env.REACT_APP_BACKEND_URL +
                        "/farmers/delete/" +
                        farmerAllData.farmerId
                    )
                    .then((res) => {
                      CustomToast(
                        "Farmer deleted Successfully ! Page will be reloaded",
                        "black",
                        "#1cd855"
                      );
                      // console.log("Res", res);
                    })
                    .catch((err) => {
                      FailureToast();
                      // console.log("Err", err);
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
