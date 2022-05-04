import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./FarmerProfile.css";
import axios from "axios";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { FailureToast } from "../Toasts/AllToasts";
import FarmerPersonalInfo from "./FarmerPersonalInfoCard";
import FarmerPlotDataCard from "./FarmerPlotDataCard";
import FarmerSeasonalDataCard from "./FarmerSeasonDataCard";

function FarmerProfile(props) {
  const { MHCodeFromParams } = useParams();
  const [allFarmers, setAllFarmers] = useState({
    farmerID: "None",
    plot: [],
    farmerName: "None",
  });
  const [selectedFarmer, setSelectedFarmer] = useState({});

  // function to get data from FarmerPersonalInfoCard
  function sendBackFarmerAllData(data) {
    setFarmerAllData(data);
  }

  // function to get data from FarmerPlotDataCard
  function sendBackPlotAllData(data) {
    setPlotAllData(data);
  }

  // function to get data from FarmerSeasonalDataCard
  function sendBackSeasonalAllData(data) {
    setSeasonalAllData(data);
  }

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
    profileId: "",
    profileUrl: "",
  });

  const [plotAllData, setPlotAllData] = useState({
    farmInformation: {},
    address: { coordinates: {} },
    other: { tags: [] },
    cropSpacing: { betweenTwoCrops: "", betweenTwoRows: "" },
  });

  const dummyEmptySeasonalAllData = [
    {
      MRLResults: {
        maxIndividual: "",
        sum: "",
        numberOfDetection: "",
        redListChemicals: [],
        MRLReportLink: "",
      },
      cropMilestoneDates: {
        plantation: "",
        foundationPruning: "",
        fruitPruning: "",
        readyToHarvest: "",
        actualHarvest: "",
      },
      yield: {
        exportTonnage: null,
        localTonnage: null,
      },
      qualityJotforms: {
        knittingQCLinks: [],
        packingQCLinks: [],
        FGQCLinks: [],
        onArrivalQCLinks: [],
        preharvestQCLink: "",
        primaryIssueFaced: "",
        invardQCLink: "",
      },
      reports: {
        petioleReportUrl: "",
        petioleReportId: "",
        soilReportUrl: "",
        soilReportId: "",
        waterReportUrl: "",
        waterReportId: "",
      },

      farmerId: "",
      plotId: "",
      year: null,
      primaryQualityIssuesFaced: [],
      quality: "",
    },
  ];

  const [seasonalAllData, setSeasonalAllData] = useState(
    dummyEmptySeasonalAllData
  );

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

            let i = 0;
            for (i = 0; i < receivedData.plots.length; i++) {
              if (
                receivedData.plots[i].farmInformation.MHCode ===
                MHCodeFromParams
              ) {
                // console.log("Matched");
                console.log(receivedData.plots[i]);
                setPlotAllData({ ...receivedData.plots[i] });
                break;
              }
            }

            // fetching the seasonal data of plot from which we landed on profile page
            axios
              .get(
                "https://immense-beach-88770.herokuapp.com/seasonalData/plots/" +
                  receivedData.plots[i]._id
              )
              .then((data) => {
                // console.log("Seasonal data", data.data[0]);
                if (data.data.length) setSeasonalAllData(data.data);
                else {
                  console.log(dummyEmptySeasonalAllData);
                  setSeasonalAllData(dummyEmptySeasonalAllData);
                }
              })
              .catch((err) => {
                console.log("Error", err);
              });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
          FailureToast();
        });
    }
    // get request for getting farmer and his corresponding plots
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
      .then((res) => {
        let Data = [...res.data];
        // console.log("Data Here :", Data);
        setAllFarmers(Data);
      })
      .catch((err) => {
        console.log("err", err);
        FailureToast();
      });
  }, []);

  return (
    <div className="FarmerProfile">
      <br />
      <div>
        <div className="FarmerSelectDiv">
          {props.flg ? (
            ""
          ) : (
            <Select
              placeholder="Select Farmer"
              options={allFarmers}
              className="FarmerSelect"
              getOptionLabel={(option) => option.farmerName}
              getOptionValue={(option) => option.farmerID}
              onChange={(opt) => {
                console.log("selected", opt);
                setSelectedFarmer({ FarmerID: opt.farmerID, plot: opt.plot });
              }}
            />
          )}
        </div>

        <div className="PlotSelectDiv">
          {props.flg ? (
            ""
          ) : (
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
                          //setting plot data of selected plot
                          setPlotAllData({ ...receivedData.plots[i] });

                          // fetching seasonal data of all years of a selected farmer's selected plot
                          axios
                            .get(
                              "https://immense-beach-88770.herokuapp.com/seasonalData/plots/" +
                                receivedData.plots[i]._id
                            )
                            .then((data) => {
                              // console.log("Seasonal data", data.data[0]);
                              if (data.data.length)
                                setSeasonalAllData(data.data);
                              else {
                                console.log(dummyEmptySeasonalAllData);
                                setSeasonalAllData(dummyEmptySeasonalAllData);
                              }
                            })
                            .catch((err) => {
                              console.log("Error", err);
                            });
                        }
                      }
                    }
                  })
                  .catch((err) => {
                    console.log("Error:", err);
                    FailureToast();
                  });
              }}
            />
          )}
        </div>
      </div>
      <br />
      <FarmerPersonalInfo
        farmerAllData={farmerAllData}
        sendBackFarmerAllData={sendBackFarmerAllData}
      />
      <hr />
      <br />
      <FarmerPlotDataCard
        plotAllData={plotAllData}
        sendBackPlotAllData={sendBackPlotAllData}
      />
      <hr />
      <br />
      <FarmerSeasonalDataCard
        seasonalAllData={seasonalAllData}
        sendBackSeasonalAllData={sendBackSeasonalAllData}
        farmerId={
          selectedFarmer.FarmerID
            ? selectedFarmer.FarmerID
            : farmerAllData.farmerId
        }
        plotId={plotAllData._id}
        MHCode={plotAllData.farmInformation.MHCode}
      />
      <br />
      <ToastContainer />
    </div>
  );
}

export default FarmerProfile;
