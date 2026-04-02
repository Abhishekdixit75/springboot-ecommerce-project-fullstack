import {FaAddressBook} from "react-icons/fa";
import CustomSkeleton from "../shared/CustomSkeleton";
import {useState} from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";

const AddressInfo = () => {
	const noAddressExist = true;
	const isLoading = false;
	const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState("");
	const addNewAddressHandler = () => {
		setSelectedAddress("");
		setOpenAddAddressModal(true);
	};

	return (
		<div className="pt=4">
			{noAddressExist ? (
				<div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center">
					<FaAddressBook size={50} className="text-gray-500 mb-4" />
					<h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
						No Address Added Yet
					</h1>
					<p className="mb-6 text-slate-800 text-center font-semibold text-2xl">
						Please add an address to proceed with checkout
					</p>
					<button
						className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
						onClick={addNewAddressHandler}
					>
						Add address
					</button>
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
			<AddressInfoModal
				open={openAddAddressModal}
				setOpen={setOpenAddAddressModal}
			>
				<AddAddressForm />
			</AddressInfoModal>
		</div>
	);
};

export default AddressInfo;
