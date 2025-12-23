import z from "zod"
import { bookingSchema } from "./booking"

export const hotelSchema = z.object({
    userId: z.string({ invalid_type_error: "UserId must be string", required_error: "UserId is required" }),
    name: z.string({ invalid_type_error: "Name must be string", required_error: "Name is required" }),
    city: z.string({ invalid_type_error: "City must be string", required_error: "City is required" }),
    country: z.string({ invalid_type_error: "Country must be string", required_error: "Country is required" }),
    description: z.string({ invalid_type_error: "Description must be string", required_error: "Description is required" }),
    type: z.string({ invalid_type_error: "Type must be string", required_error: "Type is required" }),
    adultCount: z.number({ invalid_type_error: "AdultCount must be number", required_error: "AdultCount is required" }),
    childCount: z.number({ invalid_type_error: "ChildCount must be number", required_error: "ChildCount is required" }).nonnegative(),
    facilities: z.string().array(),
    pricePerNight: z.number({ invalid_type_error: "PricePerNight must be number", required_error: "PricePerNight is required" }).nonnegative(),
    starRating: z.number({ invalid_type_error: "StarRating must be Number", required_error: "StarRating is required" }).nonnegative(),
    bookings: z.array(bookingSchema).optional()
})

export type hotelPayload = z.infer<typeof hotelSchema>;