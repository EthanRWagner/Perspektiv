import React, {useState} from 'react';
import PropTypes from "prop-types";
import "../css/Comment.css";

function Comment (props) {
    
    // text state for comment input field 
    const [comment, setComment] = useState("");

    // gets rid of eslint errors when passing in props
    Comment.propTypes = {
        handleSubmit: PropTypes.any.isRequired
    }

    // updates the comment text state
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "comment") setComment(value);
    }

    // submits the comment to be posted on the given post
    // refreshes page so that the comment shows up on the post
    function postComment() {
        if (comment.length >= 1) {
            props.handleSubmit(comment);
            setComment("");
            window.location.reload(false);
        } else {
            throw "Error processing comment. Try Again."
        }
    }

    return (
        <div className='comment-form-container'>
            <b className='username'>@{props.userName}</b>
            <br/>
            <p>
                <textarea
                    placeholder="Comment here..."
                    type="text"
                    name="comment"
                    id="comment"
                    value={comment}
                    onChange={handleChange}>
                </textarea>
            </p>
            
            <button className='submit-comment-button' onClick={postComment}>SUBMIT</button>
        </div>
    );
}

export default Comment;