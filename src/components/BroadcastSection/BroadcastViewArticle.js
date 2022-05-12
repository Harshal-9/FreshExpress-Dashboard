import React, { useState, useEffect } from "react";
import "./BroadcastViewArticle.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import Select from "react-select";
import dotenv from "dotenv";
dotenv.config();

// below two functions are to handle chat in broadcast section
function SingleChat(props) {
  const { broadcastId } = useParams();
  const [chat, setChat] = useState(props.chat);
  const [isAnswerEditable, setIsAnswerEditable] = useState(() =>
    props.chat.answer.length > 0 ? false : true
  );

  function handleAnswerPost(event) {
    event.preventDefault();
    chat.adminName = props.userId;
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/broadcasts/insertAnswer/" +
          broadcastId +
          "/" +
          chat._id,
        chat
      )
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
      {/* below is the code for displaying chat section */}
      <div className="commentsFirst">
        <div style={{ display: "inline-block", margin: "10px" }}>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.bO570BehVS89oAkbwqQucAHaIr&pid=Api&P=0&w=300&h=300"
            width="40px"
            alt=""
          />
        </div>
        <div style={{ display: "inline-block" }}>
          <label className="viewArticleSecondLabel" htmlFor="">
            Farmer Name :
          </label>
          <input type="text" disabled="true" value={chat.farmerName} />
          <br />
          <label className="viewArticleSecondLabel" htmlFor="">
            Question :
          </label>
          <input type="text" disabled="true" value={chat.question} />
        </div>
      </div>
      <div className="commentsSecond">
        <div style={{ display: "inline-block", margin: "1px" }}>
          <img
            src="https://www.liegeairport.com/flexport/wp/wp-content/uploads/sites/3/2017/01/fresh-express-logo.jpg"
            width="60px"
            alt=""
          />
        </div>
        <div style={{ display: "inline-block" }}>
          <label className="viewArticleSecondLabel" htmlFor="">
            Fresh Express :
          </label>
          {/* //ToDo: to add admin name here automatically. */}
          <input
            type="text"
            disabled="true"
            value={chat.adminName.length === 0 ? props.userId : chat.adminName}
          />
          <br />
          <label className="viewArticleSecondLabel" htmlFor="">
            Reply :
          </label>
          <input
            type="text"
            disabled={!isAnswerEditable}
            value={chat.answer}
            onChange={(event) => {
              const tempChat = { ...chat };
              tempChat.answer = event.target.value;
              setChat(tempChat);
            }}
          />
          {isAnswerEditable ? (
            <button onClick={handleAnswerPost}>Post</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ViewArticle({ loginData }) {
  //function to get farmer name from farmer ID
  function getNameForFarmers(farmerId) {
    const farmer = farmersIdMapping.find(
      (mappingObject) => mappingObject.id === farmerId
    );
    return farmer ? farmer.name : "";
  }
  const tempObject = {
    analytics: {
      numberOfRecipients: 0,
      numberOfUniqueViews: 0,
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
  };

  const { broadcastId } = useParams();
  const [farmersIdMapping, setFarmersIdMapping] = useState([]);
  const [broadcastData, setBroadcastData] = useState(tempObject);
  const [chatArray, setChatArray] = useState([]);
  const [sentTo, setSentTo] = useState([]);
  useEffect(() => {
    const tempArray = new Map();

    // getting farmerID to extract farmername
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/farmers/plots")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          tempArray.set(res.data[i].farmerID, res.data[i].farmerName);
        }
        setFarmersIdMapping(tempArray);
        //to get all broadcast data
        axios
          .get(process.env.REACT_APP_BACKEND_URL + "/broadcasts/" + broadcastId)
          .then((res1) => {
            //setting main data to usestate
            setBroadcastData(res1.data);
            let arrayToReturn = [];
            if (res1.data.tags.length > 0) {
              const tags = res1.data.tags;
              for (let i = 0; i < tags.length; i++) {
                arrayToReturn.push({
                  value: tags[i],
                  label: tags[i],
                });
              }
            } else if (res1.data.farmers.length > 0) {
              const farmers = res1.data.farmers;
              for (let i = 0; i < farmers.length; i++) {
                arrayToReturn.push({
                  value: tempArray.get(farmers[i]),
                  label: tempArray.get(farmers[i]),
                });
              }
            }
            //setting data of for whom article is sent to usestate
            setSentTo(arrayToReturn);
            const tempChatArray = [];
            for (let i = 0; i < res1.data.chats.length; i++) {
              tempChatArray.push(
                <SingleChat
                  chat={res1.data.chats[i]}
                  userId={loginData.userId}
                />
              );
            }
            //setting chat data to usestate
            setChatArray(tempChatArray);
          })

          .catch((err) => {
            console.log("Error is here", err);
          });
      })
      .catch((err) => {
        console.log("Error is here", err);
      });
  }, []);

  return (
    <div className="viewArticleMain">
      <h1
        style={{
          textAlign: "center",
          margin: "10px",
          backgroundColor: "#bfdaf3",
        }}
      >
        Resource Base - View Article
      </h1>
      <div className="viewArticleFirst">
        <div className="viewArticleImage">
          {/* setting data by checking whether it is image,youtube video or pdf */}
          {broadcastData.format === "jpg" ? (
            <img
              src={
                "https://lh3.googleusercontent.com/d/" +
                broadcastData.driveId +
                "=s220?authuser=0"
              }
              alt="img"
              width="500px"
              height="300px"
            />
          ) : broadcastData.format === "youtube" ? (
            <ReactPlayer
              width="500px"
              height="300px"
              url={broadcastData.link}
            />
          ) : (
            <iframe
              src={
                "https://drive.google.com/file/d/" +
                broadcastData.driveId +
                "/preview"
              }
              width="500"
              height="300"
              //   allow="autoplay"
              title="PDF"
            ></iframe>
          )}
        </div>
        <hr />
        <div className="viewArticleFirstContent">
          {/* displaying broadcast topic */}
          <h4 style={{ display: "inline-block" }}>Topic :&nbsp;</h4>
          <p
            style={{
              display: "inline-block",
              overflowWrap: "break-word",
              width: "75%",
            }}
          >
            {broadcastData.topic}
          </p>
          <br />
          <br />
          {/* displaying broadcast category */}
          <h4 style={{ display: "inline-block" }}>Category :&nbsp;</h4>
          <p
            style={{
              display: "inline-block",
              overflowWrap: "break-word",
              width: "75%",
            }}
          >
            {broadcastData.category}
          </p>
          <br />
          <br />
          {/* displaying broadcast date */}
          <h4 style={{ display: "inline-block" }}>Date :&nbsp;</h4>
          <p style={{ display: "inline-block" }}>
            {new Date(broadcastData.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <br />
          <br />
          <h4 style={{ marginBottom: "5px" }}>Description : &nbsp;</h4>
          <p
            style={{
              display: "inline-block",
              overflowWrap: "break-word",
              width: "75%",
            }}
          >
            {broadcastData.description}
            <br />
            <br />
          </p>
          <br />
          <hr />
          <br />
          <br />
          {/* <p>
            <ul style={{ marginLeft: "20px" }}>
              <li>
                Total number of recipients :{" "}
                {broadcastData.analytics.numberOfRecipients}
              </li>
              <li>
                Number of unique views :{" "}
                {broadcastData.analytics.numberOfUniqueViews}
              </li>
            </ul>
          </p> */}
          <br />
          <hr />
          <div>
            <br />
            {/* Displaying data : to whom article is sent */}
            <h4>Sent To :&nbsp;</h4>
            <br />
            <br />
            <div className="ScrollSentTo">
              {broadcastData.toAllFarmers ? (
                <p style={{ display: "inline-block" }}>All Farmers</p>
              ) : (
                <>
                  {/* {GetFarmersAndTags()} */}
                  <Select options={sentTo} placeholder="Sent To :" />
                </>
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="viewArticleSecond">
        <h2 style={{ margin: "20px" }}>Comments/Questions</h2>
        <div className="viewArticleSecondContent">{chatArray}</div>
      </div>
    </div>
  );
}

export default ViewArticle;
