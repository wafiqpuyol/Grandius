import { useFormContext } from 'react-hook-form';
import { hotelPayload } from "../../lib/schema"
import { v4 as uuidv4 } from 'uuid';

export const DetailSection = () => {
    const { register, formState: { errors } } = useFormContext<hotelPayload>();
    console.log(errors);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    required
                    placeholder="Hotel"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "name is required" })}
                ></input>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>

            <div className="flex gap-4">

                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        placeholder="City"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city")}
                    ></input>
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        placeholder="Country"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country")}
                    ></input>
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    placeholder="Description"
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("description")}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number"
                    defaultValue={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("pricePerNight")}
                ></input>
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select
                    {...register("starRating")}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    { }
                    {Array.from({ length: 5 }).map((_, idx) =>
                        <option key={uuidv4()} value={idx + 1}>{idx + 1}</option>
                    )}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>

        </div>
    );
}