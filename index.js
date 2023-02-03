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

//=========================== GET POST ==============================================

// userSignups
app.route("/userSignUps").get(function(request,response){
    userSignUp.find(function(error,foundusers){
        if (!error) {
            response.send(foundusers);
        } else {
            response.send(error);
        }
    })
})
.post(function(request,response){
    const user = new userSignUp({
        name : {
            "firstName":request.body.fname,
            "lastName":request.body.lname
        },
        email : request.body.email,
        username : request.body.username,
        pwd : request.body.pwd
    });

    user.save(function(error){
        if (!error) {
            response.send("Successfully SignedUp!");
        } else {
            response.send(error);
        }
    });
});

// profiles
app.route("/profiles")
.get(function(request,response){
    profile.find(function(error,foundProfiles){
        if (!error) {
            response.send(foundProfiles);
        } else {
            response.send(error);
        }
    })
})
.post(function(request,response){
    const p = new profile({
        _id: request.body.userSignUpId, // same in userSignUps
        mobNo: request.body.mobNo,
        dob:request.body.dob,
        address:request.body.address,
        landmark:request.body.landmark,
        city:request.body.city,
        pincode:request.pincode
    });

    p.save(function(error){
        if (!error) {
            response.send("Successfully added the profile!");
        } else {
            response.send(error);
        }
    });
});



app.listen(5000,function(){
    console.log("server is up @ http://localhost:5000");
})
