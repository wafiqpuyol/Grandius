import 'dotenv/config'
import mongoose from 'mongoose';
import { v2 as cloudinaryV2 } from 'cloudinary';

export const DBInit = (): void => {
    try {
        console.log(process.env.MONGODB_URL);
        mongoose.connect(process.env.MONGODB_URL as string);
    } catch (error: any) {
        console.log(error);
    }
};
export const PORT = 5600;

export const imageStorage = () => cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});