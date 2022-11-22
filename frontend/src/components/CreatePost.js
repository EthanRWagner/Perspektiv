import React, {useState} from 'react';
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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

    const [state, setState] = useState({
        items: [],
        value: "",
        error: null
    });

    function handleKeyDown(evt) {
        if (["Enter", "Tab", ","].includes(evt.key)) {
          evt.preventDefault();
    
          var value = state.value.trim();
          if (value && isValid(value)) {
            if (!state.items) {
                setState({
                    items: [state.value],
                    value: ""
                  });
            }
            else {
                setState({
                    items: [...(state.items), state.value],
                    value: ""
                  });
            }
          }
        }
      }

    function handleDelete(item) {
        setState({
            items: state.items.filter(i => i !== item)
        });
    }

    function handlePaste(evt) {
        evt.preventDefault();

        var paste = evt.clipboardData.getData("text");
        var hps = paste.match(/[\w\d\W]+/g);

        if (hps) {
            var toBeAdded = hps.filter(hp => !isInList(hp));

            setState({
            items: [...state.items, ...toBeAdded]
            });
        }
    }

    function isValid(hp) {
        let error = null;

        if (isInList(hp)) {
            error = `${hp} has already been added.`;
        }

        // if (!this.isHP(hp)) {
        //   error = `${hp} is not a valid hodgepodge.`;
        // }

        if (error) {
            setState({ error });

            return false;
        }

        return true;
    }

    function isInList(hp) {
    return (state.items)?.includes(hp);
    }

//   isHP(hp) {
//     return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
//   }

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
        }); else if (name === "hpList") setState({
            items: state['items'],
            value: event.target.value,
            error: null
        });
    }

    function postForm() {
        if ((post['url'].length >= 1) && (post['caption'].length >= 1) && (state['items'].length >=1)) {
            props.handleSubmit({url: post['url'], caption: post['caption'], hpList: state['items']});
            setPost({url: '', caption: ''});
            setState({
                items: [],
                value: "",
                error: null});
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
                    <>
                        {(state.items)?.map(item => (
                        <div className="tag-item" key={item}>
                            {item}
                            <button
                                type="button"
                                className="button"
                                onClick={() => handleDelete(item)}
                                >
                                &times;
                            </button>
                        </div>
                        ))}

                        <Input
                            name="hpList"
                            id="hpList"
                            className={"input " + (state.error && " has-error")}
                            value={state.value}
                            placeholder="Type or paste hodgepodges and press `Enter`..."
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            onPaste={handlePaste}
                        />

                        {state.error && <p className="error">{state.error}</p>}
                    </>
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
                    <button className='post-button' onClick={() => setPost({url: '', caption: '', HPList: []})}>DISCARD</button>
                    <button className='post-button' onClick={postForm}>POST</button>
                </div>
            </Form>
        </div>
    );

}

export default CreatePost;