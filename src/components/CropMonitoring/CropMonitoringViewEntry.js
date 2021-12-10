import React from "react";
import "./CropMonitoringViewEntry.css";

function SingleTableRowCropMonitoringViewEntry() {
    return (
        <tr className="SingleTableRowCropMonitoringViewEntryRow">
            <td>Nikhil</td>
            <td>Nikhil</td>
        </tr>
    )
}

function CropMonitoringViewEntry() {
    return (
        <div>
            <br />
            <h2 style={{ textAlign: "center", backgroundColor: "#cdd4ea" }}>Crop Monitoring-VIEW ENTRY</h2>
            <br />
            <div className="CropMonitoringViewEntryFirst">
                <p style={{ display: "inline-block" }}>Farmer Name :&nbsp;</p>
                <p style={{ display: "inline-block" }}>Bhausaheb Nathe</p>
                <br />
                <p style={{ display: "inline-block" }}>Plot No :&nbsp;</p>
                <p style={{ display: "inline-block" }}>2</p>
                <br />
                <br />
                <p style={{ display: "inline-block" }}>Crop :&nbsp;</p>
                <p style={{ display: "inline-block" }}>Table Grapes</p>
                <br />
                <p style={{ display: "inline-block" }}>Variety :&nbsp;</p>
                <p style={{ display: "inline-block" }}>Thomson Seedless</p>
                <br />
                <br />
                <p style={{ display: "inline-block" }}>Stage :&nbsp;</p>
                <p style={{ display: "inline-block" }}>35 days from fruit pruning</p>
                <br />
                <br />
                <p style={{ display: "inline-block" }}>Monitoring Parameter :&nbsp;</p>
                <p style={{ display: "inline-block" }}>Pest</p>
                <br />
                <p style={{ display: "inline-block" }}>Severity :&nbsp;</p>
                <p style={{ display: "inline-block" }}>Widespread</p>
                <br />
                <br />
                <p style={{ display: "inline-block" }}>Corrective Action :&nbsp;</p>
                <br />
                <br />
                <div>
                    <table className="CropMonitoringViewEntryTable">
                        <tr className="CropMonitoringViewEntryRow">
                            <td>Chemical</td>
                            <td>Quantity</td>
                        </tr>
                        <SingleTableRowCropMonitoringViewEntry />
                        <SingleTableRowCropMonitoringViewEntry />
                        <SingleTableRowCropMonitoringViewEntry />
                        <SingleTableRowCropMonitoringViewEntry />

                    </table>
                </div>
                <br />
                <br />
            </div>
            <div className="CropMonitoringViewEntrySecond">
                <div className="l">
                    <label htmlFor="">Location</label>
                </div>
                <div className="i">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.m6bBy8y_wam7wwCQZKn4DAHaDt&pid=Api&P=0&w=305&h=153" alt=""
                        width="500px"
                    />
                </div>
                <br />
                <label htmlFor="">View Photos</label>
                <br />
                <img
                    src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
                    width="200px"
                    height="150px"
                    alt="FarmerImg"
                    style={{ display: "inline-block", margin: "10px" }}
                ></img>
                <img
                    src="https://media.istockphoto.com/photos/indian-farmer-at-onion-field-picture-id1092520698?k=20&m=1092520698&s=612x612&w=0&h=azmC9S6SiHTXVh-dmUFD7JJ0QF_pjxmudCjkBM9UAuE="
                    width="200px"
                    height="150px"
                    alt="FarmerImg"
                    style={{ display: "inline-block", margin: "10px" }}
                ></img>
            </div>
        </div>
    )
}

export default CropMonitoringViewEntry;