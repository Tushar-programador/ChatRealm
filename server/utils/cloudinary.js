import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary: ", response.url);

    // Delete the local file after successful upload
    try {
      await fs.promises.unlink(localFilePath);
    } catch (err) {
      console.error("Error deleting local file:", err);
    }

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Attempt to delete the local file even if upload fails
    try {
      await fs.promises.unlink(localFilePath);
    } catch (err) {
      console.error("Error deleting local file after failed upload:", err);
    }

    return null;
  }
};

export { uploadOnCloudinary };
