import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import { FailureToast } from "../Toasts/AllToasts";
import Select from "react-select";
import "./CropMonitoring.css";

function SingleTableRowCropMonitoring(props) {
    let cropData = props;
    let rowsData = [];
    let i = 0;
    console.log("hi " + props.operation);
    switch (props.operation) {

    }
    return (
        <tr className="SingleTableRowCropMonitoring">
            <td>Date</td>
            <td>{props.operation}</td>
            <td>Nikhil</td>
            <td>Nikhil</td>
        </tr>
    );
}
function CropMonitoring() {
    const [allFarmersCrop, setAllFarmersCrop] = useState({
        farmerID: "None",
        plot: [],
        farmerName: "None",
    });
    const [selectedFarmerCrop, setSelectedFarmerCrop] = useState({});
    const [allCropMonitoring, setAllCropMonitoring] = useState([]);
    const [filteredAllCropMonitoring, setFilteredAllCropMonitoring] = useState([]);
    const category = [
        { value: 0, label: "Pest & Disease" },
        { value: 1, label: "Soil Nutrition" },
        { value: 2, label: "Plant Health" },
        { value: 3, label: "Good Practices" },
        { value: 4, label: "Export Marketing" },
        { value: 5, label: "Mangesh Bhaskar" }
    ]
    const format = [
        { value: 0, label: "PDF" },
        { value: 1, label: "Youtube video" },
        { value: 2, label: "JPG" }
    ]
    const monitoringParameter = [
        { value: 0, label: "Pest" },
        { value: 1, label: "Disease" },
        { value: 2, label: "Plant Health" },
        { value: 3, label: "Soil Health" },
        { value: 4, label: "Other NCs" },
    ]
    const alert = [
        { value: 0, label: "Early Stage" },
        { value: 1, label: "Wide Spread" },
        { value: 2, label: "Danger!" }
    ]
    useEffect(() => {
        axios
            .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
            .then((res) => {
                let Data = [...res.data];
                // console.log("Data Here :", Data);
                setAllFarmersCrop(Data);
            })
            .catch((err) => {
                console.log("err", err);
                FailureToast();
            });
    }, []);

    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>
                Crop Monitoring
            </h2>
            <br />
            <div style={{ margin: "10px" }}>
                <Select
                    className="CropMonitoringFarmerNamePlot"
                    placeholder="Search Farmer Name"
                    options={allFarmersCrop}
                    getOptionLabel={(option) => option.farmerName}
                    getOptionValue={(option) => option.farmerID}
                    onChange={(opt) => {
                        setSelectedFarmerCrop({ FarmerID: opt.farmerID, plot: opt.plot })
                    }}
                />
                <button className="allDiariesButton">
                    <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i> Add
                    Operation
                </button>
                <br />
                <br />
                <Select

                    placeholder="Select Plot"
                    className="CropMonitoringFarmerNamePlot"
                    options={selectedFarmerCrop.plot}
                    getOptionLabel={(option) =>
                        "(" + option.plot + ")" + option.farmerName + "-" + option.MHCode
                    }
                    getOptionValue={(option) =>
                        option.MHCode
                    }
                    onChange={(event) => {
                        axios
                            .get(
                                "https://immense-beach-88770.herokuapp.com/cropMonitoring/MHCode/" +
                                event.MHCode
                            )
                            .then((res) => {
                                console.log("Res", res);
                                let receivedData = res.data;

                                //to sort data according to date
                                receivedData.sort(function (a, b) {
                                    return new Date(b.date) - new Date(a.date);
                                });
                                setAllCropMonitoring([]);
                                setFilteredAllCropMonitoring([]);
                                for (let i = 0; i < receivedData.length; i++) {
                                    let tempArr = {
                                        pest: receivedData[i].pest,
                                        disease: receivedData[i].disease,
                                        plantHealth: receivedData[i].plantHealth,
                                        soilHealth: receivedData[i].soilHealth,
                                        other: receivedData[i].other
                                    };

                                    for (let item in tempArr) {
                                        // console.log("in row" + tempArr[item].correctiveAction.length);
                                        console.log("item " + item)
                                        // if(tempArr[item].)
                                        if (tempArr[item].correctiveAction.length) {
                                            // console.log("item " + item.pestPhoto1)
                                            setAllCropMonitoring((arr) =>
                                                arr.concat(
                                                    <SingleTableRowCropMonitoring
                                                        date={receivedData[i].date}
                                                        data={tempArr[item]}
                                                        operation={item}
                                                        diaryId={receivedData[i]._id}
                                                        farmerName={selectedFarmerCrop.farmerName}
                                                    />
                                                )
                                            );

                                            setFilteredAllCropMonitoring((arr) =>
                                                arr.concat(
                                                    <SingleTableRowCropMonitoring
                                                        date={receivedData[i].date}
                                                        data={tempArr[item]}
                                                        operation={item}
                                                        diaryId={receivedData[i]._id}
                                                        farmerName={selectedFarmerCrop.farmerName}
                                                    />
                                                )
                                            );
                                        }
                                    }
                                }
                            })
                            .catch((err) => {
                                console.log("Err", err);
                            });
                    }}

                />
                <button className="allDiariesButton">
                    <i className="fa fa-download fa-lg" aria-hidden="true"></i> Export Excel
                </button>
                <br />
                <br />
                <h2 style={{ marginLeft: "20px" }}>Filters :</h2>
                <br />
                <br />
                <label style={{ marginLeft: "10px" }}>Date Range </label>
                <label style={{ marginLeft: "305px" }}>Monitoring Parameter : </label>
                <label style={{ marginLeft: "200px" }}>Reporter : </label>
                <br />
                <input className="cropMonitoringDate"
                    type="date"
                    id="myDate"
                    name="myDate"

                />
                <p style={{ display: "inline-block" }}> &nbsp; to &nbsp;</p>
                <input className="cropMonitoringDate"
                    type="date"
                    id="myDate"
                    name="myDate"
                />
                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={monitoringParameter}
                    placeholder="Select Plot"
                    backgroundColor="blue"

                />
                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={monitoringParameter}
                    placeholder="Select Plot"
                />
                <br />
                <br />
                <label style={{ marginLeft: "10px" }}>Alert Level </label>
                <br />
                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={alert}
                />
                <br />
                <br />
                <div className="CropMonitoringTable">
                    <table className="CropMonitoringRow">
                        <tr>
                            <td>Date</td>
                            <td>Monitoring Parameter</td>
                            <td>Alert Level</td>
                            <td>Reporter</td>
                        </tr>
                        {/* <SingleTableRowCropMonitoring />
                        <SingleTableRowCropMonitoring />
                        <SingleTableRowCropMonitoring />
                        <SingleTableRowCropMonitoring /> */}
                    </table>
                </div>

            </div>
        </div>
    )
}

export default CropMonitoring;