import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function handleDelete(navigate) {
  axios
    .get("https://immense-beach-88770.herokuapp.com/logout", {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      //   navigate("/dashboard");
      window.location.reload();
    })
    .catch((err) => {
      console.log("Err", err);
    });
}

function Logout() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Are you sure you want to logout ?</h3>
      <br />
      <button onClick={() => handleDelete(navigate)}>YES</button>
      <button onClick={() => navigate("/")}>NO</button>
    </div>
  );
}

export default Logout;
