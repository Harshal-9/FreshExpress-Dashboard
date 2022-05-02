import React, { useState } from "react";
import "./FarmerProfile.css";
import axios from "axios";
import UpdateSuccessToast, { FailureToast } from "../Toasts/AllToasts";

function FarmerPlotDataCard(props) {
  const [isDisabledPlot, setIsDisabledPlot] = useState(true);

  const plotAllData = props.plotAllData;
  const sendBackPlotAllData = props.sendBackPlotAllData;
  const [cropSpacingString, setCropSpacingString] = useState("");

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
    <div className="MyCardColumn" style={{ display: "inline-block" }}>
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
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.farmInformation.plotNumber}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.plotNumber = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Variety : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.farmInformation.variety}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.variety = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Soil Type : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.farmInformation.soilType}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.soilType = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Plot Area : </label>
              <input
                type="number"
                style={{ width: "71%" }}
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.farmInformation.plotArea}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.plotArea = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Plot Location Link :</label>
              {isDisabledPlot ? (
                <a href={plotAllData.address.mapLink} target="_blank">
                  <input
                    type="text"
                    disabled={true}
                    size="40"
                    value={plotAllData.address.mapLink}
                    className="FarmerProfileLink"
                  ></input>
                </a>
              ) : (
                <input
                  type="text"
                  size="40"
                  value={plotAllData.address.mapLink}
                  onChange={(event) => {
                    const prevData = { ...plotAllData };
                    prevData.address.mapLink = event.target.value;
                    sendBackPlotAllData(prevData);
                  }}
                ></input>
              )}
              <br />
              <br />
              <label className="FarmerProfileLabel">Latitude : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.coordinates.latitude}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.coordinates.latitude = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Longitude : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.coordinates.longitude}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.coordinates.longitude = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Crop : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.farmInformation.crop}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.crop = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
            </div>
            <div style={{ display: "inline-block" }}>
              <label className="FarmerProfileLabel">MH Code : </label>
              <input
                type="text"
                disabled={true}
                size="40"
                value={plotAllData.farmInformation.MHCode}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.farmInformation.MHCode = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Village : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.village}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.village = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Taluka : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.taluka}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.taluka = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">District : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.district}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.district = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Pin Code : </label>
              <input
                type="number"
                style={{ width: "71%" }}
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.address.pincode}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.address.pincode = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Tags : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.other.tags.toString()}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.other.tags = event.target.value.split(",");
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Notes : </label>
              <input
                type="text"
                disabled={isDisabledPlot}
                size="40"
                value={plotAllData.other.notes ? plotAllData.other.notes : ""}
                onChange={(event) => {
                  const prevData = { ...plotAllData };
                  prevData.other.notes = event.target.value;
                  sendBackPlotAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Crop Spacing : </label>
              {isDisabledPlot ? (
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="40"
                  value={
                    plotAllData.cropSpacing.betweenTwoRows
                      ? plotAllData.cropSpacing.betweenTwoRows +
                        " X " +
                        plotAllData.cropSpacing.betweenTwoCrops
                      : ""
                  }
                ></input>
              ) : (
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="40"
                  value={cropSpacingString}
                  onChange={(event) => {
                    setCropSpacingString(event.target.value);
                  }}
                ></input>
              )}
              <br />
              <br />
            </div>
            <br />
          </form>
          {isDisabledPlot ? null : (
            <button
              onClick={(event) => {
                event.preventDefault();

                // validating crop spacing
                const str = cropSpacingString;
                const prevData = { ...plotAllData };
                if (str.includes("X")) {
                  const arr = str.split("X");
                  if (isNaN(arr[0].trim()) || isNaN(arr[1].trim())) {
                    alert("Enter crop spacing in number X number format");
                    return;
                  }
                  prevData.cropSpacing.betweenTwoRows = arr[0].trim();
                  prevData.cropSpacing.betweenTwoCrops = arr[1].trim();
                } else if (str.includes("x")) {
                  const arr = str.split("x");
                  if (isNaN(arr[0].trim()) || isNaN(arr[1].trim())) {
                    alert("Enter crop spacing in number X number format");
                    return;
                  }
                  prevData.cropSpacing.betweenTwoRows = arr[0].trim();
                  prevData.cropSpacing.betweenTwoCrops = arr[1].trim();
                } else if (str === "") {
                } else {
                  alert("Enter crop spacing in aXb format");
                  return;
                }
                sendBackPlotAllData(prevData);

                // Disabling all inputs on clicking button
                setIsDisabledPlot(true);
                console.log("Data of plot to submit : ", plotAllData);

                axios
                  .post(
                    "https://immense-beach-88770.herokuapp.com/farmers/plots/edit/" +
                      plotAllData._id,
                    plotAllData
                  )
                  .then((res) => {
                    console.log("res", res);
                    UpdateSuccessToast();
                  })
                  .catch((err) => {
                    console.log("err", err);
                    FailureToast();
                  });
              }}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerPlotDataCard;
