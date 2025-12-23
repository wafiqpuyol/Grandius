import mongoose, { Schema } from "mongoose"
import { IUser as UserInterface } from "../types"


const userSchema = new Schema<UserInterface>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export const User = mongoose.model<UserInterface>("User", userSchema);