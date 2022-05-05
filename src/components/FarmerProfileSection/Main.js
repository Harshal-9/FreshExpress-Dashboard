import "./Main.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import Select from "react-select";
// import hello from "../../assets/hello.svg";
// import Chart from "../charts/Chart";

function Main() {
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState([]);
  const [arrayOfMarkers, setArrayOfMarkers] = useState([]);
  const [farmersCount, setFarmersCount] = useState(0);
  const [plotsCount, setPlotsCount] = useState(0);
  const [totalPlotArea, setTotalPlotArea] = useState(0);
  const [totalNumberofArticles, setTotalNumberofArticles] = useState(0);

  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/farmers/")
      .then((res) => {
        console.log("Res", res);
        let arr = [];
        let farmerNames = [];
        let MHCodes = [];
        let farmerCnt = 0;
        let plotArea = 0;
        let plotCnt = 0;

        for (let item of res.data) {
          farmerCnt++;
          console.log("I", item);
          // farmerName = item.personalInformation.name;
          if (item.plots && item.plots.length > 0) {
            plotCnt += item.plots.length;
            for (let singlePlot of item.plots) {
              // MHCode = singlePlot.farmInformation.MHCode;
              if (singlePlot.farmInformation.plotArea) {
                plotArea += Number(singlePlot.farmInformation.plotArea);
              }
              if (singlePlot.address) {
                if (singlePlot.address.coordinates) {
                  if (
                    singlePlot.address.coordinates.longitude.length > 0 &&
                    singlePlot.address.coordinates.latitude.length > 0
                  ) {
                    arr.push(singlePlot.address.coordinates);
                    farmerNames.push(item.personalInformation.name);
                    MHCodes.push(singlePlot.farmInformation.MHCode);
                  }
                }
              }
            }
          }
        }
        console.log("Coordinates", arr);
        let converted = [];

        for (let item of arr) {
          let val1 = toDegrees(item.latitude);
          let val2 = toDegrees(item.longitude);
          // converted.push({ latitude: val1, longitude: val2 });

          converted.push([val1, val2]);
        }
        console.log("Converted", converted);
        setArrayOfCoordinates(converted);
        let arrayOfComponent = [];

        for (let item in converted) {
          arrayOfComponent.push(
            <Marker position={converted[item]}>
              <Popup>
                <b>{farmerNames[item]} </b>
                <br /> <i>{MHCodes[item]}</i>
              </Popup>
            </Marker>
          );
        }

        console.log("A", arrayOfComponent);
        setArrayOfMarkers(arrayOfComponent);
        setFarmersCount(farmerCnt);
        setTotalPlotArea(plotArea);
        setPlotsCount(plotCnt);
      })
      .catch((err) => {
        console.log("Err", err);
      });

    axios
      .get("https://immense-beach-88770.herokuapp.com/broadcasts/")
      .then((res) => {
        console.log("Res", res.data.length);
        setTotalNumberofArticles(res.data.length);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="readymade_main__cards">
          <div className="readymadeCard">
            <i
              className="fa fa-users fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p" style={{ color: "black" }}>
                Number of Farmers
              </p>
              <span className="font-bold text-title">{farmersCount}</span>
            </div>
          </div>
          <div className="readymadeCard">
            <i
              className="fa fa fa-object-ungroup fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p" style={{ color: "black" }}>
                Number of plots
              </p>
              <span className="font-bold text-title">{plotsCount}</span>
            </div>
          </div>

          <div className="readymadeCard">
            <i className="fa fa-shield fa-2x text-red" aria-hidden="true"></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p" style={{ color: "black" }}>
                Total plot Area
              </p>
              <span className="font-bold text-title">{totalPlotArea}</span>
            </div>
          </div>

          <div className="readymadeCard">
            <i
              className="fa fa-newspaper-o fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="readymade_card_inner">
              <p className="text-primary-p" style={{ color: "black" }}>
                Total Number of Articles
              </p>
              <span className="font-bold text-title">
                {totalNumberofArticles}
              </span>
            </div>
          </div>
        </div>
      </div>
      <MapContainer center={[19.118375, 76.19328703703704]} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {arrayOfMarkers}
      </MapContainer>
    </div>
  );
}

export default Main;

function toDegrees(s) {
  const result = s.split(/[°'"]/);
  console.log(
    result,
    Number(result[0]) + Number(result[1]) / 60 + Number(result[2]) / 3600
  );
  let sum = 0;
  if (isNaN(Number(result[0]))) sum += 0;
  else sum += Number(result[0]);

  if (isNaN(Number(result[1]))) sum += 0;
  else sum += Number(result[1]) / 60;

  if (isNaN(Number(result[2]))) sum += 0;
  else sum += Number(result[2]) / 3660;

  return sum;
}
