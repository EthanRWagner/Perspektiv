import React, {useState} from 'react';
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Chips from "react-chips";
import "../css/CreatePost.css";

const required = value => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">
            This field is required.
        </div>);
    }
};

function CreatePost (props) {
    const [post, setPost] = useState({
        url: "",
        caption: "", 
        HPList: [],  
        comments: [],
    });

    //gets rid of an eslint error
    CreatePost.propTypes = {
        handleSubmit: PropTypes.any.isRequired
    }

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "url") setPost({
            url: value,
            caption: post['caption'],
        }); else if (name === "caption") setPost({
            url: post['url'],
            caption: value,
        });
    }

    const hpHolder = chip => {
        setPost({url: post['url'], caption: post['caption'], HPList: chip});
    }

    function postForm() {
        if ((post['url'].length >= 1) && (post['caption'].length >= 1) && (post['HPList'].length >=1)) {
            props.handleSubmit(post);
            setPost({url: '', caption: '', HPList: []});
        } else {
            throw "Missing required fields for post: Recreate post."
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUrl = (url) => {
    return () => openInNewTab(url)
    }

    return (
        <div className='create-post-frame'>
            <h4 className='box-headings'>Create A Post</h4>
            <Form>
                <div className="form-group">
                    <label htmlFor="CAPTION" className='box-headings'>CAPTION</label>
                    <Input
                        placeholder="Write a caption..."
                        type="text"
                        name="caption"
                        id="caption"
                        value={post.caption}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="HODGEPODGE COLLABORATION" className='box-headings'>HODGEPODGE COLLABORATION</label>
                    <Chips
                        placeholder="Type or paste hodgepodges and press `Enter`..."
                        type="text"
                        name="HPList"
                        id="HPList"
                        value={post.HPList}
                        onChange={hpHolder}
                        uniqueChips={true}
                        createChipKeys={[13]}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="POST" className='box-headings'>POST</label>
                    <button className='post-button' onClick={onClickUrl("https://app.diagrams.net/")}>Create Post Here</button>
                    <Input
                        placeholder="Paste the URL here..."
                        type="text"
                        name="url"
                        id="url"
                        value={post.url}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className='button-box'>
                    <button className='post-button' onClick={() => setPost({url: '', email: '', caption: '', HPList: {}})}>DISCARD</button>
                    <button className='post-button' onClick={() => postForm}>POST</button>
                </div>
            </Form>
        </div>
    );

}

export default CreatePost;