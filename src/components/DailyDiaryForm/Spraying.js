import React from "react";
import Select from "react-select";

function Spraying(props) {
    const func = props.getSprayingData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;

    const data = [
        {
            value: 0,
            label: "None"
        },
        {
            value: 1,
            label: "Fertilizer"
        },
        {
            value: 2,
            label: "Fungicide"
        },
        {
            value: 3,
            label: "Insecticide"
        },
        {
            value: 4,
            label: "Organic"
        },
        {
            value: 5,
            label: "Plant Growth Regulator"
        }
    ];

    const handleSelectedType = props.handleSelectedType;

    const handleChange = (e) => {
        func({ SprayingType: e.label, RowNo: rowNo, ColumnNo: columnNo });
        handleSelectedType(e.label);
    };

    return (
        <div>
            <Select
                defaultValue={data[0]}
                className="reactSelectDD"
                options={data}
                onChange={handleChange}
            />
        </div>
    );
}

export default Spraying;
