import { Request, Response } from "express";
import { userService } from "../services"
import { successResponse, errorResponse } from "../utils/common/response"
import { StatusCodes } from 'http-status-codes';


class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const result = await userService.createUser(req.body)
            successResponse.message = result;
            successResponse.statusCode = StatusCodes.CREATED;
            return res.status(successResponse.statusCode).json(successResponse)
        } catch (error: any) {
            if (error.message.includes("Mongo")) {
                errorResponse.message = error.message || "Something went wrong while querying database."
            } else if (error.message === "User already exist") {
                console.log(error.message);
                errorResponse.statusCode = StatusCodes.CONFLICT
                errorResponse.message = error.message || "Something went wrong while registering user"
            } else {
                errorResponse.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
                errorResponse.message = error.message || "Something went wrong while registering user."
            }
            successResponse.origin = "createUser() controller method error"
            errorResponse.error = { ...error }
            console.log(errorResponse);
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
    }

    async authenticateUser(req: Request, res: Response) {
        try {
            const result = await userService.authenticateUser(req.body);
            successResponse.message = "Login successful";
            successResponse.statusCode = StatusCodes.OK;
            successResponse.data = {
                userId: result.userId
            }

            res.cookie("access_token", `${result.accessToken}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 150000 })
            res.cookie("refresh_token", `${result.refreshToken}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 })
            return res.status(successResponse.statusCode)
                .json(successResponse);
        } catch (error: any) {
            errorResponse.origin = "authenticateUser() controller method error"
            if (error.message === "User does not exist with this email") {
                errorResponse.message = error.message
                errorResponse.statusCode = StatusCodes.NOT_ACCEPTABLE
            } else if (error.message === "Invalid email or password") {
                errorResponse.message = error.message
                errorResponse.statusCode = StatusCodes.UNAUTHORIZED;
            } else {
                errorResponse.message = error.message || "Something went wrong while authenticating user."
                errorResponse.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            return res
                .status(errorResponse.statusCode)
                .json(errorResponse)
        }
    }

    async signOutUser(req: Request, res: Response) {
        res.cookie("refresh_token", "", { expires: new Date(0) });
        res.cookie("access_token", "", { expires: new Date(0) });
        return res.send();
    }
}

export const userController = new UserController();