import React from "react";
import Select from "react-select";

function SetMaintenance(props) {
    const func = props.getMaintenanceData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;
    const data = [
        {
            value: 0,
            label: "None"
        },
        {
            value: 1,
            label: "Tractor"
        },
        {
            value: 2,
            label: "Dripline"
        },
        {
            value: 3,
            label: "Water-pump"
        },
        {
            value: 4,
            label: "Sprayer"
        },
        {
            value: 5,
            label: "Sand-Filter"
        },
        {
            value: 6,
            label: "Structure"
        }
    ];

    // handle onChange event of the dropdown
    const handleChange = (e) => {
        // console.log(e.label);
        func({ MaintenanceWork: e.label, RowNo: rowNo, ColumnNo: columnNo });
    };

    return (
        <Select defaultValue={data[0]} options={data} onChange={handleChange} />
    );
}

export default SetMaintenance;
