import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAllFarmers.css";

import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { MultiSelect } from "react-multi-select-component";

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
  const [allFarmersArray, setAllFarmersArray] = useState([]);

  const [selectedMultiSelectVillage, setSelectedMultiSelectVillage] = useState(
    []
  );
  const [selectedMultiSelectTag, setSelectedMultiSelectTag] = useState([]);
  const [selectedMultiSelectVariety, setSelectedMultiSelectVariety] = useState(
    []
  );

  const [allFiltersData, setAllFiltersData] = useState({
    GGN: [],
    farmerName: [],
    MHCode: [],
    village: [],
    variety: [],
    tag: [],
  });

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers")
      .then((data) => {
        let receivedData = data.data;

        for (let i = 0; i < receivedData.length; i++) {
          for (let j = 0; j < receivedData[i].plots.length; j++) {
            // console.log(receivedData[i]);
            setAllFarmersArray((arr) =>
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
    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((data) => {
        console.log("Data", data.data[0]);
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
            console.log(recievedObj[item][arrItem], item);
            makeDataForOptions[item].push({
              label: recievedObj[item][arrItem],
              value: recievedObj[item][arrItem],
            });
          }
        }
        console.log("makeDataForOptions", makeDataForOptions);
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
      />
      <Select
        className="searching"
        placeholder="Search GGN"
        components={{ DropdownIndicator }}
        options={allFiltersData.GGN}
      />
      <Select
        className="searching"
        placeholder="Search MHCode"
        components={{ DropdownIndicator }}
        options={allFiltersData.MHCode}
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
        options={allFiltersData.tag}
        value={selectedMultiSelectTag}
        onChange={setSelectedMultiSelectTag}
        overrideStrings={{
          selectSomeItems: "Filter Tags",
          allItemsAreSelected: "All tags selected",
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
      <br />
      <br />
      <div class="AllFarmersScroll">
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
          {allFarmersArray}
        </table>
      </div>
    </div>
  );
}

export default ViewAllFarmers;
