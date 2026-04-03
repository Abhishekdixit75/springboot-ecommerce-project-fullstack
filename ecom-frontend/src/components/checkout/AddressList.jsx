import {
	FaBuilding,
	FaCheckCircle,
	FaEdit,
	FaStreetView,
	FaTrashAlt,
} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {MdLocationCity} from "react-icons/md";
import { selectUserCheckoutAddress } from "../../store/actions";

const AddressList = ({addresses, setSelectedAddress, setOpenAddressModal}) => {
	const dispatch = useDispatch();
	const selectedUserCheckoutAddress = useSelector((state) => state.auth.selectedUserCheckoutAddress);

	const onEditButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
        setOpenAddressModal(true);
    };

	const onDeleteButtonHandler = (addresses) => {
        setSelectedAddress(addresses);
    };
    
	const handleAddressSelection = (addresses) => {
        dispatch(selectUserCheckoutAddress(addresses));
    };

	return (
		<div className="space-y-4">
			{addresses.map((address) => (
				<div
					key={address.addressId}
					onClick={() => handleAddressSelection(address)}
					className={`p-4 border rounded-md cursor-pointer relative ${selectedUserCheckoutAddress?.addressId === address.addressId ? "bg-green-100" : "bg-white"}`}
				>
					<div className="flex items-start">
						<div className="space-y-1">
							<div className="flex items-center">
								<FaBuilding size={14} className="mr-2 text-gray-600" />
								<p className="font-semibold">{address.buildingName}</p>
								{selectedUserCheckoutAddress?.addressId === address.addressId && (
									<FaCheckCircle className="text-green-500 ml-2" />
								)}
							</div>

							<div className="flex items-center">
								<FaStreetView size={14} className="mr-2 text-gray-600" />
								<p>{address.street}</p>
							</div>

							<div className="flex items-center">
								<MdLocationCity size={14} className="mr-2 text-gray-600" />
								<p>
									{address.city}, {address.state}
								</p>
							</div>

							<div className="flex items-center">
								<MdLocationCity size={14} className="mr-2 text-gray-600" />
								<p>{address.pincode}</p>
							</div>

							<div className="flex items-center">
								<MdLocationCity size={14} className="mr-2 text-gray-600" />
								<p>{address.country}</p>
							</div>
						</div>
					</div>
					<div className="flex gap-3 absolute top-4 right-2">
						<button
							onClick={() => onEditButtonHandler(address)}
							className="p-1 bg-blue-200 rounded-md cursor-pointer hover:bg-blue-300 transition-colors duration-400"
						>
							<FaEdit className="text-blue-500" />
						</button>
						<button
							onClick={() => onDeleteButtonHandler(address)}
							className="p-1 bg-red-200 rounded-md cursor-pointer hover:bg-red-300 transition-colors duration-400"
						>
							<FaTrashAlt className="text-red-500" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AddressList;
