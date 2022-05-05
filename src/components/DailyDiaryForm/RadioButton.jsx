import React, { useState } from "react";
import SprayingTable from "./SprayingTable";
import FertilizerTable from "./FertilizerTable";
import FarmWorkTable from "./FarmWorkTable";
import SoilWorkTable from "./SoilWorkTable";
import MaintenanceTable from "./MaintenanceTable";

function RadioButton(props) {
    const [isClicked, renderPage] = useState(false);

    const getFromRadio = props.getFromRadio;

    function selectedRadio(event) {
        if (event.target.value === "YES") renderPage(true);
        else renderPage(false);
    }

    // All functions

    function getFromSprayingTable(data) {
        getFromRadio({ Type: props.type, Data: data });
    }

    function getFromFertilizerTable(data) {
        getFromRadio({ Type: props.type, Data: data });
    }

    function getFromFarmWorkTable(data) {
        getFromRadio({ Type: props.type, Data: data });
    }

    function getFromSoilTable(data) {
        getFromRadio({ Type: props.type, Data: data });
    }

    function getFromMaintainTable(data) {
        getFromRadio({ Type: props.type, Data: data });
    }

    return (
        <div style={{ backgroundColor: isClicked === true ? "#f0fcfc" : "white" }}>
            <div onChange={selectedRadio}>
                <input type="radio" value="YES" name="radiogroup" /> YES
                <input type="radio" value="No" name="radiogroup" /> NO
            </div>
            <br />
            <div>
                {isClicked === true ? (
                    props.type === 1 ? (
                        <SprayingTable getFromSprayingTable={getFromSprayingTable} />
                    ) : props.type === 2 ? (
                        <FertilizerTable getFromFertilizerTable={getFromFertilizerTable} />
                    ) : props.type === 3 ? (
                        <FarmWorkTable getFromFarmWorkTable={getFromFarmWorkTable} />
                    ) : props.type === 4 ? (
                        <SoilWorkTable getFromSoilTable={getFromSoilTable} />
                    ) : (
                        <MaintenanceTable getFromMaintainTable={getFromMaintainTable} />
                    )
                ) : null}
            </div>
        </div>
    );
}

export default RadioButton;
