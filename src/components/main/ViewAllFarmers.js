import React from "react";
import {useNavigate} from "react-router-dom";

import "./ViewAllFarmers.css";

function ViewAllFarmers() {

  const navigate = useNavigate();

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
          <tr className="IndividualFarmerRow" onClick={()=>{navigate("/FarmerProfile")}}>
            <td>Rutikesh BalKrishna Sawant</td>
            <td>P1234567</td>
            <td>G12345</td>
            <td>MH234567</td>
            <td>Kankavli</td>
            <td>Kankavli</td>
            <td>Devgad</td>
            <td>12/12/2012</td>
            <td>Old Rajendra Nagar</td>
            <td>Maongoes</td>
            <td>7 X 7</td>
            <td>No tags</td>
          </tr>
          <tr className="IndividualFarmerRow" onClick={()=>{navigate("/FarmerProfile")}}>
            <td>Nihkil Rajendra Danapgol</td>
            <td>P1234567</td>
            <td>G12345</td>
            <td>MH234567</td>
            <td>Gandinglaj</td>
            <td>Gandinglaj</td>
            <td>Kolhapur</td>
            <td>12/12/2012</td>
            <td>Old Rajendra Nagar</td>
            <td>Apple</td>
            <td>5 X 5</td>
            <td>Nice apples</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ViewAllFarmers;
