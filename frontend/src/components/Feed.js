import axios from 'axios'; 
import React from 'react';
import logo from "../img/Perspektiv.gif";
import Comment from "../components/Comment";
import Popup from './HPPopUp';
import "../css/Feed.css";

// backend port
const port = 8675;

class Feed extends React.Component {

    // had to make this component a class to try to fix refreshing issues
    constructor(){
        super();
    }

    // state definition for the feed page
    // each of the elements is also a state that is refactored into one state object
    state = {
        user: {},
        index: 0,
        userFeed: [{
                    "url":logo,
                    "caption":"Press the REFRESH button",
                    "hpList":["<<default>>"],
                    "comments":[],
                    "date":"Loading..."}],
        isOpen: false
    }

    // function to obtains new feed posts on refresh based on what HPs the
    // user belongs to
    getFeed = async () => {
        try{
            const posts = await axios.get(`http://localhost:${port}/post`);
            const result = posts.data.post_list;
            var tempFeed = [];
            var lookFor = this.state.user.hpList;
            if (!this.state.user.hpList || (this.state.user.hpList.length === 0))
                lookFor = ["<<default>>"];
            for (var i=0; i<result.length; i++){
                const postHPs = result[i]['hpList'];
                for(var j=0; j<postHPs.length; j++){
                    if(lookFor.includes(postHPs[j]))
                        tempFeed.push(result[i]);
                }
            }
            await this.setState({ userFeed: tempFeed });
        }
        catch(er){
            console.log(er); 
        }
    }

    // function to obtains default feed posts
    getDefFeed = async () => {
        try{
            const posts = await axios.get(`http://localhost:${port}/post`);
            const result = posts.data.post_list;
            var tempFeed = [];
            var lookFor = ["<<default>>"];
            for (var i=0; i<result.length; i++){
                const postHPs = result[i]['hpList'];
                for(var j=0; j<postHPs.length; j++){
                    if(lookFor.includes(postHPs[j]))
                        tempFeed.push(result[i]);
                }
            }
            await this.setState({ userFeed: tempFeed });
        }
        catch(er){
            console.log(er); 
        }
    }

    // gets user information to be able to display user information and to get
    // customized feed, also used to assign ownership of comments
    getUser =  async () => {
        var id = window.sessionStorage.getItem("id");
        try {
            var response = await axios.get(`http://localhost:${port}/users/${id}`)
            this.setState({ user: response.data.user });
        }
        catch(er) {
            console.log(er);
        }
    }

    // useful function to state updating state once the feed component
    // is mounted (rendered)
    async componentDidMount() {
        window.addEventListener('load', async () => {
            await this.getFeed();
        });
        await this.getUser().then(await this.getFeed());
    }

    // Comment example:
    // {
    //     username: "@ewagne02",
    //     comment: "That was easy!"
    // }

    // makes a call to a function that makes post call to submit comment
    submitComment = (comment) => { 
        this.makeCommentCall(comment).then( result => {
        if (result && result.status === 404)
            console.log("Error posting comment. Try Again.");
        });
    }

    // helper function that posts comments
    makeCommentCall = async (comment) => {
        try {
            const response = await axios.post(`http://localhost:${port}/comment`, 
                {
                    url: this.state.userFeed[this.state.index].url,
                    username: this.state.user.username,
                    comment: comment
                });
            return response
        }
        catch (error) {
        console.log(error);
        return false;
        }
    }

    //post example
    // {
    //     url:...,
    //     caption:...,
    //     hpList:...,
    //     comments:....,
    //     date:...
    // }

    // when the down button is pressed on feed the post index is incremented
    incrementIndex = () => {
        if(this.state.index + 1 < this.state.userFeed.length){
            this.setState({index: this.state.index + 1})
        }
        else {
            this.setState({index: 0})
        }
    };

    // when the up button is pressed on feed the post index is decremented
    decrementIndex = () => {
        if(this.state.index - 1 >= 0){
            this.setState({index: this.state.index - 1})
        }
        else {
            this.setState({index: this.state.userFeed.length-1})
        }
    };

