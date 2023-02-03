const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.listen(5000,function(){
    console.log("server is up @ http://localhost:5000");
})
