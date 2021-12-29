import React, { useState } from "react";
import "./MRLMonitoringUpload.css";
import { CustomToast } from "../Toasts/AllToasts";
import uploadImg from "../../assets/uploadImg.gif";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function MRLMonitoringUpload() {
  const [selectedFileName, setSelectedFileName] = useState("No File Selected");

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append(
      "allMRLReports",
      event.target.allMRLReportsFile.files[0],
      event.target.allMRLReportsFile.files[0].name
    );
    axios
      .post(
        "https://immense-beach-88770.herokuapp.com/mrlReports/uploadCSV",
        fd
      )
      .then((res) => {
        CustomToast(res.data.message, "white", "#4CAF50");
      })
      .catch((err) => {
        if (err.response) {
          CustomToast(err.response.data.message, "white", "#FF3333");
        }
      });
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          margin: "5% 25%",
          padding: "1%",
          //   borderStyle: "solid",
          //   borderWidth: "thin",
        }}
      >
        <br />
        <h2 style={{ textAlign: "center" }}>
          Upload CSV file for MRL Monitoring
        </h2>
        <br />
        <label className="MRLUploadLabel" style={{ width: "200px" }}>
          File Name :
        </label>
        <input disabled={true} value={selectedFileName} />
        {/* <label>{selectedFileName}</label> */}
        <br />
        <br />
        {/* <label className="MRLLabel">Select CSV File : </label> */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="uploadedFile"
            className={
              selectedFileName === "No File Selected"
                ? "MRLMonitoringUploadInput"
                : "MRLMonitoringUploadInputSuccess"
            }
            //   style={{ background: `url(${uploadImg})` }}
          >
            {/* {selectedFileName} */}
            {/* <br />
          <i className="fa fa-file fa-5x" aria-hidden="true"></i> */}
          </label>
          <input
            type="file"
            name="allMRLReportsFile"
            hidden={true}
            accept=".csv"
            id="uploadedFile"
            style={{ color: "transparent" }}
            onChange={(event) => {
              if (event.target.files[0]) {
                // console.log(event.target.files[0].name);
                setSelectedFileName(event.target.files[0].name);
              } else setSelectedFileName("No File Selected");
            }}
          />
          <br />
          <br />
          <button
            className="MRLMonitoringButton"
            style={
              selectedFileName === "No File Selected"
                ? { backgroundColor: "gray", marginRight: "50px" }
                : { marginRight: "50px" }
            }
            disabled={selectedFileName === "No File Selected" ? true : false}
            type="submit"
          >
            Upload
          </button>
          <button
            className="MRLMonitoringButton"
            style={{ backgroundColor: "#cc4233" }}
            type="reset"
            onClick={() => setSelectedFileName("No File Selected")}
          >
            Cancel
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MRLMonitoringUpload;
