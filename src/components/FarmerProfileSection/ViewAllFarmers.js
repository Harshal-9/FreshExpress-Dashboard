import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAllFarmers.css";

function SingleFarmerRow(props) {
  let farmerData = props;
  console.log(props);

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
  }, []);

  return (
    <div>
      <h2>ALL FARMERS</h2>
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