    // creates HTML elements to enumerate the hodgepodges in the users list
    hodgePodgeEnum = () => {
      
        const hodges = [];
        for (let i = 0; i < this.state.userFeed[this.state.index].hpList.length; i++) {
            if (i === this.state.userFeed[this.state.index].hpList.length-1){
                hodges.push(
                    <small key={this.state.userFeed[this.state.index].hpList[i]}
                           className="descr">
                            {this.state.userFeed[this.state.index].hpList[i]}
                    </small>);
            }
            else {
                hodges.push(<small key={this.state.userFeed[this.state.index].hpList[i]} 
                                   className="descr">
                                    {this.state.userFeed[this.state.index].hpList[i]}
                            </small>);
                hodges.push(<small key={i} 
                                   className="descr">
                                    ,&nbsp;
                            </small>);
            }
        }

        return hodges;
    };

    // when you click on the a username on a comment, it navigates to user profile
    navigateToUserPage = (userName) => {
        var url = "";
        if (userName === this.state.user.username)
            url = "http://localhost:3000/profile";
        else
            url = "http://localhost:3000/profile?username=" + userName;
        const newWindow = window.open(url, '_self', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    // function caller to make the function call in the properties of HTML elements
    onClickUser = (userName) => {
        return () => this.navigateToUserPage(userName)
    }

    // creates HTML elements to enumerate the comments in the users list
    commentEnum = () => {
        const commList = [];
        for (let i = 0; i < this.state.userFeed[this.state.index].comments.length; i++) {
          commList.push(
          <div className='comment-box'>
            <small key={this.state.userFeed[this.state.index].comments[i].username} 
                   className="descr" 
                   onClick={this.onClickUser(this.state.userFeed[this.state.index].comments[i].username)}>
                    @{this.state.userFeed[this.state.index].comments[i].username}
            </small>
            <br/>
            <small key={this.state.userFeed[this.state.index].comments[i].comment} 
                   className="descr">
                    {this.state.userFeed[this.state.index].comments[i].comment}
            </small>
          </div>);
        }

        return commList;
    };
    
    // toggles a status to open the HP pop up window
    togglePopup = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    // a cleaner designed UI would be nice
    // need to debug feed refreshing issues
    render() {
        return(
        <div>
            <div className='subheader-cont'>
                <div className='lbutton-div'>
                    <button className='refresh-button' onClick={this.getFeed}>REFRESH</button>
                    <button className='def-button' onClick={this.getDefFeed}>Default Feed</button>
                </div>
                <b className='feed-heading'>Recent Feed for {this.state.user.fullName}</b>
                <div className='rbutton-div'>
                    <button className='create-post-button' onClick={() => window.open("./createPost", "_self")}>+ NEW POST</button>
                    <button className='create-HP-button' onClick={() => this.togglePopup()}>+ HodgePodge</button>
                </div>
                
            </div>
            <div className='post-section-container'>
                <div className='post-container'>
                    <iframe className='content-style' src={this.state.userFeed[this.state.index].url}>
                    </iframe>
                </div>
                <div className='descr-container'>
                    <small className="descr">{this.state.userFeed[this.state.index].date} </small>
                    <br/>
                    {this.hodgePodgeEnum()}
                    <br/>
                    <br/>
                    <small className="descr">{this.state.userFeed[this.state.index].caption}</small>
                </div>
                <div className='comment-container'>
                    <b className="descr">COMMENTS</b>
                    <br/>
                    <div className='actual-comment-container'>
                        {this.commentEnum()}
                    </div>
                    <Comment userName={this.state.user.username} handleSubmit={this.submitComment}/>
                </div>
                
                <div className='button-container'>
                    <button onClick={this.decrementIndex} className='scroll-button-top'>
                        <div className='tri-top'></div>
                    </button>
                    <button onClick={this.incrementIndex} className='scroll-button-bottom'>
                        <div className='tri-bottom'></div>
                    </button>
                </div>
            </div>
            {this.state.isOpen && <Popup
                handleClose={this.togglePopup}
                currUser={this.state.user}
                />}
        </div>
        );
    }
}

export default Feed;