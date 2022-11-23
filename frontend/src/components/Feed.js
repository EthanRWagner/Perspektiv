import axios from 'axios'; 
import React, {useState, useRef} from 'react';
import "../css/Feed.css";
// import styled from "styled-components";

const port = 8675;

function Feed() {
    const getUser =  async () => {
        var id = window.sessionStorage.getItem("id");
        try {
            var response = await axios.get(`http://localhost:${port}/users/${id}`)
            setUser(response.data.user);
        }
        catch(er) {
            console.log(er);
        }
    }

    const [user, setUser] = useState({});
    const [index, setIndex] = useState(0);
    const [userFeed, setFeed] = useState([{
                "_id":{"$oid":"637d99d5f2f54ff1e66f797c"},
                "url":"https://viewer.diagrams.net/?tags=%7B%7D&highlight=000000&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1koA2qI5hvjCAWdWbL-Z-3J_-QRl-44ov&layers=1&nav=1&title=Copy%20of%20ClassDiagramExercise.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1koA2qI5hvjCAWdWbL-Z-3J_-QRl-44ov%26export%3Ddownload",
                "caption":"Today we learned about class diagrams. Comment the translation of this class diagram. Add further abstractions or additons to this class diagram!",
                "hpList":["<<default>>"],
                "comments":[],
                "date":"21 November 2022",
                "__v":{"$numberInt":"0"}}])
    const initializedRef = useRef(false);
    
    if (!initializedRef.current) {
      initializedRef.current = true;
      getUser();
    }

    window.addEventListener('load', () => {
        getFeed();
    });

    //post example
    // {
    //     url:...,
    //     caption:...,
    //     hpList:...,
    //     comments:....,
    //     date:...
    // }

    async function getFeed() {
        try{
            const posts = await axios.get(`http://localhost:${port}/post`);
            const result = posts.data.post_list;
            var tempFeed = [];
            var lookFor = user.hpList;
            if (!user.hpList || user.hpList.length === 0)
                lookFor = ["<<default>>"];
            for (var i=0; i<result.length; i++){
                const postHPs = result[i]['hpList'];
                for(var j=0; j<postHPs.length; j++){
                    if(lookFor.includes(postHPs[j]))
                        tempFeed.push(result[i]);
                }
            }
            setFeed(tempFeed);
        }
        catch(er){
            console.log(er); 
        }
        
    }

    let incrementIndex = () => setIndex(index + 1);
    let decrementIndex = () => setIndex(index - 1);
    if(index<=0) {
        decrementIndex = () => setIndex(0);
    }

    if(index === userFeed.length-1) {
        incrementIndex = () => setIndex(0);
    }

    const hodgePodgeEnum = () => {
      
        const hodges = [];
        for (let i = 0; i < userFeed[index].hpList.length; i++) {
            if (i === userFeed[index].hpList.length-1){
                hodges.push(
                    <small key={userFeed[index].hpList[i]}className="descr">{userFeed[index].hpList[i]}</small>);
            }
            else {
                hodges.push(<small key={userFeed[index].hpList[i]} className="descr">{userFeed[index].hpList[i]}</small>);
                hodges.push(<small key={i} className="descr">,&nbsp;</small>);
            }
        }

        return hodges;
      };

    const commentEnum = () => {
      
        const commList = [];
        for (let i = 0; i < userFeed[index].comments.length; i++) {
          commList.push(
          <div className='comment-box'>
            <small key={userFeed[index].comments[i].user} className="descr">{userFeed[index].comments[i].user}</small>
            <br/>
            <small key={userFeed[index].comments[i].comment} className="descr">{userFeed[index].comments[i].comment}</small>
          </div>);
        }

        return commList;
    };

    return (
        <div>
            <div className='subheader-cont'>
                <button className='refresh-button' onClick={getFeed}>REFRESH</button>
                <b className='feed-heading'>Recent Feed for {user.fullName}</b>
            </div>
            <div className='post-section-container'>
                <div className='post-container'>
                    <iframe src={userFeed[index].url}>
                    </iframe>
                </div>
                <div className='descr-container'>
                    <small className="descr">{userFeed[index].date} </small>
                    <br/>
                    {hodgePodgeEnum()}
                    <br/>
                    <br/>
                    <small className="descr">{userFeed[index].caption}</small>
                </div>
                <div className='comment-container'>
                    <small className="descr">Comments</small>
                    <br/>
                    {commentEnum()}
                </div>
                <div className='button-container'>
                    <button onClick={decrementIndex} className='scroll-button-top'>
                        <div className='tri-top'></div>
                    </button>
                    <button onClick={incrementIndex} className='scroll-button-bottom'>
                        <div className='tri-bottom'></div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Feed;