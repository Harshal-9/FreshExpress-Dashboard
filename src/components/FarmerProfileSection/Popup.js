import React, { useState, useEffect } from "react";
import "./Popup.css";

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

function Popup(props) {
  function handleClick() {
    props.toggle();
  }

  const [dataToPopup, setDataToPopup] = useState([]);
  // props.dataToPopup;

  useEffect(() => {
    console.log("trigggered");
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
      <form>
        <h3>Links : </h3>
        <div
          className="previousLinks"
          style={{ textAlign: "center", width: "98%" }}
        >
          {dataToPopup}
        </div>
        <br />
        <label>
          Enter new URL : <input type="text" name="name" />
        </label>
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
    // </div>
  );
}

export default Popup;
