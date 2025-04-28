"use client";
import { putAccount } from "@/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define your Zod schema
const schema = z.object({
    phone: z
        .string()
        .trim()
        .min(1, "Phone number required")
        .max(10, "Phone number must be at least 10 digits")
        .regex(/^\+?\d+$/, "Invalid phone number format"),
});

type FormData = z.infer<typeof schema>;

export default function PhoneForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        const statusCode = await putAccount(+data.phone);
        if (statusCode === 200) {
            reset();
            toast.success("Phone added successfully");
        } else {
            toast.error("An error occured while adding the phone");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-md mx-auto"
        >
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Add phone number to get reminder
                </label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="please enter phone"
                    {...register("phone")}
                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-blue-400"
                    }`}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
                {isSubmitting ? "Saving..." : "Submit"}
            </button>
        </form>
    );
}
