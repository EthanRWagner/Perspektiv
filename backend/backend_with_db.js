const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const Hodgepodge = require("./models/hodgepodge")
const bcrypt = require('bcrypt');
// Add mongdb user services
const userServices = require("./models/user-services");
const postServices = require("./models/post-services");
const hodgepodgeServices = require("./models/hodgepodge-services");
const { findOne } = require("./models/user");
const Post = require("./models/post");
const { findPostByPostBody } = require("./models/post-services");

const app = express();
const port = 8675;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const username = req.query["username"];
  if (username) {
    let result = await userServices.findUserByUsername(username);
    result = { users_list: result };
    res.send(result);
  } else {
    console.log("Mongoose error: " + error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/search", async (req, res) => {
  const username = req.query["username"];
  const hp = req.query["hp"];
  if (username) {
    let result = await userServices.findSimilarUsername(username);
    console.log(result)
    if (result === undefined || result === null) {
      res.status(404).send("Resource not found.");
    } else {
      result = { user_list: result };
      res.send(result);
    }
  }
  else if (hp) {
    let result = await hodgepodgeServices.findSimilarHodgepodgeName(hp);
    console.log(result)
    if (result === undefined || result === null) {
      res.status(404).send("Resource not found.");
    } else {
      result = { hp_list: result };
      res.send(result);
    }
  }
  else {
    res.status(500).send("Invalid request");
  }
});

function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) { return true; }
  
  return false;
}


app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await userServices.findUserById(id);
  console.log(result)
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { user: result };
    res.send(result);
  }
});

app.get("/findUser/:username", async (req, res) => {
  const username = req.params["username"];
  let result = await userServices.findUserByUserName(username);
  console.log(result)
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { user: result };
    res.send(result);
  }
});



app.patch("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const updatedUser = req.body;
  const result = await updateUser(id, updatedUser);
  if (result === 204) res.status(204).end();
  else if (result === 404) res.status(404).send("Resource not found.");
  else if (result === 500) {
    res.status(500).send("An error ocurred in the server.");
  }
});



