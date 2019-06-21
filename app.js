var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Userdata = require("./models/data.js");

app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/List",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    Userdata.find({},function(err,allData){
        if(err){
            console.log(err);
        }else{
           res.render("home",{userData : allData});
        }
    });
});

app.get("/adduser",function(req,res){
    res.render("newUser");
})

app.post("/adduser",function(req,res){

    // var newUser = {firstname:"drumil",lastname:"shah",age:"17",gender:"male",grade:"A",standard:"12"};
    // userdata.create(newUser,function(err,newuser){
       Userdata.create(req.body.user,function(err,newuser){
        if(err){
            console.log(err);
        }else{
            console.log("new user created");
            console.log(newuser);
            res.redirect("/");
        }
    });
});

app.post("/search",function(req,res){
    var searchText = req.body.searchField;
    console.log(searchText);
    Userdata.find({
        $or:[
        {firstname:{$regex:searchText}},{lastname:{$regex:searchText}},{age:{$regex:searchText}},{gender:{$regex:searchText}},{grade:{$regex:searchText}},{standard:{$regex:searchText}}
        ]
    },function(err,foundData){
        if(err){
            console.log(err);
        }else{
        res.render("home",{userData:foundData});
        }
    });
});

app.listen(3000,function(req,res){
    console.log('SERVER STARTED');
});