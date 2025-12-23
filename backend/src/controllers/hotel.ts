import { Request, Response } from "express";
import { hotelService } from "../services"
import { errorResponse, successResponse } from "../utils/common/response"
import { StatusCodes } from 'http-status-codes';

class HotelController {
    async createHotel(req: Request, res: Response) {
        try {
            const images = req.files as Express.Multer.File[];
            const result = await hotelService.createHotel({ ...req.body, userId: req.userId }, images);
            successResponse.message = result;
            successResponse.statusCode = StatusCodes.CREATED;
            return res.status(successResponse.statusCode).json(successResponse);
        } catch (error: any) {
            if (error.message.includes("Hotel already exist with similar city name")) {
                errorResponse.statusCode = StatusCodes.CONFLICT;
                errorResponse.message = error.message
            } else {
                errorResponse.message = error.message || "Something went wrong while creating hotel";
                errorResponse.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            errorResponse.origin = "createHotel() controller method error";
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
    }
}

export const hotelController = new HotelController();