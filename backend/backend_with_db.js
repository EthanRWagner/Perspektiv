const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const Post = require("./models/post");
const Hodgepodge = require("./models/hodgepodge");
const bcrypt = require('bcrypt');
// Add mongdb user services
const userServices = require("./models/user-services");
const postServices = require("./models/post-services");
const hodgepodgeService = require("./models/hodgepodge-services");



const app = express();
const port = 8675;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const fullName = req.query["fullName"];
  const email = req.query["email"];
  const username = req.query["username"];
  const password = req.query["password"];
  if (username === undefined && email === undefined) {
    try {
      const users_from_db = await userServices.getUsers();
      res.send({ users_list: users_from_db });
    } catch (error) {
      console.log("Mongoose error: " + error);
      res.status(500).send("An error ocurred in the server.");
    }
  } else if (username && email === undefined) {
    let result = await userServices.findUserByUserName(username);
    result = { users_list: result };
    res.send(result);
  } else if (email && username === undefined) {
    let result = await userServices.findUserByEmail(email);
    result = { users_list: result };
    res.send(result);
  } else {
    let result = await userServices.findUserByUserNameAndEmail(username, email);
    result = { users_list: result };
    res.send(result);
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

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  if (deleteUserById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deleteUserById(id) {
  try {
    if (await userServices.deleteUser(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.post("/users", async (req, res) => {
  const user = req.body;
  if (await userServices.addUser(user)) res.status(201).end();
  else res.status(500).end();
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
})

async function updateUser(id, updatedUser) {
  try {
    const result = await userModel.findByIdAndUpdate(id, updatedUser);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
};


app.post("/signup", async (req, res) =>{

  try {
    const { fullName, email, username, password, confPassword } = req.body;

    // Validate user input
    if (!(email && password && username && fullName && confPassword)) {
      res.status(400).send("All input is required");
    }

    const existedUserWithEmail = await User.findOne({ email });
    const existedUserWithUsername = await User.findOne({ username });
    if (existedUserWithEmail || existedUserWithUsername) {
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
  }
catch (err) {
  console.log(err);
}});

app.post("/joinHP", async(req, res) => {
  const {username, hp} = req.body;
  if(!username){
    return res.status(404).send("Need username");
  }
  if(!hp){
    return res.status(404).send("Need hodgepode");
  }
  const hpObject = await hodgepodgeService.findHodgepodgeByName(hp);
  if(hpObject){
    const joinHP = await userServices.joinHP(username, hp);
    if(joinHP){
      return res.status(202).send("Joined hodgepode");
    }
  }
  return res.status(404).send("Unable to join hodgepodge");
});

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

app.post("/post", async(req, res) =>{

  let arr = new Array();
  const{url, hpList, caption} = req.body;
  if(!(url && hpList && caption)){
    return res.status(400).send("All fields are required");
  }
  for (var i = 0; i < hpList.length; i++){
    const hp = await hodgepodgeService.findHodgepodgeByName(hpList[i]);
    if(hp.length > 0){
      arr.push(hp[0]);
    }
    console.log(arr);
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

app.post("/addHP", async(req, res) =>{
  const{url, hp} = req.body;
  if(!(url && hp)){
    return res.status(400).send("All fields are required");
  }
  const hpObject = await hodgepodgeService.findHodgepodgeByName(hp);
  if(hpObject.length > 0){
    const updateHPList = await postServices.updateHP(url, hpObject);
    if(updateHPList){
      return res.status(202).send("Post Edited");
    }
  }
  
  return res.status(404).send("Unable to edit post");
});

app.post("/comment", async(req, res) =>{
  try{
    const{url, username ,comment} = req.body;
    if(!(url && username && comment)){
      return res.status(400).send("All field require");
    }
    const comm = await postServices.addComment(url, username ,comment);
    if(comm){
      return res.status(201).send("Comment added");
    }
    return res.status(404).send("Unable to edit post");
  }
  catch(err){
    console.log(err);
}
});


app.post("/createHP", async(req, res) =>{
  const {name} = req.body;
  if(!name){
    return res.status(400).send("All field require");
  }
  console.log(name);
  const hp = await Hodgepodge.create({
    name: name
  });
  if(hp){
    return res.status(201).send("Hodgepodge created");
  }
  return res.status(404).send("Hodgepodge name is available");
});


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});


