import { useForm } from "react-hook-form"
import { loginPayload, loginSchema } from "../lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useTransition } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useToast } from "../hooks/use-toast"
import { StatusCodes } from "http-status-codes"
import { API_BASE_URL } from "../lib/constant"

const SignIn = () => {
    const { toast } = useToast();
    const navigation = useNavigate()
    const [_, startTransition] = useTransition();
    const { handleSubmit, formState: { errors }, reset, register } = useForm<loginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "test@gmail.co",
            password: "test123"
        }
    })
    const { mutate } = useMutation({
        mutationFn: async (payload: loginPayload) => {
            const { data, status } = await axios.post(`${API_BASE_URL}/api/v1/users/auth/signin`, payload, { withCredentials: true })
            return { data, status };
        },
        onSuccess() {
            toast({
                title: "User registered successfully",
            })
            reset();
            navigation("/");
        },
        onError(err) {
            reset();
            if (err instanceof AxiosError) {
                if (err.response?.status === StatusCodes.UNAUTHORIZED)
                    return toast({
                        title: err.response?.data.message,
                        description: "Please try again with different credential.",
                        variant: "destructive"
                    })
                else if (err.response?.status === StatusCodes.NOT_ACCEPTABLE) {
                    return toast({
                        title: err.response?.data.message,
                        variant: "destructive"
                    })
                } else if (err.response?.status === StatusCodes.INTERNAL_SERVER_ERROR) {
                    return toast({
                        title: err.response?.data.message,
                        description: "Please try again later",
                        variant: "destructive"
                    })
                }
            }
            return toast({
                title: "Something went wrong while authenticating user.",
                description: "Please try again later.",
                variant: "destructive"
            })
        }
    })

    const onSubmit = (payload: loginPayload) => {
        startTransition(() => {
            mutate(payload)
        })
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} >
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email"
                    required
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email")}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password")}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered?{" "}
                    <Link className="underline text-blue-500" to="/signup">
                        Create an account here
                    </Link>
                </span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Login
                </button>
            </span>
        </form >
    )
}

export default SignIn