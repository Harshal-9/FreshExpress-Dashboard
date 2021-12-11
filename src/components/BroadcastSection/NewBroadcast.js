import React, { useState, useEffect } from "react";
import "./NewBroadcast.css";
import Select from "react-select";
import axios from "axios";
import { FailureToast } from "../Toasts/AllToasts";
import { MultiSelect } from "react-multi-select-component";


function NewBroadcast() {
    const [selected, setSelected] = useState("");
    const [checkBox, setCheckBox] = useState(false);
    const [dropdownFarmerArray, setDropdownFarmerArray] = useState([]);
    const [dropdownTagsArray, setDropdowTagsArray] = useState([]);
    const [selectedFarmerArray, setSelectedFarmerArray] = useState([]);
    const [selectedTagsArray, setSelectedTagsArray] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [finalData, setFinalData] = useState({
        topic: "",
        category: "",
        description: "",
        link: "",

    });
    const format = [
        { value: "pdf", label: "PDF" },
        { value: "youtube", label: "Youtube video" },
        { value: "jpg", label: "JPG" }
    ]


    useEffect(() => {
        // to get data for tags dropdown
        axios
            .get("https://immense-beach-88770.herokuapp.com/filters")
            .then((res) => {
                const data = [];
                for (let i = 0; i < res.data[0].tag.length; i++) {
                    data.push({ value: res.data[0].tag[i], label: res.data[0].tag[i] });
                }
                setDropdowTagsArray(data);
            })
            .catch((err) => {
                console.log("err", err);
                FailureToast();
            });
        //To get data for farmers dropdown
        axios
            .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
            .then((res) => {
                const data = []; //to store options of farmer dropdown
                for (let i = 0; i < res.data.length; i++) {
                    data.push({ value: res.data[i].farmerID, label: res.data[i].farmerName });

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
        fd.append("image", handleChangeSelectedFile, handleChangeSelectedFile.name);

        // Getting link of uploaded image
        axios
            .post("https://immense-beach-88770.herokuapp.com/uploadFile", fd)
            .then((res) => {
                alert("File : " + handleChangeSelectedFile.name + " uploaded successfully !");
                setSelectedFile({ link: res.data.link, id: res.data.id });
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    //to delete selected file
    function handleDelete(e) {
        e.preventDefault();
        axios
            .delete("https://immense-beach-88770.herokuapp.com/uploadFile", {
                data: {
                    id: selectedFile.id
                }
            })
            .then((res) => {
                setSelectedFile(null);
            })
            .catch((err) => {
                console.log("Error here : ", err);
            });
    }

    function handleSubmit(event) {
        event.preventDefault();

        //Alert must be changed
        if ((!checkBox && selectedFarmerArray.length === 0 && selectedTagsArray.length === 0)) {
            alert("select value");
            return;
        }

        if (finalData.topic.length === 0 || finalData.category.length === 0 || finalData.description.length === 0) {
            alert("select all value");
            return;
        }

        if (finalData.link === "" && selectedFile === null) {
            alert("select link or file");
            return;
        }
        //to send data to backend

        const dataToSend = {
            "format": selected,
            "date": new Date().toISOString().substring(0, 10),
            "topic": finalData.topic,
            "category": finalData.category,
            "description": finalData.description
        }
        if (checkBox) {
            dataToSend.toAllFarmers = checkBox;
        }
        else {
            if (selectedTagsArray.length > 0) {
                const tagArray = [];
                for (let i = 0; i < selectedTagsArray.length; i++) {
                    tagArray.push(selectedTagsArray[i].value);
                }
                dataToSend.tags = tagArray;
            }
            else {
                const farmerArray = [];
                for (let i = 0; i < selectedFarmerArray.length; i++) {
                    farmerArray.push(selectedFarmerArray[i].value);
                }
                dataToSend.farmers = farmerArray;
            }

        }
        if (selected === "youtube")
            dataToSend.link = finalData.link;
        else {
            dataToSend.link = selectedFile.link;
            dataToSend.driveId = selectedFile.id;

        }
        // console.log("data to send", dataToSend)
        axios.post("https://immense-beach-88770.herokuapp.com/broadcasts", dataToSend)
            .then((res) => {
                console.log("flag", res);
            }).catch((err) => {
                console.log("err", err);
            })
    }

    return (
        <div>
            <h1>Inside new Broadcast</h1>
            <div className="newBroadcast">
                <img src="https://tse2.mm.bing.net/th?id=OIP.4SzuLKFt1oMqJo1hBncSBgHaDV&pid=Api&P=0&w=354&h=160"
                    width="600px"
                    height="300px"
                    alt="BroadCast Img"
                    style={{ display: "inline-block", margin: "10px" }}
                ></img>
                <br />
                <Select
                    className="NewBroadcastSelect"
                    options={format}
                    placeholder="Select Format"
                    onChange={(opt) => {
                        setSelected(opt.value);
                    }}
                />
                <form action="">
                    <label className="newBroadcastLabel" htmlFor="">Enter Topic : </label>
                    <input type="text" className="newBroadcastInput" onChange={(event) => {
                        const tempObject = { ...finalData };
                        tempObject.topic = event.target.value;
                        setFinalData(tempObject);
                    }} />
                    <br />
                    <label className="newBroadcastLabel">Enter Category :</label>
                    <input type="text" className="newBroadcastInput" onChange={(event) => {
                        const tempObject = { ...finalData };
                        tempObject.category = event.target.value;
                        setFinalData(tempObject);

                    }} />
                    {selected === "youtube" ? (<>
                        <br />
                        <label className="newBroadcastLabel">Enter Youtube Link :</label>
                        <input type="link" className="newBroadcastInput"
                            onChange={(event) => {
                                const tempObject = { ...finalData };
                                tempObject.link = event.target.value;
                                setFinalData(tempObject);

                            }}
                        /></>) : null}

                    {selected === "pdf" ? (<>
                        <br />
                        <label className="newBroadcastLabel">Choose PDF :</label>
                        <input
                            accept="application/pdf"
                            type="file"
                            className="newBroadcastInput"
                            onChange={handleFileChange}
                        // value={selectedFile ? selectedFile : null}
                        />
                        {selectedFile ?

                            <i class="fa fa-trash fa-2x" style={{ marginRight: "5px", marginLeft: "15px" }} onClick={handleDelete}></i>

                            : null}
                    </>) : null}

                    {selected === "jpg" ? (<>
                        <br />
                        <label className="newBroadcastLabel">Choose JPG :</label>
                        <input
                            accept="image/*"
                            type="file"
                            className="newBroadcastInput"
                            onChange={handleFileChange}
                        />
                        {selectedFile ? <i class="fa fa-trash fa-2x" style={{ marginRight: "5px", marginLeft: "15px" }} onClick={handleDelete}></i> : null}
                    </>) : null}

                    <br />
                    <label className="newBroadcastLabeltextArea" >Enter Description :</label>
                    <textarea name="" id="" cols="30" rows="1" className="newBroadcastInputTextArea"
                        onChange={(event) => {
                            const tempObject = { ...finalData };
                            tempObject.description = event.target.value;
                            setFinalData(tempObject);

                        }}
                    ></textarea>
                    <br />
                    <input type="checkbox" className="newBroadcastInput" value={checkBox}
                        onChange={() => {
                            setCheckBox(!checkBox);
                        }}
                    />
                    <p className="newBroadcastLabel">To All Farmers </p>
                    <br />
                    {!checkBox ? (<>
                        {/* <Select className="NewBroadcastSelect" options={dropdownTagsArray} placeholder="Select Tags" />
                        <br />
                        <Select className="NewBroadcastSelect" options={format} placeholder="To whom" />
                        <br /> */}
                        {selectedFarmerArray.length === 0 ?

                            <MultiSelect
                                className="filter"
                                options={dropdownTagsArray}
                                value={selectedTagsArray}
                                onChange={setSelectedTagsArray}
                                overrideStrings={{
                                    selectSomeItems: "Filter Tags",
                                    allItemsAreSelected: "All tags selected",
                                }}
                            /> : null}
                        {selectedTagsArray.length === 0 ? <>
                            <br />
                            <br />
                            <MultiSelect
                                className="filter"
                                options={dropdownFarmerArray}
                                value={selectedFarmerArray}
                                onChange={setSelectedFarmerArray}
                                overrideStrings={{
                                    selectSomeItems: "Farmers",
                                    allItemsAreSelected: "All Farmers selected",
                                }}
                            /> </> : null}
                    </>) : null}
                    <br />
                    <br />
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div >
    );
}

export default NewBroadcast