import React, { useState } from "react";
import "./NewBroadcast.css";
import Select from "react-select";
function NewBroadcast() {
    const [youtube, setYoutube] = useState(true);
    const [link, setLink] = useState(true);
    const [selected,setSelected] = useState("");
    const format = [
        { value: 0, label: "PDF" },
        { value: 1, label: "Youtube video" },
        { value: 2, label: "JPG" }
      ]
    return (
        <div>
            <h1>Inside new Broadcast</h1>
            <div className="newBroadcast">
            <img src="https://tse2.mm.bing.net/th?id=OIP.4SzuLKFt1oMqJo1hBncSBgHaDV&pid=Api&P=0&w=354&h=160"
                    width="600px"
                    height="300px"
                    alt="BroadCast Image"
                    style={{ display: "inline-block", margin: "10px" }}
                ></img>
                <br />
                <Select 
                className="NewBroadcastSelect" 
                options={format}
                placeholder="Select Format"
                  onChange={(opt)=>{
                        setSelected(opt.label);
                  }}
                />
                <form action="">
                    <label className="newBroadcastLabel" htmlFor="">Enter Topic : </label>
                    <input type="text" className="newBroadcastInput" />
                    <br />
                    <label className="newBroadcastLabel">Enter Category :</label>
                    <input type="text" className="newBroadcastInput" />
                    <br />
                    {/* {selected === "Youtube video" ?(<>
                     <label className="newBroadcastLabel">Enter Youtube Link :</label>
                      <input type="link" className="newBroadcastInput"
                        onChange={(e) => setYoutube(false)}
                    /></>) : null} */}
                    {selected === "Youtube video" ?(<>
                     <label className="newBroadcastLabel">Enter Youtube Link :</label>
                      <input type="link" className="newBroadcastInput"
                    /></>) : null}

                    <br />
                    {/* {selected==="PDF"
                    <label className="newBroadcastLabel">Enter File :</label>
                    {youtube === true ? (<input type="file" className="newBroadcastInput"
                        onChange={(e) => setLink(false)}
                    />) :null} */}
                     {/* {selected === "PDF" ?(<>
                     <label className="newBroadcastLabel">Enter PDF :</label>
                      <input type="link" className="newBroadcastInput"
                    /></>) : null}

                    {selected==="PDF"? (<>
                    <label className="newBroadcastLabel">Enter File :</label>
                     <input type="file" className="newBroadcastInput"
                    /><>) : null} */}

                    <br />
                    <label className="newBroadcastLabeltextArea" >Enter Description :</label>
                    <textarea name="" id="" cols="30" rows="1" className="newBroadcastInputTextArea"></textarea>
                </form>
            </div>
        </div>
    );
}

export default NewBroadcast