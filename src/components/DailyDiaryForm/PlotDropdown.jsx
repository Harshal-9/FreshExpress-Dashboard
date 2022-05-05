import React from "react";
import Select from "react-select";

function PlotDropdown(props) {
    console.log("Plot", props.plotsFromFarmer);

    const getPlot = props.getPlot;

    const handleChange = (opt) => {
        // console.log("Option", opt);
        getPlot({ PlotID: opt.plot, FarmerID: opt.farmerId });
    };

    // let temp = props.plotsFromFarmer.plot;

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

    // console.log(data);

    return (
        <div>
            <label htmlFor="plotdd">Select plot : </label>
            <Select
                // defaultValue={data[0]}
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
