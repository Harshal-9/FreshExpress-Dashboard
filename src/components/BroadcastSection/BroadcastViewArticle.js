import React, { useState, useEffect } from "react";
import "./BroadcastViewArticle.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleChat(props) {
    const { broadcastId } = useParams();
    const [chat, setChat] = useState(props.chat);
    const [isAnswerEditable, setIsAnswerEditable] = useState(() => props.chat.answer.length > 0 ? false : true);

    function handleAnswerPost(event) {
        event.preventDefault();
        chat.adminName = "AdminName";
        axios.post("https://immense-beach-88770.herokuapp.com/broadcasts/insertAnswer/" + broadcastId + "/" + chat._id, chat)
            .then((res) => {
                // console.log("res chat insert", res);
                setIsAnswerEditable(false);
            })
            .catch((err) => {
                console.log("err", err);
                setIsAnswerEditable(true);
            });
    }

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
                    <input type="text" disabled="true" value={chat.farmerName} />
                    <br />
                    <label className="viewArticleSecondLabel" htmlFor="">Question :</label>
                    <input type="text" disabled="true" value={chat.question} />
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
                    {/* //ToDo: to add admin name here automatically. */}
                    <input type="text" disabled="true" value={chat.adminName.length === 0 ? "AdminName" : chat.adminName} />
                    <br />
                    <label className="viewArticleSecondLabel" htmlFor="">Reply :</label>
                    <input type="text" disabled={!isAnswerEditable} value={chat.answer}
                        onChange={(event) => {
                            const tempChat = { ...chat };
                            tempChat.answer = event.target.value;
                            setChat(tempChat);
                        }} />
                    {isAnswerEditable ? <button onClick={handleAnswerPost}>Post</button> : null}
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
    const [farmersIdMapping, setFarmersIdMapping] = useState([]);
    const [broadcastData, setBroadcastData] = useState(tempObject);
    const [chatArray, setChatArray] = useState([]);
    useEffect(() => {
        axios.get("https://immense-beach-88770.herokuapp.com/broadcasts/" + broadcastId)
            .then((res) => {
                setBroadcastData(res.data);
                console.log(res.data);
                const tempChatArray = [];
                for (let i = 0; i < res.data.chats.length; i++) {
                    tempChatArray.push(<SingleChat chat={res.data.chats[i]} />);
                }
                setChatArray(tempChatArray);
            }).catch((err) => {
                console.log("Error is here", err);
            });
        axios.get("https://immense-beach-88770.herokuapp.com/farmers/plots")
            .then((res) => {
                const tempArray = [];
                for (let i = 0; i < res.data.length; i++) {
                    tempArray.push({
                        id: res.data[i].farmerID,
                        name: res.data[i].farmerName
                    });
                }
                setFarmersIdMapping(tempArray);
            })
            .catch((err) => {
                console.log("Error is here", err);
            });
    }, []);

    // to get farmers for its id
    function getNameForFarmers(farmerId) {
        const farmer = farmersIdMapping.find((mappingObject => mappingObject.id === farmerId));
        return farmer ? farmer.name : "";
    }
    //have to do styling.
    function getFarmersAndTags() {
        const arrayToReturn = [];
        if (broadcastData.tags.length > 0) {
            const tags = broadcastData.tags;
            for (let i = 0; i < tags.length; i++) {
                arrayToReturn.push(<li>{tags[i]}</li>);
            }
        } else if (broadcastData.farmers.length > 0) {
            const farmers = broadcastData.farmers;
            for (let i = 0; i < farmers.length; i++) {
                arrayToReturn.push(<li>{getNameForFarmers(farmers[i])}</li>);
            }
        }
        return (
            <ul>{arrayToReturn}</ul>
        )
    }

    return (
        <div className="viewArticleMain">
            <h1 style={{ textAlign: "center", margin: "10px", backgroundColor: "#bfdaf3" }}>Resource Base - View Article</h1>
            <div className="viewArticleFirst">
                <div className="viewArticleImage">
                    {broadcastData.format === "jpg" ? <img
                        src={
                            "https://lh3.googleusercontent.com/d/" +
                            broadcastData.driveId +
                            "=s220?authuser=0"
                        }
                        alt="img"
                        width="200px"
                        height="150px"
                    /> : broadcastData.format === "youtube" ? <iframe src="{broadcastData.link}" title="Yt linkk"></iframe>

                        : <img src="https://tse1.mm.bing.net/th?id=OIP.xhxeTXXWYt1PQ8jk11ytAwHaKA&pid=Api&P=0&w=300&h=300"
                            alt="img"
                            width="200px"
                            height="150px"
                        />}


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
                        {broadcastData.toAllFarmers ? <p style={{ display: "inline-block" }}>All Farmers</p> : getFarmersAndTags()}
                    </div>

                </div>
            </div>
            <div className="viewArticleSecond">
                <h2 style={{ margin: "20px" }}>Comments/Questions</h2>
                <div className="viewArticleSecondContent">
                    {chatArray}
                </div>
            </div>
        </div>
    )
}

export default ViewArticle;