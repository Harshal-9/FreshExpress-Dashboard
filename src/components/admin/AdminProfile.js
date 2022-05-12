import React, { useEffect, useState } from "react";
import "./AdminProfile.css";
import axios from "axios";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import { ToastContainer } from "react-toastify";
import dotenv from "dotenv";
dotenv.config();

// This component is used for Viewing and Editing the admin profile
function AdminProfile(props) {
  // console.log(props);
  const [isDisabled, setIsDisabled] = useState(true);
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    // console.log("In useeffect", props);

    if (props) {
      // Fetching the details of admin from the admin Id obtained from props
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL +
            "/admins/" +
            props.loginData.mongoId
        )
        .then((res) => {
          setAdminData(res.data);
        })
        .catch((err) => {
          CustomToast("Error" + err, "white", "red");
        });
    }
  }, []);

  // Function to handle edit of FarmerData form
  function handleEdit(event) {
    event.preventDefault();
    if (isDisabled) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return (
    <div>
      <br />
      <div
        className="MyCardColumn"
        style={{
          display: "inline-block",
          verticalAlign: "top",
        }}
      >
        <div className="MyCard" style={{ backgroundColor: "#CDD4EA" }}>
          <img
            src="https://www.pngitem.com/pimgs/m/146-1468465_early-signs-of-conception-user-profile-icon-hd.png"
            width="175px"
            height="175px"
            alt="AdminImg"
            style={{
              display: "inline-block",
              margin: "10px",
            }}
          ></img>
          <br />
          <div style={{ display: "inline-block" }}>
            <div style={{ textAlign: "right" }}>
              <i
                className="fa fa-edit fa-lg"
                aria-hidden="true"
                onClick={handleEdit}
              ></i>
            </div>
            <form>
              <label className="AdminProfileLabel">Admin Name : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                value={adminData.name}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setAdminData({
                    ...adminData,
                    name: event.target.value,
                  });
                }}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">UserId : </label>
              <input
                type="text"
                disabled={true}
                size="75"
                value={adminData.userId}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setAdminData({
                    ...adminData,
                    userId: event.target.value,
                  });
                }}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Email : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                value={adminData.email}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setAdminData({
                    ...adminData,
                    email: event.target.value,
                  });
                }}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Mobile No : </label>
              <input
                type="text"
                disabled={isDisabled}
                size="75"
                value={adminData.mobileNumber}
                onChange={(event) => {
                  // console.log(event.target.value);
                  setAdminData({
                    ...adminData,
                    mobileNumber: event.target.value,
                  });
                }}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Role : </label>
              <input
                type="text"
                disabled={true}
                size="75"
                value={adminData.role}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              {!isDisabled ? (
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setIsDisabled(true);

                    // Sending patch request to edit the data of admin
                    axios
                      .patch(
                        process.env.REACT_APP_BACKEND_URL +
                          "/admins/" +
                          "626d90a967e461b167ff247d",
                        adminData
                      )
                      .then((res) => {
                        // console.log("Response", res);
                        UpdateSuccessToast();
                      })
                      .catch((err) => {
                        // console.log("Error", err);
                        FailureToast();
                      });
                  }}
                >
                  Save Changes
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminProfile;
