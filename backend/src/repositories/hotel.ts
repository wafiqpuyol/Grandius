import { CrudRepository } from "./crud";
import { Hotel } from "../models"

class HotelRepository extends CrudRepository {
    constructor() {
        super(Hotel)
    }
    async findHotelByName(data: { name: string, city: string }) {
        try {
            return await Hotel.findOne(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export const hotelRepository = new HotelRepository();