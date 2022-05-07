import React from "react";
import FarmWork from "./FarmWork";
import UploadImg from "./UploadImg";


//component that displays all the content of farm work
function FarmWorkTable(props) {
    var getFromFarmWorkTable = props.getFromFarmWorkTable;

    var obtainedData = { row1: {}, row2: {}, row3: {}, row4: {}, row5: {} };


    function getFarmWorkData(data) {
        //since there are five rows available in this table we have handled five cases
        switch (data.RowNo) {
            case "1":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row1.FarmWork = data.FarmWork;
                        getFromFarmWorkTable(obtainedData);
                        break;

                    default:
                        obtainedData.row1.ImageLink = data.link;
                        obtainedData.row1.ImageId = data.id;
                        getFromFarmWorkTable(obtainedData);
                }
                break;

            case "2":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row2.FarmWork = data.FarmWork;
                        getFromFarmWorkTable(obtainedData);
                        break;

                    default:
                        obtainedData.row2.ImageLink = data.link;
                        obtainedData.row2.ImageId = data.id;
                        getFromFarmWorkTable(obtainedData);
                }
                break;

            case "3":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row3.FarmWork = data.FarmWork;
                        getFromFarmWorkTable(obtainedData);
                        break;

                    default:
                        obtainedData.row3.ImageLink = data.link;
                        obtainedData.row3.ImageId = data.id;
                        getFromFarmWorkTable(obtainedData);
                }
                break;

            case "4":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row4.FarmWork = data.FarmWork;
                        getFromFarmWorkTable(obtainedData);
                        break;

                    default:
                        obtainedData.row4.ImageLink = data.link;
                        obtainedData.row4.ImageId = data.id;
                        getFromFarmWorkTable(obtainedData);
                }
                break;

            case "5":
                switch (data.ColumnNo) {
                    case "1":
                        obtainedData.row5.FarmWork = data.FarmWork;
                        getFromFarmWorkTable(obtainedData);
                        break;

                    default:
                        obtainedData.row5.ImageLink = data.link;
                        obtainedData.row5.ImageId = data.id;
                        getFromFarmWorkTable(obtainedData);
                }
                break;

            default:
        }
    }

    return (
        <div>
            <table className="myTable">
                {/* Five rows are displayed with help of below code */}
                <tr>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Work
                    </th>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Details
                    </th>
                    <th className="thDD" style={{ textAlign: "center" }}>
                        Image
                    </th>
                </tr>

                <tr>
                    <td className="tdDD">
                        <FarmWork
                            getFarmWorkData={getFarmWorkData}
                            rowNo="1"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row1.Details = event.target.value;
                                getFromFarmWorkTable(obtainedData);
                            }}
                            className="textInputDD"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFarmWorkData={getFarmWorkData}
                            fromWhat="FarmWorkTable"
                            rowNo="1"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <FarmWork
                            getFarmWorkData={getFarmWorkData}
                            rowNo="2"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row2.Details = event.target.value;
                                getFromFarmWorkTable(obtainedData);
                            }}
                            className="textInputDD"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFarmWorkData={getFarmWorkData}
                            fromWhat="FarmWorkTable"
                            rowNo="2"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <FarmWork
                            getFarmWorkData={getFarmWorkData}
                            rowNo="3"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row3.Details = event.target.value;
                                getFromFarmWorkTable(obtainedData);
                            }}
                            className="textInputDD"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFarmWorkData={getFarmWorkData}
                            fromWhat="FarmWorkTable"
                            rowNo="3"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <FarmWork
                            getFarmWorkData={getFarmWorkData}
                            rowNo="4"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row4.Details = event.target.value;
                                getFromFarmWorkTable(obtainedData);
                            }}
                            className="textInputDD"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFarmWorkData={getFarmWorkData}
                            fromWhat="FarmWorkTable"
                            rowNo="4"
                            columnNo="2"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="tdDD">
                        <FarmWork
                            getFarmWorkData={getFarmWorkData}
                            rowNo="5"
                            columnNo="1"
                        />
                    </td>
                    <td className="tdDD">
                        <input
                            onChange={(event) => {
                                obtainedData.row5.Details = event.target.value;
                                getFromFarmWorkTable(obtainedData);
                            }}
                            className="textInputDD"
                        ></input>
                    </td>
                    <td className="tdDD">
                        <UploadImg
                            getFarmWorkData={getFarmWorkData}
                            fromWhat="FarmWorkTable"
                            rowNo="5"
                            columnNo="2"
                        />
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default FarmWorkTable;
