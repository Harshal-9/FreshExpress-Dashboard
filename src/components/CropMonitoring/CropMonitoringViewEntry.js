import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CropMonitoringViewEntry.css";

function ShowDiseaseOperation(props) {
    // console.log("Show disease " + props.allDiseaseData)
    return (
        // <div className="SingleTableRowCropMonitoringViewEntryRow">
        <div>
            <h3>Disease Data :</h3>
            <br />
            <p>Disease Name : {props.diseaseName}</p>
            <br />
            <p>Severity : {props.severityType}</p>
            <br />
            <p>Corrective Action :</p>
            <br />
            <table>
                <tr className="CropMonitoringViewEntryRow">
                    <td>Chemical</td>
                    <td>Quantity</td>
                </tr>
                {props.allDiseaseData}
            </table>
        </div>
        // </div>
    )
}
function ShowPestOperation(props) {
    // console.log("Show disease " + props.allDiseaseData)
    return (
        // <div className="SingleTableRowCropMonitoringViewEntryRow">
        <div>
            <h3>Pest Data :</h3>
            <br />
            <p>Pest Name : {props.pestName}</p>
            <br />
            <p>Severity : {props.severityType}</p>
            <br />
            <p>Corrective Action :</p>
            <br />
            <table>
                <tr className="CropMonitoringViewEntryRow">
                    <td>Chemical</td>
                    <td>Quantity</td>
                </tr>
                {props.allPestData}
            </table>
        </div>
        // </div>
    )
}
function ShowSoilHealthOperation(props) {
    // console.log("Show disease " + props.allDiseaseData)
    return (
        // <div className="SingleTableRowCropMonitoringViewEntryRow">
        <div>
            <h3>Soil Health Data :</h3>
            <br />
            <p>Severity : {props.severityType}</p>
            <br />
            <p>Corrective Action :</p>
            <br />
            <table>
                <tr className="CropMonitoringViewEntryRow">
                    <td>Chemical</td>
                    <td>Quantity</td>
                </tr>
                {props.allSoilData}
            </table>
        </div>
        // </div>
    )
}
function ShowPlantHealthOperation(props) {
    // console.log("Show disease " + props.allDiseaseData)
    return (
        // <div className="SingleTableRowCropMonitoringViewEntryRow">
        <div>
            <h3>Plant Health Data :</h3>
            <br />
            <p>Severity : {props.severityType}</p>
            <br />
            <p>Corrective Action :{props.correctiveAction}</p>
        </div>
        // </div>
    )
}
function ShowOtherOperation(props) {
    // console.log("Show disease " + props.allDiseaseData)
    return (
        // <div className="SingleTableRowCropMonitoringViewEntryRow">
        <div>
            <h3>Other Data :</h3>
            <br />
            <p>Severity : {props.severityType}</p>
            <br />
            <p>Corrective Action :{props.correctiveAction}</p>
            <br />
            <p>Description : {props.description}</p>
        </div>
        // </div>
    )
}

