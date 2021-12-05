import React from "react";
import "./AllDiaries.css";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

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

// Data of dropdown
const operationTypesArray = [
  { label: "Spraying", value: "spraying" },
  { label: "Irrigation", value: "irrigation" },
  { label: "Farm Work", value: "farmWork" },
  { label: "Soil Work", value: "soilWork" },
  { label: "Maintenance Work", value: "maintenanceWork" },
];

const statusTypesArray = [
  { label: "Completed", value: "completed" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Overdue", value: "overdue" },
];

function AllDiaries() {
  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
        DAILY DIARY
      </h2>
      <br />
      <Select
        className="searchingAllDiaries"
        placeholder="Search Farmer Name"
        components={{ DropdownIndicator }}
      />
      <button className="allDiariesButton">
        <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i> Add
        Operation
      </button>
      <br />
      <br />
      <Select
        className="searchingAllDiaries"
        placeholder="Select Plot"
        components={{ DropdownIndicator }}
      />
      <button className="allDiariesButton">
        <i className="fa fa-download fa-lg" aria-hidden="true"></i> Export Excel
      </button>
      <br />
      <br />
      {/* <h2 style={{ marginLeft: "18.15px" }}>Filters</h2> */}
      <br />
      <div className="filtersDiv">
        <h3>Date Range</h3>
        <input type="date" className="allDiariesDate" />
        <p
          style={{
            display: "inline-block",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          to
        </p>
        <input type="date" className="allDiariesDate" />
      </div>
      <div className="filtersDiv">
        <h3>Operation Type</h3>
        <Select
          className="allDiariesfilter"
          placeholder="Select Operation"
          options={operationTypesArray}
        />
      </div>

      <div className="filtersDiv">
        <h3>Status</h3>
        <Select
          className="allDiariesfilter"
          placeholder="Select Status"
          options={statusTypesArray}
        />
      </div>
      <br />
      <br />
      <hr />
      <br />
      <div className="AllDiariesScroll">
        <table>
          <tr className="AllDiariesHeaderRow">
            <td>Proposed Date</td>
            <td>Operation</td>
            <td>Completion Status</td>
            <td>Completion Date</td>
            <td>Row 1</td>
            <td>Row 2</td>
            <td>Row 3</td>
            <td>Row 4</td>
            <td>Row 5</td>
            <td>Notes</td>
          </tr>
          <tr className="IndividualDiaryRow">
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
            <td>Harshal</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default AllDiaries;
