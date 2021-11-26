import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Fresh Express</h1>
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
          <a href="#">Dashboard</a>
        </div>
        <h2>Admin Profile</h2>
        <div className="sidebar__link">
          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
          <a href="#">View profile</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          <a href="#">Add new Admin</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-o" aria-hidden="true"></i>
          <a href="#">Add new Farmer</a>
        </div>

        <h2>Daily Diary</h2>
        <div className="sidebar__link">
          <i className="fa fa-plus"></i>
          <a href="https://csdd4.csb.app/">Add New</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-info"></i>
          <a href="#">View Diary</a>
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
          <i className="fa fa-street-view"></i>
          <a href="#">View Plots</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-tree"></i>
          <a href="#">Crop Monitoring</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-line-chart"></i>
          <a href="#">Reports</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-image"></i>
          <a href="#">MRL Monitoring</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-file-text"></i>
          <a href="#">Seasonal Reports</a>
        </div>

        {/* <h2>Crop Monitoring</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase"></i>
          <a href="#">Paygrade</a>
        </div> */}
        {/* <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div> */}
        {/* <h2>Reports</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase"></i>
          <a href="#">Paygrade</a>
        </div> */}
        {/* <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div> */}

        {/* <h2>MRL Monitoring</h2>
        <div className="sidebar__link">
          <i className="fa fa-money"></i>
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase"></i>
          <a href="#">Paygrade</a>
        </div> */}
        {/* <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div> */}

        <h2>Resource Broadasting</h2>
        <div className="sidebar__link">
          <i className="fa fa-newspaper-o"></i>
          <a href="#">New Broadast</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-book"></i>
          <a href="#">Past Broadcasts</a>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a href="#">Log out</a>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
