import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./BroadcastShowAll.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";


function BroadcastSingleCard(props) {
  const navigate = useNavigate();
  const data = props.data;

  function handleViewClick() {

    navigate("/viewArticle/" + data._id);

  }

  function handleBroadcastDelete() {
    axios.post("https://immense-beach-88770.herokuapp.com/broadcasts/delete/" + data._id)
      .then((res) => {
        console.log("res", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div style={{ display: "inline-block", width: "30%", height: "35%", margin: "10px" }}>
      <div className="MyCardColumn" style={{ display: "inline-block", width: "100%", height: "100%" }}>
        <div className="MyCard" style={{ width: "100%", height: "100%" }} >
          <img
            src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
            width="300px"
            height="150px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
          <label className="broadcastLabel">Topic :</label>
          <label className="broadcastLabelData">{data.topic}</label>
          <br />
          <label className="broadcastLabel">Category :</label>
          <label className="broadcastLabelData">{data.category}</label>
          <br />
          <label className="broadcastLabel">Date :</label>

          <label className="broadcastLabelData">{
            new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

          }</label>
          <br />
          <br />
          <i className="fa fa-eye fa-2x" onClick={handleViewClick} style={{ marginRight: "5px", marginLeft: "160px" }}></i>
          <i className="fa fa-trash fa-2x" onClick={handleBroadcastDelete} style={{ marginRight: "5px", marginLeft: "15px" }}></i>
        </div>
      </div>
    </div>
  );
}

function BroadcastShowAll() {

  const [allBroadcastArray, setAllBroadcastArray] = useState([]);
  const category = [
    { value: 0, label: "Pest & Disease" },
    { value: 1, label: "Soil Nutrition" },
    { value: 2, label: "Plant Health" },
    { value: 3, label: "Good Practices" },
    { value: 4, label: "Export Marketing" },
    { value: 5, label: "Mangesh Bhaskar" }
  ]
  const format = [
    { value: 0, label: "PDF" },
    { value: 1, label: "Youtube video" },
    { value: 2, label: "JPG" }
  ]
  const sort = [
    { value: 0, label: "Name" },
    { value: 1, label: "Upload Date" },
    { value: 2, label: "Number of Views" }
  ]


  useEffect(() => {
    axios.get("https://immense-beach-88770.herokuapp.com/broadcasts")
      .then((res) => {
        // console.log("result is here", res);
        const tempArray = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArray.push(<BroadcastSingleCard
            data={res.data[i]}
          />)
        }
        // console.log("tempArray", tempArray);
        setAllBroadcastArray(tempArray);
      }).catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <div className="cardBroadcastShowAll">
      <div className="broadcastAllFilter">
        <button className="broadcastAddButton">Add Article</button>
        <label htmlFor="myDate">Date Range </label>
        <label style={{ marginLeft: "310px" }}>Categories : </label>
        <label style={{ marginLeft: "150px" }}>Format : </label>
        <br />
        <input className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"

        />
        <p style={{ display: "inline-block" }}> &nbsp; to &nbsp;</p>
        <input className="broadcastDate"
          type="date"
          id="myDate"
          name="myDate"
        />
        <Select className="broadcastSelect" options={category} />
        <Select className="broadcastSelect" options={format} />
      </div >
      <div style={{ paddingBottom: "50px" }}>
        <label style={{ display: "inline-block", marginLeft: "850px", marginTop: "10px" }}>SORT BY : </label>
        <Select className="broadcastSelectSort" options={sort} />
      </div>
      {allBroadcastArray}


    </div>
  );
}
export default BroadcastShowAll;

