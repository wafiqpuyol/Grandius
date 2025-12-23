import React, { FC } from 'react'
import { hotelPayload, hotelSchema } from "../../lib/schema"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DetailSection } from "./DetailSection"
import { TypeSection } from './TypeSection'
import { FacilitiesSection } from './FacilitiesSection'

interface ManageHotelFormProps {
    mutate: (hotelFormData: hotelPayload) => void
    isPending: boolean
}
export const ManageHotelForm: FC<ManageHotelFormProps> = ({ mutate, isPending }) => {
    const { reset, handleSubmit, ...formMethods } = useForm<hotelPayload>({
        resolver: zodResolver(hotelSchema),
        mode: "onChange"
    })
    console.log(formMethods.formState.errors);
    const onSubmit = (payload: hotelPayload) => {
        mutate(payload)
    }
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
                <DetailSection />
                <TypeSection />
                <FacilitiesSection />
                {/* <GuestsSection />
                <ImagesSection /> */}
                <span className="flex justify-end">
                    <button
                        disabled={isPending}
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isPending ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}