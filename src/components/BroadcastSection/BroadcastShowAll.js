import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./BroadcastShowAll.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";


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
        console.log("res", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("err", err);
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
        style={{ display: "inline-block", height: "auto" }}
      >
        <div className="MyCard" style={{ width: "100%", height: "100%" }}>
          {data.format === "jpg" ? <img
            src={
              "https://lh3.googleusercontent.com/d/" +
              data.driveId +
              "=s220?authuser=0"
            }
            alt="img"
            width="300px"
            height="150px"
          /> : data.format === "youtube" ? <ReactPlayer
            width="300px"
            height="135px"
            url={data.link}
          />

            : <iframe
              src={
                "https://drive.google.com/file/d/" +
                data.driveId +
                "/preview"
              }
              width="300px"
              height="150px"
              //   allow="autoplay"
              title="PDF"
            ></iframe>}

          <br />
          <br />
          <label className="broadcastLabel">Topic :</label>
          <label className="broadcastLabelData">{data.topic}</label>
          <br />
          <label className="broadcastLabel">Category :</label>
          <label className="broadcastLabelData">{data.category}</label>
          <br />
          <label className="broadcastLabel">Date :</label>

          <label className="broadcastLabelData">
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </label>
          <br />
          <br />
          <i
            className="fa fa-eye fa-2x"
            onClick={handleViewClick}
            style={{ marginRight: "5px", marginLeft: "160px" }}
          ></i>
          <i
            className="fa fa-trash fa-2x"
            onClick={handleBroadcastDelete}
            style={{ marginRight: "5px", marginLeft: "15px" }}
          ></i>
        </div>
      </div>
    </div>
  );
}

