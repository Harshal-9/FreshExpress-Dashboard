import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import "./DailyDairyAutomation.css";

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

    axios
      .post(
        "https://immense-beach-88770.herokuapp.com/dailyDiaryAutomation",
        fd
      )
      .then((res) => {
        console.log("Res", res);
        setSendTo(res.data.message);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((res) => {
        console.log("Res", res.data[0].MHCode);
        let tempArr = [];

        for (let item of res.data[0].MHCode) {
          tempArr.push({ label: item, value: item });
        }
        setOptions(tempArr);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div className="handleDailyDiaryAutomation" >
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
            console.log("Here", e);
            setSelectedMHCodes(e);
          }}
          overrideStrings={{
            selectSomeItems: "Select MHCodes",
            allItemsAreSelected: "All MHCodes selected",
          }}
        />
        <br />
        <br />
        <button className="dailyDiaryAutomationSubmitButton" type="submit">Upload</button>
        <br />
        <br />
        <h3 style={{ marginLeft: "5%", marginRight: "5%" }}>{sendTo}</h3>
      </form>
    </div>
  );
}

export default DailyDairyAutomation;
