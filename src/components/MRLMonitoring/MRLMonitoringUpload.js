import React, { useState } from "react";
import "./MRLMonitoringUpload.css";
import { CustomToast } from "../Toasts/AllToasts";
import uploadImg from "../../assets/uploadImg.gif";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MRLMonitoringUpload() {
  const navigate = useNavigate();
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
        {/* <div style={{ textAlign: "right" }}>
          <button className="MRLMonitoringButton">Download Template</button>
        </div> */}
        <h2 style={{ textAlign: "center" }}>
          Upload CSV file for MRL Monitoring
        </h2>
        <br />
        <label className="MRLUploadLabel" style={{ width: "100px" }}>
          File Name :
        </label>
        <input
          disabled={true}
          value={selectedFileName}
          style={{ width: "400px" }}
        />
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
            style={{ backgroundColor: "#cc4233", marginRight: "50px" }}
            type="reset"
            onClick={() => setSelectedFileName("No File Selected")}
          >
            Cancel
          </button>
          <a
            className="MRLMonitoringButton"
            style={{ backgroundColor: "#2A91FB" }}
            href="https://drive.google.com/uc?id=12SmKHRH73YpZuu_N73rMRisMe_el-0Ov&export=download"
          >
            <i className="fa fa-download"></i> Template
          </a>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MRLMonitoringUpload;
