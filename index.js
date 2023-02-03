const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

/ =================== Schemas and Models ========================
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/getWorkDB")

const userSignUpsSchema = mongoose.Schema({
    name:Object,
    email:String,
    username:String,
    pwd:String
});

const profilesSchema = mongoose.Schema({
    _id: String, // same in userSignUps
    mobNo: Number,
    dob:String,
    address:String,
    landmark:String,
    city:String,
    pincode:String
})

const gigsSchema = mongoose.Schema({
    profileId: String, // same as userSignUps
    title:String,
    category:String,
    yourService:String,
    workName:String,
    gigDescription:String,
    experience:String,
    minPrice:Number,
    sampleImages:Object
});

const jobPostsSchema = mongoose.Schema({
    profileID : String, // same as userSignUps,
    category: String,
    postDescription:String,
    location:Object,
    workType:String,
    skillsNeeded:[String],
    workDuration:String,
    payTerms:String,
    minBudget:Number,
    maxBudget:Number,
    applicants:[String] // elements are userSignUpIds
});

const jobApplicationsSchema = mongoose.Schema({
    profileID : String, // same as userSignUps,
    proposal:String,
	pricePerDay:Number
});

// models

const userSignUp = mongoose.model("userSignUps",userSignUpsSchema);
const profile = mongoose.model("profiles",profilesSchema);
const gig = mongoose.model("gigs",gigsSchema);
const jobPost = mongoose.model("jobPosts",jobPostsSchema);
const jobApplication = mongoose.model("jobApplications",jobApplicationsSchema);


app.listen(5000,function(){
    console.log("server is up @ http://localhost:5000");
})
