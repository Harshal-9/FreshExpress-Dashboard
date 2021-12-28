import React, { useState } from "react";
import "./MRLMonitoringUpload.css";
import uploadImg from "../../assets/uploadImg.gif";
import axios from "axios";

function MRLMonitoringUpload() {
  const [selectedFileName, setSelectedFileName] = useState("No File Selected");

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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(event.target.allMRLReportsFile.files[0]);
            console.log(event.target.allMRLReportsFile.files[0].name);
            const fd = new FormData();
            fd.append(
              "allMRLReports",
              event.target.allMRLReportsFile.files[0],
              event.target.allMRLReportsFile.files[0].name
            );
            axios
              .post("http://localhost:5000/mrlReports/uploadCSV", fd)
              .then((res) => {
                console.log("Res", res.data);
              })
              .catch((err) => {
                console.log("Err", err);
              });
          }}
        >
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
                console.log(event.target.files[0].name);
                setSelectedFileName(event.target.files[0].name);
              } else setSelectedFileName("No File Selected");
            }}
          />
          <br />
          <br />
          <button
            className="MRLMonitoringButton"
            style={{ marginRight: "50px" }}
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
    </div>
  );
}

export default MRLMonitoringUpload;
