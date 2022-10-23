const express = require("express");
const app = express();
const fs = require("fs");
const { EventEmitter } = require("stream");
app.listen(3060, () => {
  console.log("connected");
});

//TAKİP EDEN KULLANICI ADLARINI JSONDAN AYIKLAMA
var data_followers = fs.readFileSync("followers.json");
var object_followers = JSON.parse(data_followers);
var ufollowers = Object.entries(object_followers)[0][1];
let username_followers = [];
app.get("/followers", (req, res, next) => {
  for (var i = 0; i < ufollowers.length; i++) {
    var c = Object.values(ufollowers[i])[2].map((result) => {
      return username_followers.push(result.value);
    });
  }
  //fs.unlinkSync("result1.json");
  fs.writeFileSync("result1.json", JSON.stringify(username_followers));
  res.send({ names: username_followers });
});
//TAKİP EDİLEN KULLANICI ADLARINI JSONDAN AYIKLAMA
var data_following = fs.readFileSync("following.json");
var object_following = JSON.parse(data_following);
let ufollowing = Object.entries(object_following)[0][1];
let username_following = [];
app.get("/following", (req, res, next) => {
  for (var i = 0; i < ufollowing.length; i++) {
    var c = Object.values(ufollowing[i])[2].map((result) => {
      return username_following.push(result.value);
    });
  }
  //fs.unlinkSync("result2.json");
  fs.writeFileSync("result2.json", JSON.stringify(username_following));
  res.send({ names: username_following });
});

var userlist_followers = fs.readFileSync("result1.json");
var object_unameFollowers = JSON.parse(userlist_followers);
var userlist_following = fs.readFileSync("result2.json");
var object_unameFollowing = JSON.parse(userlist_following);
const x = Object.values(object_unameFollowers);
const y = Object.values(object_unameFollowing);
app.get('/non-followers',(req,res,next)=>{
  const my_nonfollowers = y.filter((element) => !x.includes(element));
  //console.log(my_nonfollowers)
  res.send({my_nonfollowers})
})
app.get('/non-followings',(req,res,next)=>{
  const my_nonfollowings = x.filter((element) => !y.includes(element));
  //console.log(my_nonfollowings)
  res.send({my_nonfollowings})
})
