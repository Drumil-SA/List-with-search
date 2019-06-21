var mongoose = require("mongoose");

var DataSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    age:String,
    gender:String,
    grade:String,
    standard:String
});


module.exports = mongoose.model("userData",DataSchema);