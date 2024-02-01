import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() =>{
    try {
       const connectionInstanace =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
       console.log(`\nMoongoose connected || DB HOst 
       ${connectionInstanace.connection.host}`);
    } catch (error) {
        console.log("MoongoDB error", error);
        process.exit(1);
    }
}

export default connectDB;