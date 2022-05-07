import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./BroadcastShowAll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import { ToastContainer } from "react-toastify";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";

function BroadcastSingleCard(props) {
  const navigate = useNavigate();
  const data = props.data;

  function handleViewClick() {
    navigate("/viewArticle/" + data._id);
  }

  function handleBroadcastDelete() {
    axios
      .post(
        "https://immense-beach-88770.herokuapp.com/broadcasts/delete/" +
          data._id
      )
      .then((res) => {
        CustomToast(
          "Article deleted Successfully ! Page will be reloaded",
          "black",
          "#1cd855"
        );
        console.log("Res", res);
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => {
        FailureToast();
        console.log("Err", err);
      });
  }

  return (
    <div
      style={{
        display: "inline-block",
        width: "30%",
        margin: "10px",
      }}
    >
      <div
        className="MyCardColumn"
        style={{
          display: "inline-block",
          height: "auto",
        }}
      >
        <div
          className="MyCard"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#31C531",
            borderRadius: "5px",
          }}
        >
          {data.format === "jpg" ? (
            <img
              src={
                "https://lh3.googleusercontent.com/d/" +
                data.driveId +
                "=s220?authuser=0"
              }
              alt="img"
              width="300px"
              height="150px"
            />
          ) : data.format === "youtube" ? (
            <ReactPlayer width="300px" height="135px" url={data.link} />
          ) : (
            <iframe
              src={
                "https://drive.google.com/file/d/" + data.driveId + "/preview"
              }
              width="300px"
              height="150px"
              //   allow="autoplay"
              title="PDF"
            ></iframe>
          )}

          <br />
          <br />
          <label className="broadcastLabel">Topic :</label>
          {/* <label className="broadcastLabelData">{data.topic}</label> */}
          <input
            className="broadcastLabelData"
            value={data.topic}
            disabled="true"
          />
          <br />
          <label className="broadcastLabel">Category :</label>
          {/* <label className="broadcastLabelData">{data.category}</label> */}
          <input
            className="broadcastLabelData"
            value={data.category}
            disabled="true"
          />
          <br />
          <label className="broadcastLabel">Date :</label>

          {/* <label className="broadcastLabelData">
            {new Date(data.date)
              .toJSON()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")}
          </label> */}

          <input
            className="broadcastLabelData"
            value={new Date(data.date)
              .toJSON()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")}
            disabled="true"
          />

          <br />
          <br />
          <i
            className="fa fa-eye fa-2x BroadcastShowAllIcon"
            onClick={handleViewClick}
            style={{ marginRight: "5px", marginLeft: "160px" }}
          ></i>
          <i
            className="fa fa-trash fa-2x BroadcastShowAllIcon"
            onClick={handleBroadcastDelete}
            style={{ marginRight: "5px", marginLeft: "15px" }}
          ></i>
        </div>
      </div>
    </div>
  );
}

