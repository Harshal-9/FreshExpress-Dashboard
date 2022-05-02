import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a href="https://google.com">FE Link 1</a>
        <a href="#">FE Link 2</a>
        <a className="active_link" href="#">
          FE Link 3
        </a>
      </div>
      <div className="navbar__right">
        {/* <a href="https://google.com">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a> */}
        {/* <a href="#">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a> */}
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
