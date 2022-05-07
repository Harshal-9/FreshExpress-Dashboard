import axios from "axios";
import React, { useState } from "react";


// This component is used to set image that are uploaded in any of the operation in daily diary form
function UploadImg(props) {
    // Handling functional props for passing the link

    var funcTosendLink;
    var rowNo = props.rowNo;
    var columnNo = props.columnNo;

    switch (props.fromWhat) {
        case "SprayingTable":
            funcTosendLink = props.getSprayingData;
            break;

        case "FertilizerTable":
            funcTosendLink = props.getFertilizerData;
            break;

        case "FarmWorkTable":
            funcTosendLink = props.getFarmWorkData;
            break;

        case "SoilWorkTable":
            funcTosendLink = props.getSoilData;
            break;

        case "MaintenanceTable":
            funcTosendLink = props.getMaintenanceData;
            break;

        default:
    }

    // ---------------------------------------
    const [metadata, setMetadata] = useState(null);

    const handleFileChange = (event) => {
        // console.log(event.target.files[0]);
        const selectedFile = event.target.files[0];
        const fd = new FormData();
        fd.append("image", selectedFile, selectedFile.name);

        // Getting link of uploaded image
        axios
            .post("https://immense-beach-88770.herokuapp.com/uploadFile", fd)
            .then((res) => {
                console.log("result", res);
                console.log(res.data.link);
                alert("File : " + selectedFile.name + " uploaded successfully !");
                setMetadata({ link: res.data.link, id: res.data.id });
                // printLink();
                funcTosendLink({
                    link: res.data.link,
                    id: res.data.id,
                    RowNo: rowNo,
                    ColumnNo: columnNo
                }); //sending link to higher level
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    // Deleting image

    function handleDelete() {
        axios
            .delete("https://immense-beach-88770.herokuapp.com/uploadFile", {
                data: {
                    id: metadata.id
                }
            })
            .then((res) => {
                console.log(res);
                setMetadata(null);
                funcTosendLink({
                    link: "",
                    RowNo: rowNo,
                    ColumnNo: columnNo
                });
            })
            .catch((err) => {
                console.log("Error here : ", err);
            });
    }

    return (
        <div>
            {metadata ? (
                <button className="buttonDD" onClick={handleDelete}>
                    Delete
                </button>
            ) : (
                <form enctype="multipart/form-data">
                    <input
                        style={{
                            display: "inline-block",
                            color: "transparent",
                            width: "75%",
                            paddingLeft: "20px"
                        }}
                        type="file"
                        name="uploadedFile"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </form>
            )}
        </div>
    );
}

export default UploadImg;
