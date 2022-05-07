import React, { useEffect, useState } from "react";
import "./AllDiaries.css";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { FailureToast } from "../Toasts/AllToasts";
import { useNavigate } from "react-router-dom";


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

const SprayingTypeArray = [
  { value: 1, label: "Fertilizer" },
  { value: 2, label: "Fungicide" },
  { value: 3, label: "Insecticide" },
  { value: 4, label: "Organic" },
  { value: 5, label: "Plant Growth Regulator" },
];

// Single row component
function SingleDiaryRow(props) {
  // function to get completion status
  function getCompletionStatus() {
    if (new Date(diaryData.proposedDate.substring(0, 10)) >= new Date())
      return "Upcoming";
    else if (new Date(diaryData.proposedDate.substring(0, 10)) < new Date())
      return "Overdue";
  }

  let diaryData = props;
  const navigate = useNavigate();

  let rowsData = [];
  let i = 0;
  // console.log(props.operation);
  switch (props.operation) {
    case "spraying":
      for (; i < diaryData.data.details.length; i++) {
        rowsData.push(
          diaryData.data.details[i].category +
          " --> " +
          diaryData.data.details[i].chemical
        );
      }
      for (; i < 5; i++) rowsData.push("");
      break;

    case "irrigation":
      for (; i < diaryData.data.details.length; i++) {
        rowsData.push(diaryData.data.details[i].fertilizer);
      }
      for (; i < 5; i++) rowsData.push("");
      break;

    case "farmWork":
      for (; i < diaryData.data.details.length; i++) {
        rowsData.push(diaryData.data.details[i].work);
      }
      for (; i < 5; i++) rowsData.push("");

      break;

    case "soilWork":
      for (; i < diaryData.data.details.length; i++) {
        rowsData.push(diaryData.data.details[i].work);
      }
      for (; i < 5; i++) rowsData.push("");
      break;

    case "maintenanceWork":
      for (; i < diaryData.data.details.length; i++) {
        rowsData.push(diaryData.data.details[i].item);
      }
      for (; i < 5; i++) rowsData.push("");
      break;

    default:
      break;
  }

  return (
    <tr
      className="IndividualDiaryRow"
      onClick={() => {
        // navigate("/dairy/" + diaryData.diaryId);
        navigate("/dairy/" + diaryData.diaryId, {
          state: { farmerName: diaryData.farmerName },
        });
      }}
    >
      <td>{diaryData.proposedDate.substring(0, 10)}</td>
      <td>{diaryData.operation}</td>
      <td>
        {diaryData.data.isCompleted ? "Completed" : getCompletionStatus()}
      </td>
      <td>
        {diaryData.data.completedDate
          ? diaryData.data.completedDate.substring(0, 10)
          : "-"}
      </td>
      <td>{rowsData[0]}</td>
      <td>{rowsData[1]}</td>
      <td>{rowsData[2]}</td>
      <td>{rowsData[3]}</td>
      <td>{rowsData[4]}</td>
    </tr>
  );
}

