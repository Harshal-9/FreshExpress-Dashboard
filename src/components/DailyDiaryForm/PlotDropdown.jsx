import React from "react";
import Select from "react-select";

// Component to set plot data in plot dropdown
function PlotDropdown(props) {
    console.log("Plot", props.plotsFromFarmer);

    const getPlot = props.getPlot;

    const handleChange = (opt) => {
        getPlot({ PlotID: opt.plot, FarmerID: opt.farmerId });
    };


    const data = props.plotsFromFarmer.plot
        ? [
            ...props.plotsFromFarmer.plot,
            {
                plot: "ALL",
                farmerId: props.plotsFromFarmer.FarmerID,
                farmerName: ""
            }
        ]
        : [
            {
                plot: "None",
                farmerName: "",
                farmerId: ""
            }
        ];


    return (
        <div>
            <label htmlFor="plotdd">Select plot : </label>
            <Select
                id="plotdd"
                className="plotDropDD"
                options={data}
                getOptionLabel={(option) =>
                    "(" + option.plot + ") " + option.farmerName
                }
                getOptionValue={(option) =>
                    "(" + option.plot + ") " + option.farmerName
                }
                onChange={handleChange}
            />
        </div>
    );
}

export default PlotDropdown;
