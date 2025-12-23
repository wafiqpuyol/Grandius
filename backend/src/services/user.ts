import { IJwtPayload, IUser } from "../types"
import { auth } from "../utils/common/auth"
import { userRepository } from "../repositories"


class UserService {
    async createUser({ email, firstName, lastName, password }: IUser) {
        try {
            const isUserExist = await userRepository.findByEmail(email);
            if (isUserExist) {
                throw new Error("User already exist");
            }
            const hashedPassword = await auth.generateHash(password)

            await userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            return "User created successfully";
        } catch (error: any) {
            throw error
        }
    }

    async authenticateUser({ email, password }: { email: string, password: string }) {
        try {
            const isUserExist = await userRepository.findByEmail(email);
            if (!isUserExist) {
                throw new Error("User does not exist with this email");
            }
            const isPasswordMatch = await auth.checkPassword(password, isUserExist.password)
            if (!isPasswordMatch) {
                throw new Error("Invalid email or password");
            }
            const payload: IJwtPayload = {
                id: isUserExist._id.toString(),
                email: isUserExist.email,
                userName: `${isUserExist.firstName} ${isUserExist.lastName}`
            }
            const accessToken = auth.generateToken(payload, "15m");
            const refreshToken = auth.generateToken(payload, "1d");
            return { accessToken, refreshToken, userId: payload.id };
        } catch (error: any) {
            throw error;
        }
    }
}

export const userService = new UserService()