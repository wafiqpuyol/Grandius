import z from "zod"


export const bookingSchema = z.object({
    _id: z.string(),
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    adultCount: z.number(),
    childCount: z.number(),
    checkIn: z.date(),
    checkOut: z.date(),
    totalCost: z.number(),
})

export type bookingPayload = z.infer<typeof bookingSchema>;