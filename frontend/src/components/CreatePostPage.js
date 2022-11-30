import React from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';


const port = 8675;

function CreatePostPage (){

    function updatePostDB(post) { 
        makePostCall(post).then( result => {
        if (result && result.status === 404)
            console.log("Could Not Create Post. Try Again.");
        });
    }

    async function makePostCall(post) {
        try {
            const response = await axios.post(`http://localhost:${port}/post`, post);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    
    return (
        <CreatePost handleSubmit={updatePostDB}/>
    );

}

export default CreatePostPage;