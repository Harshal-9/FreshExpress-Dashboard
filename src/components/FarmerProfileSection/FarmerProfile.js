import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./FarmerProfile.css";
import axios from "axios";
import { useParams } from "react-router";

function FarmerProfile(props) {
  // console.log("props", props);
  const { MHCodeFromParams } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledPlot, setIsDisabledPlot] = useState(true);
  const [allFarmers, setAllFarmers] = useState({
    farmerID: "None",
    plot: [],
    farmerName: "None",
  });
  const [selectedFarmer, setSelectedFarmer] = useState({});

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

  // Function to handle change
  // function handleChange(event) {
  //   setFarmerAllData({
  //     ...farmerAllData,
  //     name: event.target.value,
  //   });
  // }

  // Doing for MH code
  const [farmerAllData, setFarmerAllData] = useState({
    name: "Harshal Kodgire",
    familyName: "Harshal Kodgire",
    mobileNumber: "8485016578",
    emailId: "a@b",
    GGN: "G123",
    consultantName: "Rutwik Sawant",
    farmMap: "https://abc.com",
  });

  const [plotAllData, setPlotAllData] = useState({
    farmInformation: {},
    address: { coordinates: {} },
    other: { tags: "" },
    cropSpacing: { betweenTwoCrops: "", betweenTwoRows: "" },
  });

  useEffect(() => {
    // console.log(MHCodeFromParams);
    // console.log(props.flg);

    if (props.flg) {
      axios
        .get(
          "https://immense-beach-88770.herokuapp.com/farmers/MHCode/" +
            MHCodeFromParams
        )
        .then((data) => {
          // console.log("Recived by MHCode", data.data, data.data.length);
          if (data.data.length) {
            let receivedData = data.data[0];
            // console.log("Recived by MHCode", receivedData.personalInformation);
            setFarmerAllData({ ...receivedData.personalInformation });

            for (let i = 0; i < receivedData.plots.length; i++) {
              if (
                receivedData.plots[i].farmInformation.MHCode ===
                MHCodeFromParams
              ) {
                // console.log("Matched");
                setPlotAllData({ ...receivedData.plots[i] });
                // console.log(receivedData.plots[i]);
              }
            }
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
      .then((res) => {
        let Data = [...res.data];
        console.log("Data Here :", Data);
        setAllFarmers(Data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="FarmerProfile">
      <br />
      <div>
        <div className="FarmerSelectDiv">
          <h2>Select Farmer:</h2>
          <Select
            options={allFarmers}
            className="FarmerSelect"
            getOptionLabel={(option) => option.farmerName}
            getOptionValue={(option) => option.farmerID}
            onChange={(opt) => {
              console.log({ FarmerID: opt.farmerID, plot: opt.plot });
              setSelectedFarmer({ FarmerID: opt.farmerID, plot: opt.plot });
            }}
          />
        </div>

        <div className="PlotSelectDiv">
          <h2>Select Plot:</h2>
          <Select
            options={selectedFarmer.plot}
            getOptionLabel={(option) =>
              "(" +
              option.plot +
              ") " +
              option.farmerName +
              " - " +
              option.MHCode
            }
            getOptionValue={(option) => option.MHCode}
            className="PlotSelect"
            onChange={(event) => {
              console.log(event.MHCode);
              axios
                .get(
                  "https://immense-beach-88770.herokuapp.com/farmers/MHCode/" +
                    event.MHCode
                )
                .then((data) => {
                  console.log("Recived by MHCode", data.data, data.data.length);
                  if (data.data.length) {
                    let receivedData = data.data[0];
                    // console.log("Recived by MHCode", receivedData.personalInformation);
                    setFarmerAllData({
                      ...receivedData.personalInformation,
                    });

                    for (let i = 0; i < receivedData.plots.length; i++) {
                      if (
                        receivedData.plots[i].farmInformation.MHCode ===
                        event.MHCode
                      ) {
                        // console.log("Matched");
                        setPlotAllData({ ...receivedData.plots[i] });
                        // console.log(receivedData.plots[i]);
                      }
                    }
                  }
                })
                .catch((err) => {
                  console.log("Error:", err);
                });
            }}
          />
        </div>
      </div>
      <br />
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
                size="100"
                value={farmerAllData.name}
                onChange={(event) => {
                  setFarmerAllData({
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
                disabled={isDisabled}
                size="100"
                value={farmerAllData.familyName}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Mobile Number : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="100"
                value={farmerAllData.mobileNumber}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Email ID : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="100"
                // value={farmerAllData.emailId}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">GGN Number : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="100"
                value={farmerAllData.GGN}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Consultant Name : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="100"
                value={plotAllData.other.consultantName}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel">Farm Map Link : </label>
              <input
                type="url"
                disabled={isDisabled}
                size="100"
                value={farmerAllData.farmMap}
              ></input>
              <br />
              <br />
              {isDisabled ? null : (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setIsDisabled(true);
                    // console.log(farmerAllData);
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
                  size="50"
                  value={plotAllData.farmInformation.plotNumber}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Variety : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.farmInformation.variety}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Soil Type : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.farmInformation.soilType}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Plot Area : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.farmInformation.plotArea}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">
                  Plot Location Link :
                </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.mapLink}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Latitude : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.coordinates.latitude}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Longitude : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.coordinates.longitude}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Crop : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.farmInformation.crop}
                ></input>
                <br />
                <br />
              </div>
              <div style={{ display: "inline-block" }}>
                <label className="FarmerProfileLabel">MH Code : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.farmInformation.MHCode}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Village : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.village}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Taluka : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.taluka}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">District : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.district}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Pin Code : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.address.pincode}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Tags : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.other.tags.toString()}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Notes : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={plotAllData.other.notes}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">Crop Spacing : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="50"
                  value={
                    plotAllData.cropSpacing.betweenTwoRows +
                    " X " +
                    plotAllData.cropSpacing.betweenTwoCrops
                  }
                ></input>
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
