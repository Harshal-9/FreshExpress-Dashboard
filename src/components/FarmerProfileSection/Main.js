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
      <Select />
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
  return Number(result[0]) + Number(result[1]) / 60 + Number(result[2]) / 3600;
}
// 17°01'42.9"N

//   <main>
//     <div className="main__container">
//       {/* <!-- MAIN TITLE STARTS HERE --> */}

//       <div className="main__title">
//         <img src={hello} alt="hello" />
//         <div className="main__greeting">
//           <h1>Hello Codersbite</h1>
//           <p>Welcome to your admin dashboard</p>
//         </div>
//       </div>

//       {/* <!-- MAIN TITLE ENDS HERE --> */}

//       {/* <!-- MAIN CARDS STARTS HERE --> */}
//       <div className="main__cards">
//         <div className="card">
//           <i
//             className="fa fa-user-o fa-2x text-lightblue"
//             aria-hidden="true"
//           ></i>
//           <div className="card_inner">
//             <p className="text-primary-p">Number of Subscribers</p>
//             <span className="font-bold text-title">578</span>
//           </div>
//         </div>

//         <div className="card">
//           <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
//           <div className="card_inner">
//             <p className="text-primary-p">Times of Watching</p>
//             <span className="font-bold text-title">2467</span>
//           </div>
//         </div>

//         <div className="card">
//           <i
//             className="fa fa-video-camera fa-2x text-yellow"
//             aria-hidden="true"
//           ></i>
//           <div className="card_inner">
//             <p className="text-primary-p">Number of Videos</p>
//             <span className="font-bold text-title">340</span>
//           </div>
//         </div>

//         <div className="card">
//           <i
//             className="fa fa-thumbs-up fa-2x text-green"
//             aria-hidden="true"
//           ></i>
//           <div className="card_inner">
//             <p className="text-primary-p">Number of Likes</p>
//             <span className="font-bold text-title">645</span>
//           </div>
//         </div>
//       </div>
//       {/* <!-- MAIN CARDS ENDS HERE --> */}

//       {/* <!-- CHARTS STARTS HERE --> */}
//       <div className="charts">
//         <div className="charts__left">
//           <div className="charts__left__title">
//             <div>
//               <h1>Daily Reports</h1>
//               <p>Cupertino, California, USA</p>
//             </div>
//             <i className="fa fa-usd" aria-hidden="true"></i>
//           </div>
//           <Chart />
//         </div>

//         <div className="charts__right">
//           <div className="charts__right__title">
//             <div>
//               <h1>Stats Reports</h1>
//               <p>Cupertino, California, USA</p>
//             </div>
//             <i className="fa fa-usd" aria-hidden="true"></i>
//           </div>

//           <div className="charts__right__cards">
//             <div className="card1">
//               <h1>Income</h1>
//               <p>$75,300</p>
//             </div>

//             <div className="card2">
//               <h1>Sales</h1>
//               <p>$124,200</p>
//             </div>

//             <div className="card3">
//               <h1>Users</h1>
//               <p>3900</p>
//             </div>

//             <div className="card4">
//               <h1>Orders</h1>
//               <p>1881</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <!-- CHARTS ENDS HERE --> */}
//     </div>
//   </main>
