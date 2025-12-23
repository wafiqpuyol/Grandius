import express, { Router } from "express";
import authRoutes from "./auth"
import hotelRoutes from "./hotel"

const router: Router = express.Router();

router.use("/users/auth", authRoutes)
router.use("/hotels", hotelRoutes)

export default router;