import React, { useState, useEffect } from "react";
import "./NewBroadcast.css";
import Select from "react-select";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer } from "react-toastify";
import UpdateSuccessToast, {
  FailureToast,
  CustomToast,
} from "../Toasts/AllToasts";
import dotenv from "dotenv";
dotenv.config();

function NewBroadcast() {
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [dropdownFarmerArray, setDropdownFarmerArray] = useState([]);
  const [dropdownTagsArray, setDropdownTagsArray] = useState([]);
  const [selectedFarmerArray, setSelectedFarmerArray] = useState([]);
  const [selectedTagsArray, setSelectedTagsArray] = useState([]);
  const [dropdownCategories, setDropdownCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalData, setFinalData] = useState({
    topic: "",
    newCategory: "",
    description: "",
    link: "",
  });
  const format = [
    { value: "pdf", label: "PDF" },
    { value: "youtube", label: "Youtube video" },
    { value: "jpg", label: "JPG" },
  ];

  useEffect(() => {
    // to get data for tags dropdown
    axios
      .get(process.env.BACKEND_URL + "/filters")
      .then((res) => {
        //settings tags in dropdown
        const tags = [];
        for (let i = 0; i < res.data[0].tag.length; i++) {
          tags.push({ value: res.data[0].tag[i], label: res.data[0].tag[i] });
        }
        setDropdownTagsArray(tags);
        //settings categories in dropdown
        const categories = [];
        for (let i = 0; i < res.data[0].broadcastCategory.length; i++) {
          categories.push({
            value: res.data[0].broadcastCategory[i],
            label: res.data[0].broadcastCategory[i],
          });
        }
        setDropdownCategories(categories);
      })
      .catch((err) => {
        console.log("err", err);
        FailureToast();
      });
    //To get data for farmers dropdown
    axios
      .get(process.env.BACKEND_URL + "/farmers/plots")
      .then((res) => {
        const data = []; //to store options of farmer dropdown
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            value: res.data[i].farmerID,
            label: res.data[i].farmerName,
          });
        }
        setDropdownFarmerArray(data);
      })
      .catch((err) => {
        console.log("err", err);
        FailureToast();
      });
  }, []);

  //to handle file change
  const handleFileChange = (event) => {
    const handleChangeSelectedFile = event.target.files[0];
    const fd = new FormData();
    if (handleChangeSelectedFile)
      fd.append(
        "image",
        handleChangeSelectedFile,
        handleChangeSelectedFile.name
      );

    // Getting link of uploaded image
    axios
      .post(process.env.BACKEND_URL + "/uploadFile", fd)
      .then((res) => {
        UpdateSuccessToast(
          "File : " + handleChangeSelectedFile.name + " uploaded successfully !"
        );
        setSelectedFile({
          link: res.data.link,
          id: res.data.id,
          name: handleChangeSelectedFile.name,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  //to delete selected file
  function handleDelete(e) {
    e.preventDefault();
    axios
      .delete(process.env.BACKEND_URL + "/uploadFile", {
        data: {
          id: selectedFile.id,
        },
      })
      .then((res) => {
        UpdateSuccessToast("File deleted successfully !");
        setSelectedFile(null);
      })
      .catch((err) => {
        console.log("Error here : ", err);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //check if farmers or tags are selected or not

    if (
      !checkBox &&
      selectedFarmerArray.length === 0 &&
      selectedTagsArray.length === 0
    ) {
      CustomToast("Select Farmer and Tags", "black", "#FFD700");

      return;
    }

    if (finalData.topic.length === 0 || finalData.description.length === 0) {
      CustomToast("select Topic and Description", "black", "#FFD700");
      return;
    }

    if (finalData.link === "" && selectedFile === null) {
      CustomToast("select Link or File", "black", "#FFD700");
      return;
    }

    if (category === null && finalData.newCategory === "") {
      CustomToast("select or enter new category", "black", "#FFD700");
      return;
    }
    //to send data to backend

    const dataToSend = {
      format: selected,
      date: new Date().toISOString().substring(0, 10),
      topic: finalData.topic,
      description: finalData.description,
    };

    if (category) {
      dataToSend.category = category;
    } else {
      dataToSend.newCategory = finalData.newCategory;
      dataToSend.category = finalData.newCategory;
    }
    if (checkBox) {
      dataToSend.toAllFarmers = checkBox;
    } else {
      if (selectedTagsArray.length > 0) {
        const tagArray = [];
        for (let i = 0; i < selectedTagsArray.length; i++) {
          tagArray.push(selectedTagsArray[i].value);
        }
        dataToSend.tags = tagArray;
      } else {
        const farmerArray = [];
        for (let i = 0; i < selectedFarmerArray.length; i++) {
          farmerArray.push(selectedFarmerArray[i].value);
        }
        dataToSend.farmers = farmerArray;
      }
    }
    if (selected === "youtube") dataToSend.link = finalData.link;
    else {
      dataToSend.link = selectedFile.link;
      dataToSend.driveId = selectedFile.id;
    }
    console.log("data to send", dataToSend);
    axios
      .post(process.env.BACKEND_URL + "/broadcasts", dataToSend)
      .then((res) => {
        console.log("response", res);
        UpdateSuccessToast("New Article added successfully !");
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div>
      {/* to display main components of new broadcast */}
      <div className="newBroadcast">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.4SzuLKFt1oMqJo1hBncSBgHaDV&pid=Api&P=0&w=354&h=160"
          width="600px"
          height="300px"
          alt="BroadCast Img"
          style={{ display: "inline-block", margin: "10px" }}
        ></img>
        <br />
        {/* //selecting format */}
        <Select
          className="NewBroadcastSelect"
          options={format}
          placeholder="Select Format"
          onChange={(opt) => {
            setSelected(opt.value);
          }}
        />
        {/* code to add topic */}
        <form action="">
          <label className="newBroadcastLabel" htmlFor="">
            Enter Topic :{" "}
          </label>
          <input
            type="text"
            className="newBroadcastInput"
            onChange={(event) => {
              const tempObject = { ...finalData };
              tempObject.topic = event.target.value;
              setFinalData(tempObject);
            }}
          />
          <br />
          {/* code to add category */}
          <Select
            className="NewBroadcastSelect"
            options={dropdownCategories}
            placeholder="Select Category"
            onChange={(opt) => {
              setCategory(opt.value);
            }}
          />
          {/* code to add new category */}
          {!category ? (
            <>
              <br />
              <label className="newBroadcastLabel">Enter Category :</label>
              <input
                type="text"
                className="newBroadcastInput"
                onChange={(event) => {
                  const tempObject = { ...finalData };
                  tempObject.newCategory = event.target.value;
                  setFinalData(tempObject);
                }}
              />
            </>
          ) : null}
          {/* if format selected is youtube then disable pdf andd image option ...Similar for pdf and jpg */}
          {selected === "youtube" ? (
            <>
              <br />
              <label className="newBroadcastLabel">Enter Youtube Link :</label>
              <input
                type="link"
                className="newBroadcastInput"
                onChange={(event) => {
                  const tempObject = { ...finalData };
                  tempObject.link = event.target.value;
                  setFinalData(tempObject);
                }}
              />
            </>
          ) : null}
          <br />
          {/* To take input of description */}
          <label className="newBroadcastLabeltextArea">
            Enter Description :
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            className="newBroadcastInputTextArea"
            onChange={(event) => {
              const tempObject = { ...finalData };
              tempObject.description = event.target.value;
              setFinalData(tempObject);
            }}
          ></textarea>
          {/* If selected format is pdf */}
          {selected === "pdf" ? (
            <>
              <br />
              <label className="newBroadcastLabel">Choose PDF :</label>
              <label
                htmlFor="selectFileInput"
                className={
                  selectedFile ? "selectFileLabel" : "notSelectFileLabel"
                }
              >
                {selectedFile ? selectedFile.name : "Choose file"}{" "}
              </label>
              <input
                hidden="true"
                id="selectFileInput"
                accept="application/pdf"
                type="file"
                className="newBroadcastInput"
                onChange={handleFileChange}
                style={{
                  paddingRight: "10px",
                  color: "transparent",
                  width: "10%",
                }}
              />
              {selectedFile ? (
                <i
                  class="fa fa-trash fa-2x"
                  style={{ marginLeft: "5px" }}
                  onClick={handleDelete}
                ></i>
              ) : null}
            </>
          ) : null}
          {/* If selected format is jpg */}
          {selected === "jpg" ? (
            <>
              <br />
              <label className="newBroadcastLabel">Choose JPG :</label>
              <label
                htmlFor="selectFileInputImage"
                className={
                  selectedFile ? "selectFileLabel" : "notSelectFileLabel"
                }
              >
                {selectedFile ? selectedFile.name : "Choose Image"}{" "}
              </label>

              <input
                hidden="true"
                id="selectFileInputImage"
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                className="newBroadcastInput"
                onChange={handleFileChange}
                style={{
                  paddingRight: "10px",
                  color: "transparent",
                  width: "10%",
                }}
              />
              {selectedFile ? (
                <i
                  class="fa fa-trash fa-2x"
                  style={{ marginRight: "5px", marginLeft: "15px" }}
                  onClick={handleDelete}
                ></i>
              ) : null}
            </>
          ) : null}
          <br />
          <input
            type="checkbox"
            className="newBroadcastInputCheckBox"
            value={checkBox}
            onChange={() => {
              setCheckBox(!checkBox);
            }}
          />
          <p className="newBroadcastLabel">To All Farmers </p>
          <br />
          {/* Code to handle for whom to send the article i.e. farmer name or according to tags.Also have option to send article to all farmers */}
          {!checkBox ? (
            <>
              {selectedFarmerArray.length === 0 ? (
                <MultiSelect
                  className="broadcastNewFilter"
                  options={dropdownTagsArray}
                  value={selectedTagsArray}
                  onChange={setSelectedTagsArray}
                  overrideStrings={{
                    selectSomeItems: "Filter Tags",
                    allItemsAreSelected: "All tags selected",
                  }}
                />
              ) : null}
              {selectedTagsArray.length === 0 ? (
                <>
                  <br />
                  <br />
                  <MultiSelect
                    className="broadcastNewFilter"
                    options={dropdownFarmerArray}
                    value={selectedFarmerArray}
                    onChange={setSelectedFarmerArray}
                    overrideStrings={{
                      selectSomeItems: "Farmers",
                      allItemsAreSelected: "All Farmers selected",
                    }}
                  />{" "}
                </>
              ) : null}
            </>
          ) : null}
          <br />
          <br />
          <button onClick={handleSubmit} className="newBroadcastSubmit">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewBroadcast;
