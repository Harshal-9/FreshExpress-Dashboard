import React from "react";
import Select from "react-select";

function SoilWork(props) {
    const func = props.getSoilData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;
    const data = [
        {
            value: 0,
            label: "None"
        },
        {
            value: 1,
            label: "Tilling"
        },
        {
            value: 2,
            label: "Rotavator"
        },
        {
            value: 3,
            label: "Stones removal"
        },
        {
            value: 4,
            label: "Bed formation"
        },
        {
            value: 5,
            label: "New soil application"
        }
    ];

    const handleChange = (e) => {
        func({ soilWork: e.label, RowNo: rowNo, ColumnNo: columnNo });
    };

    return (
        <Select defaultValue={data[0]} options={data} onChange={handleChange} />
    );
}

export default SoilWork;
