import React, { useState, useEffect } from "react";
import "./Popup.css";

function Popup(props) {
  function SingleLi(dataKiLink) {
    return (
      <ul>
        <li className="linkLi">
          <a style={{ width: "100%" }} href={dataKiLink.data}>
            {dataKiLink.data}
          </a>
        </li>
      </ul>
    );
  }

  // Array of components
  const [dataToPopup, setDataToPopup] = useState([]);

  // Array of links(String)
  const [modifiedData, setModifiedData] = useState([]);
  // props.dataToPopup;

  // useStatefor storing inputed link
  const [inputedLink, setInputedLink] = useState("");

  function handleClick() {
    props.dataFromPopup({
      modifiedData: modifiedData,
      data: props.dataToPopup.qualityJotform,
    });
    props.toggle();
  }

  function handleSubmit() {
    // console.log(modifiedData);
    setModifiedData([...modifiedData, inputedLink]);
    setDataToPopup([...dataToPopup, <SingleLi data={inputedLink} />]);
  }

  useEffect(() => {
    console.log("trigggered");
    for (let i = 0; i < props.dataToPopup.arr.length; i++) {
      setModifiedData((myArr) => myArr.concat(props.dataToPopup.arr[i]));
    }
    for (let i = 0; i < props.dataToPopup.arr.length; i++) {
      setDataToPopup((myArr) =>
        myArr.concat(<SingleLi data={props.dataToPopup.arr[i]} />)
      );
    }
  }, []);

  return (
    // <div className="modal">
    <div className="modal_content">
      <span className="close" onClick={handleClick}>
        &times;
      </span>
      <h3>Links : </h3>
      <div
        className="previousLinks"
        style={{ textAlign: "center", width: "98%" }}
      >
        {dataToPopup}
      </div>
      <br />
      {props.view ? (
        ""
      ) : (
        <div>
          <label htmlFor="link">Enter new URL :</label>
          <input
            type="text"
            id="link"
            onChange={(e) => {
              setInputedLink(e.target.value);
            }}
          />
          <br />
          <br />
          <button
            style={{ fontFamily: "Verdana", fontSize: "15px" }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Popup;
