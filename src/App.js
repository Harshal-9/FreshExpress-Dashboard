import React,{ useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/Cards/CustomCard.css";
import FarmerProfile from "./components/main/FarmerProfile";
import ViewAllFarmers from "./components/main/ViewAllFarmers";

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
          <Route path="/FarmerProfile" element={<FarmerProfile />} />
        </Routes>
        <Routes>
          <Route path="/ViewAllFarmers" element={<ViewAllFarmers />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
