import "./Sidebar.css";
import logo from "../../assets/logo.png";

//this component is used to show content of sidebar

const Sidebar = ({ sidebarOpen, closeSidebar, loginData }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1 style={{ marginLeft: "20px" }}>Fresh Express</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="/">Dashboard</a>
        </div>
        <h2>Admin Profile</h2>
        <div className="sidebar__link">
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <a href="/adminProfile">View profile</a>
        </div>
        {loginData.userType === "superAdmin" ? (
          <div className="sidebar__link">
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            <a href="/AddDelAdmin">Add new/Delete Admin</a>
          </div>
        ) : (
          ""
        )}
        <div className="sidebar__link">
          <i className="fa fa-user-o" aria-hidden="true"></i>
          <a href="/NewFarmer">Add new Farmer</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          <a href="/resetPassword">Reset Passwords</a>
        </div>

        <h2>All Farmers</h2>
        <div className="sidebar__link">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <a href="/FarmerProfile">Farmer Profile</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <a href="/ViewAllFarmers">All Farmers</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-tree"></i>
          <a href="/CropMonitoring">Crop Monitoring</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-image"></i>
          <a href="/MRLMonitoring">MRL Monitoring</a>
        </div>

        <h2>Daily Diary</h2>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <a href="/DailyDiaryForm">Add New</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-tasks" aria-hidden="true"></i>
          <a href="/AllDiaries">All Diaries</a>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
          <a href="/ScheduleDailyDairy">Schedule Daily Diaries</a>
        </div>

        <h2>Resource Broadasting</h2>
        <div className="sidebar__link">
          <i className="fa fa-newspaper-o"></i>
          <a href="/NewBroadcast">New Broadast</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-book"></i>
          <a href="/BroadcastShowAll">Past Broadcasts</a>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="/logout">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
