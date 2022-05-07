import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FailureToast } from "../Toasts/AllToasts";
import Select from "react-select";
import "./CropMonitoring.css";
import { useNavigate } from "react-router-dom";

function SingleTableRowCropMonitoring(props) {
    let cropData = props;
    const navigate = useNavigate();
    let i = 0;

    return (
        <tr
            className="SingleTableRowCropMonitoring"
            onClick={() => {
                navigate("/cropMonitoring/" + cropData.diaryId, {
                    state: { cropID: cropData.diaryId }
                })
            }}
        >
            <td>{props.date.substring(0, 10)}</td>
            <td>{props.operation}</td>
            <td>{props.data.severityType ? props.data.severityType : "N.A"}</td>
            <td>{props.reporter}</td>
        </tr>
    );
}


function CropMonitoring() {
    function handleFilteredIntersection(event) {
        let dateTempArr = [];
        let monitoringTempArr = [];
        let reporterTempArr = [];
        let alertLevelTempArr = [];
        dateTempArr = filterByDate();
        monitoringTempArr = filterByMonitoring();
        reporterTempArr = filterByReporter();

        alertLevelTempArr = filterByAlertLevel();
        if (startDate == "" || endDate == "")
            dateTempArr = [...allCropMonitoring];
        if (monitoringParameterFilter == null)
            monitoringTempArr = [...allCropMonitoring];
        // console.log("InsideFilter " + monitoringParameterFilter);
        if (reporterFilter == null)
            reporterTempArr = [...allCropMonitoring];
        if (alertFilter == null)
            alertLevelTempArr = [...allCropMonitoring];

        let finalData = [
            dateTempArr,
            monitoringTempArr,
            reporterTempArr,
            alertLevelTempArr,
        ],
            finalResult = finalData.reduce((a, b) => a.filter((c) => b.includes(c)));
        setFilteredAllCropMonitoring(finalResult);
    }

    //filter by monitoring parameter

    function filterByMonitoring() {
        let tempArr = [];
        for (let i = 0; i < allCropMonitoring.length; i++) {
            if (monitoringParameterFilter && monitoringParameterFilter.label == allCropMonitoring[i].props.operation) {
                tempArr.push(allCropMonitoring[i]);
            }
        }
        return tempArr;
    }

    //filter by reporter

    function filterByReporter() {
        let tempArr = [];
        for (let i = 0; i < allCropMonitoring.length; i++) {
            if (reporterFilter && reporterFilter.value == allCropMonitoring[i].props.reporter) {
                tempArr.push(allCropMonitoring[i])
            }
        }
        return tempArr;
    }
    //filter by alert level

    function filterByAlertLevel() {
        let tempArr = [];
        for (let i = 0; i < allCropMonitoring.length; i++) {
            if (alertFilter && alertFilter.label == allCropMonitoring[i].props.data.severityType) {
                tempArr.push(allCropMonitoring[i])
            }
        }
        return tempArr;
    }

    //filter by date

    function filterByDate() {
        if (startDate == "" || endDate == "") return [];
        const tempArr = [];

        const newStartDate = new Date(startDate.target.value.substring(0, 10));
        const newEndDate = new Date(endDate.target.value.substring(0, 10));
        for (let i = 0; i < allCropMonitoring.length; i++) {
            if (newStartDate <= new Date(allCropMonitoring[i].props.date.substring(0, 10)) &&
                newEndDate >= new Date(allCropMonitoring[i].props.date.substring(0, 10))
            ) {
                console.log("Hi");
                tempArr.push(allCropMonitoring[i])
            }
        }
        return tempArr;

    }
    const [allFarmersCrop, setAllFarmersCrop] = useState({
        farmerID: "None",
        plot: [],
        farmerName: "None",
    });
    const [selectedFarmerCrop, setSelectedFarmerCrop] = useState({});
    const [allCropMonitoring, setAllCropMonitoring] = useState([]);
    const [filteredAllCropMonitoring, setFilteredAllCropMonitoring] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [monitoringParameterFilter, setMonitoringParameterFilter] = useState(null);
    const [reporterFilter, setReporterFilter] = useState(null);
    const [alertFilter, setAlertFilter] = useState(null);
    const [reporterName, setReporterName] = useState([]);
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
        { value: 0, label: "pest" },
        { value: 1, label: "disease" },
        { value: 2, label: "plantHealth" },
        { value: 3, label: "soilHealth" },
        { value: 4, label: "other" },
    ]
    const alert = [
        { value: 0, label: "Early Stage" },
        { value: 1, label: "Wide Spread" },
        { value: 2, label: "Danger" }
    ]

    //getting farmerID,plot and farmer name

    useEffect(() => {
        axios
            .get("https://immense-beach-88770.herokuapp.com/farmers/plots")
            .then((res) => {
                let Data = [...res.data];
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
            {/* selecting farmername in crop monitoring */}
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
                <br />
                <br />
                {/* selecting plot in crop monitoring */}
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

                        //request for getting aall crop monitoring data

                        axios
                            .get(
                                "https://immense-beach-88770.herokuapp.com/cropMonitoring/MHCode/" +
                                event.MHCode
                            )
                            .then((res) => {


                                let tempReporterSet = new Set();
                                let tempReporterArr = [];
                                res.data.forEach(element => {
                                    tempReporterSet.add(element.reporter)

                                });

                                tempReporterSet.forEach((val) => {
                                    tempReporterArr.push({
                                        value: val,
                                        label: val
                                    })

                                    // console.log("ReporterName " + val);
                                })
                                setReporterName(tempReporterArr)
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
                                        if (tempArr[item].severityType) {

                                            //setting all to in useState

                                            setAllCropMonitoring((arr) =>
                                                arr.concat(
                                                    <SingleTableRowCropMonitoring
                                                        date={receivedData[i].date}
                                                        data={tempArr[item]}
                                                        operation={item}
                                                        diaryId={receivedData[i]._id}
                                                        farmerName={selectedFarmerCrop.farmerName}
                                                        reporter={receivedData[i].reporter}
                                                    />
                                                )
                                            );

                                            //this usestate is to set filtered data

                                            setFilteredAllCropMonitoring((arr) =>
                                                arr.concat(
                                                    <SingleTableRowCropMonitoring
                                                        date={receivedData[i].date}
                                                        data={tempArr[item]}
                                                        operation={item}
                                                        diaryId={receivedData[i]._id}
                                                        farmerName={selectedFarmerCrop.farmerName}
                                                        reporter={receivedData[i].reporter}
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
                <br />
                <br />
                <h2 style={{ marginLeft: "20px" }}>Filters :</h2>
                <br />
                <br />
                <label style={{ marginLeft: "10px" }}>Date Range </label>
                <label style={{ marginLeft: "305px" }}>Monitoring Parameter : </label>
                <label style={{ marginLeft: "200px" }}>Reporter : </label>
                <br />

                {/* selecting date for filter */}

                <input className="cropMonitoringDate"
                    type="date"
                    id="myDate"
                    name="myDate"
                    onChange={(e) => {
                        console.log("Startdate");
                        setStartDate(e);
                    }}

                />
                <p style={{ display: "inline-block" }}> &nbsp; to &nbsp;</p>
                <input className="cropMonitoringDate"
                    type="date"
                    id="myDate"
                    name="myDate"
                    onChange={(e) => {
                        console.log("Enddate")
                        setEndDate(e);
                    }}
                />

                {/* Selecting monitoring parameter for filter */}

                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={monitoringParameter}
                    value={monitoringParameterFilter}
                    placeholder="Select Monitoring Parameter"
                    backgroundColor="blue"
                    onChange={(e) => {
                        console.log("CLick " + e)
                        setMonitoringParameterFilter(e)
                    }}

                />

                {/* Selecting Reportname for filter */}

                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={reporterName}
                    placeholder="Select Reporter"
                    onChange={(e) => {
                        console.log("ReporterName " + e.value);
                        setReporterFilter(e);
                    }}

                />
                <br />
                <br />
                <label style={{ marginLeft: "10px" }}>Alert Level </label>
                <br />

                {/* Selecting alert level for filter */}

                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={alert}
                    placeholder="Select Alert Level"
                    onChange={(e) => {
                        setAlertFilter(e);
                    }}
                />
                <br />
                <br />
                <div style={{ textAlign: "center" }}>

                    {/* Applying filter */}

                    <button
                        className="applyFilterButton"
                        onClick={() => { handleFilteredIntersection() }}
                    >
                        Apply
                    </button>

                    {/* Removing selected filter */}

                    <button
                        className="applyFilterClearButton"
                        onClick={() => {
                            setFilteredAllCropMonitoring(allCropMonitoring);
                            setMonitoringParameterFilter(null);
                            setReporterFilter(null);
                            setAlertFilter(null);
                            setStartDate("");
                            setEndDate("");
                        }}
                    >
                        Clear
                    </button>
                </div>
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
                        {filteredAllCropMonitoring}
                    </table>
                </div>

            </div>
        </div>
    )
}

export default CropMonitoring;