import React, { useState, useEffect } from "react";
import "./BroadcastViewArticle.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleComment() {
    return (
        <div>
            <div className="commentsFirst" >
                <div style={{ display: "inline-block", margin: "10px" }}>
                    <img
                        src="https://tse4.mm.bing.net/th?id=OIP.bO570BehVS89oAkbwqQucAHaIr&pid=Api&P=0&w=300&h=300"
                        width="40px" alt=""

                    />
                </div>
                <div style={{ display: "inline-block" }}>
                    <label className="viewArticleSecondLabel" htmlFor="">Farmer Name :</label>
                    <input type="text" disabled="true" />
                    <br />
                    <label className="viewArticleSecondLabel" htmlFor="">Question 1 :</label>
                    <input type="text" disabled="true" />
                </div>
            </div>
            <div className="commentsSecond">
                <div style={{ display: "inline-block", margin: "1px" }}>
                    <img
                        src="https://www.liegeairport.com/flexport/wp/wp-content/uploads/sites/3/2017/01/fresh-express-logo.jpg"
                        width="60px" alt=""

                    />
                </div>
                <div style={{ display: "inline-block" }}>
                    <label className="viewArticleSecondLabel" htmlFor="">Fresh Express :</label>
                    <input type="text" disabled="true" />
                    <br />
                    <label className="viewArticleSecondLabel" htmlFor="">Reply :</label>
                    <input type="text" disabled="true" />
                </div>
            </div>
        </div>
    );
}

function ViewArticle() {

    const tempObject = {

        analytics: {
            numberOfRecipients: 0,
            numberOfUniqueViews: 0
        },
        topic: "",
        category: "",
        date: "",
        description: "",
        format: "",
        link: "",
        toAllFarmers: false,
        farmers: [],
        tags: [],
        // chats: [
        //     {
        //         farmerName: "",
        //         question: "",
        //         adminName: "",
        //         answer: "",
        //     }
        // ],

    }

    const { broadcastId } = useParams();
    const [broadcastData, setBroadcastData] = useState(tempObject);
    console.log(broadcastId);
    useEffect(() => {
        axios.get("https://immense-beach-88770.herokuapp.com/broadcasts/" + broadcastId).then((res) => {
            console.log("result is here", res.data);
            setBroadcastData(res.data);

        }).catch((err) => {
            console.log("Error is here", err);
        })

    }, []);

    return (
        <div className="viewArticleMain">
            <h1 style={{ textAlign: "center", margin: "10px", backgroundColor: "#bfdaf3" }}>Resource Base - View Article</h1>
            <div className="viewArticleFirst">
                <div className="viewArticleImage">
                    <img src="http://www.mailrail.net/images/broadcasting-img.png" alt="" width="100%" />
                </div>
                <div className="viewArticleFirstContent">
                    <h5 style={{ display: "inline-block" }}>Topic :&nbsp;</h5>
                    <p style={{ display: "inline-block" }}>{broadcastData.topic}</p>
                    <br />
                    <br />
                    <h5 style={{ display: "inline-block" }}>Category :&nbsp;</h5>
                    <p style={{ display: "inline-block" }}>{broadcastData.category}</p>
                    <br />
                    <br />
                    <h5 style={{ display: "inline-block" }}>Date :&nbsp;</h5>
                    <p style={{ display: "inline-block" }}>{new Date(broadcastData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <br />
                    <br />
                    <br />
                    <h5 style={{ marginBottom: "5px" }}>Description : &nbsp;</h5>
                    <p>
                        {broadcastData.description}
                    </p>
                    <br />
                    <br />
                    <h5>Analytics :</h5>
                    <p>
                        <ul style={{ marginLeft: "20px" }}>
                            <li>Total number of recipients : {broadcastData.analytics.numberOfRecipients}</li>
                            <li>Number of unique views : {broadcastData.analytics.numberOfUniqueViews}</li>
                        </ul>
                    </p>
                    <div >
                        Sent To :&nbsp;
                        {broadcastData.toAllFarmers ? <p style={{ display: "inline-block" }}>All Farmers</p> : null}
                    </div>

                </div>
            </div>
            <div className="viewArticleSecond">
                <h2 style={{ margin: "20px" }}>Comments/Questions</h2>
                <div className="viewArticleSecondContent">
                    <SingleComment />
                    <SingleComment />
                </div>
            </div>
        </div>
    )
}

export default ViewArticle;