// main Component
function AllDiaries() {
  // All filters below

  const navigate = useNavigate();
  // function to handle all filters Intersection
  function handleFilterIntersection(event) {
    let operationTempArr = [];
    let statusTempArr = [];
    let proposedDateTempArr = [];
    let sprayingTempArr = [];


    operationTempArr = filterByOperation();
    statusTempArr = filterByStatus();
    proposedDateTempArr = filterByProposedDate();
    sprayingTempArr = filterBySpraying();

    // If any filter is not selected then push all diaries in temp array of that filter
    if (selectedOperation === null) operationTempArr = [...allDiariesArray];
    if (selectedStatus === null) statusTempArr = [...allDiariesArray];
    if (startDate === "" || endDate === "")
      proposedDateTempArr = [...allDiariesArray];
    if (selectedSprayingType === null) sprayingTempArr = [...allDiariesArray];

    console.log("operation", operationTempArr);
    console.log("status", statusTempArr);
    console.log("proposedDate", proposedDateTempArr);
    console.log("Spraying", sprayingTempArr);

    // finding intersection
    let finalData = [
      operationTempArr,
      statusTempArr,
      proposedDateTempArr,
      sprayingTempArr,
    ],
      finalResult = finalData.reduce((a, b) => a.filter((c) => b.includes(c)));

    console.log("Result", finalResult);
    setFilteredDiariesArray(finalResult);
  }

  // Filter by operation
  function filterByOperation() {
    let tempArr = [];
    console.log("Selected operation : ", selectedOperation);
    for (let i = 0; i < allDiariesArray.length; i++) {
      // console.log("op", allDiariesArray[i].props.operation);
      if (
        selectedOperation &&
        allDiariesArray[i].props.operation === selectedOperation.value
      ) {
        console.log("Hi");
        tempArr.push(allDiariesArray[i]);
      }
    }
    // console.log("Temp", tempArr);
    // setFilteredDiariesArray(tempArr);
    return tempArr;
  }

  // Filter by Date
  function filterByProposedDate() {
    if (startDate === "" || endDate === "") return [];
    const tempArray = [];
    const newStartDate = new Date(startDate.substring(0, 10));
    const newEndDate = new Date(endDate.substring(0, 10));
    for (let i = 0; i < allDiariesArray.length; i++) {
      if (
        newStartDate <=
        new Date(allDiariesArray[i].props.proposedDate.substring(0, 10)) &&
        newEndDate >=
        new Date(allDiariesArray[i].props.proposedDate.substring(0, 10))
      ) {
        tempArray.push(allDiariesArray[i]);
      }
    }
    // setFilteredDiariesArray(tempArray);
    // console.log("MYTemp", tempArray);
    return tempArray;
  }

  //Filter by Spraying Type
  function filterBySpraying() {
    let tempArr = [];
    // console.log("Selected operation : ", selectedOperation);
    for (let i = 0; i < allDiariesArray.length; i++) {
      // console.log("op", allDiariesArray[i]);
      if (allDiariesArray[i].props.operation === "spraying") {
        for (let j = 0; j < allDiariesArray[i].props.data.details.length; j++) {
          if (
            selectedSprayingType &&
            allDiariesArray[i].props.data.details[j].category ===
            selectedSprayingType.label
          ) {
            tempArr.push(allDiariesArray[i]);
            break;
          }
        }
      }
    }
    // console.log("Temp", tempArr);
    // setFilteredDiariesArray(tempArr);
    return tempArr;
  }

  //Filter by status
  //Rutikesh Todo:
  function filterByStatus() {
    //when state is not selected.
    if (!selectedStatus) return [];
    const tempArr = [];
    // console.log("status", selectedStatus.value);
    for (let i = 0; i < allDiariesArray.length; i++) {
      if (allDiariesArray[i].props.data.isCompleted) {
        if (selectedStatus.value === "completed") {
          // console.log(i, "com");
          tempArr.push(allDiariesArray[i]);
        }
      } else {
        if (
          selectedStatus.value === "upcoming" &&
          new Date(allDiariesArray[i].props.proposedDate.substring(0, 10)) >=
          new Date()
        ) {
          // console.log(i, "upc");
          tempArr.push(allDiariesArray[i]);
        } else if (
          selectedStatus.value === "overdue" &&
          new Date(allDiariesArray[i].props.proposedDate.substring(0, 10)) <
          new Date()
        ) {
          // console.log(i, "ovd");
          tempArr.push(allDiariesArray[i]);
        }
      }
    }
    // console.log("after status filter", tempArr);
    // setFilteredDiariesArray(tempArr);
    return tempArr;
  }

  //Rutikesh

  // useStates
  const [allFarmers, setAllFarmers] = useState({
    farmerID: "None",
    plot: [],
    farmerName: "None",
  });
  const [selectedFarmer, setSelectedFarmer] = useState({});
  const [allDiariesArray, setAllDiariesArray] = useState([]);
  const [filteredDiariesArray, setFilteredDiariesArray] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedSprayingType, setSelectedSprayingType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // get request for getting farmer and his corresponding plots
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
      .then((res) => {
        let Data = [...res.data];
        // console.log("Data Here :", Data);
        setAllFarmers(Data);
      })
      .catch((err) => {
        console.log("err", err);
        FailureToast();
      });
  }, []);

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
      <button className="allDiariesButton"
        onClick={() => {
          navigate("/DailyDiaryForm")
        }}
      >
        <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i> Add
        Operation
      </button>
      <br />
      <br />

      <Select
        className="searchingAllDiaries"
        placeholder="Select Plot"
        components={{ DropdownIndicator }}
        options={selectedFarmer.plot}
        getOptionLabel={(option) =>
          "(" + option.plot + ") " + option.farmerName + " - " + option.MHCode
        }
        getOptionValue={(option) => option.MHCode}
        onChange={(e) => {
          // console.log(e);
          axios
            .get(
              "https://immense-beach-88770.herokuapp.com/dailyDiary/MHCode/" +
              e.MHCode
            )
            .then((data) => {
              let receivedData = data.data;
              console.log("Response:", receivedData);

              setAllDiariesArray([]);
              setFilteredDiariesArray([]);

              //To sort diaries according to proposedDate in descending order.
              receivedData.sort(function (a, b) {
                return new Date(b.proposedDate) - new Date(a.proposedDate);
              });

              for (let i = 0; i < receivedData.length; i++) {
                let tempArr = {
                  spraying: receivedData[i].spraying,
                  irrigation: receivedData[i].irrigation,
                  farmWork: receivedData[i].farmWork,
                  soilWork: receivedData[i].soilWork,
                  maintenanceWork: receivedData[i].maintenanceWork,
                };

                for (let item in tempArr) {
                  // setting all diaries in allDiariesArray
                  // console.log(" int item " + item)
                  if (tempArr[item].details.length) {
                    setAllDiariesArray((arr) =>
                      arr.concat(
                        <SingleDiaryRow
                          proposedDate={receivedData[i].proposedDate}
                          data={tempArr[item]}
                          operation={item}
                          diaryId={receivedData[i]._id}
                          farmerName={selectedFarmer.FarmerName}
                        />
                      )
                    );

                    // setting filtered diaries to contain all diaries at beginning
                    setFilteredDiariesArray((arr) =>
                      arr.concat(
                        <SingleDiaryRow
                          proposedDate={receivedData[i].proposedDate}
                          data={tempArr[item]}
                          operation={item}
                          diaryId={receivedData[i]._id}
                          farmerName={selectedFarmer.FarmerName}
                        />
                      )
                    );
                  }
                }
              }
            })
            .catch((err) => {
              console.log("Error:", err);
            });
        }}
      />
      {/* <button className="allDiariesButton">
        <i className="fa fa-download fa-lg" aria-hidden="true"></i> Export Excel
      </button> */}
      <br />
      <br />

      {/* <h2 style={{ marginLeft: "18.15px" }}>Filters</h2> */}
      <br />
      <div className="filtersDiv">
        <h3>Date Range</h3>
        <input
          type="date"
          className="allDiariesDate"
          value={startDate}
          onChange={(e) => {
            // console.log(e.target.value);
            setStartDate(e.target.value);
          }}
        />
        <p
          style={{
            display: "inline-block",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          to
        </p>
        <input
          type="date"
          className="allDiariesDate"
          value={endDate}
          onChange={(e) => {
            // console.log(e.target.value);
            setEndDate(e.target.value);
          }}
        />
      </div>
      <div className="filtersDiv">
        <h3>Operation Type</h3>
        <Select
          className="allDiariesfilter"
          placeholder="Select Operation"
          options={operationTypesArray}
          value={selectedOperation}
          onChange={(e) => setSelectedOperation(e)}
        />
      </div>

      <div className="filtersDiv">
        <h3>Status</h3>
        <Select
          className="allDiariesfilter"
          placeholder="Select Status"
          options={statusTypesArray}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e)}
        />
      </div>
      <br />
      <br />
      <div className="filtersDiv">
        <h3>Spraying Type</h3>
        <Select
          className="allDiariesfilter"
          placeholder="Select spray"
          options={SprayingTypeArray}
          value={selectedSprayingType}
          onChange={(e) => {
            // console.log(e);
            setSelectedSprayingType(e);
          }}
        />
      </div>

      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <button
          className="applyFilterButton"
          onClick={() => handleFilterIntersection()}
        >
          Apply
        </button>
        <button
          className="applyFilterClearButton"
          onClick={() => {
            setFilteredDiariesArray(allDiariesArray);
            setSelectedOperation(null);
            setSelectedStatus(null);
            setSelectedSprayingType(null);
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear
        </button>
      </div>
      <br />
      <hr />

      <br />
      <div className="AllDiariesScroll">
        <table>
          <tbody>
            <tr className="AllDiariesHeaderRow">
              <td>Proposed Date</td>
              <td>Operation</td>
              <td>Completion Status</td>
              <td>Completion Date</td>
              <td>Record 1</td>
              <td>Record 2</td>
              <td>Record 3</td>
              <td>Record 4</td>
              <td>Record 5</td>
            </tr>
            {filteredDiariesArray}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllDiaries;
