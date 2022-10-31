//import axios from 'axios'; 
import React from 'react';
import "../css/Feed.css";
// import styled from "styled-components";

// const ScrollButton = styled.button`
//     border-radius: 50%;
//     color: white;
// `

function Feed (){
    return (
        <div>
            <div className='subheader-cont'>
                <h3>Recent Feed</h3>
            </div>
            <div className='post-section-container'>
                <div className='post-container'>
                    <h1>Post Container</h1>
                </div>
                <div className='descr-container'>
                    <h1>Post Description</h1>
                </div>
                <div className='comment-container'>
                    <h1>Comments</h1>
                </div>
                <div className='button-container'>
                    <button className='scroll-button-top'>↑</button>
                    <button className='scroll-button-bottom'>↓</button>
                </div>
            </div>
        </div>
        
    );
}

export default Feed;