import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/Cards/CustomCard.css";
import FarmerProfile from "./components/FarmerProfileSection/FarmerProfile";
import ViewAllFarmers from "./components/FarmerProfileSection/ViewAllFarmers";
import AddNewFarmer from "./components/FarmerProfileSection/AddNewFarmer";
import BroadcastShowAll from "./components/BroadcastSection/BroadcastShowAll";
import ViewArticle from "./components/BroadcastSection/BroadcastViewArticle";
import NewBroadcast from "./components/BroadcastSection/NewBroadcast";

import AllDiaries from "./components/Dailydiary/AllDiaries";
import CropMonitoring from "./components/CropMonitoring/CropMonitoring";
import CropMonitoringViewEntry from "./components/CropMonitoring/CropMonitoringViewEntry";

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      {/* <Main /> */}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <Router>
        <Routes>
          <Route exact path="/FarmerProfile" element={<FarmerProfile />} />
          <Route exact path="/ViewAllFarmers" element={<ViewAllFarmers />} />
          <Route
            exact
            path="/FarmerProfile/:MHCodeFromParams"
            element={<FarmerProfile flg="1" />}
          />
          <Route exact path="/NewFarmer" element={<AddNewFarmer />} />
          <Route exact path="/BroadcastShowAll" element={<BroadcastShowAll />} />
          <Route exact path="/viewArticle" element={<ViewArticle/>} />
          <Route exact path="/NewBroadcast" element={<NewBroadcast/>} />



          <Route
            exact
            path="/BroadcastShowAll"
            element={<BroadcastShowAll />}
          />
          <Route exact path="/viewArticle" element={<ViewArticle />} />
          <Route exact path="/AllDiaries" element={<AllDiaries />}></Route>
          <Route exact path="/CropMonitoring" element={<CropMonitoring/>}></Route>
          
          <Route exact path="/CropMonitoringViewEntry" element={<CropMonitoringViewEntry/>}></Route>

        </Routes>
      </Router>
    </div>
  );
};

export default App;
