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
    name: "",
    familyName: "",
    mobileNumber: "",
    email: "",
    GGN: "",
    consultantName: "",
    farmMap: "",
    farmerId: "",
  });

  const [cropSpacingString, setCropSpacingString] = useState("");

  const [plotAllData, setPlotAllData] = useState({
    farmInformation: {},
    address: { coordinates: {} },
    other: { tags: [] },
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
            // console.log("Recived by MHCode", receivedData);
            setFarmerAllData({
              ...receivedData.personalInformation,
              farmerId: receivedData._id,
            });

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
        // console.log("Data Here :", Data);
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
          {/* <h2>Select Farmer:</h2> */}
          <Select
            placeholder="Select Farmer"
            options={allFarmers}
            className="FarmerSelect"
            getOptionLabel={(option) => option.farmerName}
            getOptionValue={(option) => option.farmerID}
            onChange={(opt) => {
              setSelectedFarmer({ FarmerID: opt.farmerID, plot: opt.plot });
            }}
          />
        </div>

        <div className="PlotSelectDiv">
          {/* <h2>Select Plot:</h2> */}
          <Select
            placeholder="Select Plot"
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
              axios
                .get(
                  "https://immense-beach-88770.herokuapp.com/farmers/MHCode/" +
                    event.MHCode
                )
                .then((data) => {
                  // console.log("Recived by MHCode", data.data, data.data.length);
                  if (data.data.length) {
                    let receivedData = data.data[0];
                    setFarmerAllData({
                      ...receivedData.personalInformation,
                      farmerId: receivedData._id,
                    });

                    for (let i = 0; i < receivedData.plots.length; i++) {
                      if (
                        receivedData.plots[i].farmInformation.MHCode ===
                        event.MHCode
                      ) {
                        setPlotAllData({ ...receivedData.plots[i] });
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
                size="80"
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
                size="80"
                value={farmerAllData.familyName}
                onChange={(event) => {
                  setFarmerAllData({
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
                  setFarmerAllData({
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
                  setFarmerAllData({
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
                disabled={isDisabled}
                size="80"
                value={farmerAllData.GGN}
                onChange={(event) => {
                  setFarmerAllData({
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
                  setFarmerAllData({
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
                    setFarmerAllData({
                      ...farmerAllData,
                      farmMap: event.target.value,
                    });
                  }}
                ></input>
              )}
              <br />
              <br />
              {isDisabled ? null : (
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
                      })
                      .catch((err) => {
                        console.log("Error", err);
                      });
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
                  size="40"
                  value={plotAllData.farmInformation.plotNumber}
                  onChange={(event) => {
                    const prevData = { ...plotAllData };
                    prevData.farmInformation.plotNumber = event.target.value;
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
                  }}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel">
                  Plot Location Link :
                </label>
                {isDisabledPlot ? (
                  <a href={plotAllData.address.mapLink}>
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
                      setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
                  }}
                ></input>
                <br />
                <br />
              </div>
              <div style={{ display: "inline-block" }}>
                <label className="FarmerProfileLabel">MH Code : </label>
                <input
                  type="text"
                  disabled={isDisabledPlot}
                  size="40"
                  value={plotAllData.farmInformation.MHCode}
                  onChange={(event) => {
                    const prevData = { ...plotAllData };
                    prevData.farmInformation.MHCode = event.target.value;
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                    setPlotAllData(prevData);
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
                  setPlotAllData(prevData);

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
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });
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
