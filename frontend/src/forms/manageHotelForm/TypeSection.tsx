import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { HOTEL_TYPES } from "../../lib/constant";
import { hotelPayload } from "../../lib/schema";

export const TypeSection = () => {
    const { register, formState: { errors } } = useFormContext<hotelPayload>();
    const [selectedType, setSelectedType] = useState<string>("");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {
                    HOTEL_TYPES.map((type) =>
                        <label key={uuidv4()} className={
                            selectedType === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
                        }
                        >
                            <input
                                type="radio"
                                value={type}
                                {...register("type", {
                                    required: "This field is required",
                                })}
                                onClick={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedType(e.target.value)}
                                className="hidden"
                            />
                            <span>{type}</span>
                        </label>
                    )
                }
                {errors.type && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.type.message}
                    </span>
                )}
            </div>
        </div>
    )
}