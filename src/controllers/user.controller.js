import { ApiError } from "../utlis/ApiError.js";
import {asyncHandler} from "../utlis/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utlis/cloudinary.js";
import { ApiResponse } from "../utlis/ApiResponse.js";


const registerUser = asyncHandler(async (req,res) =>{
    
    // get user deatils ..

     const {fullName, email, username, password}  = req.body;
    //  console.log("email", email);

    if([fullName, email, username, password].some((field)=>field>trim() === "")){
        throw new ApiError(400,"fileds is required")
    }

    const existedUser = User.findOne({
        $or : [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "user already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverIamgeLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is requried")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverIamgeLocalPath)

    if(!avatar){
        throw new ApiError(401, "avtar requried ")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase()
    })

    const userCreated = User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!userCreated){
        throw new ApiError(500, "registering error frombecaken")
    }

    return res.status(201).json(
        new ApiResponse(200,userCreated,"user regiosted successfully")
    )
})


export {
    registerUser
}