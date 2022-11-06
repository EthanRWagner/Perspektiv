import React from 'react';
import "../css/CreatePost.css";

function CreatePost (){
    return (
        <div className='create-post-frame'>
            <h4 className='box-headings'>Create A Post</h4>
            <div  className='caption-box'>
                <t className='box-headings'>Write a caption</t>
                <div id="editable" contentEditable="true" className='caption-edit'></div>
            </div>

            <div className='sharing-box'>
                <t className='box-headings'>Who can collaborate on this post?</t>
                <div id="editable" contentEditable="true" className='sharing-edit'></div>
            </div>

            <div className='iframe-box'>
                <iframe src="https://viewer.diagrams.net/?tags=%7B%7D&highlight=000000&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G14J62bJ-mwPuvyI3UK9FMqsZkeiWTJrnE&layers=1&nav=1&title=Feed%20Sample%201#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D14J62bJ-mwPuvyI3UK9FMqsZkeiWTJrnE%26export%3Ddownload">
                </iframe>
            </div>

            <div className='button-box'>
                <button className='post-button'>DISCARD</button>
                <button className='post-button'>POST</button>
            </div>
        </div>
    );

}

export default CreatePost;