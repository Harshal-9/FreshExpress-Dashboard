import React, { useState } from "react";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
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

function AddDelAdmin(props) {
  console.log(props);

  return (
    <div>
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
            width="175px"
            height="175px"
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
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Email : </label>
              <input
                type="text"
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Mobile No : </label>
              <input
                type="text"
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <label className="AdminProfileLabel">Role : </label>
              <input
                type="text"
                size="75"
                // value={farmerAllData.name}
                onChange={(event) => {}}
              ></input>
              <br />
              <br />
              <button
                onClick={(event) => {
                  event.preventDefault();

                  // const { farmerId, ...tempObj } = farmerAllData;
                  // console.log("Sending Data", tempObj, farmerId);

                  axios
                    .post(
                      "https://immense-beach-88770.herokuapp.com/farmers/edit/",
                      {}
                    )
                    .then((res) => {
                      console.log("Response", res);
                      UpdateSuccessToast();
                    })
                    .catch((err) => {
                      console.log("Error", err);
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
          <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
            DELETE EXISTNG ADMIN
          </h2>
          <br />
          <br />
          <Select
            components={{ DropdownIndicator }}
            className="selectDelete"
            placeholder="Select Admin to Delete"
          />
          <i
            className="fa fa-trash fa-2x"
            aria-hidden="true"
            style={{ marginLeft: "1%" }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default AddDelAdmin;
