import { useFormContext } from 'react-hook-form'
import { hotelPayload } from '../../lib/schema'
import { HOTEL_FACILITIES } from '../../lib/constant'
import { v4 as uuidv4 } from 'uuid';

export const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<hotelPayload>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {HOTEL_FACILITIES.map((facility) => (
                    <label key={uuidv4()} className="text-[14.5px] flex gap-1 text-gray-700 font-semibold">
                        <input
                            type="checkbox"
                            value={facility}
                            {...register("facilities")}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    )
}