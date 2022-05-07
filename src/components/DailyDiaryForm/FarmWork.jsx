import React from "react";
import Select from "react-select";


// function to display farmwork options
function FarmWork(props) {
    const func = props.getFarmWorkData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;

    const data = [
        {
            value: 0,
            label: "None"
        },
        {
            value: 1,
            label: "Weeding"
        },
        {
            value: 2,
            label: "Mulching"
        },
        {
            value: 3,
            label: "Outer Bark removal"
        },
        {
            value: 4,
            label: "Thinning"
        },
        {
            value: 5,
            label: "Sticky trap installation"
        },
        {
            value: 6,
            label: "Fail shoot removal"
        },
        {
            value: 7,
            label: "Tying canes"
        },
        {
            value: 8,
            label: "Shoot tipping"
        },
        {
            value: 9,
            label: "Paper wrapping "
        },
        {
            value: 10,
            label: "Petiole analysis"
        },
        {
            value: 11,
            label: "Soil analysis"
        },
        {
            value: 12,
            label: "Foundation pruning"
        },
        {
            value: 13,
            label: "Fruit pruning "
        },
        {
            value: 14,
            label: "Cordon renewal"
        },
        {
            value: 15,
            label: "Girdling"
        }
    ];

    const handleChange = (e) => {
        // console.log(e.label);
        func({ FarmWork: e.label, RowNo: rowNo, ColumnNo: columnNo });
    };

    return (
        <Select defaultValue={data[0]} options={data} onChange={handleChange} />
    );
}

export default FarmWork;
