import { Model } from "mongoose"
import { IUser, IHotel } from "../types"

export class CrudRepository {
    constructor(private model: Model<any>) { }

    async create(payload: IUser | IHotel) {
        try {
            await this.model.create(payload)
        } catch (error: any) {
            throw new Error(error)
        }
    }
}