function CropMonitoringViewEntry(props) {
    // console.log(props);
    function SingleDiseaseRow({ rowData }) {
        console.log("OBJECT nd " + rowData)
        return (
            <tr className="SingleTableRowCropMonitoringViewEntryRow">
                <td>{rowData.chemical}</td>
                <td>{rowData.quantity}</td>
            </tr>
        );
    }
    function SinglePestRow({ rowData }) {
        console.log("OBJECT " + rowData)
        return (
            <tr className="SingleTableRowCropMonitoringViewEntryRow">
                <td>{rowData.chemical}</td>
                <td>{rowData.quantity}</td>
            </tr>
        );
    }

    function SingleSoilRow({ rowData }) {
        console.log("OBJECT " + rowData)
        return (
            <tr className="SingleTableRowCropMonitoringViewEntryRow">
                <td>{rowData.chemical}</td>
                <td>{rowData.quantity}</td>
            </tr>
        );
    }
    const { diaryId } = useParams();
    const [cropDetials, setCropDetails] = useState();
    const [diseaseData, setDiseaseData] = useState([]);
    const [diseaseImage, setDiseaseImage] = useState([]);
    const [pestData, setPestData] = useState([]);
    const [pestImage, setPestImage] = useState([]);
    const [soilHealthData, setSoilHealthData] = useState([]);
    const [soilHealthImage, setSoilHealthImage] = useState([]);
    // const [plantHealthData, setPlantHealthData] = useState([]);
    const [plantHealthImage, setPlantHealthImage] = useState([]);
    // const [otherData, setOtherData] = useState([]);
    const [otherImage, setOtherImage] = useState([]);
    // console.log("CropID " + diaryId);
    useEffect(() => {
        axios.get("https://immense-beach-88770.herokuapp.com/cropMonitoring/data/" + diaryId)
            .then((data) => {
                console.log("data", data.data);
                // console.log("Image nikhil " + diseaseImage.length)
                setCropDetails(data.data)

                //setting disease data
                let tempData = [];
                let tempDiseaseData = data.data.disease.correctiveAction;
                if (tempDiseaseData.length) {
                    for (let i in tempDiseaseData) {
                        console.log("Inside here nikhil " + tempDiseaseData[i].chemical)
                        // tempData.push(<SingleDiseaseRow rowData={tempDiseaseData[i]} />);
                        setDiseaseData((arr) =>
                            arr.concat(<SingleDiseaseRow rowData={tempDiseaseData[i]} />)
                        );
                    }
                    // setDiseaseData(tempData);
                    for (let i = 1; i <= 2; i++) {
                        console.log("fucing data", data.data.disease);
                        if (data.data.disease["diseasePhoto" + i]) {
                            // console.log("Image " + data.data.disease["diseasePhoto" + i])
                            setDiseaseImage((arr) =>
                                arr.concat(
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data.data.disease["diseasePhoto" + i]}
                                    >
                                        <img
                                            src={
                                                "https://lh3.googleusercontent.com/d/" +
                                                data.data.disease["diseasePhotoId" + i] +
                                                "=s220?authuser=0"
                                            }
                                            alt="img"
                                            width="200"
                                            height="200"
                                            style={{ marginRight: "2%" }}
                                        />
                                    </a>
                                )
                            )
                        }
                    }

                    // console.log("Disease data " + diseaseData)
                }

                //setting pest data
                let tempPestData = data.data.pest.correctiveAction;
                if (tempPestData.length) {
                    for (let i in tempPestData) {
                        // console.log("Inside")
                        setPestData((arr) =>
                            arr.concat(<SinglePestRow rowData={tempPestData[i]} />)
                        );
                    }
                    for (let i = 1; i <= 2; i++) {
                        if (data.data.pest["pestPhoto" + i]) {
                            // console.log("Image " + i)
                            setPestImage((arr) =>
                                arr.concat(
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data.data.pest["pestPhoto" + i]}
                                    >
                                        <img
                                            src={
                                                "https://lh3.googleusercontent.com/d/" +
                                                data.data.pest["pestPhotoId" + i] +
                                                "=s220?authuser=0"
                                            }
                                            alt="img"
                                            width="200"
                                            height="200"
                                            style={{ marginRight: "2%" }}
                                        />
                                    </a>
                                )
                            )
                        }
                    }

                    // console.log("Disease data " + diseaseData)
                }

                //setting soilData
                let tempSoilData = data.data.soilHealth.correctiveAction;
                if (tempSoilData.length) {
                    for (let i in tempSoilData) {
                        // console.log("Inside")
                        setSoilHealthData((arr) =>
                            arr.concat(<SingleSoilRow rowData={tempSoilData[i]} />)
                        );
                    }
                    for (let i = 1; i <= 2; i++) {
                        if (data.data.soilHealth["soilHealthPhoto" + i]) {
                            // console.log("Image " + i)
                            setSoilHealthImage((arr) =>
                                arr.concat(
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data.data.soilHealth["soilHealthPhoto" + i]}
                                    >
                                        <img
                                            src={
                                                "https://lh3.googleusercontent.com/d/" +
                                                data.data.soilHealth["soilHealthPhotoId" + i] +
                                                "=s220?authuser=0"
                                            }
                                            alt="img"
                                            width="200"
                                            height="200"
                                            style={{ marginRight: "2%" }}
                                        />
                                    </a>
                                )
                            )
                        }
                    }

                    // console.log("Disease data " + diseaseData)
                }
                //setting plantHealth data
                if (data.data.plantHealth) {
                    for (let i = 1; i <= 2; i++) {
                        if (data.data.plantHealth["plantHealthPhoto" + i]) {
                            // console.log("Image " + i)
                            setPlantHealthImage((arr) =>
                                arr.concat(
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data.data.plantHealth["plantHealthPhoto" + i]}
                                    >
                                        <img
                                            src={
                                                "https://lh3.googleusercontent.com/d/" +
                                                data.data.plantHealth["plantHealthPhotoId" + i] +
                                                "=s220?authuser=0"
                                            }
                                            alt="img"
                                            width="200"
                                            height="200"
                                            style={{ marginRight: "2%" }}
                                        />
                                    </a>
                                )
                            )
                        }
                    }
                }
                //setting other data
                if (data.data.other) {
                    for (let i = 1; i <= 2; i++) {
                        if (data.data.other["otherPhoto" + i]) {
                            console.log("Image " + i)
                            setOtherImage((arr) =>
                                arr.concat(
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={data.data.other["otherPhoto" + i]}
                                    >
                                        <img
                                            src={
                                                "https://lh3.googleusercontent.com/d/" +
                                                data.data.other["otherPhotoId" + i] +
                                                "=s220?authuser=0"
                                            }
                                            alt="img"
                                            width="200"
                                            height="200"
                                            style={{ marginRight: "2%" }}
                                        />
                                    </a>
                                )
                            )
                        }
                    }
                }
                // console.log("Disease data " + diseaseData)
                // }
                // console.log("Disease length " + diseaseData.length)

            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    return (

        < div >

            <br />
            <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>Crop Monitoring-VIEW ENTRY</h2>
            <br />

            {
                cropDetials ? (
                    <>
                        {/* <div className="CropMonitoringViewEntryFirst"> */}
                        <div className="headingView">
                            <h3 style={{ display: "inline-block" }}>Reporter Name :&nbsp;{cropDetials.reporter}</h3>
                            <br />
                            <h3 style={{ display: "inline-block" }}>Plot No :&nbsp; {cropDetials.plotNumber}</h3>
                        </div>
                        <br />
                        <hr />
                        <br />
                        {diseaseData.length ? (
                            <>
                                <div className="diseaseDiv" style={{ display: "inline-block" }}>
                                    <ShowDiseaseOperation
                                        allDiseaseData={diseaseData}
                                        diseaseName={cropDetials.disease.diseaseName}
                                        severityType={cropDetials.disease.severityType}
                                    />
                                </div>
                                <div className="diseaseImageDiv">
                                    {diseaseImage}
                                </div>
                            </>
                        ) : null}
                        <br />
                        <br />
                        <hr className="newLine" />
                        {
                            pestData.length ? (
                                <>
                                    <div className="pestDiv" style={{ display: "inline-block" }}>


                                        <ShowPestOperation
                                            allPestData={pestData}
                                            pestName={cropDetials.pest.insectName}
                                            severityType={cropDetials.pest.severityType}
                                        />
                                    </div>
                                    <div className="pestImageDiv">
                                        {pestImage}
                                    </div>
                                </>
                            ) : null
                        }
                        <br /><br />
                        <hr className="newLine" />
                        {
                            soilHealthData.length ? (
                                <>
                                    <div className="soilHealthDiv" style={{ display: "inline-block" }}>
                                        <ShowSoilHealthOperation
                                            allSoilData={soilHealthData}
                                            severityType={cropDetials.soilHealth.severityType}
                                        />
                                    </div>
                                    <div className="soilHealthImageDiv">
                                        {soilHealthImage}
                                    </div>
                                </>
                            ) : null
                        }
                        <br /><br />
                        <hr className="newLine" />
                        {
                            cropDetials.plantHealth ? (
                                <>
                                    <div className="plantHealthDiv" style={{ display: "inline-block" }}>
                                        <ShowPlantHealthOperation
                                            severityType={cropDetials.plantHealth.severityType}
                                            correctiveAction={cropDetials.plantHealth.correctiveAction}
                                        />
                                    </div>
                                    <div className="plantHealthImageDiv">
                                        {plantHealthImage}
                                    </div>
                                </>
                            ) : null
                        }
                        <hr className="newLine" />
                        {
                            cropDetials.other ? (
                                <>
                                    <div className="otherDiv" style={{ display: "inline-block" }}>
                                        <ShowOtherOperation
                                            severityType={cropDetials.other.severityType}
                                            correctiveAction={cropDetials.other.correctiveAction}
                                            description={cropDetials.other.description}
                                        />
                                    </div>
                                    <div className="otherImageDiv">
                                        {otherImage}
                                    </div>
                                </>
                            ) : null
                        }
                        {/* </div> */}
                    </>

                ) : null
            }

            {/* <div className="CropMonitoringViewEntrySecond">
                {diseaseImage}
                {pestImage}
            </div> */}
        </div >
    )
}

export default CropMonitoringViewEntry;