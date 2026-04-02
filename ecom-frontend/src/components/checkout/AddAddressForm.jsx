import {useForm} from "react-hook-form";
import {FaAddressCard} from "react-icons/fa";
import {useSelector} from "react-redux";
import InputField from "../shared/InputField";

const AddAddressForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({mode: "onTouched"});

	const onSaveAddressHandler = async (data) => {
		console.log("save address clicked!");
	};

	const {btnLoader} = useSelector((state) => state.errors);

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
				<div className="flex items-center justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
					<FaAddressCard className="mr-2 text-2xl" />
					Add Address
				</div>

				<div className="space-y-4">
					<InputField
						label="Building Name"
						required
						id="building"
						type="text"
						message="*BuildingName is required"
						register={register}
						errors={errors}
						placeholder="Enter your building name"
					/>

					<InputField
						label="City"
						required
						id="city"
						type="text"
						message="*City is required"
						register={register}
						errors={errors}
						placeholder="Enter your city"
					/>

					<InputField
						label="State"
						required
						id="state"
						type="text"
						message="*State is required"
						register={register}
						errors={errors}
						placeholder="Enter your state"
					/>

					<InputField
						label="Pincode"
						required
						id="pincode"
						type="text"
						message="*Pincode is required"
						register={register}
						errors={errors}
						placeholder="Enter your pincode"
					/>

					<InputField
						label="Street"
						required
						id="street"
						type="text"
						message="*Street is required"
						register={register}
						errors={errors}
						placeholder="Enter your street"
					/>

					<InputField
						label="Country"
						required
						id="country"
						type="text"
						message="*Country is required"
						register={register}
						errors={errors}
						placeholder="Enter your country"
					/>
				</div>

				<div className="flex gap-4">
					<button
						disabled={btnLoader}
						className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors duration-300 w-full cursor-pointer"
					>
						{btnLoader ? (
							<>
								<Spinners /> Loading{" "}
							</>
						) : (
							"Save Address"
						)}
					</button>

					<button
						type="button"
						className="text-white bg-rose-700 px-4 py-2 rounded-md mt-4 hover:bg-rose-600 transition-colors duration-300 w-full cursor-pointer"
						onClick={() => reset()}
					>
						Reset
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddAddressForm;
