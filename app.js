var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Userdata = require("./models/data.js");
var dotenv = require('dotenv');
dotenv.config();
app.set("view engine", "ejs");

var DB = process.env.DB;
var DB_host = process.env.DB_host;
var DB_port = process.env.DB_port;
var DB_name = process.env.DB_name;
mongoose.connect(DB+"://"+DB_host+":"+DB_port+"/"+DB_name, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    Userdata.find({}, function (err, allData) {
        if (err) {
            console.log(err);
        } else {
            res.render("home", { userData: allData });
        }
    });
});

app.get("/adduser", function (req, res) {
    res.render("newUser");
})

app.post("/adduser", function (req, res) {

    // var newUser = {firstname:"drumil",lastname:"shah",age:"17",gender:"male",grade:"A",standard:"12"};
    // userdata.create(newUser,function(err,newuser){
    Userdata.create(req.body.user, function (err, newuser) {
        if (err) {
            console.log(err);
        } else {
            console.log("new user created");
            console.log(newuser);
            res.redirect("/");
        }
    });
});

app.post("/search", function (req, res) {
    var searchText = req.body.searchField;
    Userdata.find({
        $or: [
            { firstname: { $regex: searchText, $options: 'i' } }, { lastname: { $regex: searchText, $options: 'i' } }, { age: { $regex: searchText, $options: 'i' } }, { gender: { $regex: searchText, $options: 'i' } }, { grade: { $regex: searchText, $options: 'i' } }, { standard: { $regex: searchText, $options: 'i' } }
        ]
    }, function (err, foundData) {
        if (err) {
            console.log(err);
        } else {
            res.render("home", { userData: foundData });
        }
    });
});

app.listen(process.env.port, function (req, res) {
    console.log('SERVER STARTED');
});
