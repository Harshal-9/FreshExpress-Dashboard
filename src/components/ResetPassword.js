import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import "./ResetPassword.css";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "./Toasts/AllToasts";
import dotenv from "dotenv";
dotenv.config();

function ResetPassword() {
  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Event", event);

    console.log(selectedUser);

    if (event.target.newPassword.value !== event.target.confirmPassword.value) {
      CustomToast("Passwords does not match", "black", "#FFD700");
      return;
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/login/forgotPassword", {
        userId: selectedUser.value,
        password: event.target.newPassword.value,
      })
      .then((res) => {
        console.log("Res", res);
        CustomToast("Password Updated Successfully", "black", "#4caf50");
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/login/usernames")
      .then((res) => {
        console.log("Res", res);

        let tempArr = [];
        for (let i = 0; i < res.data.length; i++) {
          tempArr.push({
            label: res.data[i].userId,
            value: res.data[i].userId,
          });
        }
        setOptions(tempArr);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <div>
      <br />
      <br />
      <div className="resetMainDiv" style={{ backgroundColor: "#CDD4EA" }}>
        <h3>Reset Password</h3>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <Select
            className="resetSelect"
            placeholder="Select user"
            options={options}
            onChange={setSelectedUser}
          />
          <br />
          <input
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            autoComplete="false"
            autoSave="false"
            size="65"
            className="resetInput"
          ></input>
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            autoComplete="false"
            autoSave="false"
            size="65"
            className="resetInput"
          ></input>
          <br />
          <br />
          <button className="submitReset" type="submit">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
