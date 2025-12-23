import { User } from "../models"
import { IUser } from "../types";
import { CrudRepository } from "./crud"

class UserRepository extends CrudRepository {
    constructor() {
        super(User)
    }

    async findByEmail(email: string) {
        try {
            return await User.findOne({ email }).lean();
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export const userRepository = new UserRepository();
