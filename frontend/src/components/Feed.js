//import axios from 'axios'; 
import React from 'react';
import "../css/Feed.css";

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
                <div className='button-container'></div>
            </div>
        </div>
        
    );
}

export default Feed;