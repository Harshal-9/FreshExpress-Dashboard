import React, { useState } from "react";
import "./NewBroadcast.css";
function NewBroadcast() {
    const [youtube, setYoutube] = useState(true);
    const [link, setLink] = useState(true);
    return (
        <div>
            <h1>Inside new Broadcast</h1>
            <div className="newBroadcast">
            <img src="http://www.mailrail.net/images/broadcasting-img.png"
                    width="600px"
                    height="300px"
                    alt="FarmerImg"
                    style={{ display: "inline-block", margin: "10px" }}
                ></img>
                <form action="">
                    <label className="newBroadcastLabel" htmlFor="">Enter Topic : </label>
                    <input type="text" className="newBroadcastInput" />
                    <br />
                    <label className="newBroadcastLabel">Enter Category :</label>
                    <input type="text" className="newBroadcastInput" />
                    <br />
                    <label className="newBroadcastLabel">Enter Youtube Link :</label>
                    {link === true ? (<input type="link" className="newBroadcastInput"
                        onChange={(e) => setYoutube(false)}
                    />) : (<input type="link" disabled="true" className="newBroadcastInput" />)}

                    <br />
                    <label className="newBroadcastLabel">Enter File :</label>
                    {youtube === true ? (<input type="file" className="newBroadcastInput"
                        onChange={(e) => setLink(false)}
                    />) : (<input type="file" disabled="true" className="newBroadcastInput" />)}
                    <br />
                    <label className="newBroadcastLabeltextArea" >Enter Description :</label>
                    <textarea name="" id="" cols="30" rows="1" className="newBroadcastInputTextArea"></textarea>
                </form>
            </div>
        </div>
    );
}

export default NewBroadcast