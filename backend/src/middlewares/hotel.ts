import { NextFunction, Request, Response } from "express";
import { hotelSchema } from "../schema/hotel"
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/response";
import multer from "multer";
import { MAXIMUM_FILE, MAX_FILE_SIZE } from "../utils/constants";

class HotelMiddleware {
    multerUpload(req: Request, res: Response, next: NextFunction) {
        const storage = multer.memoryStorage();
        multer({
            storage: storage,
            limits: {
                fileSize: MAX_FILE_SIZE * 1024 * 1024,
            },
        }).array("images", MAXIMUM_FILE);
        next();
    }

    validateCreateHotelData(req: Request, res: Response, next: NextFunction) {
        const parsedHotelData = hotelSchema.safeParse({ ...req.body, userId: req.userId })
        console.log(parsedHotelData.error?.errors);
        if (!parsedHotelData.success) {
            errorResponse.message = parsedHotelData.error.errors[0].message;
            errorResponse.path = parsedHotelData.error.errors[0].path;
            errorResponse.statusCode = StatusCodes.BAD_REQUEST;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next();
    }
}

export const hotelMiddleware = new HotelMiddleware();
