import React, { useState } from "react";
import FarmerDropdown from "./FarmerDropdown";
import RadioButton from "./RadioButton";
import PlotDropdown from "./PlotDropdown";
import "./DailyDiaryForm.css";
import axios from "axios";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

function DailyDiaryFormApp() {
  var temp;

  const [finalDataObj, setFinalDataObj] = useState({
    Farmer: { FarmerId: "" },
    Plot: { PlotID: "" },
    Date: { ProposedDate: "" },
  });

  const [plotsFromFarmer, setPlotsFromFarmer] = useState({});

  const [isvalid, setValid] = useState(false);
  const [gotoFailure, setGotoFailure] = useState(false);
  const navigate = useNavigate();

  function getFarmer(data) {
    temp = finalDataObj;
    temp.Farmer = { FarmerID: data.FarmerID };
    setFinalDataObj(temp);
    // console.log("Data here : ", data);
    setPlotsFromFarmer(data);
  }

  function getPlot(data) {
    console.log(data);

    temp = finalDataObj;
    temp.Plot = { PlotID: data.PlotID };
    temp.Farmer = { FarmerID: data.FarmerID };
    setFinalDataObj(temp);
  }

  const key = [1, 2, 3, 4, 5];
  // finding  which radio button is selected and accordding to that setting object and showing tables
  function getFromRadio(data) {
    switch (data.Type) {
      case 1:
        temp = finalDataObj;
        temp.Spraying = data.Data;
        setFinalDataObj(temp);
        break;

      case 2:
        temp = finalDataObj;
        temp.Fertilizer = data.Data;
        setFinalDataObj(temp);
        break;

      case 3:
        temp = finalDataObj;
        temp.FarmWork = data.Data;
        setFinalDataObj(temp);
        break;

      case 4:
        temp = finalDataObj;
        temp.SoilWork = data.Data;
        setFinalDataObj(temp);
        break;

      case 5:
        temp = finalDataObj;
        temp.Maintenance = data.Data;
        setFinalDataObj(temp);
        break;

      default:
    }
  }

  return (
    <div className="PseudoBody">
      <div className="AppDD">
        <h1 className="headingDD">Farmer's Digital Diary</h1>
        <br />
        <hr /> <br />
        {/* Dropdown to select farmer */}
        <FarmerDropdown getFarmer={getFarmer} />
        <br />
        <hr /> <br />
        {/* Dropdown to select plot */}
        <PlotDropdown getPlot={getPlot} plotsFromFarmer={plotsFromFarmer} />
        <br />
        <hr /> <br />
        {/* Code to select date */}
        <label htmlFor="myDate">Select a Date : </label>
        <input
          onChange={(event) => {
            // console.log(event.target.value);
            finalDataObj.Date = { ProposedDate: event.target.value };
          }}
          type="date"
          id="myDate"
          name="myDate"
        />
        <br />
        <br />
        <hr />
        <br />
        {/* Radiobutton to check if spraying was done */}
        <h3>Was any spraying done today?</h3>
        <br />
        <RadioButton type={key[0]} getFromRadio={getFromRadio} />
        <br />
        <hr />
        <br />
        {/* Radiobutton to check fertilization and irrigation done or not.. */}
        <h3>Was any fertilization + irrigation done today?</h3>
        <br />
        <RadioButton type={key[1]} getFromRadio={getFromRadio} />
        <br />
        <hr />
        <br />
        {/* Radio button to check whether other work wass done */}
        <h3>Was any work done in farm?</h3>
        <br />
        <RadioButton type={key[2]} getFromRadio={getFromRadio} />
        <br />
        <hr />
        <br />
        {/* Radio button to check whether soil work was done or not */}
        <h3>Any soil work done today?</h3>
        <br />
        <RadioButton type={key[3]} getFromRadio={getFromRadio} />
        <br />
        <hr />
        <br />
        {/* Radio button to check whether maintenance work was done or not */}
        <h3>Any maintenance work done today?</h3>
        <br />
        <RadioButton type={key[4]} getFromRadio={getFromRadio} />
        <br />
        <hr />
        <br />
        {/* Radio button to check whether other work was done or not */}
        <h3>Any other work to be done?</h3>
        <br />
        <br />
        <textarea
          onChange={(event) => {
            finalDataObj.Notes = { Notes: event.target.value };
          }}
          className="descriptionDD"
          placeholder="Type here... "
        ></textarea>
        <br />
        <hr />
        <button
          className="submitButtonDD"
          // farmer name ,plot and date are compulsory if they are not filled show error
          onClick={() => {
            if (
              finalDataObj.Farmer.FarmerID === "" ||
              finalDataObj.Plot.PlotID === "" ||
              finalDataObj.Date.ProposedDate === "" ||
              finalDataObj.Farmer.FarmerID === "None" ||
              finalDataObj.Plot.PlotID === "None" ||
              finalDataObj.Date.ProposedDate === "None"
            ) {
              alert("Select Plot,Farmer and Date !");
              setValid(false);
            } else {
              // if all those required fields are selected then post the data
              axios
                .post(process.env.BACKEND_URL + "/dailyDiary", {
                  data: finalDataObj,
                })
                .then((res) => {
                  if (res.status !== 200) {
                    setValid(false);
                    alert("Failed to insert Daily Diary");
                  } else {
                    console.log("result", res);
                    console.log("Form submitted");
                    console.log(finalDataObj);
                    setValid(true);
                  }
                })
                .catch((err) => {
                  setValid(false);
                  setGotoFailure(true);
                  alert(err.message);
                  console.log("error", err);
                });
            }
          }}
        >
          Submit
        </button>
        <br />
        {isvalid ? navigate("/success") : null}
        {gotoFailure ? navigate("/Failure") : null}
      </div>
    </div>
  );
}

export default DailyDiaryFormApp;
