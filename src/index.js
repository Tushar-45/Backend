
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

const app = express();

connectDB();













// function connectDB(){

// }

// connectDB();

// 1) can be used but index file jyda bhari bhari lg jaati hai

/*
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (err)=>{
            console.log("Error ",err);
            throw err;
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is running on port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR", error);
        throw error;
    }
})()

*/