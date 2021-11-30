import React, { useState } from "react";
import Select from "react-select";
function FarmerSeasonalDataCard() {
  const [isDisabledSeason, setIsDisabledSeason] = useState(true);

  // Function to handle edit of PlotData form
  function handleEditSeason(event) {
    event.preventDefault();
    if (isDisabledSeason) {
      setIsDisabledSeason(false);
    } else {
      setIsDisabledSeason(true);
    }
  }

  return (
    <div className="MyCardColumn" style={{ display: "inline-block" }}>
      <div className="MyCard" style={{ width: "98%" }}>
        <Select
          placeholder="Select a year"
          options={[
            { label: "2019", value: "2019" },
            { label: "2020", value: "2020" },
            { label: "2021", value: "2021" },
          ]}
        />
        <br />
        <div style={{ display: "inline-block" }}>
          <div style={{ textAlign: "right" }}>
            <i
              className="fa fa-edit fa-lg"
              aria-hidden="true"
              onClick={handleEditSeason}
            ></i>
          </div>
          <form>
            <div
              style={{
                display: "inline-block",
                marginRight: "40px",
              }}
            >
              <label className="FarmerProfileLabel2">Plantation :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.plotNumber}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.plotNumber = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Foundation Pruning :
              </label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.variety}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.variety = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Actual Harvest :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.variety}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.variety = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Fruit Pruning :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.variety}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.variety = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Ready To Harvest :</label>
              <input
                type="date"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.variety}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.variety = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Local Tonnage : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <hr />
              <br />
              <label className="FarmerProfileLabel2">
                Pre Harvest QCLink :{" "}
              </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Primary Issue Faced :
              </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Invard QCLink : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Knitting QCLink : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
            </div>
            {/* other div */}
            <div style={{ display: "inline-block" }}>
              <label className="FarmerProfileLabel2">Max Individual : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Sum : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.address.village}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.address.village = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">No of Detection : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.address.village}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.address.village = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">
                Red List Chemicals :
              </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.address.village}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.address.village = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">MRL Report Link : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.address.village}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.address.village = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Export Tonnage : </label>
              <input
                type="number"
                style={{ width: "377px", height: "18.4px" }}
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.address.village}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.address.village = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <hr />
              <br />
              <label className="FarmerProfileLabel2">Packing QCLink : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">FG QCLink : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">On Arrival QCLink :</label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
              <label className="FarmerProfileLabel2">Quality : </label>
              <input
                type="text"
                disabled={isDisabledSeason}
                size="40"
                // value={plotAllData.farmInformation.MHCode}
                // onChange={(event) => {
                //   const prevData = { ...plotAllData };
                //   prevData.farmInformation.MHCode = event.target.value;
                //   sendBackPlotAllData(prevData);
                // }}
              ></input>
              <br />
              <br />
            </div>
            <hr />
            <br />
            <label className="FarmerProfileLabel2" style={{ width: "235px" }}>
              Primary Quality Issues Faced :
            </label>
            <input
              type="text"
              disabled={isDisabledSeason}
              size="40"
              style={{ width: "49%" }}
              // value={plotAllData.farmInformation.MHCode}
              // onChange={(event) => {
              //   const prevData = { ...plotAllData };
              //   prevData.farmInformation.MHCode = event.target.value;
              //   sendBackPlotAllData(prevData);
              // }}
            ></input>
            <br />
            <br />
          </form>
          {isDisabledSeason ? null : (
            <button
              onClick={(event) => {
                event.preventDefault();
                setIsDisabledSeason(true);
              }}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerSeasonalDataCard;
