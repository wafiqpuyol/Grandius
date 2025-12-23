import express, { Router } from "express";
import { hotelMiddleware, userMiddleware } from "../../middlewares"
import { hotelController } from "../../controllers"

const router: Router = express.Router()
router.post("/", [userMiddleware.verifyToken, hotelMiddleware.multerUpload, hotelMiddleware.validateCreateHotelData], hotelController.createHotel);

export default router;