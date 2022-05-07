import React from "react";
import Fertilizer from "./Fertilizer";
import UploadImg from "./UploadImg";

function FertilizerTable(props) {
    var getFromFertilizerTable = props.getFromFertilizerTable;

    var obtainedData = { row1: {}, row2: {}, row3: {}, row4: {}, row5: {} };

    function getFertilizerData(data) {
        // Switches cases to display data in five rows
        switch (data.RowNo) {
            case "1":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row1.FertilizerWork = data.FertilizerWork;
                        getFromFertilizerTable(obtainedData);
                        break;

                    default:
                        obtainedData.row1.ImageLink = data.link;
                        obtainedData.row1.ImageId = data.id;
                        getFromFertilizerTable(obtainedData);
                }
                break;

            case "2":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row2.FertilizerWork = data.FertilizerWork;
                        getFromFertilizerTable(obtainedData);
                        break;

                    default:
                        obtainedData.row2.ImageLink = data.link;
                        obtainedData.row2.ImageId = data.id;
                        getFromFertilizerTable(obtainedData);
                }
                break;

            case "3":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row3.FertilizerWork = data.FertilizerWork;
                        getFromFertilizerTable(obtainedData);
                        break;

                    default:
                        obtainedData.row3.ImageLink = data.link;
                        obtainedData.row3.ImageId = data.id;
                        getFromFertilizerTable(obtainedData);
                }
                break;

            case "4":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row4.FertilizerWork = data.FertilizerWork;
                        getFromFertilizerTable(obtainedData);
                        break;

                    default:
                        obtainedData.row4.ImageLink = data.link;
                        obtainedData.row4.ImageId = data.id;
                        getFromFertilizerTable(obtainedData);
                }
                break;

            case "5":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row5.FertilizerWork = data.FertilizerWork;
                        getFromFertilizerTable(obtainedData);
                        break;

                    default:
                        obtainedData.row5.ImageLink = data.link;
                        obtainedData.row5.ImageId = data.id;
                        getFromFertilizerTable(obtainedData);
                }
                break;

            default:
        }
    }
    return (
        <div>
            {/* Taken input of hours of irrigation */}
            <h3 style={{ display: "inline-block" }}>
                Enter Number of hours of irrigation :
            </h3>
            <input
                onChange={(event) => {
                    obtainedData.IrrigationTime = event.target.value;
                    getFromFertilizerTable(obtainedData);
                }}
                style={{ display: "inline-block" }}
                type="number"
            ></input>
            <br />

            <table className="myTable">
                {/* Displaying fertilizer ,quantity,image data in table .For five rows */}
                <tr>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Fertilizer
                    </th>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Quantity
                    </th>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Image
                    </th>
                </tr>

                <tr>
                    <td className="tdDD">
                        <Fertilizer
                            getFertilizerData={getFertilizerData}
                            rowNo="1"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row1.Details = event.target.value;
                                getFromFertilizerTable(obtainedData);
                            }}
                            className="textInputDD"
                            type="number"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFertilizerData={getFertilizerData}
                            fromWhat="FertilizerTable"
                            rowNo="1"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <Fertilizer
                            getFertilizerData={getFertilizerData}
                            rowNo="2"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row2.Details = event.target.value;
                                getFromFertilizerTable(obtainedData);
                            }}
                            className="textInputDD"
                            type="number"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFertilizerData={getFertilizerData}
                            fromWhat="FertilizerTable"
                            rowNo="2"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <Fertilizer
                            getFertilizerData={getFertilizerData}
                            rowNo="3"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row3.Details = event.target.value;
                                getFromFertilizerTable(obtainedData);
                            }}
                            className="textInputDD"
                            type="number"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFertilizerData={getFertilizerData}
                            fromWhat="FertilizerTable"
                            rowNo="3"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <Fertilizer
                            getFertilizerData={getFertilizerData}
                            rowNo="4"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row4.Details = event.target.value;
                                getFromFertilizerTable(obtainedData);
                            }}
                            className="textInputDD"
                            type="number"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFertilizerData={getFertilizerData}
                            fromWhat="FertilizerTable"
                            rowNo="4"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <Fertilizer
                            getFertilizerData={getFertilizerData}
                            rowNo="5"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row5.Details = event.target.value;
                                getFromFertilizerTable(obtainedData);
                            }}
                            className="textInputDD"
                            type="number"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFertilizerData={getFertilizerData}
                            fromWhat="FertilizerTable"
                            rowNo="5"
                            columnNo="2"
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default FertilizerTable;
