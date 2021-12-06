import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import { useNavigate } from "react-router-dom";

function AddNewFarmer() {
  const navigate = useNavigate();
  const [selectedGGN, setSelectGGN] = useState(null);
  const [selectedFarmer, setSelectFarmer] = useState(null);
  const [allGGN, setAllGGN] = useState([]);
  const [allMHCode, setAllMHCode] = useState([]);
  const [allFarmers, setAllFarmers] = useState([]);

  // function of handling form data of add farmer card
  function handleFormSubmit1(event) {
    event.preventDefault();
    let farmerName = event.target.farmerName.value;
    let plotNumber = event.target.plotNumber.value;
    let MHCode = event.target.MHCode.value;

    // checking for duplicate MHCode
    for (let item in allMHCode) {
      if (allMHCode[item] === MHCode) {
        CustomToast("MHCode already exists", "black", "#FFD700");
        return;
      }
    }

    let GGN = "";
    let familyName = "";
    if (selectedGGN) GGN = selectedGGN.value;
    else {
      GGN = event.target.GGNNumber.value;
      familyName = event.target.familyName.value;

      // Avoiding insertion of duplicate GGN
      for (let item in allGGN) {
        if (allGGN[item].value === GGN) {
          CustomToast(
            "GGN already exists select from the drop down or add new",
            "black",
            "#FFD700"
          );

          return;
        }
      }

      if (familyName === "") {
        CustomToast("Family Name should not be empty !", "black", "#FFD700");

        return;
      }
    }

    const dataToSend = {
      personalInformation: {
        name: farmerName,
        familyName: familyName,
        mobileNumber: "",
        email: "",
        GGN: GGN,
        consultantName: "",
        farmMap: "",
      },
      plots: [
        {
          farmInformation: {
            plotNumber: plotNumber,
            MHCode: MHCode,
          },
          address: {
            coordinates: {
              latitude: "",
              longitude: "",
            },
            village: "",
          },
          other: {
            tags: [],
          },
          cropSpacing: {
            betweenTwoCrops: 0,
            betweenTwoRows: 0,
          },
        },
      ],
    };

    //posting the new farmer data
    axios
      .post("https://immense-beach-88770.herokuapp.com/farmers", dataToSend)
      .then((res) => {
        console.log("Response", res);
        UpdateSuccessToast();
        setTimeout(() => navigate("/FarmerProfile/" + MHCode), 2000);
      })
      .catch((err) => {
        console.log("Error", err);
        FailureToast();
      });
  }

  // function of handling form data of add plot card
  function handleFormSubmit2(event) {
    event.preventDefault();
    let farmerName = selectedFarmer;
    let plotNumber = event.target.plotNumber.value;
    let plotMHCode = event.target.plotMHCode.value;

    // console.log(plotMHCode, plotNumber);

    // checking if farmer not selected
    if (farmerName === null) {
      CustomToast("Select Farmer !", "black", "#FFD700");
      return;
    }

    // checking for duplicate MHCode
    for (let item in allMHCode) {
      if (allMHCode[item] === plotMHCode) {
        CustomToast("MHCode already exists !", "black", "#FFD700");
        return;
      }
    }

    let dataToSend = {
      farmInformation: {
        plotNumber: plotNumber,
        MHCode: plotMHCode,
      },
      address: {
        coordinates: {
          latitude: "",
          longitude: "",
        },
        village: "",
      },
      other: {
        tags: [],
      },
      cropSpacing: {
        betweenTwoCrops: 0,
        betweenTwoRows: 0,
      },
    };

    axios
      .post(
        "https://immense-beach-88770.herokuapp.com/farmers/plots/addPlot/" +
          selectedFarmer.value,
        dataToSend
      )
      .then((res) => {
        console.log("Response", res);
        UpdateSuccessToast();
        setTimeout(() => navigate("/FarmerProfile/" + plotMHCode), 2000);
      })
      .catch((err) => {
        console.log("Err", err);
        FailureToast();
      });
  }

  useEffect(() => {
    // for getting all GGNs from backend
    axios
      .get("https://immense-beach-88770.herokuapp.com/filters")
      .then((data) => {
        const recievedObj = data.data[0];
        const tempGGN = [];
        const tempMHCode = [];
        for (let i in recievedObj.GGN) {
          tempGGN.push({
            label: recievedObj.GGN[i],
            value: recievedObj.GGN[i],
          });
        }
        for (let i in recievedObj.MHCode) {
          tempMHCode.push(recievedObj.MHCode[i]);
        }

        setAllGGN(tempGGN);
        setAllMHCode(tempMHCode);
      });

    // for getting all farmers
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers")
      .then((data) => {
        let receivedData = data.data;

        const tempFarmersArr = [];
        for (let i = 0; i < receivedData.length; i++) {
          // console.log(receivedData[i]);
          tempFarmersArr.push({
            label: receivedData[i].personalInformation.name,
            value: receivedData[i]._id,
          });
        }
        setAllFarmers(tempFarmersArr);
      });
  }, []);

  return (
    <div>
      <br />
      <div className="MyCardColumn" style={{ display: "inline-block" }}>
        <div className="MyCard">
          <p style={{ color: "red" }}>
            (<b>NOTE</b> : Farmer who is Family head should have Family Name
            same as his name )
          </p>
          <br />
          <img
            src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
            width="250px"
            height="225px"
            alt="FarmerImg"
            style={{ display: "inline-block", margin: "10px" }}
          ></img>
          <br />
          <div style={{ display: "inline-block" }}>
            <form onSubmit={handleFormSubmit1}>
              <label className="FarmerProfileLabel2">Farmer Name : </label>
              <input name="farmerName" type="text" size="80"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Plot Number : </label>
              <input name="plotNumber" type="text" size="80"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">MH Code : </label>
              <input name="MHCode" type="text" size="80"></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Select existing GGN :
              </label>
              <Select
                className="selectGGN"
                placeholder="Select GGN Number"
                value={selectedGGN}
                // options={[{ label: "1", value: "1" }]}
                options={allGGN}
                onChange={(e) => setSelectGGN(e)}
              />
              <br />
              <br />
              <label className="FarmerProfileLabel2">GGN Number: </label>
              <input
                name="GGNNumber"
                type="text"
                size="80"
                disabled={selectedGGN ? true : false}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Family Name : </label>
              <input
                name="familyName"
                type="text"
                size="80"
                disabled={selectedGGN ? true : false}
              ></input>
              <br />
              <br />
              <button className="addNewFarmerButton1" type="submit">
                Add New Farmer
              </button>
              <button
                className="addNewFarmerButton2"
                type="reset"
                onClick={() => {
                  setSelectGGN(null);
                }}
              >
                Clear Data
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="MyCardColumn" style={{ display: "inline-block" }}>
        <div className="MyCard">
          <p style={{ fontSize: "medium" }}>Add New Plot for existing Farmer</p>
          <br />
          <form onSubmit={handleFormSubmit2}>
            <label className="FarmerProfileLabel2">Select Farmer : </label>
            <Select
              className="addNewFarmerSelectFarmer"
              options={allFarmers}
              placeholder="Select Farmer"
              value={selectedFarmer}
              onChange={(e) => {
                setSelectFarmer(e);
              }}
            />
            <br />
            <br />
            <label className="FarmerProfileLabel2">Plot Number :</label>
            <input name="plotNumber" type="text" size="80"></input>
            <br />
            <br />
            <label className="FarmerProfileLabel2">MH Code : </label>
            <input name="plotMHCode" type="text" size="80"></input>
            <br />
            <br />
            <button className="addNewFarmerButton1" type="submit">
              Add New Plot
            </button>
            <button
              className="addNewFarmerButton2"
              type="reset"
              onClick={() => {
                setSelectFarmer(null);
              }}
            >
              Clear Data
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddNewFarmer;
