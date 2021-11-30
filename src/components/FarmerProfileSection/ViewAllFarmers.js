import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAllFarmers.css";

import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { MultiSelect } from "react-multi-select-component";

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

// Single row component
function SingleFarmerRow(props) {
  let farmerData = props;

  const navigate = useNavigate();
  return (
    <tr
      className="IndividualFarmerRow"
      onClick={() => {
        navigate(
          "/FarmerProfile/" + farmerData.plotData.farmInformation.MHCode
        );
      }}
    >
      <td>{farmerData.personalInformation.name}</td>
      <td>{farmerData.plotData.farmInformation.plotNumber}</td>
      <td>{farmerData.personalInformation.GGN}</td>
      <td>{farmerData.plotData.farmInformation.MHCode}</td>
      <td>{farmerData.plotData.address.village}</td>
      <td>{farmerData.plotData.address.taluka}</td>
      <td>{farmerData.plotData.address.district}</td>
      <td>Pruning Date</td>
      <td>{farmerData.plotData.farmInformation.plotArea}</td>
      <td>{farmerData.plotData.farmInformation.variety}</td>
      <td>
        {farmerData.plotData.cropSpacing.betweenTwoRows} X{" "}
        {farmerData.plotData.cropSpacing.betweenTwoCrops}
      </td>
      <td>{farmerData.plotData.other.tags.toString()}</td>
    </tr>
  );
}

