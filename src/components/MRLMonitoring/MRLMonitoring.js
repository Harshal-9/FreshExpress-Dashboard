import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import "./MRLMonitoring.css";
import dotenv from "dotenv";
dotenv.config();

// Below functions for adding search icon in reactselect
library.add(faSearch);
const CaretDownIcon = () => {
  return <FontAwesomeIcon icon="search" />;
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

// Single Pesticide details row component
function SinglePesticideRow(props) {
  // console.log(props.data);
  return (
    <tr
      style={{
        backgroundColor:
          props.data.remark.toUpperCase() === "PASS" ? "#94e664" : "#ff4040",
      }}
    >
      <td>{props.data.srNo}</td>
      <td width="50px">{props.data.detectedPesticide}</td>
      <td>{props.data.redList}</td>
      <td>{props.data.partOfAnnex9}</td>
      <td>{props.data.result}</td>
      <td>{props.data.EUMRL}</td>
      <td>{props.data.LOQ}</td>
      <td>{((props.data.result / props.data.EUMRL) * 100).toFixed(3)} %</td>
      <td>{props.data.ArFD}</td>
      <td>{props.data.intake}</td>
      <td>{props.data.ArFDPercent}</td>
      <td>{props.data.remark}</td>
    </tr>
  );
}

// This component is used for MRL Monitoring
function MRLMonitoring() {
  const navigate = useNavigate();

  // useStates
  const [allFarmers, setAllFarmers] = useState({
    farmerID: "None",
    plot: [],
    farmerName: "None",
  });
  const [selectedFarmer, setSelectedFarmer] = useState({});
  const [allMRLReports, setAllMRLReports] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [activeMRLReport, setActiveMRLReport] = useState({
    year: "",
    sealNumber: "",
    sampleNumber: "",
    labName: "",
    farmerName: "",
    dateOfSampling: "",
    address: "",
    MHCode: "",
    variety: "",
    quantityMT: "",
    brix: "",
    fePoRef: "",
    samplerName: "",
    chemicals: [
      {
        srNo: "",
        detectedPesticide: "",
        result: "",
        EUMRL: "",
        LOQ: "",
        ArFD: "",
        intake: "",
        ArFDPercent: "",
        remark: "",
        partOfAnnex9: "",
        redList: "",
      },
    ],
  });
  const [activePesticideArray, setActivePesticideArray] = useState([]);

  // function to calculate sum of %MRL
  function mrlPercentSum() {
    let sum = 0;
    for (let item in activePesticideArray) {
      // console.log("H", activePesticideArray[item]);
      sum =
        sum +
        Number(
          (
            (activePesticideArray[item].props.data.result /
              activePesticideArray[item].props.data.EUMRL) *
            100
          ).toFixed(3)
        );
      // console.log("SUM", sum);
    }
    return sum;
  }

  // function to calculate sum of %MRL
  function ArFDPercentSum() {
    let sum = 0;
    for (let item in activePesticideArray) {
      if (!isNaN(activePesticideArray[item].props.data.ArFDPercent))
        sum = sum + Number(activePesticideArray[item].props.data.ArFDPercent);
      // console.log("SUM", sum);
    }
    return sum;
  }

  useEffect(() => {
    // get request for getting farmer and his corresponding plots
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/farmers/plots")
      .then((res) => {
        let Data = [...res.data];
        // console.log("Data Here :", Data);
        setAllFarmers(Data);
      })
      .catch((err) => {
        // console.log("err", err);
        FailureToast();
      });
  }, []);

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
        MRL Monitoring
      </h2>
      <br />

      {/* Card starts here  */}
      <div className="MyCardColumn" style={{ display: "inline-block" }}>
        <div className="MyCard" style={{ width: "98%" }}>
          {/* Upload CSV Button */}
          <button
            className="MRLUploadButton"
            onClick={() => {
              navigate("/MRLMonitoringUpload");
            }}
          >
            <i className="fa fa-upload fa-lg" aria-hidden="true"></i> Upload CSV
          </button>

          {/* Delete Record Button */}
          <button
            className="MRLDeleteButton"
            disabled={activeMRLReport.sampleNumber === "" ? true : false}
            onClick={() => {
              axios
                .post(
                  process.env.REACT_APP_BACKEND_URL +
                    "/mrlReports/delete/" +
                    activeMRLReport._id
                )
                .then((res) => {
                  // console.log("Res", res);
                  CustomToast(
                    "Record Deleted Successfully!",
                    "black",
                    "#72d172"
                  );
                  setTimeout(() => {
                    window.location.reload(true);
                  }, 2000);
                })
                .catch((err) => {
                  // console.log("Err", err);
                  CustomToast("Error" + err, "white", "red");
                });
            }}
          >
            <i className="fa fa-trash fa-lg" aria-hidden="true"></i> Delete
            Report
          </button>
          <br />
          <br />
          <Select
            className="MRLMonitoringSelect"
            placeholder="Search Farmer Name"
            components={{ DropdownIndicator }}
            options={allFarmers}
            getOptionLabel={(option) => option.farmerName}
            getOptionValue={(option) => option.farmerID}
            onChange={(opt) => {
              setSelectedFarmer({
                FarmerID: opt.farmerID,
                plot: opt.plot,
                FarmerName: opt.farmerName,
              });
            }}
          />
          <Select
            className="MRLMonitoringSelect"
            placeholder="Select Plot"
            components={{ DropdownIndicator }}
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
            onChange={(event) => {
              // console.log(event);

              // Getting MRL Report of particular farm
              axios
                .get(
                  process.env.REACT_APP_BACKEND_URL +
                    "/mrlReports/MHCode/" +
                    event.MHCode
                )
                .then((res) => {
                  // console.log("Res", res);
                  setAllMRLReports(res.data);
                })
                .catch((err) => {
                  // console.log("Err", err);
                  CustomToast("Error" + err, "white", "red");
                });
            }}
          />
          <br />
          <br />
          <Select
            className="MRLMonitoringSelect"
            placeholder="Select Year"
            components={{ DropdownIndicator }}
            options={getYears(allMRLReports)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(event) => {
              setSelectedYear(event.value);
            }}
          />
          <Select
            className="MRLMonitoringSelect"
            placeholder="Select Sample Number"
            components={{ DropdownIndicator }}
            options={getReportsForParticularYear(selectedYear, allMRLReports)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(event) => {
              // console.log(event);
              setActiveMRLReport(allMRLReports[event.value]);
              setActivePesticideArray([]); //Empty the previous data

              for (
                let i = 0;
                i < allMRLReports[event.value].chemicals.length;
                i++
              ) {
                setActivePesticideArray((arr) =>
                  arr.concat(
                    <SinglePesticideRow
                      data={allMRLReports[event.value].chemicals[i]}
                    />
                  )
                );
              }
            }}
          />
          <br />
          <br />
          <br />
          {/* First div */}
          <div
            style={{
              display: "inline-block",
              marginRight: "40px",
            }}
          >
            <label className="MRLMonitoringLabel">Lab Name :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.labName}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">Sample Number :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.sampleNumber}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">Seal No :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.sealNumber}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">Sampling Date :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={
                activeMRLReport.dateOfSampling
                  ? activeMRLReport.dateOfSampling.slice(0, 10)
                  : ""
              }
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">Sampler Name :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.samplerName}
              size="40"
            ></input>
            <br />
          </div>
          {/* Second div */}
          <div style={{ display: "inline-block" }}>
            <label className="MRLMonitoringLabel">Variety :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.variety}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">Address :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.address}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">BRIX :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.brix}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">FE PO No :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.fePoRef}
              size="40"
            ></input>
            <br /> <br />
            <label className="MRLMonitoringLabel">4B Qty :</label>
            <input
              style={{ width: "377px", height: "18.4px" }}
              disabled={true}
              value={activeMRLReport.quantityMT}
              size="40"
            ></input>
            <br />
          </div>
        </div>
      </div>

      {/* Card ends here  */}

      <div>
        <div className="readymade_main__cards">
          <div className="readymadeCard">
            <i
              className="fa fa-flask fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p">Number of Detections</p>
              <span className="font-bold text-title">
                {activePesticideArray.length}
              </span>
            </div>
          </div>

          <div className="readymadeCard">
            <i
              className="fa fa-file-text fa-2x text-red"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p">Total % MRL</p>
              <span className="font-bold text-title">{mrlPercentSum()}%</span>
            </div>
          </div>

          <div className="readymadeCard">
            <i
              className="fa fa fa-file-text fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p">Total %ArFD</p>
              <span className="font-bold text-title">{ArFDPercentSum()}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="MRLScroll">
        <table>
          <tbody>
            <tr className="MRLHeaderRow">
              <td>Sr No</td>
              <td width="50px">Detected Pesticide</td>
              <td>Red List</td>
              <td>Part of Annex 9 ?</td>
              <td>Result</td>
              <td>EU MRL</td>
              <td>LOQ</td>
              <td>%MRL</td>
              <td>ARFD values</td>
              <td>Intake</td>
              <td>%ARFD</td>
              <td>Remark</td>
            </tr>
            {activePesticideArray}
          </tbody>
        </table>
        <br />
      </div>
      <ToastContainer />
    </div>
  );
}

export default MRLMonitoring;

// Function to provide options for Year Select dropdown
function getYears(allReports) {
  const years = [];
  for (let i = 0; i < allReports.length; i++) {
    years.push({
      label: allReports[i].year,
      value: allReports[i].year,
    });
  }

  // Getting unique years by firstly converting array elements into string
  // Then using set to just keep unique records and the converting set into array

  const jsonObject = years.map(JSON.stringify);
  const uniqueSet = new Set(jsonObject);
  const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  return uniqueArray;
}

// Function to provide options for SampleNumber Select dropdown
function getReportsForParticularYear(selectedYear, allReports) {
  const sampleNumbers = [];
  for (let i = 0; i < allReports.length; i++) {
    if (allReports[i].year === selectedYear)
      sampleNumbers.push({
        label: allReports[i].sampleNumber,
        value: i, //index of mrlreport having selected sampleNumber in allMRLReports array
      });
  }
  return sampleNumbers;
}
