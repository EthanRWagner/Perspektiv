const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
// Add mongdb user services
const userServices = require("./models/user-services");

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
  const user = new User(req.body);
  user.save((err, newUser) => {
    if(err){
      return res.status(404).json({error: "Unable to add user"});
    }
    res.json({message: "Added new user", user});
  })
});

app.get("/signin", async(req, res) => {
  const {username, password} = req.body;
  User.findOne({username, password}, (err, username) => {
    if(err || !username){
      return res.status(404).json({error: "Email not found"})
    }
    res.status(200).send("Login");
  })
});

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(`REST API is listening on port: ${process.env.PORT}.`);
  } else console.log(`REST API is listening on port: ${port}.`);
});


