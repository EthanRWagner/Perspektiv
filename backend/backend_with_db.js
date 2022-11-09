const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require('bcrypt');
// Add mongdb user services
const userServices = require("./models/user-services");
const postServices = require("./models/post-services");
const { findOne } = require("./models/user");
const Post = require("./models/post");
const { findPostByPostBody } = require("./models/post-services");

const app = express();
const port = 8675;

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  // res.send(users); this is a very very very very very very very very very long line
  //HTTP code 200 is set by default. See an alternative below
  // res.status(200).send(users);
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

// previously used function for local db
// async function findUserByName(name) {
//   return await userModel.find({ name: name });
// }

// async function findUserByJob(job) {
//   return await userModel.find({ job: job });
// }

// async function findUserByNameAndJob(name, job) {
//   return await userModel.find({ name: name, job: job });
// }
function isEmail(email) {
  var emailFormat = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== '' && email.match(emailFormat)) { return true; }
  
  return false;
}


app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await userServices.findUserById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { users_list: result };
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

app.post("/signin", async(req, res) => {
  const {username, password} = req.body;
  const tempUser = await userServices.findUserByUserName(username);
  console.log(tempUser);
  if(tempUser.length > 0){
    console.log(tempUser[0]);
    let result = bcrypt.compareSync(password, tempUser[0].password);
    if(result){
      return res.status(200).send(tempUser["_id"]);
    }
    return res.status(404).send("Username and password do not match");
  }
  return res.status(404).send("User not found");
});

app.post("/post", async(req, res) =>{
  try{
    const{postBody, userList} = req.body;
    if(!(postBody && userList)){
      return res.status(400).send("All fields are required");
    }
    const post = await Post.create({
      postBody: postBody,
      userList: userList
    });
    if(post){
      return res.status(201).send("Post Created");
    }
    return res.status(400).send("Unable to create post");
  }
  catch(err){
    console.log(err);
  }
});

app.post("/editpost", async(req, res) =>{
  try{
    const{oldBody, newBody} = req.body;
    if(!(oldBody && newBody)){
      return res.status(400).send("All fields are required");
    }
    const post = await postServices.updatePost(oldBody, newBody);
    if(post){
      return res.status(201).send("Post Edited");
    }
    return res.status(404).send("Unable to edit post");
  }catch(err){
    console.log(err);
  }
});

app.post("/comment", async(req, res) =>{
  try{
    const{postBody, comment} = req.body;
    if(!(postBody && comment)){
      return res.status(400).send("All field require");
    }
    const comm = await postServices.addComment(postBody, comment);
    if(comm){
      return res.status(201).send("Comment added");
    }
    return res.status(404).send("Unable to edit post");
  }
  catch(err){
    console.log(err);
}
})


app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});