function BroadcastShowAll() {


  // function handleFilterIntersection(event) {
  //   let categoriesTempArr = [];
  //   let formatTempArr = [];
  //   let dateTempArr = [];

  //   categoriesTempArr = filterByCategories();
  //   formatTempArr = filterByFormat();
  //   dateTempArr = filterByDate();

  //   // If any filter is not selected then push all diaries in temp array of that filter
  //   if (selectedCategory === null) categoriesTempArr = [...allBroadcastArray];
  //   if (selectedFormat === null) formatTempArr = [...allBroadcastArray];
  //   if (startDate === "" && endDate === "")
  //     dateTempArr = [...allBroadcastArray];

  //   console.log("operation", categoriesTempArr);
  //   console.log("status", formatTempArr);
  //   console.log("proposedDate", dateTempArr);

  //   // finding intersection
  //   let finalData = [
  //     categoriesTempArr,
  //     formatTempArr,
  //     dateTempArr,
  //   ],
  //     finalResult = finalData.reduce((a, b) => a.filter((c) => b.includes(c)));

  //   console.log("Result", finalResult);
  //   // setFilteredDiariesArray(finalResult);
  // }

  // // Filter by operation
  // function filterByCategories() {
  //   let tempArr = [];
  //   console.log("All broadcast Array", allData);
  //   console.log("Selected category : ", selectedCategory);
  //   for (let i = 0; i < allData.length; i++) {
  //     console.log("op", allData[i].category);
  //     if (
  //       selectedCategory &&
  //       allData[i].category === selectedCategory.value
  //     ) {
  //       console.log("Hi");
  //       tempArr.push(allData[i]);
  //     }
  //   }
  //   // console.log("Temp", tempArr);
  //   setFilteredBroadcastArray(tempArr);
  //   return tempArr;
  // }

  // // Filter by Date
  // function filterByDate() {
  //   if (startDate === "" || endDate === "") return [];
  //   const tempArray = [];
  //   const newStartDate = new Date(startDate.substring(0, 10));
  //   const newEndDate = new Date(endDate.substring(0, 10));
  //   for (let i = 0; i < allData.length; i++) {
  //     if (
  //       newStartDate <=
  //       new Date(allData[i].props.proposedDate.substring(0, 10)) &&
  //       newEndDate >=
  //       new Date(allData[i].props.proposedDate.substring(0, 10))
  //     ) {
  //       tempArray.push(allData[i]);
  //     }
  //   }
  //   setFilteredBroadcastArray(tempArray);
  //   // console.log("MYTemp", tempArray);
  //   return tempArray;
  // }

  // //Filter by status
  // //Rutikesh Todo:
  // function filterByFormat() {
  //   //when state is not selected.
  //   let tempArr = [];
  //   console.log("Selected format : ", selectedFormat);
  //   for (let i = 0; i < allData.length; i++) {
  //     // console.log("op", allBroadcastArray[i].props.operation);
  //     if (
  //       selectedFormat &&
  //       allData[i].format === selectedFormat.value
  //     ) {
  //       console.log("Hi");
  //       tempArr.push(allData[i]);
  //     }
  //   }
  //   // console.log("Temp", tempArr);
  //   setFilteredBroadcastArray(tempArr);
  //   return tempArr;
  // }











  // *********************************************************************************************************


  const [allBroadcastArray, setAllBroadcastArray] = useState([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedFormat, setSelectedFormat] = useState(null);
  // const [filteredBroadcastArray, setFilteredBroadcastArray] = useState([]);
  // const [allData, setAllData] = useState([]);

  const category = [
    { value: 0, label: "Pest & Disease" },
    { value: 1, label: "Soil Nutrition" },
    { value: 2, label: "Plant Health" },
    { value: 3, label: "Good Practices" },
    { value: 4, label: "Export Marketing" },
    { value: 5, label: "Mangesh Bhaskar" },
  ];
  const format = [
    { value: 0, label: "PDF" },
    { value: 1, label: "Youtube video" },
    { value: 2, label: "JPG" },
  ];
  const sort = [
    { value: 0, label: "Name" },
    { value: 1, label: "Upload Date" },
    { value: 2, label: "Number of Views" },
  ];

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/broadcasts")
      .then((res) => {
        console.log("result is here", res);
        const tempArray = [];
        const temp = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArray.push(<BroadcastSingleCard data={res.data[i]} />);
          temp.push(res.data[i]);
        }
        // console.log("tempArray", tempArray);
        setAllBroadcastArray(tempArray);
        // setFilteredBroadcastArray(temp);
        // setAllData(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cardBroadcastShowAll">
      <div className="broadcastAllFilter">
        <button className="broadcastAddButton">Add Article</button>
        <label htmlFor="myDate">Date Range </label>
        <label style={{ marginLeft: "310px" }}>Categories : </label>
        <label style={{ marginLeft: "150px" }}>Format : </label>
        <br />
        <input
          className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"
        // value={startDate}
        // onChange={(e) => {
        //   // console.log(e.target.value);
        //   setStartDate(e.target.value);
        // }}
        />
        <p style={{ display: "inline-block" }}> &nbsp; to &nbsp;</p>
        <input
          className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"
        // value={endDate}
        // onChange={(e) => {
        //   // console.log(e.target.value);
        //   setEndDate(e.target.value);
        // }}
        />
        <Select
          className="broadcastSelect"
          options={category}
        // value={selectedCategory}
        // onChange={(e) => setSelectedCategory(e)}


        />
        <Select
          className="broadcastSelect"
          options={format}
        // value={selectedFormat}
        // onChange={(e) => setSelectedFormat(e)}
        />
      </div>
      <br /><br />
      <div style={{ textAlign: "center" }}>
        {/* <button
          className="applyFilterButton"
          onClick={() => handleFilterIntersection()}
        >
          Apply
        </button>

        <button
          className="applyFilterClearButton"
          onClick={() => {
            // setFilteredDiariesArray(allBroadcastArray);
            setSelectedCategory(null);
            setSelectedFormat(null);
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear
        </button> */}
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
          <Select className="broadcastSelectSort" options={sort} />
        </div>
        {allBroadcastArray}
      </div>
    </div>
  );
}
export default BroadcastShowAll;
