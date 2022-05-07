import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

<<<<<<< HEAD
//contains all the content of navbar
=======
// This component is for Navbar
>>>>>>> 69452faab78486226a541a9bc77158ce2e2d485a

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a
          className="active_link"
          href="https://drive.google.com/drive/folders/185SoakxA4KaBE8nPAQmbTDWSY_xRYidW?usp=sharing"
          target="_blank"
        >
          Farmer GDrive
        </a>
        <a className="active_link" href="http://feweather.com/" target="_blank">
          FE Weather App
        </a>
        <a
          className="active_link"
          href="https://studio.youtube.com/channel/UCt4vcliazCIWL3Dvq-svaRw"
          target="_blank"
        >
          FE YouTube Studio
        </a>
      </div>
      <div className="navbar__right">
        {/* <a href="https://google.com">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a> */}
        <a href="/logout">
          <i
            className="fa fa-sign-out text-blue"
            aria-hidden="true"
            style={{ backgroundColor: "red", color: "white" }}
          ></i>
        </a>
        <a href="/adminProfile">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
