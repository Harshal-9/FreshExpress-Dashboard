import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
function handleClick(navigate) {
  axios
    .get("https://immense-beach-88770.herokuapp.com/logout", {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log("Err", err);
    });
}

function Logout() {
  const navigate = useNavigate();
  return (
    <div className="mainLogout">
      <br />
      <h3>Are you sure you want to logout ?</h3>
      <br />
      <button className="logoutYES" onClick={() => handleClick(navigate)}>
        YES
      </button>
      <button className="logoutNO" onClick={() => navigate("/")}>
        NO
      </button>
    </div>
  );
}

export default Logout;
