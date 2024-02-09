import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async (filePath)=>{
    try {
        if(!filePath) return null
        const respone = await cloudinary.uploader.upload(filePath,{    //upload the file on cloundinary
            resource_type: "auto"
        })
        console.log("uploded on cloundianry",respone.url);
        return respone;
    } catch (error) {
        fs.unlinkSync(filePath); // Remove local save file as the upload opertion failed
        console.log("uploading error");
    }
}

// cloudinary.uploader.upload("",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

export {uploadCloudinary};