function ViewAllFarmers() {
  const navigate = useNavigate();

  // useStates for Array of components for allFarmerData and filteredData
  const [allFarmersArray, setAllFarmersArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  // useStates for multiSelect filters selected value array
  const [selectedMultiSelectVillage, setSelectedMultiSelectVillage] = useState(
    []
  );
  const [selectedMultiSelectTag, setSelectedMultiSelectTag] = useState([]);
  const [selectedMultiSelectVariety, setSelectedMultiSelectVariety] = useState(
    []
  );

  // useStates for selected values
  const [selectedFarmerValue, setSelectedFarmerValue] = useState(null);
  const [selectedGGNValue, setSelectedGGNValue] = useState(null);
  const [selectedMHCodeValue, setSelectedMHCodeValue] = useState(null);

  // Object to save all fiters data i.e options for all reactselect recieved from db
  const [allFiltersData, setAllFiltersData] = useState({
    GGN: [],
    farmerName: [],
    MHCode: [],
    village: [],
    variety: [],
    tag: [],
  });

  // function to handle farmerName filter
  function handleFarmerFilter(event) {
    const tempArr = [];
    for (let i = 0; i < allFarmersArray.length; i++) {
      if (allFarmersArray[i].props.personalInformation.name === event.label)
        tempArr.push(allFarmersArray[i]);
    }
    setFilteredArray(tempArr);
  }

  // function to handle GGN filter
  function handleGGNFilter(event) {
    const tempArr = [];
    for (let i = 0; i < allFarmersArray.length; i++) {
      if (allFarmersArray[i].props.personalInformation.GGN === event.label)
        tempArr.push(allFarmersArray[i]);
    }
    setFilteredArray(tempArr);
  }

  // function to handle GGN filter
  function handleMHCodeFilter(event) {
    const tempArr = [];
    for (let i = 0; i < allFarmersArray.length; i++) {
      if (
        allFarmersArray[i].props.plotData.farmInformation.MHCode === event.label
      )
        tempArr.push(allFarmersArray[i]);
    }
    setFilteredArray(tempArr);
  }

  // function to handle all filters Intersection
  function handleFilterIntersection(event) {
    let tempTagArray = [];
    let tempVillageArray = [];
    let tempVarietyArray = [];

    // pushing all farmers with selected village in tempVillageArray
    for (let i = 0; i < selectedMultiSelectVillage.length; i++) {
      for (let j = 0; j < allFarmersArray.length; j++) {
        if (
          selectedMultiSelectVillage[i].value ===
          allFarmersArray[j].props.plotData.address.village
        ) {
          tempVillageArray.push(allFarmersArray[j]);
        }
      }
    }

    // pushing all farmers with selected variety in tempVillageArray
    for (let i = 0; i < selectedMultiSelectVariety.length; i++) {
      for (let j = 0; j < allFarmersArray.length; j++) {
        if (
          selectedMultiSelectVariety[i].value ===
          allFarmersArray[j].props.plotData.farmInformation.variety
        ) {
          tempVarietyArray.push(allFarmersArray[j]);
        }
      }
    }

    // pushing all farmers with selected tags in tempTagArray
    for (let i = 0; i < selectedMultiSelectTag.length; i++) {
      for (let j = 0; j < allFarmersArray.length; j++) {
        if (
          allFarmersArray[j].props.plotData.other.tags.includes(
            selectedMultiSelectTag[i].value
          ) &&
          !tempTagArray.includes(allFarmersArray[j])
        ) {
          tempTagArray.push(allFarmersArray[j]);
        }
      }
    }

    // If any filter is not selected then push all farmers in temp array of that filter
    if (selectedMultiSelectVillage.length === 0)
      tempVillageArray = [...allFarmersArray];

    if (selectedMultiSelectVariety.length === 0)
      tempVarietyArray = [...allFarmersArray];

    if (selectedMultiSelectTag.length === 0)
      tempTagArray = [...allFarmersArray];

    console.log("Variety Based : ", tempVarietyArray);
    console.log("Village Based : ", tempVillageArray);
    console.log("Tag based : ", tempTagArray);

    const intersectionData = [tempVillageArray, tempVarietyArray, tempTagArray];
    const result = intersectionData.reduce((a, b) =>
      a.filter((c) => b.includes(c))
    );

    console.log("FinalData", result);
    setFilteredArray(result);
  }

  useEffect(() => {
    // for getting all farmers from backend
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers")
      .then((data) => {
        let receivedData = data.data;

        for (let i = 0; i < receivedData.length; i++) {
          for (let j = 0; j < receivedData[i].plots.length; j++) {
            // setting AllFarmerArray initally to all data
            setAllFarmersArray((arr) =>
              arr.concat(
                <SingleFarmerRow
                  personalInformation={receivedData[i].personalInformation}
                  plotData={receivedData[i].plots[j]}
                />
              )
            );

            // setting filteredArray initally to all data
            setFilteredArray((arr) =>
              arr.concat(
                <SingleFarmerRow
                  personalInformation={receivedData[i].personalInformation}
                  plotData={receivedData[i].plots[j]}
                />
              )
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // for getting all fiters data from backend
    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((data) => {
        // console.log("Data", data.data[0]);
        setAllFiltersData(data.data[0]);

        const recievedObj = data.data[0];
        delete recievedObj._id;
        const makeDataForOptions = {
          GGN: [],
          farmerName: [],
          MHCode: [],
          village: [],
          variety: [],
          tag: [],
        };
        for (let item in recievedObj) {
          for (let arrItem in recievedObj[item]) {
            // console.log(recievedObj[item][arrItem], item);
            makeDataForOptions[item].push({
              label: recievedObj[item][arrItem],
              value: recievedObj[item][arrItem],
            });
          }
        }
        // console.log("makeDataForOptions", makeDataForOptions);
        setAllFiltersData(makeDataForOptions);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div className="viewAllFarmersMainDiv">
      <br />
      <h2>ALL FARMERS</h2>
      <br />
      <br />
      <Select
        className="searching"
        placeholder="Search Farmer Name"
        components={{ DropdownIndicator }}
        options={allFiltersData.farmerName}
        value={selectedFarmerValue}
        onChange={(event) => {
          setSelectedFarmerValue(event);
          // Farmer ko select kiya toh baki dono ko clear karne ke liye
          setSelectedGGNValue(null);
          setSelectedMHCodeValue(null);
          handleFarmerFilter(event);
        }}
      />
      <Select
        className="searching"
        placeholder="Search GGN"
        components={{ DropdownIndicator }}
        options={allFiltersData.GGN}
        value={selectedGGNValue}
        onChange={(event) => {
          setSelectedGGNValue(event);
          // GGN ko select kiya toh baki dono ko clear karne ke liye
          setSelectedFarmerValue(null);
          setSelectedMHCodeValue(null);

          handleGGNFilter(event);
        }}
      />
      <Select
        className="searching"
        placeholder="Search MHCode"
        components={{ DropdownIndicator }}
        options={allFiltersData.MHCode}
        value={selectedMHCodeValue}
        onChange={(event) => {
          setSelectedMHCodeValue(event);
          // MHCode ko select kiya toh baki dono ko clear karne ke liye
          setSelectedFarmerValue(null);
          setSelectedGGNValue(null);

          handleMHCodeFilter(event);
        }}
      />
      <br />
      <br />
      <MultiSelect
        className="filter"
        options={allFiltersData.village}
        value={selectedMultiSelectVillage}
        onChange={setSelectedMultiSelectVillage}
        // isLoading={true}
        // isCreatable={true}
        // shouldToggleOnHover={true}
        overrideStrings={{
          selectSomeItems: "Filter Village",
          allItemsAreSelected: "All villages selected",
        }}
      />
      <MultiSelect
        className="filter"
        options={allFiltersData.variety}
        value={selectedMultiSelectVariety}
        onChange={setSelectedMultiSelectVariety}
        overrideStrings={{
          selectSomeItems: "Filter variety",
          allItemsAreSelected: "All varieties selected",
        }}
      />
      <MultiSelect
        className="filter"
        options={allFiltersData.tag}
        value={selectedMultiSelectTag}
        onChange={setSelectedMultiSelectTag}
        overrideStrings={{
          selectSomeItems: "Filter Tags",
          allItemsAreSelected: "All tags selected",
        }}
      />
      <br />
      <br />
      <button className="applyFilterButton" onClick={handleFilterIntersection}>
        Apply
      </button>
      <button
        className="applyFilterClearButton"
        onClick={() => {
          setFilteredArray(allFarmersArray);
          setSelectedMultiSelectVillage([]);
          setSelectedMultiSelectVariety([]);
          setSelectedMultiSelectTag([]);
          setSelectedFarmerValue(null);
          setSelectedGGNValue(null);
          setSelectedMHCodeValue(null);
        }}
      >
        Clear
      </button>
      <br />
      <br />
      <div className="AllFarmersScroll">
        <table>
          <tr className="AllFarmersHeaderRow">
            <td>Name</td>
            <td>Plot No</td>
            <td>GGN No</td>
            <td>MH code</td>
            <td>Village</td>
            <td>Taluka</td>
            <td>District</td>
            <td>Pruning</td>
            <td>Area</td>
            <td>Variety</td>
            <td>Crop Spacing</td>
            <td>Tags</td>
          </tr>
          {filteredArray}
        </table>
      </div>
    </div>
  );
}

export default ViewAllFarmers;
