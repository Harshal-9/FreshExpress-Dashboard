import React from "react";
import Select from "react-select";
import "./CropMonitoring.css";

function SingleTableRowCropMonitoring() {
    return (
            <tr className="SingleTableRowCropMonitoring">
                <td>Nikhil</td>
                <td>Nikhil</td>
                <td>Nikhil</td>
                <td>Nikhil</td>
            </tr>
    );
}
function CropMonitoring() {
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
                    options={category}
                    placeholder="Search Farmer Name"
                />
                <button className="allDiariesButton">
                    <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i> Add
                    Operation
                </button>
                <br />
                <br />
                <Select
                    className="CropMonitoringFarmerNamePlot"
                    options={format}
                    placeholder="Select Plot"

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
                        <SingleTableRowCropMonitoring/>
                        <SingleTableRowCropMonitoring/>
                        <SingleTableRowCropMonitoring/>
                        <SingleTableRowCropMonitoring/>
                    </table>
                </div>
               
            </div>
        </div>
    )
}

export default CropMonitoring;