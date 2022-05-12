import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./DailyDairyAutomation.css";
import { CustomToast } from "../Toasts/AllToasts";
import dotenv from "dotenv";
dotenv.config();

// This component is used for automating/creating daily daries for multiple MHCodes
function DailyDairyAutomation() {
  const [selectedMHCode, setSelectedMHCodes] = useState([]);
  const [options, setOptions] = useState([]);
  const [sendTo, setSendTo] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append(
      "sheet",
      event.target.uploadedFile.files[0],
      event.target.uploadedFile.files[0].name
    );

    let tempData = [];
    for (let item of selectedMHCode) {
      tempData.push(item.value);
    }

    fd.append("MHCodes", tempData.join(","));

    // posting the sheet to selected MHCode
    axios
      .post(process.env.BACKEND_URL + "/dailyDiaryAutomation", fd)
      .then((res) => {
        // console.log("Res", res);
        setSendTo(res.data.message);
      })
      .catch((err) => {
        // console.log("Err", err);
        CustomToast("Error" + err, "white", "red");
      });
  }

  useEffect(() => {
    // Making request to get list of all MHCodes for dropdown
    axios
      .get(process.env.BACKEND_URL + "/filters")
      .then((res) => {
        // console.log("Res", res.data[0].MHCode);
        let tempArr = [];

        for (let item of res.data[0].MHCode) {
          tempArr.push({ label: item, value: item });
        }
        setOptions(tempArr);
      })
      .catch((err) => {
        // console.log("Err", err);
        CustomToast("Error" + err, "white", "red");
      });
  }, []);

  return (
    <div className="handleDailyDiaryAutomation">
      <marquee
        style={{ border: "black 2px solid", color: "red" }}
        direction="left"
        // behavior="alternate"
      >
        (<b>NOTE</b> : Select Farmers MH Code who's fruit pruning data is
        present.. )
      </marquee>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="uploadFileDiv">
          <label htmlFor="uploadedFile">Select CSV file :&nbsp;&nbsp;</label>
          <input type="file" accept=".csv" name="uploadedFile"></input>
        </div>
        <br />
        <br />
        <MultiSelect
          className="DDAMultiSelect"
          options={options}
          value={selectedMHCode}
          onChange={(e) => {
            // console.log("Here", e);
            setSelectedMHCodes(e);
          }}
          overrideStrings={{
            selectSomeItems: "Select MHCodes",
            allItemsAreSelected: "All MHCodes selected",
          }}
        />
        <br />
        <br />
        <button className="dailyDiaryAutomationSubmitButton" type="submit">
          Upload
        </button>
        <a
          className="MRLMonitoringButton"
          style={{ backgroundColor: "#2A91FB" }}
          href="https://drive.google.com/uc?id=1lOGWLWsyd2-yAqPotBix-XBo0mITUdY_&export=download"
        >
          <i className="fa fa-download"></i> Template
        </a>
        <br />
        <br />
        <h3 style={{ marginLeft: "5%", marginRight: "5%" }}>{sendTo}</h3>
      </form>
    </div>
  );
}

export default DailyDairyAutomation;
