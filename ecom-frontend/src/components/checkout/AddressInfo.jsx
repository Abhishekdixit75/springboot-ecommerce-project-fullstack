import { FaAddressBook } from "react-icons/fa";
import CustomSkeleton from "../shared/CustomSkeleton";

const AddressInfo = () => {
	const noAddressExist = true;
	const isLoading = false;

	return (
		<div className="pt=4">
			{noAddressExist ? (
				<div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center">
					<FaAddressBook size={50} className="text-gray-500 mb-4"/>
                    <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
                        No Address Added Yet
                    </h1>
                    <p className="mb-6 text-slate-800 text-center font-semibold text-2xl">
                        Please add an address to proceed with checkout
                    </p>
				</div>
			) : (
				<div className="relative p-6 rounded-lg max-w-md mx-auto">
					<h1 className="text-slate-800 text-center font-bold text-2xl">
						Select Address
					</h1>

					{isLoading ? (
						<div className="mt-6">
							<CustomSkeleton />
						</div>
					) : (
						<div className="space-y-4 pt-6">Address List here</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AddressInfo;
