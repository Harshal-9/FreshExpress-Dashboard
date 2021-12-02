import React, { useState } from "react";
import Select from "react-select";
import Popup from "./Popup";

function FarmerSeasonalDataCard(props) {
  // console.log(props);

  const [isDisabledSeason, setIsDisabledSeason] = useState(true);

  const [seasonalAllDataReceived, setSeasonalAllDataReceived] = useState(
    props.seasonalAllData[0]
  );

  const sendBackSeasonalAllData = props.sendBackSeasonalAllData;

  // Function to handle edit of PlotData form
  function handleEditSeason(event) {
    event.preventDefault();
    if (isDisabledSeason) {
      setIsDisabledSeason(false);
    } else {
      setIsDisabledSeason(true);
    }
  }

  const [popupClicked, setPopupClicked] = useState(false);
  const [sendToPopup, setSendToPopup] = useState({
    qualityJotform: "",
    arr: [],
  });
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

  return (
    <div className="MyCardColumn" style={{ display: "inline-block" }}>
      <div className="MyCard" style={{ width: "98%" }}>
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
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
                  sendBackSeasonalAllData(prevData);
                }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">MRL Report Link : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                value={seasonalAllDataReceived.MRLResults.MRLReportLink}
                onChange={(event) => {
                  const prevData = { ...seasonalAllDataReceived };
                  prevData.MRLResults.MRLReportLink = event.target.value;
                  sendBackSeasonalAllData(prevData);
                }}
              ></input>
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
                  sendBackSeasonalAllData(prevData);
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
                <label className="FarmerProfileLabel2">Invard QCLink : </label>
                <input
                  type="text"
                  disabled={isDisabledSeason}
                  size="40"
                  value={seasonalAllDataReceived.qualityJotforms.invardQCLink}
                  onChange={(event) => {
                    const prevData = { ...seasonalAllDataReceived };
                    prevData.qualityJotforms.invardQCLink = event.target.value;
                    sendBackSeasonalAllData(prevData);
                  }}
                ></input>
                <br />
                <br />
                <label className="FarmerProfileLabel2">
                  Pre Harvest QCLink :
                </label>
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
                    sendBackSeasonalAllData(prevData);
                  }}
                ></input>
                <br />
                <br />
              </div>
              <div className="2" style={{ display: "inline-block" }}>
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
                    sendBackSeasonalAllData(prevData);
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
                    sendBackSeasonalAllData(prevData);
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
            <input
              type="text"
              disabled={isDisabledSeason}
              size="40"
              style={{ width: "49%" }}
              value={seasonalAllDataReceived.primaryQualityIssuesFaced}
              onChange={(event) => {
                const prevData = { ...seasonalAllDataReceived };
                prevData.primaryQualityIssuesFaced =
                  event.target.value.split(",");
                sendBackSeasonalAllData(prevData);
              }}
            ></input>
            <br />
            <br />
          </form>
          {isDisabledSeason ? null : (
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsDisabledSeason(true);
                console.log(seasonalAllDataReceived);
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

export default FarmerSeasonalDataCard;

function dateInString(receivedDate) {
  const myDate = receivedDate.substring(0, 10);
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
