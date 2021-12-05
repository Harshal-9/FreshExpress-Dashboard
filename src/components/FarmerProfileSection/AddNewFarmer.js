import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function AddNewFarmer() {
  const [selectedGGN, setSelectGGN] = useState(null);
  const [allGGN, setAllGGN] = useState([]);
  const [allFarmers, setAllFarmers] = useState([]);

  useEffect(() => {
    // for getting all GGNs from backend
    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((data) => {
        const recievedObj = data.data[0];
        const tempGGN = [];
        for (let i in recievedObj.GGN) {
          tempGGN.push({
            label: recievedObj.GGN[i],
            value: recievedObj.GGN[i],
          });
        }
        setAllGGN(tempGGN);
      });

    // for getting all farmers
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers")
      .then((data) => {
        let receivedData = data.data;
        console.log(receivedData);

        const tempFarmersArr = [];
        for (let i = 0; i < receivedData.length; i++) {
          tempFarmersArr.push({
            label: receivedData[i].personalInformation.name,
            value: receivedData[i].personalInformation.name,
          });
        }
        setAllFarmers(tempFarmersArr);
      });
  }, []);

  return (
    <div>
      <h1>Adding new farmer</h1>
      <p>
        How will we add a new farmer in existing family and how will that get
        reflected in family head ? also set ggn input and familyname input to
        disabled after dropdown selected.Dont allow new user to add existing GGN
        Number in input
      </p>
      <br />
      <div className="MyCardColumn" style={{ display: "inline-block" }}>
        <div className="MyCard">
          <p style={{ color: "red" }}>
            (<b>NOTE</b> : Farmer who is Family head should have Family Name
            same as his name )
          </p>
          <br />
          <img
            src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
            width="250px"
            height="225px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
          <br />
          <div style={{ display: "inline-block" }}>
            <form>
              <label className="FarmerProfileLabel2">Farmer Name : </label>
              <input
                type="text"
                size="80"
                // onChange={(event) => {
                //   sendBackFarmerAllData({
                //     ...farmerAllData,
                //     name: event.target.value,
                //   });
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Plot Number : </label>
              <input
                type="text"
                size="80"
                // onChange={(event) => {
                //   sendBackFarmerAllData({
                //     ...farmerAllData,
                //     GGN: event.target.value,
                //   });
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">MH Code : </label>
              <input
                type="text"
                size="80"
                // onChange={(event) => {
                //   sendBackFarmerAllData({
                //     ...farmerAllData,
                //     GGN: event.target.value,
                //   });
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Select existing GGN :
              </label>
              <Select
                className="selectGGN"
                placeholder="Select GGN Number"
                // options={[{ label: "1", value: "1" }]}
                options={allGGN}
                onChange={(e) => setSelectGGN(e.value)}
              />
              <br />
              <br />
              <label className="FarmerProfileLabel2">GGN Number: </label>
              <input
                type="text"
                size="80"
                disabled={selectedGGN ? true : false}
                // onChange={(event) => {
                //   sendBackFarmerAllData({
                //     ...farmerAllData,
                //     consultantName: event.target.value,
                //   });
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Family Name : </label>
              <input
                type="text"
                size="80"
                disabled={selectedGGN ? true : false}
                // onChange={(event) => {
                //   sendBackFarmerAllData({
                //     ...farmerAllData,
                //     familyName: event.target.value,
                //   });
                // }}
              ></input>
              <br />
              <br />
              <button className="addNewFarmerButton1">Add New Farmer</button>
              <button className="addNewFarmerButton2">Clear Data</button>
            </form>
          </div>
        </div>
      </div>

      <div className="MyCardColumn" style={{ display: "inline-block" }}>
        <div className="MyCard">
          <p style={{ fontSize: "medium" }}>Add New Plot for existing Farmer</p>
          <br />
          <form>
            <label className="FarmerProfileLabel2">Select Farmer : </label>
            <Select
              className="addNewFarmerSelectFarmer"
              options={allFarmers}
              placeholder="Select Farmer"
            />
            <br />
            <br />
            <label className="FarmerProfileLabel2">Plot Number : </label>
            <input
              type="text"
              size="80"
              // onChange={(event) => {
              //   sendBackFarmerAllData({
              //     ...farmerAllData,
              //     GGN: event.target.value,
              //   });
              // }}
            ></input>
            <br />
            <br />
            <label className="FarmerProfileLabel2">MH Code : </label>
            <input
              type="text"
              size="80"
              // onChange={(event) => {
              //   sendBackFarmerAllData({
              //     ...farmerAllData,
              //     GGN: event.target.value,
              //   });
              // }}
            ></input>
            <br />
            <br />
            <button className="addNewFarmerButton1">Add New Plot</button>
            <button className="addNewFarmerButton2">Clear Data</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewFarmer;
