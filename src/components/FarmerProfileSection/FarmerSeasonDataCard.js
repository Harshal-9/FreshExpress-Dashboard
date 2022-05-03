import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import { MultiSelect } from "react-multi-select-component";
import Popup from "./Popup";

function FarmerSeasonalDataCard(props) {
  const issueArray = [
    { label: "Pest", value: "Pest" },
    { label: "Size", value: "Size" },
    { label: "Decay", value: "Decay" },
    { label: "Insect bite decay", value: "Insect bite decay" },
    { label: "Mold", value: "Mold" },
    { label: "Internal Browning", value: "Internal Browning" },
    { label: "Bruising", value: "Bruising" },
    { label: "Berry drop", value: "Berry drop" },
    { label: "Thrips", value: "Thrips" },
    { label: "Black dots", value: "Black dots" },
    { label: "Stem", value: "Stem" },
    { label: "Cracking", value: "Cracking" },
    { label: "Fruit Fly", value: "Fruit Fly" },
    { label: "Soft berries", value: "Soft berries" },
    { label: "Shrivel skin", value: "Shrivel skin" },
    { label: "Cap Stem", value: "Cap Stem" },
    { label: "Brix", value: "Brix" },
    { label: "Color", value: "Color" },
    { label: "MRL", value: "MRL" },
  ];
  // console.log("prop", props);
  const navigate = useNavigate();
  const [isDisabledSeason, setIsDisabledSeason] = useState(true);
  const [newYearVal, setNewYearVal] = useState("");
  const [seasonalAllDataReceived, setSeasonalAllDataReceived] = useState(
    props.seasonalAllData[0]
  );
  const [
    selectedPrimaryQualityIssuesFaces,
    setSelectedPrimaryQualityIssuesFaced,
  ] = useState([]);
  const sendBackSeasonalAllData = props.sendBackSeasonalAllData;
  const [popupClicked, setPopupClicked] = useState(false);
  const [sendToPopup, setSendToPopup] = useState({
    qualityJotform: "",
    arr: [],
  });

  const [petioleReport, setPetioleReport] = useState({});
  const [soilReport, setSoilReport] = useState({});
  const [waterReport, setWaterReport] = useState({});

  // Function to handle edit of PlotData form
  function handleEditSeason(event) {
    event.preventDefault();
    if (isDisabledSeason) {
      setIsDisabledSeason(false);
    } else {
      setIsDisabledSeason(true);
    }
  }

  function togglePop() {
    console.log("Called", popupClicked);
    if (popupClicked) setPopupClicked(false);
    else {
      setPopupClicked(true);
    }
  }

  function dataFromPopup(receivedData) {
    console.log("Obtained here", receivedData);
    let tempData = { ...seasonalAllDataReceived };

    switch (receivedData.data) {
      case "knittingQCLinks":
        tempData.qualityJotforms.knittingQCLinks = receivedData.modifiedData;
        setSeasonalAllDataReceived(tempData);
        break;

      case "onArrivalQCLinks":
        tempData.qualityJotforms.onArrivalQCLinks = receivedData.modifiedData;
        setSeasonalAllDataReceived(tempData);
        break;

      case "packingQCLinks":
        tempData.qualityJotforms.packingQCLinks = receivedData.modifiedData;
        setSeasonalAllDataReceived(tempData);
        break;

      case "FGQCLinks":
        tempData.qualityJotforms.FGQCLinks = receivedData.modifiedData;
        setSeasonalAllDataReceived(tempData);
        break;

      default:
    }
  }

  function handleReportUpload(event) {
    const handleChangeSelectedFile = event.target.files[0];
    console.log(event.target.name);

    const fd = new FormData();
    if (handleChangeSelectedFile)
      fd.append(
        "image",
        handleChangeSelectedFile,
        handleChangeSelectedFile.name
      );

    // Deleting previous image
    // if (seasonalAllDataReceived.reports.soilReportId)

    // Getting link of uploaded image
    axios
      .post(
        "https://immense-beach-88770.herokuapp.com/uploadFile/REPORTS_FOLDER",
        fd
      )
      .then((res) => {
        UpdateSuccessToast(
          "File : " + handleChangeSelectedFile.name + " uploaded successfully !"
        );

        if (event.target.name === "petioleReports") {
          setPetioleReport({
            link: res.data.link,
            id: res.data.id,
          });

          axios
            .delete(" https://immense-beach-88770.herokuapp.com/uploadFile", {
              id: seasonalAllDataReceived.reports.petioleReportId,
            })
            .then((res2) => {
              console.log("Res", res2);
            })
            .catch((err) => {
              console.log("Err", err);
            });

          const prevData = { ...seasonalAllDataReceived };
          prevData.reports.petioleReportUrl = res.data.link;
          prevData.reports.petioleReportId = res.data.id;
          setSeasonalAllDataReceived(prevData);
        }

        if (event.target.name === "soilReports") {
          setSoilReport({
            link: res.data.link,
            id: res.data.id,
          });

          axios
            .delete(" https://immense-beach-88770.herokuapp.com/uploadFile", {
              id: seasonalAllDataReceived.reports.soilReportId,
            })
            .then((res2) => {
              console.log("Res", res2);
            })
            .catch((err) => {
              console.log("Err", err);
            });

          const prevData = { ...seasonalAllDataReceived };
          prevData.reports.soilReportUrl = res.data.link;
          prevData.reports.soilReportId = res.data.id;
          setSeasonalAllDataReceived(prevData);
        }

        if (event.target.name === "waterReports") {
          setWaterReport({
            link: res.data.link,
            id: res.data.id,
          });

          axios
            .delete(" https://immense-beach-88770.herokuapp.com/uploadFile", {
              id: seasonalAllDataReceived.reports.waterReportId,
            })
            .then((res2) => {
              console.log("Res", res2);
            })
            .catch((err) => {
              console.log("Err", err);
            });

          const prevData = { ...seasonalAllDataReceived };
          prevData.reports.waterReportUrl = res.data.link;
          prevData.reports.waterReportId = res.data.id;
          setSeasonalAllDataReceived(prevData);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  function handleNewYear(e) {
    e.preventDefault();
    let val = e.target.newYearValue.value;
    if (Number.isInteger(Number(val)) && Number(val) > 0) {
      const years = getYears(props.seasonalAllData);
      console.log(years);
      for (let yearObj in years) {
        if (years[yearObj].label === Number(val)) {
          CustomToast("Year already Exists", "black", "#FFD700");
          return;
        }
      }

      // Inserting New Year
      // const fd = new FormData();
      // fd.append("farmerId", props.farmerId);
      // fd.append("plotId", props.plotId);
      // fd.append("MHCode", props.MHCode);
      // fd.append("year", Number(val));

      const dataToSend = {
        farmerId: props.farmerId,
        plotId: props.plotId,
        MHCode: props.MHCode,
        GGN: "",
        year: Number(val),
        cropMilestoneDates: {
          plantation: "",
          foundationPruning: "",
          fruitPruning: "",
          readyToHarvest: "",
          actualHarvest: "",
        },
        yield: {
          exportTonnage: 0,
          localTonnage: 0,
        },
        primaryQualityIssuesFaced: [], //to store various issues faced in spreadsheet it is mentioned a true false
        MRLResults: {
          maxIndividual: 0, //%value
          sum: 0, //% value
          numberOfDetection: 0,
          redListChemicals: [],
          MRLReportLink: "", //drive link
        },
        qualityJotforms: {
          preharvestQCLink: "",
          primaryIssueFaced: "",
          invardQCLink: "",
          knittingQCLinks: [],
          packingQCLinks: [],
          FGQCLinks: [],
          onArrivalQCLinks: [],
        },
        reports: {
          petioleReportUrl: "",
          petioleReportId: "",
          soilReportUrl: "",
          soilReportId: "",
          waterReportUrl: "",
          waterReportId: "",
        },

        quality: "",
      };

      console.log("Data", dataToSend);

      axios
        .post(
          "https://immense-beach-88770.herokuapp.com/seasonalData",
          dataToSend
        )
        .then((res) => {
          CustomToast(
            "Year added successfully ! Page will be reloaded",
            "black",
            "#1cd855"
          );
          console.log("Res", res);
          // setTimeout(() => window.location.reload(), 2000);
          // setTimeout(() => navigate("/FarmerProfile/" + props.MHCode), 2000);
          setTimeout(
            () => window.location.assign("/FarmerProfile/" + props.MHCode),
            2000
          );
        })
        .catch((err) => {
          FailureToast();
          console.log("Err", err);
        });
    } else {
      CustomToast("Enter Valid Year", "black", "#FFD700");
      setNewYearVal("");
    }
  }

  return (
    <div className="MyCardColumn" style={{ display: "inline-block" }}>
      <div className="MyCard" style={{ width: "98%" }}>
        {/* <label>Add New Year : </label> */}
        {/* Adding New Year  */}
        <form onSubmit={handleNewYear}>
          <input
            type={"text"}
            name="newYearValue"
            placeholder="Enter New Year"
            style={{
              textAlign: "center",
              marginRight: "15px",
            }}
            value={newYearVal}
            onChange={(e) => {
              setNewYearVal(e.value);
            }}
          ></input>
          <button
            style={{ fontFamily: "verdana", height: "23.5px", width: "100px" }}
          >
            Add Year
          </button>
        </form>
        <br />
        <br />
        <Select
          placeholder="Select a year"
          options={getYears(props.seasonalAllData)}
          onChange={(event) => {
            // console.log(event);
            setSeasonalAllDataReceived(props.seasonalAllData[event.value]);
          }}
        />
        <br />
        <div style={{ display: "inline-block" }}>
          <div style={{ textAlign: "right" }}>
            <i
              className="fa fa-edit fa-lg"
              aria-hidden="true"
              onClick={handleEditSeason}
            ></i>
          </div>
          <form>
            <div
              style={{
                display: "inline-block",
                marginRight: "40px",
              }}
            >
              <label className="FarmerProfileLabel2">Plantation :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={dateInString(
                  seasonalAllDataReceived.cropMilestoneDates.plantation
                )}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.cropMilestoneDates.plantation = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Foundation Pruning :
              </label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={dateInString(
                  seasonalAllDataReceived.cropMilestoneDates.foundationPruning
                )}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.cropMilestoneDates.foundationPruning =
                    event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Fruit Pruning :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={dateInString(
                  seasonalAllDataReceived.cropMilestoneDates.fruitPruning
                )}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.cropMilestoneDates.fruitPruning = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Ready To Harvest :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={dateInString(
                  seasonalAllDataReceived.cropMilestoneDates.readyToHarvest
                )}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.cropMilestoneDates.readyToHarvest =
                    event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Actual Harvest :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={dateInString(
                  seasonalAllDataReceived.cropMilestoneDates.actualHarvest
                )}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.cropMilestoneDates.actualHarvest =
                    event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Local Tonnage : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.yield.localTonnage}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.yield.localTonnage = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
            </div>
            {/* other div */}
            <div style={{ display: "inline-block" }}>
              <label className="FarmerProfileLabel2">Max Individual : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.MRLResults.maxIndividual}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.MRLResults.maxIndividual = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Sum : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.MRLResults.sum}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.MRLResults.sum = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">No of Detection : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.MRLResults.numberOfDetection}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.MRLResults.numberOfDetection = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Red List Chemicals :
              </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.MRLResults.redListChemicals.toString()}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.MRLResults.redListChemicals =
                    event.target.value.split(",");
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">MRL Report Link : </label>
              {isDisabledSeason ? (
                <a
                  href={seasonalAllDataReceived.MRLResults.MRLReportLink}
                  target="_blank"
                >
                  <input
                    type="text"
                    disabled={true}
                    size="40"
                    value={seasonalAllDataReceived.MRLResults.MRLReportLink}
                    className="FarmerProfileLink"
                  ></input>
                </a>
              ) : (
                <input
                  type="text"
                  disabled={isDisabledSeason}
                  size="40"
                  value={seasonalAllDataReceived.MRLResults.MRLReportLink}
                  onChange={(event) => {
                    const prevData = { ...seasonalAllDataReceived };
                    prevData.MRLResults.MRLReportLink = event.target.value;
                    setSeasonalAllDataReceived(prevData);
                  }}
                ></input>
              )}
              <br />
              <br />
              <label className="FarmerProfileLabel2">Export Tonnage : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.yield.exportTonnage}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.yield.exportTonnage = event.target.value;
                  setSeasonalAllDataReceived(prevData);
                }}
              ></input>
              <br />
              <br />
            </div>
            <hr />
            <div>
              {popupClicked ? (
                isDisabledSeason ? (
                  <Popup
                    toggle={togglePop}
                    dataToPopup={sendToPopup}
                    dataFromPopup={dataFromPopup}
                    view={true}
                  />
                ) : (
                  <Popup
                    toggle={togglePop}
                    dataToPopup={sendToPopup}
                    dataFromPopup={dataFromPopup}
                    view={false}
                  />
                )
              ) : null}
            </div>
            <div>
              <div
                className="1"
                style={{
                  display: "inline-block",
                  marginRight: "40px",
                }}
              >
                <br />
                <label className="FarmerProfileLabel2">
                  Pre Harvest QCLink :
                </label>
                {isDisabledSeason ? (
                  <a
                    href={
                      seasonalAllDataReceived.qualityJotforms.preharvestQCLink
                    }
                    target="_blank"
                  >
                    <input
                      type="text"
                      disabled={true}
                      size="40"
                      value={
                        seasonalAllDataReceived.qualityJotforms.preharvestQCLink
                      }
                      className="FarmerProfileLink"
                    ></input>
                  </a>
                ) : (
                  <input
                    type="text"
                    disabled={isDisabledSeason}
                    size="40"
                    value={
                      seasonalAllDataReceived.qualityJotforms.preharvestQCLink
                    }
                    onChange={(event) => {
                      const prevData = { ...seasonalAllDataReceived };
                      prevData.qualityJotforms.preharvestQCLink =
                        event.target.value;
                      setSeasonalAllDataReceived(prevData);
                    }}
                  ></input>
                )}
                <br />
                <br />
                <label className="FarmerProfileLabel2">Invard QCLink : </label>
                {isDisabledSeason ? (
                  <a
                    href={seasonalAllDataReceived.qualityJotforms.invardQCLink}
                    target="_blank"
                  >
                    <input
                      type="text"
                      disabled={true}
                      size="40"
                      value={
                        seasonalAllDataReceived.qualityJotforms.invardQCLink
                      }
                      className="FarmerProfileLink"
                    ></input>
                  </a>
                ) : (
                  <input
                    type="text"
                    disabled={isDisabledSeason}
                    size="40"
                    value={seasonalAllDataReceived.qualityJotforms.invardQCLink}
                    onChange={(event) => {
                      const prevData = { ...seasonalAllDataReceived };
                      prevData.qualityJotforms.invardQCLink =
                        event.target.value;
                      setSeasonalAllDataReceived(prevData);
                    }}
                  ></input>
                )}
                <br />
                <br />

                <label className="FarmerProfileLabel2">Knitting QCLink :</label>
                <input
                  type="button"
                  value={isDisabledSeason ? "View Links" : "Edit Links"}
                  style={{ width: "377px", height: "18.4px" }}
                  onClick={() => {
                    setSendToPopup({
                      qualityJotform: "knittingQCLinks",
                      arr: seasonalAllDataReceived.qualityJotforms
                        .knittingQCLinks,
                    });
                    togglePop();
                  }}
                  size="40"
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel2">Packing QCLink : </label>
                <input
                  type="button"
                  value={isDisabledSeason ? "View Links" : "Edit Links"}
                  style={{ width: "377px", height: "18.4px" }}
                  onClick={() => {
                    setSendToPopup({
                      qualityJotform: "packingQCLinks",
                      arr: seasonalAllDataReceived.qualityJotforms
                        .packingQCLinks,
                    });
                    togglePop();
                  }}
                  size="40"
                ></input>
                <br />
                <br />
              </div>
              <div className="2" style={{ display: "inline-block" }}>
                <br />
                <label className="FarmerProfileLabel2">FG QCLink : </label>
                <input
                  type="button"
                  value={isDisabledSeason ? "View Links" : "Edit Links"}
                  style={{ width: "377px", height: "18.4px" }}
                  onClick={() => {
                    setSendToPopup({
                      qualityJotform: "FGQCLinks",
                      arr: seasonalAllDataReceived.qualityJotforms.FGQCLinks,
                    });
                    togglePop();
                  }}
                  size="40"
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel2">
                  On Arrival QCLinks :
                </label>
                <input
                  type="button"
                  value={isDisabledSeason ? "View Links" : "Edit Links"}
                  style={{ width: "377px", height: "18.4px" }}
                  onClick={() => {
                    setSendToPopup({
                      qualityJotform: "onArrivalQCLinks",
                      arr: seasonalAllDataReceived.qualityJotforms
                        .onArrivalQCLinks,
                    });
                    togglePop();
                  }}
                  size="40"
                ></input>
                <br />
                <br />

                <label className="FarmerProfileLabel2">
                  Primary Issue Faced :
                </label>
                <input
                  type="text"
                  disabled={isDisabledSeason}
                  size="40"
                  value={
                    seasonalAllDataReceived.qualityJotforms.primaryIssueFaced
                  }
                  onChange={(event) => {
                    const prevData = { ...seasonalAllDataReceived };
                    prevData.qualityJotforms.primaryIssueFaced =
                      event.target.value;
                    setSeasonalAllDataReceived(prevData);
                  }}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel2">Quality :</label>
                <input
                  type="text"
                  disabled={isDisabledSeason}
                  size="40"
                  value={seasonalAllDataReceived.quality}
                  onChange={(event) => {
                    const prevData = { ...seasonalAllDataReceived };
                    // const prevData = seasonalAllDataReceived;
                    console.log(event.target.value);
                    prevData.quality = event.target.value;
                    setSeasonalAllDataReceived(prevData);
                  }}
                ></input>
                <br />
                <br />
              </div>
            </div>
            <hr />
            <br />
            <label className="FarmerProfileLabel2" style={{ width: "235px" }}>
              Primary Quality Issues Faced :
            </label>
            {isDisabledSeason ? (
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                style={{ width: "49%" }}
                value={seasonalAllDataReceived.primaryQualityIssuesFaced}
                onChange={(event) => {
                  // const prevData = { ...seasonalAllDataReceived };
                  // prevData.primaryQualityIssuesFaced =
                  //   event.target.value.split(",");
                  // setSeasonalAllDataReceived(prevData);
                }}
              ></input>
            ) : (
              <MultiSelect
                className="filter"
                // options={allFiltersData.village}
                options={issueArray}
                value={selectedPrimaryQualityIssuesFaces}
                onChange={setSelectedPrimaryQualityIssuesFaced}
                // isLoading={true}
                // isCreatable={true}
                // shouldToggleOnHover={true}
                overrideStrings={{
                  selectSomeItems: "Select Issues",
                  allItemsAreSelected: "All Issues selected",
                }}
              />
            )}
            <br />
            <br />

            <label className="FarmerProfileLabel2" style={{ width: "235px" }}>
              Petiole Reports:
            </label>
            {isDisabledSeason ? (
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                value={
                  seasonalAllDataReceived.reports
                    ? seasonalAllDataReceived.reports.petioleReportUrl
                    : ""
                }
              ></input>
            ) : (
              <input
                type="file"
                name="petioleReports"
                onChange={(e) => handleReportUpload(e)}
              />
            )}
            <br />
            <br />
            <label className="FarmerProfileLabel2" style={{ width: "235px" }}>
              Soil Reports:
            </label>
            {isDisabledSeason ? (
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                value={
                  seasonalAllDataReceived.reports
                    ? seasonalAllDataReceived.reports.soilReportUrl
                    : ""
                }
              ></input>
            ) : (
              <input
                type="file"
                name="soilReports"
                onChange={(e) => handleReportUpload(e)}
              />
            )}
            <br />
            <br />
            <label className="FarmerProfileLabel2" style={{ width: "235px" }}>
              Water Reports:
            </label>
            {isDisabledSeason ? (
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                value={
                  seasonalAllDataReceived.reports
                    ? seasonalAllDataReceived.reports.waterReportUrl
                    : ""
                }
              ></input>
            ) : (
              <input
                type="file"
                name="waterReports"
                onChange={(e) => handleReportUpload(e)}
              />
            )}
            <br />
            <br />
          </form>
          {isDisabledSeason ? null : (
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsDisabledSeason(true);

                let finalIssues = [];
                for (let item in selectedPrimaryQualityIssuesFaces) {
                  console.log(selectedPrimaryQualityIssuesFaces[item]);
                  finalIssues.push(
                    selectedPrimaryQualityIssuesFaces[item].value
                  );
                }
                const prevData = {
                  ...seasonalAllDataReceived,
                };
                if (
                  selectedPrimaryQualityIssuesFaces &&
                  selectedPrimaryQualityIssuesFaces.length !== 0
                ) {
                  prevData.primaryQualityIssuesFaced = finalIssues;
                }

                setSeasonalAllDataReceived(prevData);

                console.log(prevData);
                //to send data back to farmer Profile
                // sendBackSeasonalAllData([seasonalAllDataReceived]);
                axios
                  .post(
                    "https://immense-beach-88770.herokuapp.com/seasonalData/edit/" +
                      prevData._id,
                    prevData
                  )
                  .then((data) => {
                    console.log("updated", data);
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
          )}
          {isDisabledSeason && seasonalAllDataReceived.year ? (
            <button
              className="deleteButton"
              onClick={() => {
                // console.log("deleted", seasonalAllDataReceived._id);

                axios
                  .post(
                    "https://immense-beach-88770.herokuapp.com/seasonalData/delete/deleteBySeasonalId/" +
                      seasonalAllDataReceived._id
                  )
                  .then((res) => {
                    CustomToast(
                      "Seasonal data deleted successfully ! Page will be reloaded",
                      "black",
                      "#1cd855"
                    );
                    console.log("Res", res);
                    setTimeout(() => window.location.reload(), 2000);
                  })
                  .catch((err) => {
                    FailureToast();
                    console.log("Err", err);
                  });
              }}
            >
              <i className="fa fa-trash"></i> Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FarmerSeasonalDataCard;

function dateInString(receivedDate) {
  let myDate = "";
  if (receivedDate) myDate = receivedDate.substring(0, 10);
  return myDate;
}

function getYears(receivedDataFromBackend) {
  const years = [];
  for (let i = 0; i < receivedDataFromBackend.length; i++) {
    years.push({
      label: receivedDataFromBackend[i].year,
      value: i,
    });
  }
  return years;
}
