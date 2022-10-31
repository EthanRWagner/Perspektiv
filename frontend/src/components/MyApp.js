//import Register from "./Register";
import axios from 'axios'; 
import React, {useState, useEffect} from 'react';
import logo from "../img/Perspektiv.gif"
import "../css/App.css";

const port = 8675;

function MyApp() {
  const [setCharacters] = useState([]);

//   function removeOneCharacter (index) {
//     makeDeleteCall(characters.at(index)._id).then( result => {
//       if(result && result.status === 200){
//         const updated = characters.filter((character, i) => {
//           return i !== index
//         });
//         setCharacters(updated);
//       }
//     });
//   }

//   function updateList(person) { 
//     makePostCall(person).then( result => {
//     if (result && result.status === 201)
//        setCharacters([...characters, result.data] );
//     });
//  }

  async function fetchAll(){
    try {
       const response = await axios.get(`http://localhost:${port}/users`);
       return response.data.users_list;
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

  // async function makePostCall(person){
  //   try {
  //     const response = await axios.post(`http://localhost:${port}/users`, person);
  //     return response;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function makeDeleteCall(id){
  //   try {
  //     const response = await axios.delete(`http://localhost:${port}/users/` + id);
  //     return response;
  //   }
  //   catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, [] );

  return (
    <div className="black-out">
      <img src={logo} className="logo-center"/>
    </div>
  )
}

export default MyApp;

