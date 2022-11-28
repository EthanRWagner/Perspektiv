const hp = require('./models/hodgepodge-services');
const h = require('./models/hodgepodge');
const u = require('./models/user');
const post = require('./models/post-services');
const p = require('./models/post');
const user = require('./models/user-services');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));



const tempUser = {
  _id: mongoose.Types.ObjectId(),
  fullName: "random person",
  email: "testemail@gmail.com",
  username: "testuser1",
  password: "123456789",
  confPassword: "123456789",
  hpList: [],
  "__v": 0
}
const tempHP = {
  _id: mongoose.Types.ObjectId(),
  name: "HPtest"
}
const tempPost = {
  _id: mongoose.Types.ObjectId(),
  url: "google.com",
  caption: "this is just a test post",
  hpList : ["HPtest"],
  comment: [],
  date: "05 May 2022"
}

beforeEach(async () => {
  await u.deleteOne({fullName: "random person"});
  await p.deleteOne({url : "google.com"});
  await h.deleteOne({name: "HPtest"}); 
  await u.create(tempUser);
  await p.create(tempPost);
  await h.create(tempHP);
});

test("Find by username -- success",async () =>{
  const r = await user.findUserByUserName("testuser1");
  const res = r[0];
  expect(res.email).toBe("testemail@gmail.com");
  expect(res.fullName).toBe("random person");
});

test("Find by username 2",async () => {
  const r = await user.findUserByUserName("test");
  const res = r[0];
  expect(res).toBe(undefined);
});

test("Find by email -- success", async () => {
  const r = await user.findUserByEmail("testemail@gmail.com");
  const res = r[0];
  expect(res.username).toBe("testuser1");
  expect(res.fullName).toBe("random person");
});

test("Find by similar username -- success", async () =>{
  const r = await user.findSimilarUsername("test");
  const res = r[0];
  expect(res.username).toBe("testuser1");
  expect(res.fullName).toBe("random person");
});

test("Find user by ID -- success", async () =>{
  const res = await user.findUserById(tempUser._id);
  expect(res.username).toBe("testuser1");
});
test("Join HP -- success", async () =>{
  const t = await user.joinHP("testuser1","HPtest");
  const r = await user.findUserByUserName("testuser1");
  const res = r[0];
  let a = ['HPtest'];
  console.log(res.hpList);
  expect(res.hpList).toEqual(a);
});

test("Change username -- success", async () => {

  const t = await user.changeUsername("testuser1","testuser");
  const r = await user.findUserByUserName("testuser");
  const res = r[0];
  expect(res.fullName).toEqual("random person");
});

test("Change password -- success", async () => {

  const t = await user.changePassword("testuser1","987654321");
  const r = await user.findUserByUserName("testuser1");
  const res = r[0];
  expect(res.password).toEqual("987654321");
});

test("Change email -- success", async () => {

  await user.changeEmail("testuser1","test@gmail.com");
  const r = await user.findUserByUserName("testuser1");
  const res = r[0];
  expect(res.email).toEqual("test@gmail.com");
});

test("Find hodgepodge -- success", async () =>{
  const r = await hp.findHodgepodgeByName("HPtest");
  const res = r[0];
  expect(res.name).toBe("HPtest");
});

test("Get post -- success", async () => {
  const r = await post.getPosts();
  expect(r.length).toBeGreaterThanOrEqual(1);
});

test("Update HP from list -- success", async() =>{
  await post.updateHP("google.com", "HPtest2");
  const r = await post.getPosts();
  const res = r[r.length-1];
  console.log(res);
  const arr = ["HPtest", "HPtest2"];
  expect(res.hpList).toEqual(arr);
});

test("Comment to post -- success", async () =>{
  await post.addComment("google.com", "testuser1", "this is a test comment");
  const r = await post.getPosts();
  const res = r[r.length-1];
  console.log(res.comments);
  const arr = [{username: 'testuser1', comment : 'this is a test comment'}];
  expect(res.comments).toEqual(arr);
});