// create a new user
app.post("/signup", async (req, res) =>{
    const { fullName, email, username, password, confPassword } = req.body;

    // Validate user input
    if (!(email && password && username && fullName && confPassword)) {
      res.status(400).send("All input is required");
    }

    const existedUserWithEmail = await userServices.findUserByEmail(email);
    const existedUserWithUsername = await userServices.findUserByUserName(username);
    if (existedUserWithEmail.length > 0 || existedUserWithUsername.length > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    else if(password != confPassword){
      return res.status(404).send("Password and confirm password mismatch");
    }
    
    else if(!isEmail(email)){
      return res.status(404).send("Not an email");
    }
    //Encrypt user password
    else{
      encryptedUserPassword = await bcrypt.hash(password, 10);
      encryptedConfPassword = encryptedUserPassword;
    // Create user in our database
      const user = await User.create({
        fullName: fullName,
        username: username,
        email: email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
        confPassword : encryptedConfPassword,
      });
      if(user){
        return res.status(201).json({message: "Added new user", user});
      }
    }
 });
// get the HP and allow user to join if the hodgepodge is available
app.post("/joinHP", async(req, res) => {
  const {username, hp} = req.body;
  if(!username){
    return res.status(404).send("Need username");
  }
  if(!hp){
    return res.status(404).send("Need hodgepode");
  }
  const hpObject = await hodgepodgeServices.findHodgepodgeByName(hp);
  if(hpObject){
    const joinHP = await userServices.joinHP(username, hp);
    if(joinHP){
      return res.status(202).send("Joined hodgepodge");
    }
  }
  return res.status(404).send("Unable to join hodgepodge");
});
// allow user to signin with the correct username and password
app.post("/signin", async(req, res) => {
  const {username, password} = req.body;
  if(!username) {
    return res.status(404).send("Need username");
  }
  if(!password) {
    return res.status(404).send("Need password");
  }
  const tempUser = await userServices.findUserByUserName(username);
  console.log(tempUser);
  if(tempUser.length > 0){
    let result = bcrypt.compareSync(password, tempUser[0].password);
    if(result){
      return res.status(202).send(tempUser);
    }
    return res.status(404).send("Username and password do not match");
  }
  return res.status(404).send("User not found");
});
// allow user to create a post
app.post("/post", async(req, res) =>{
  try{
    const{url, caption, hpList} = req.body;

    if(!(url && hpList && caption)){
      return res.status(400).send("All fields are required");
    }
    const post = await Post.create({
      url: url,
      caption: caption,
      hpList: hpList,
    });
    if(post){
      return res.status(201).send("Post Created");
    }
    return res.status(400).send("Unable to create post");
  }
  catch(err){
    console.log(err);
  }
  for (var i = 0; i < hpList.length; i++){
        const hp = await hodgepodgeServices.findHodgepodgeByName(hpList[i]);
        if(hp.length > 0){
          arr.push(hp[0]);
        }
      }
  if(arr.length > 0){
        const post = await Post.create({
          caption: caption,
          hpList: arr,
          url: url
        });
        if(post){
          return res.status(201).send("Post Created");
        }
      }
  return res.status(400).send("Unable to create post");
});
// get all the post from the database
app.get("/post", async (req, res) => {
  try {
    const postss_from_db = await postServices.getPosts();
    res.send({ post_list: postss_from_db });
  } catch (error) {
    console.log("Mongoose error: " + error);
    res.status(500).send("An error ocurred in the server.");
  }
});
// add HP to the hpList of current post
app.post("/addHP", async(req, res) =>{
    const{url, hp} = req.body;
    if(!(url && hp)){
      return res.status(400).send("All fields are required");
    }
    const updateHPList = await postServices.updateHP(url, hp);
    if(updateHPList){
      return res.status(202).send("Post Edited");
    }
    return res.status(404).send("Unable to edit post");
});
// add comment to the post
app.post("/comment", async(req, res) =>{
  const{url, username ,comment} = req.body;
  if(!(url && username && comment)){
    return res.status(400).send("All field require");
  }
  const comm = await postServices.addComment(url, username ,comment);
  if(comm){
    return res.status(201).send("Comment added");
  }
  return res.status(404).send("Unable to edit post");
});

// get the name of HP and create if the name is available 
app.post("/createHP", async(req, res) =>{
  const {name} = req.body;
  if(!name){
    return res.status(400).send("All field require");
  }
  else if(name === "<<default>>") {
    res.status(400).send("Invalid Hodgepodge name");
  }
  console.log(name);

  const prevHP = await hodgepodgeServices.findHodgepodgeByName(name);
  if(prevHP.length > 0){
    return res.status(400).send("Hodgepodge name was taken");
  }
  const hp = await Hodgepodge.create({
    name: name
  });
  if(hp){
    return res.status(201).send("Hodgepodge created");
  }
  return res.status(404).send("Hodgepodge name is not available");
});

app.patch("/editProfile", async(req, res) =>{
  const{username, newUsername, newEmail, newPassword, newConfPassword} = req.body;
  console.log(newEmail);
  if(newUsername && username !== newUsername){
    const checkUser = await userServices.findUserByUserName(newUsername);
    if(checkUser.length > 0){
      return res.status(406).send("Username existed");
    }
    const returnVal = await userServices.changeUsername(username, newUsername);
    if(!returnVal){
      return res.status(404).send("Unable to edit username");
    }
  }
  if(newEmail){
    const checkUser = await userServices.findUserByEmail(newEmail);
    if(checkUser.length > 0){
      return res.status(406).send("Email existed");
    }
    const returnVal = await userServices.changeEmail(username, newEmail);
    if(!returnVal){
      return res.status(404).send("Unable to edit username");
    }
  }
  if(newPassword && newConfPassword){
    if(newPassword != newConfPassword){
      return res.status(404).send("Password and confirm password mismatch");
    }
    const encryptedUserPassword = await bcrypt.hash(newPassword, 10);
    const returnVal = await userServices.changePassword(username, encryptedUserPassword);
    if(!returnVal){
      return res.status(404).send("Unable to change password");
    }
  }
  return res.status(202).send("User info edited");
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});


