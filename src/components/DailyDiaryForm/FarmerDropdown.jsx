import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerDropdown(props) {
    const [Farmers, setFarmers] = useState([
        { farmerID: "None", plot: [], farmerName: "None" }
    ]);

    useEffect(() => {
        axios
            .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
            .then((res) => {
                // console.log("Here : ", res.data);
                let Data = [...res.data];
                // for (let i = 0; i < Data.length; i++) {
                //   console.log(Data[i]);
                //   Farmers.push(Data[i]);
                // }
                console.log(Data);
                setFarmers(Data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    const getFarmer = props.getFarmer;

    // const [lastSelectedFarmer, setLastSelectedFarmer] = useState("None");

    return (
        <div>
            <label htmlFor="farmerdd">Select Farmer : </label>
            <Select
                // defaultValue={aquaticCreatures[0]}
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

// const aquaticCreatures = [
//   { label: "None", value: 0 },
//   { label: "Shark", value: 1 },
//   { label: "Dolphin", value: 2 },
//   { label: "Whale", value: 3 },
//   { label: "Octopus", value: 4 },
//   { label: "Crab", value: 5 },
//   { label: "Lobster", value: 6 }
// ];

/* <Select
  defaultValue={aquaticCreatures[0]}
  id="farmerdd"
  className="farmerDrop"
  options={aquaticCreatures}
  onChange={(opt) => {
    getFarmer({ FarmerID: opt.label });
  }}
/>; */
