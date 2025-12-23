import { hotelRepository } from "../repositories"
import { hotelPayload } from "../schema/hotel"
import cloudinary from "cloudinary"

class HotelService {
    private async uploadImages(imageFiles: Express.Multer.File[]) {
        console.log(imageFiles);
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });
        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls;
    }

    async createHotel(hotelData: hotelPayload, images: Express.Multer.File[]) {
        try {
            const isHotelExist = await hotelRepository.findHotelByName({ name: hotelData.name, city: hotelData.city });
            if (isHotelExist) {
                throw new Error("Hotel already exist with similar city name");
            }
            const imageUrls = await this.uploadImages(images);
            await hotelRepository.create({
                ...hotelData, _id: hotelData.userId,
                lastUpdated: new Date(), imageUrls, bookings: []
            });
            return "Hotel created successfully";
        } catch (error) {
            throw error;
        }
    }
}

export const hotelService = new HotelService();