function BroadcastShowAll() {
  function handleFilterIntersection(event) {
    let categoriesTempArr = [];
    let formatTempArr = [];
    let dateTempArr = [];

    categoriesTempArr = filterByCategories();
    formatTempArr = filterByFormat();
    dateTempArr = filterByDate();

    // If any filter is not selected then push all diaries in temp array of that filter
    if (selectedCategory === null) categoriesTempArr = [...allBroadcastArray];
    if (selectedFormat === null) formatTempArr = [...allBroadcastArray];
    if (startDate === "" || endDate === "")
      dateTempArr = [...allBroadcastArray];

    // finding intersection
    let finalData = [categoriesTempArr, formatTempArr, dateTempArr],
      finalResult = finalData.reduce((a, b) => a.filter((c) => b.includes(c)));
    //setting useState to intersected data
    setFilteredBroadcastArray(finalResult);
  }

  // Filter by operation
  function filterByCategories() {
    let tempArr = [];
    if (!selectedCategory) return tempArr;
    for (let i = 0; i < allBroadcastArray.length; i++) {
      if (
        selectedCategory &&
        allBroadcastArray[i].props.data.category === selectedCategory.label
      ) {
        tempArr.push(allBroadcastArray[i]);
      }
    }
    return tempArr;
  }

  // Filter by Date
  function filterByDate() {
    if (startDate === "" || endDate === "") return [];
    const tempArray = [];
    const newStartDate = new Date(startDate.substring(0, 10));
    const newEndDate = new Date(endDate.substring(0, 10));

    for (let i = 0; i < allBroadcastArray.length; i++) {
      if (
        newStartDate <=
          new Date(allBroadcastArray[i].props.data.date.substring(0, 10)) &&
        newEndDate >=
          new Date(allBroadcastArray[i].props.data.date.substring(0, 10))
      ) {
        tempArray.push(allBroadcastArray[i]);
      }
    }
    return tempArray;
  }

  //Filter by status
  function filterByFormat() {
    //when state is not selected.
    let tempArr = [];

    if (!selectedFormat) return tempArr;
    for (let i = 0; i < allBroadcastArray.length; i++) {
      if (
        selectedFormat &&
        allBroadcastArray[i].props.data.format === selectedFormat.value
      ) {
        tempArr.push(allBroadcastArray[i]);
      }
    }
    return tempArr;
  }

  function handleSort(event) {
    switch (event.value) {
      case 0:
        const tempArray1 = [...filteredBroadcastArray];
        tempArray1.sort((a, b) => {
          return a.props.data.topic.localeCompare(b.props.data.topic);
        });
        setFilteredBroadcastArray(tempArray1);
        break;
      case 1:
        const tempArray2 = [...filteredBroadcastArray];
        tempArray2.sort((a, b) => {
          return new Date(a.props.data.date) - new Date(b.props.data.date);
        });
        setFilteredBroadcastArray(tempArray2);
        break;
      default:
        console.log("Nothing selected");
    }
  }

  // *********************************************************************************************************

  const [allBroadcastArray, setAllBroadcastArray] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [filteredBroadcastArray, setFilteredBroadcastArray] = useState([]);
  const [dropdownCategoryArray, setDropdownCategoryArray] = useState([]);

  // const category = [
  //   { value: 0, label: "Pest & Disease" },
  //   { value: 1, label: "Soil Nutrition" },
  //   { value: 2, label: "Plant Health" },
  //   { value: 3, label: "Good Practices" },
  //   { value: 4, label: "Export Marketing" },
  //   { value: 5, label: "Mangesh Bhaskar" },
  // ];
  const format = [
    { value: "pdf", label: "PDF" },
    { value: "youtube", label: "Youtube video" },
    { value: "jpg", label: "JPG" },
  ];
  const sort = [
    { value: 0, label: "Name" },
    { value: 1, label: "Upload Date" },
    { value: 2, label: "Number of Views" },
  ];
  const navigate = useNavigate();
  function handleAddArticleButton() {
    navigate("/NewBroadcast");
  }

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/broadcasts")
      .then((res) => {
        // console.log("result is here", res);
        const tempArray = [];
        const temp = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArray.push(<BroadcastSingleCard data={res.data[i]} />);
          temp.push(res.data[i]);
        }
        setAllBroadcastArray(tempArray);
        setFilteredBroadcastArray(tempArray);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((res) => {
        const tempCategory = [];
        for (let i = 0; i < res.data[0].broadcastCategory.length; i++) {
          tempCategory.push({
            value: res.data[0].broadcastCategory[i],
            label: res.data[0].broadcastCategory[i],
          });
        }
        setDropdownCategoryArray(tempCategory);
      });
  }, []);

  return (
    <div className="cardBroadcastShowAll">
      <div className="broadcastAllFilter">
        <button className="broadcastAddButton" onClick={handleAddArticleButton}>
          Add Article
        </button>
        <label htmlFor="myDate">Date Range </label>
        <label style={{ marginLeft: "310px" }}>Categories : </label>
        <label style={{ marginLeft: "150px" }}>Format : </label>
        <br />
        <input
          className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"
          value={startDate}
          onChange={(e) => {
            // console.log(e.target.value);
            setStartDate(e.target.value);
          }}
        />
        <p style={{ display: "inline-block" }}> &nbsp; to &nbsp;</p>
        <input
          className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        />
        <Select
          className="broadcastSelect"
          options={dropdownCategoryArray}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e)}
        />
        <Select
          className="broadcastSelect"
          options={format}
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e)}
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
            setFilteredBroadcastArray(allBroadcastArray);
            setSelectedCategory(null);
            setSelectedFormat(null);
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear
        </button>
        <div style={{ paddingBottom: "50px" }}>
          <label
            style={{
              display: "inline-block",
              marginLeft: "850px",
              marginTop: "10px",
            }}
          >
            SORT BY :{" "}
          </label>
          <Select
            className="broadcastSelectSort"
            options={sort}
            onChange={handleSort}
          />
        </div>

        {filteredBroadcastArray}
      </div>
      <ToastContainer />
    </div>
  );
}
export default BroadcastShowAll;
