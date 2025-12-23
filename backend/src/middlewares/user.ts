import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { loginSchema } from "../schema/login";
import { signUpSchema } from "../schema/signup";
import { errorResponse } from "../utils/common/response";
import { auth } from "../utils/common/auth"
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

class UserMiddleware {
    validateSignupData = (req: Request, res: Response, next: NextFunction) => {
        const registrationData = signUpSchema.safeParse(req.body)
        if (!registrationData.success) {
            errorResponse.message = registrationData.error.errors[0].message;
            errorResponse.path = registrationData.error.errors[0].path;
            errorResponse.statusCode = StatusCodes.BAD_REQUEST;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next()
    }

    validateSignInData(req: Request, res: Response, next: NextFunction) {
        const loginData = loginSchema.safeParse(req.body)
        if (!loginData.success) {
            errorResponse.origin = "verifyToken() middleware error"
            errorResponse.message = loginData.error.errors[0].message;
            errorResponse.path = loginData.error.errors[0].path;
            errorResponse.statusCode = StatusCodes.UNAUTHORIZED;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        next()
    }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies["access_token"];
        if (!token) {
            errorResponse.message = "Missing access token"
            errorResponse.statusCode = StatusCodes.FORBIDDEN;
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
        try {
            const payload = await auth.validateToken(token);
            if (payload) {
                req.userId = (payload as JwtPayload).data.id
            }
            next();
        } catch (error: any) {
            errorResponse.message = error.message || "Something went wrong while validating access token"
            if (error instanceof TokenExpiredError) {
                errorResponse.statusCode = StatusCodes.FORBIDDEN;
            } else {
                errorResponse.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            errorResponse.origin = "verifyToken() middleware error"
            return res.status(errorResponse.statusCode).json(errorResponse);
        }
    }
}

export const userMiddleware = new UserMiddleware()