import React from 'react';
//import axios from 'axios'; 
import CreatePost from './CreatePost';


//const port = 8675;

function CreatePostPage (){

    // function updateList(person) { 
    //     makeGetCall(person).then( result => {
    //         console.log(result.status);
    //     if (result && result.status === 404)
    //     console.log("Login Failed");
    //     });
    // }

    // async function makeGetCall(person){
    //     try {
    //     const response = await axios.get(`http://localhost:${port}/users`, person);
    //     console.log(person)
    //     return response;
    //     }
    //     catch (error) {
    //     console.log(error);
    //     return false;
    //     }
    // }
    
    return (
        <CreatePost/>
    );

}

export default CreatePostPage;