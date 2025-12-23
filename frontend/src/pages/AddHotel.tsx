import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ManageHotelForm } from "../forms/manageHotelForm/ManageHotelForm"

export const AddHotel = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (paylaod) => {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/hotels`, paylaod, { withCredentials: true, });
            return data;
        },
        onError: (err) => { console.log(err); },
        onSuccess: (data) => { console.log(data) }
    })
    return (
        <ManageHotelForm mutate={mutate} isPending={isPending} />
    )
}