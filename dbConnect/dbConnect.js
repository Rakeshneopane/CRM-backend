require("dotenv").config();

const mongoose = require("mongoose");

const MongoUri = process.env.MONGO;

const initailiseDatabase= async() => {
    await mongoose.connect(MongoUri)
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch((error)=>{
        console.log("Failed to connect", error);
    })
}

module.exports =  initailiseDatabase;