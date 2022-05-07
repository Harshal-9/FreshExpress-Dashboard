import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CustomToast } from "../Toasts/AllToasts";
import "./SingleDiary.css";

// function to get completion status
function getCompletionStatus(dateReceived) {
  if (new Date(dateReceived.substring(0, 10)) >= new Date()) return "Upcoming";
  else if (new Date(dateReceived.substring(0, 10)) < new Date())
    return "Overdue";
}

// Spraying component
function SprayingOperation(props) {
  return (
    <>
      <br />
      <h1 className="SingleDiaryH1">Spraying</h1>
      <br />
      <p>
        Status :{" "}
        {props.completionStatus
          ? "completed"
          : getCompletionStatus(props.proposedDate)}
      </p>
      <p>Completion Date :{props.completionDate}</p>
      <p>Completed By : {props.farmerName}</p>
      <br />
      <div className="SingleDiaryScroll">
        <table>
          <tbody>
            <tr className="SingleDiaryHeaderRow">
              <td>Spraying Type</td>
              <td>Chemical</td>
              <td>Quantity</td>
            </tr>
            {props.allSprayingRowArray}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Irrigation component
function IrrigationOperation(props) {
  return (
    <>
      <br />
      <h1 className="SingleDiaryH1">Irrigation</h1>
      <br />
      <p>
        Status :
        {props.completionStatus
          ? "completed"
          : getCompletionStatus(props.proposedDate)}
      </p>
      <p>Completion Date :{props.completionDate}</p>
      <p>Completed By : {props.farmerName}</p>
      <br />
      <h3>Number of Hours of Irrigation : {props.numberOfHours}</h3>
      <br />
      <div className="SingleDiaryScroll">
        <table>
          <tbody>
            <tr className="SingleDiaryHeaderRow">
              <td>Fertilizer</td>
              <td>Quantity</td>
            </tr>
            {props.allIrrigationRowArray}
          </tbody>
        </table>
      </div>
    </>
  );
}

// FarmWork component
function FarmWorkOperation(props) {
  return (
    <>
      <br />
      <h1 className="SingleDiaryH1">Farm Work</h1>
      <br />
      <p>
        Status :
        {props.completionStatus
          ? "completed"
          : getCompletionStatus(props.proposedDate)}
      </p>
      <p>Completion Date :{props.completionDate}</p>
      <p>Completed By : {props.farmerName}</p>
      <br />
      <div className="SingleDiaryScroll">
        <table>
          <tbody>
            <tr className="SingleDiaryHeaderRow">
              <td>Work</td>
              <td>Comments</td>
            </tr>
            {props.allFarmWorkRowArray}
          </tbody>
        </table>
      </div>
    </>
  );
}

// SoilWork component
function SoilWorkOperation(props) {
  return (
    <>
      <br />
      <h1 className="SingleDiaryH1">Soil Work</h1>
      <br />
      <p>
        Status :
        {props.completionStatus
          ? "completed"
          : getCompletionStatus(props.proposedDate)}
      </p>
      <p>Completion Date :{props.completionDate}</p>
      <p>Completed By : {props.farmerName}</p>
      <br />
      <div className="SingleDiaryScroll">
        <table>
          <tbody>
            <tr className="SingleDiaryHeaderRow">
              <td>Work</td>
              <td>Distance covered</td>
            </tr>
            {props.allSoilWorkRowArray}
          </tbody>
        </table>
      </div>
    </>
  );
}

// MaintenanceWork component
function MaintenanceWorkOperation(props) {
  return (
    <>
      <br />
      <h1 className="SingleDiaryH1">Maintenance Work</h1>
      <br />
      <p>
        Status :
        {props.completionStatus
          ? "completed"
          : getCompletionStatus(props.proposedDate)}
      </p>
      <p>Completion Date :{props.completionDate}</p>
      <p>Completed By : {props.farmerName}</p>
      <br />
      <div className="SingleDiaryScroll">
        <table>
          <tbody>
            <tr className="SingleDiaryHeaderRow">
              <td>Items</td>
              <td>Details</td>
            </tr>
            {props.allMaintenanceWorkRowArray}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SingleDiary(props) {
  function SingleSprayingRow({ rowData }) {
    // console.log("Row", rowData);
    return (
      <tr className="SingleDiaryIndividualDiaryRow">
        <td>{rowData.category}</td>
        <td>{rowData.chemical}</td>
        <td>{rowData.quantity}</td>
      </tr>
    );
  }

  function SingleIrrigationRow({ rowData }) {
    // console.log("Row", rowData);
    return (
      <tr className="SingleDiaryIndividualDiaryRow">
        <td>{rowData.fertilizer}</td>
        <td>{rowData.quantity}</td>
      </tr>
    );
  }

  function SingleFarmWorkRow({ rowData }) {
    // console.log("Row", rowData);
    return (
      <tr className="SingleDiaryIndividualDiaryRow">
        <td>{rowData.work}</td>
        <td>{rowData.comments}</td>
      </tr>
    );
  }

  function SingleSoilWorkRow({ rowData }) {
    // console.log("Row", rowData);
    return (
      <tr className="SingleDiaryIndividualDiaryRow">
        <td>{rowData.work}</td>
        <td>{rowData.area}</td>
      </tr>
    );
  }

  function SingleMaintenanceWorkRow({ rowData }) {
    // console.log("Row", rowData);
    return (
      <tr className="SingleDiaryIndividualDiaryRow">
        <td>{rowData.item}</td>
        <td>{rowData.comments}</td>
      </tr>
    );
  }

  const { dailyDiaryId } = useParams();
  const { state } = useLocation();
  const [diaryDetails, setDiaryDetails] = useState();
  const [allSprayingRowArray, setAllSprayingRowArray] = useState([]);
  const [sprayingImageArray, setSprayingImageArray] = useState([]);
  const [allIrrigationRowArray, setAllIrrigationRowArray] = useState([]);
  const [irrigationImageArray, setIrrigationImageArray] = useState([]);
  const [allFarmWorkRowArray, setAllFarmWorkRowArray] = useState([]);
  const [farmWorkImageArray, setFarmWorkImageArray] = useState([]);
  const [allSoilWorkRowArray, setAllSoilWorkRowArray] = useState([]);
  const [soilWorkImageArray, setSoilWorkImageArray] = useState([]);
  const [allMaintenanceWorkRowArray, setAllMaintenanceWorkRowArray] = useState(
    []
  );
  const [maintenanceWorkImageArray, setMaintenanceWorkImageArray] = useState(
    []
  );

  useEffect(() => {
    // Fetching particular daily dairy
    axios
      .get(
        "https://immense-beach-88770.herokuapp.com/dailyDiary/diary/" +
          dailyDiaryId
      )
      .then((receivedDiary) => {
        // console.log("Received Diary", receivedDiary);
        setDiaryDetails(receivedDiary);

        //setting spraying data
        let sprayingTempData = receivedDiary.data.spraying.details;
        if (sprayingTempData.length) {
          for (let i in sprayingTempData) {
            setAllSprayingRowArray((arr) =>
              arr.concat(<SingleSprayingRow rowData={sprayingTempData[i]} />)
            );

            if (sprayingTempData[i].imageId) {
              setSprayingImageArray((arr) =>
                arr.concat(
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={sprayingTempData[i].imageUrl}
                  >
                    <img
                      src={
                        "https://lh3.googleusercontent.com/d/" +
                        sprayingTempData[i].imageId +
                        "=s220?authuser=0"
                      }
                      alt="img"
                      width="200"
                      height="200"
                    />
                  </a>
                )
              );
            }
          }
        }

        //setting irrigation data
        let irrigationTempData = receivedDiary.data.irrigation.details;
        if (irrigationTempData.length) {
          for (let i in irrigationTempData) {
            setAllIrrigationRowArray((arr) =>
              arr.concat(
                <SingleIrrigationRow rowData={irrigationTempData[i]} />
              )
            );

            if (irrigationTempData[i].imageId) {
              setIrrigationImageArray((arr) =>
                arr.concat(
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={irrigationTempData[i].imageUrl}
                  >
                    <img
                      src={
                        "https://lh3.googleusercontent.com/d/" +
                        irrigationTempData[i].imageId +
                        "=s220?authuser=0"
                      }
                      alt="img"
                      width="200"
                      height="200"
                    />
                  </a>
                )
              );
            }
          }
        }

        //setting farmWork data
        let farmWorkTempData = receivedDiary.data.farmWork.details;
        if (farmWorkTempData.length) {
          for (let i in farmWorkTempData) {
            setAllFarmWorkRowArray((arr) =>
              arr.concat(<SingleFarmWorkRow rowData={farmWorkTempData[i]} />)
            );

            if (farmWorkTempData[i].imageId) {
              setFarmWorkImageArray((arr) =>
                arr.concat(
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={farmWorkTempData[i].imageUrl}
                  >
                    <img
                      src={
                        "https://lh3.googleusercontent.com/d/" +
                        farmWorkTempData[i].imageId +
                        "=s220?authuser=0"
                      }
                      alt="img"
                      width="200"
                      height="200"
                    />
                  </a>
                )
              );
            }
          }
        }

        //setting soilWork data
        let soilWorkTempData = receivedDiary.data.soilWork.details;
        if (soilWorkTempData.length) {
          for (let i in soilWorkTempData) {
            setAllSoilWorkRowArray((arr) =>
              arr.concat(<SingleSoilWorkRow rowData={soilWorkTempData[i]} />)
            );

            if (soilWorkTempData[i].imageId) {
              setSoilWorkImageArray((arr) =>
                arr.concat(
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={soilWorkTempData[i].imageUrl}
                  >
                    <img
                      src={
                        "https://lh3.googleusercontent.com/d/" +
                        soilWorkTempData[i].imageId +
                        "=s220?authuser=0"
                      }
                      alt="img"
                      width="200"
                      height="200"
                    />
                  </a>
                )
              );
            }
          }
        }

        //setting maintenanceWork data
        let maintenanceWorkTempData =
          receivedDiary.data.maintenanceWork.details;
        if (maintenanceWorkTempData.length) {
          for (let i in maintenanceWorkTempData) {
            setAllMaintenanceWorkRowArray((arr) =>
              arr.concat(
                <SingleMaintenanceWorkRow
                  rowData={maintenanceWorkTempData[i]}
                />
              )
            );

            if (maintenanceWorkTempData[i].imageId) {
              setMaintenanceWorkImageArray((arr) =>
                arr.concat(
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={maintenanceWorkTempData[i].imageUrl}
                  >
                    <img
                      src={
                        "https://lh3.googleusercontent.com/d/" +
                        maintenanceWorkTempData[i].imageId +
                        "=s220?authuser=0"
                      }
                      alt="img"
                      width="200"
                      height="200"
                    />
                  </a>
                )
              );
            }
          }
        }

        //
      })
      .catch((err) => {
        // console.log("Error", err);
        CustomToast("Error" + err, "white", "red");
      });
  }, []);

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
        DAILY DIARY - VIEW OPERATIONS
      </h2>
      <br />

      {diaryDetails ? (
        <>
          <div
            style={{
              borderStyle: "solid",
              //   display: "inline-block",
              padding: "1%",
              textAlign: "center",
            }}
          >
            <p className="SingleDiaryPara">Farmer Name : {state.farmerName}</p>
            <p className="SingleDiaryPara">
              MHCode : {diaryDetails.data.MHCode}
            </p>
            <p className="SingleDiaryPara">
              Plot Number : {diaryDetails.data.plot}
            </p>
            {/* <p className="SingleDiaryPara">Daily Diary Id : {dailyDiaryId}</p> */}
            <p className="SingleDiaryPara">
              Proposed Date : {diaryDetails.data.proposedDate.substring(0, 10)}
            </p>
            <p className="SingleDiaryPara">Notes : {diaryDetails.data.notes}</p>
          </div>

          {/* Spraying Operation */}
          {allSprayingRowArray.length ? (
            <>
              <div className="sprayingDiv" style={{ display: "inline-block" }}>
                <SprayingOperation
                  allSprayingRowArray={allSprayingRowArray}
                  farmerName={state.farmerName}
                  completionStatus={diaryDetails.data.spraying.isCompleted}
                  completionDate={
                    diaryDetails.data.spraying.completedDate
                      ? diaryDetails.data.spraying.completedDate.substring(
                          0,
                          10
                        )
                      : "Not Available"
                  }
                  proposedDate={diaryDetails.data.proposedDate}
                />
              </div>
              <div className="sprayingImageDiv">{sprayingImageArray}</div>
              <hr />
            </>
          ) : null}

          {/* Irrigation Operation */}
          {allIrrigationRowArray.length ? (
            <>
              <div
                className="irrigationDiv"
                style={{ display: "inline-block" }}
              >
                <IrrigationOperation
                  allIrrigationRowArray={allIrrigationRowArray}
                  farmerName={state.farmerName}
                  completionStatus={diaryDetails.data.irrigation.isCompleted}
                  completionDate={
                    diaryDetails.data.irrigation.completedDate
                      ? diaryDetails.data.irrigation.completedDate.substring(
                          0,
                          10
                        )
                      : "Not Available"
                  }
                  proposedDate={diaryDetails.data.proposedDate}
                  numberOfHours={diaryDetails.data.irrigation.numberOfHours}
                />
              </div>
              <div className="irrigationImageDiv">{irrigationImageArray}</div>
              <hr />
            </>
          ) : null}

          {/* FarmWork Operation  */}
          {allFarmWorkRowArray.length ? (
            <>
              <div className="farmWorkDiv" style={{ display: "inline-block" }}>
                <FarmWorkOperation
                  allFarmWorkRowArray={allFarmWorkRowArray}
                  farmerName={state.farmerName}
                  completionStatus={diaryDetails.data.farmWork.isCompleted}
                  completionDate={
                    diaryDetails.data.farmWork.completedDate
                      ? diaryDetails.data.farmWork.completedDate.substring(
                          0,
                          10
                        )
                      : "Not Available"
                  }
                  proposedDate={diaryDetails.data.proposedDate}
                />
              </div>
              <div className="farmWorkImageDiv">{farmWorkImageArray}</div>
              <hr />
            </>
          ) : null}

          {/* SoilWork Operation  */}
          {allSoilWorkRowArray.length ? (
            <>
              <div className="soilWorkDiv" style={{ display: "inline-block" }}>
                <SoilWorkOperation
                  allSoilWorkRowArray={allSoilWorkRowArray}
                  farmerName={state.farmerName}
                  completionStatus={diaryDetails.data.soilWork.isCompleted}
                  completionDate={
                    diaryDetails.data.soilWork.completedDate
                      ? diaryDetails.data.soilWork.completedDate.substring(
                          0,
                          10
                        )
                      : "Not Available"
                  }
                  proposedDate={diaryDetails.data.proposedDate}
                />
              </div>
              <div className="soilWorkImageDiv">{soilWorkImageArray}</div>
              <hr />
            </>
          ) : null}
          {/* Maintenance Operation  */}
          {allMaintenanceWorkRowArray.length ? (
            <>
              <div
                className="maintenanceWorkDiv"
                style={{ display: "inline-block" }}
              >
                <MaintenanceWorkOperation
                  allMaintenanceWorkRowArray={allMaintenanceWorkRowArray}
                  farmerName={state.farmerName}
                  completionStatus={
                    diaryDetails.data.maintenanceWork.isCompleted
                  }
                  completionDate={
                    diaryDetails.data.maintenanceWork.completedDate
                      ? diaryDetails.data.maintenanceWork.completedDate.substring(
                          0,
                          10
                        )
                      : "Not Available"
                  }
                  proposedDate={diaryDetails.data.proposedDate}
                />
              </div>
              <div className="maintenanceWorkImageDiv">
                {maintenanceWorkImageArray}
              </div>
              <hr />
            </>
          ) : null}

          {/* End */}
        </>
      ) : null}
    </div>
  );
}

export default SingleDiary;
