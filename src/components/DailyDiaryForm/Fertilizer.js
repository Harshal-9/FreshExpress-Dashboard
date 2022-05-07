import React from "react";
import Select from "react-select";

// Component to show different fertilizer data

function SetFertilizer(props) {
    const func = props.getFertilizerData;
    const rowNo = props.rowNo;
    const columnNo = props.columnNo;
    const data = [
        { value: 0, label: "None" },
        { value: 1, label: "Calcium Nitrate/Calcium Nitrobar" },
        { value: 2, label: "Magnecium Sulphate" },
        { value: 3, label: "Boron" },
        { value: 4, label: "Fulvic Acid" },
        { value: 5, label: "DF1 Solution" },
        { value: 6, label: "Turbo Calcio plus" },
        { value: 7, label: "Fulvic Acid Dravan" },
        { value: 8, label: "Turbo Calcio plus/ Tamro Calcium" },
        { value: 9, label: "00:00:50" },
        { value: 10, label: "18:46:00 (DAP)" },
        { value: 11, label: "SOP" },
        { value: 12, label: "Kombadi Khat" },
        { value: 13, label: "Jivanu Slury" },
        { value: 14, label: "Calcium Nitrate" },
        { value: 15, label: "13:01:00" },
        { value: 16, label: "Phosphoric acid" },
        { value: 17, label: "13:00:45" },
        { value: 18, label: "Humic Acid Dravan" },
        { value: 19, label: "Pend/Gandulkhat" }
    ];

    const handleChange = (e) => {
        func({ FertilizerWork: e.label, RowNo: rowNo, ColumnNo: columnNo });
    };

    return (
        <Select defaultValue={data[0]} options={data} onChange={handleChange} />
    );
}

export default SetFertilizer;
