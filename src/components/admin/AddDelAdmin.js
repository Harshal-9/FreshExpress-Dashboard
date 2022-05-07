import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import "./AddDelAdmin.css";
import axios from "axios";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";

// Below functions for adding search icon in reactselect
library.add(faSearch);
const CaretDownIcon = () => {
  return <FontAwesomeIcon icon="search" />;
};
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

// This component is used for adding and deleting the admin
function AddDelAdmin({ loginData }) {
  const [adminsList, setAdminsList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [popup, setPopup] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    role: "",
    userId: "",
  });

  // Fetching list of admins
  useEffect(() => {
    axios
      .get("https://immense-beach-88770.herokuapp.com/admins")
      .then((res) => {
        setAdminsList(res.data);
      })
      .catch((err) => {
        CustomToast("Error:" + err, "white", "red");
      });
  }, []);

  return (
    <div>
      {loginData.userType === "superAdmin" ? (
        <>
          <br />
          <div
            className="MyCardColumn"
            style={{ display: "inline-block", verticalAlign: "top" }}
          >
            <div className="MyCard">
              <br />
              <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
                ADD NEW ADMIN
              </h2>
              <br />

              <img
                src="https://www.pngitem.com/pimgs/m/146-1468465_early-signs-of-conception-user-profile-icon-hd.png"
                width="225px"
                height="225px"
                alt="AdminImg"
                style={{ display: "inline-block", margin: "10px" }}
              ></img>
              <div style={{ display: "inline-block" }}>
                <div style={{ textAlign: "right" }}></div>
                <form>
                  <label className="AdminProfileLabel">Admin Name : </label>
                  <input
                    type="text"
                    size="75"
                    value={newAdminData.name}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setNewAdminData({
                        ...newAdminData,
                        name: event.target.value,
                      });
                    }}
                  ></input>
                  <br />
                  <br />
                  <label className="AdminProfileLabel">Admin UserId : </label>
                  <input
                    type="text"
                    size="75"
                    value={newAdminData.userId}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setNewAdminData({
                        ...newAdminData,
                        userId: event.target.value,
                      });
                    }}
                  ></input>
                  <br />
                  <br />

                  <label className="AdminProfileLabel">Email : </label>
                  <input
                    type="text"
                    size="75"
                    value={newAdminData.email}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setNewAdminData({
                        ...newAdminData,
                        email: event.target.value,
                      });
                    }}
                  ></input>
                  <br />
                  <br />
                  <label className="AdminProfileLabel">Mobile No : </label>
                  <input
                    type="text"
                    size="75"
                    value={newAdminData.mobileNumber}
                    onChange={(event) => {
                      // console.log(event.target.value);
                      setNewAdminData({
                        ...newAdminData,
                        mobileNumber: event.target.value,
                      });
                    }}
                  ></input>
                  <br />
                  <br />
                  <label className="AdminProfileLabel">Role : </label>
                  <Select
                    className="selectRole"
                    placeholder="Select Role"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "Super Admin", value: "superAdmin" },
                    ]}
                    value={newAdminData.role}
                    onChange={(event) => {
                      // console.log(event.value);
                      setNewAdminData({
                        ...newAdminData,
                        role: event.value,
                      });
                    }}
                  />
                  <br />
                  <br />
                  <button
                    className="AddButton"
                    onClick={(event) => {
                      event.preventDefault();

                      for (let item in newAdminData) {
                        // console.log("T", item, newAdminData[item]);
                        if (newAdminData[item] === "") {
                          CustomToast(
                            item + " cannot be empty",
                            "black",
                            "#FFD700"
                          );
                          return;
                        }
                      }

                      // Adding New admin
                      axios
                        .post(
                          "https://immense-beach-88770.herokuapp.com/admins",
                          newAdminData
                        )
                        .then((res) => {
                          // console.log("Response", res);
                          UpdateSuccessToast();
                          setTimeout(() => window.location.reload(), 2000);
                        })
                        .catch((err) => {
                          // console.log("Error", err);
                          FailureToast();
                        });
                    }}
                  >
                    Add New
                  </button>
                </form>
              </div>
              <br />
              <br />
              <br />
              {/* Deleting admin  */}
              <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
                DELETE EXISTNG ADMIN
              </h2>
              <br />
              <br />
              <Select
                components={{ DropdownIndicator }}
                className="selectDelete"
                placeholder="Select Admin to Delete"
                options={adminsList}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.userId}
                onChange={(e) => {
                  // console.log(e);
                  setSelectedAdmin(e);
                }}
              />
              <i
                className="fa fa-trash fa-2x"
                aria-hidden="true"
                style={{ marginLeft: "1%" }}
                onClick={() => {
                  setPopup(true);
                }}
              ></i>
              <br />
              <br />
              {popup ? (
                <div
                  style={{
                    border: "2px solid black",
                    marginLeft: "10%",
                    marginRight: "10%",
                    backgroundColor: "#cdd4ea",
                  }}
                >
                  <br />
                  <h2>Are are sure you want to delete ?</h2>
                  <br />
                  <button
                    onClick={() => {
                      axios
                        .delete(
                          "https://immense-beach-88770.herokuapp.com/admins/" +
                            selectedAdmin._id
                        )
                        .then((res) => {
                          // console.log("Res", res);
                          CustomToast(
                            "Farmer deleted Successfully ! Page will be reloaded",
                            "black",
                            "#1cd855"
                          );
                          setTimeout(() => window.location.reload(), 2000);
                        })
                        .catch((err) => {
                          // console.log("Err", err);
                        });
                    }}
                    className="DeleteButton"
                    style={{ marginRight: "5%" }}
                  >
                    Delete
                  </button>
                  <button
                    className="CancelButton"
                    onClick={() => setPopup(false)}
                  >
                    Cancel
                  </button>
                  <br />
                  <br />
                </div>
              ) : null}
            </div>
          </div>
          <ToastContainer />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddDelAdmin;
