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
                <h1>Recent Feed</h1>
            </div>
            <div className='post-section-container'>
                <div className='post-container'>
                    <t>Post Container</t>
                </div>
                <div className='descr-container'>
                    <t>Post Description</t>
                </div>
                <div className='comment-container'>
                    <t>Comments</t>
                </div>
                <div className='button-container'>
                    <button className='scroll-button-top'>
                        <div className='tri-top'></div>
                    </button>
                    <button className='scroll-button-bottom'>
                        <div className='tri-bottom'></div>
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default Feed;