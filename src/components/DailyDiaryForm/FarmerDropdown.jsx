import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// function to show list of farmers
function FarmerDropdown(props) {
  const [Farmers, setFarmers] = useState([
    { farmerID: "None", plot: [], farmerName: "None" },
  ]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/farmers/plots")
      .then((res) => {
        let Data = [...res.data];
        console.log(Data);
        setFarmers(Data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const getFarmer = props.getFarmer;

  return (
    <div>
      <label htmlFor="farmerdd">Select Farmer : </label>
      <Select
        id="farmerdd"
        className="farmerDropDD"
        options={Farmers}
        getOptionLabel={(option) => option.farmerName}
        getOptionValue={(option) => option.farmerID}
        onChange={(opt) => {
          getFarmer({ FarmerID: opt.farmerID, plot: opt.plot });
        }}
      />
    </div>
  );
}

export default FarmerDropdown;
