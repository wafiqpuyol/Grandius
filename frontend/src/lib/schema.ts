import z from "zod";

export const signUpSchema = z.object({
    firstName: z.string().describe("First Name").min(3, { message: "First Name must be atleast 3 characters" }),
    lastName: z.string().describe("Last Name").min(2, { message: "Last Name must be atleast 2 characters" }),
    email: z.string({ required_error: "Email is required" }).describe("Email").email({ message: "Email is required" }),
    password: z
        .string({ required_error: "Password is required" })
        .describe("Password")
        .min(6, { message: "Password must be atleast 6 characters" })
        .max(14, { message: "Password must be within 14 characters" }),
    confirmPassword: z.string().describe("Confirm Password"),
})
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Passwords didn't not match, fuck",
            });
        }
    })

export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(2, { message: "Password is required" }),
});

export const hotelSchema = z.object({
    name: z.coerce.string({ required_error: "Name field is required", invalid_type_error: "hola" }),
    city: z.coerce.string({ required_error: "City field is required" }),
    country: z.coerce.string({ required_error: "Country field is required" }),
    description: z.coerce.string({ required_error: "Description field is required" }),
    type: z.coerce.string({ required_error: "Type field is required" }),
    pricePerNight: z.coerce.number({ required_error: "Price Per Night field is required" }).positive(),
    starRating: z.coerce.number({ required_error: "StarRating field is required" }),
    facilities: z.boolean({ required_error: "Please select some facilities" }),
    // imageUrls: z.string().array().min(1, { message: "At least one facility is required" }),
    // imageFiles: z.instanceof(FileList),
    adultCount: z.number(),
    childCount: z.number(),
})

export type hotelPayload = z.infer<typeof hotelSchema>
export type loginPayload = z.infer<typeof loginSchema>
export type signUpPayload = Zod.infer<typeof signUpSchema>;