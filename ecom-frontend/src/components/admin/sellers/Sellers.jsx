import React, {useState} from "react";
import useSellerFilter from "../../../hooks/useSellerFilter";
import {MdPersonAdd} from "react-icons/md";
import {useSelector} from "react-redux";
import {FaBoxOpen} from "react-icons/fa";
import {DataGrid} from "@mui/x-data-grid";
import Loader from "../../shared/Loader";
import {adminSellerTableColumn} from "../../helper/tableColumn";
import Modal from "../../shared/Modal";
import AddSellerForm from "./AddSellerForm";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Sellers = () => {
	const [openModal, setOpenModal] = useState(false);
	const {sellers, pagination} = useSelector((state) => state.sellers);
	const emptySeller = !sellers || sellers?.length === 0;
	const {isLoading} = useSelector((state) => state.errors);
	const [currentPage, setCurrentPage] = useState(
		pagination?.pageNumber + 1 || 1,
	);
	const [searchParams] = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const navigate = useNavigate();
	const pathname = useLocation().pathname;

	useSellerFilter();

	const handlePaginationChange = (paginationModel) => {
		const page = paginationModel.page + 1;
		setCurrentPage(page);
		params.set("page", page.toString());
		navigate(`${pathname}?${params}`);
	};

	const tableRecords = sellers?.map((item) => {
		// here we will get the sellers and we will map them to the specific table records format
		return {
			id: item.userId,
			username: item.username,
			email: item.email,
		};
	});
	return (
		<div>
			<div className="pt-6 pb-10 flex justify-end">
				<button
					onClick={() => setOpenModal(true)}
					className="bg-custom-blue hover:bg-blue-600 hover:text-slate-400 text-white font-semibold px-4 py-2 flex items-center gap-2 shadow-md rounded-md transition-colors duration-300"
				>
					<MdPersonAdd className="text-xl" /> Add Seller
				</button>
			</div>
			{!emptySeller && (
				<h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
					All Sellers
				</h1>
			)}
			;
			{isLoading ? (
				<Loader />
			) : (
				<>
					{emptySeller ? (
						<div className="flex flex-col items-center justify-center text-gray-600 py-10">
							<FaBoxOpen size={50} className="mb-3" />
							<h2 className="text-2xl font-semibold">
								No sellers added yet
							</h2>
						</div>
					) : (
						<div className="max-w-full">
							<DataGrid
								className="w-full"
								rows={tableRecords}
								columns={adminSellerTableColumn}
								paginationMode="server"
								rowCount={pagination?.totalElements || 0}
								initialState={{
									pagination: {
										paginationModel: {
											pageSize:
												pagination?.pageSize || 10,
											page: currentPage - 1,
										},
									},
								}}
								onPaginationModelChange={handlePaginationChange}
								disableRowSelectionOnClick
								disableColumnResize
								pageSizeOptions={[pagination?.pageSize || 10]}
								pagination
								paginationOptions={{
									showFirstButton: true,
									showLastButton: true,
									hideNextButton:
										currentPage === pagination?.totalPages,
								}}
							/>
						</div>
					)}
				</>
			)}
			<Modal
				open={openModal}
				setOpen={setOpenModal}
				title="Add New Seller"
			>
				<AddSellerForm setOpen={setOpenModal} />
			</Modal>
		</div>
	);
};

export default Sellers;
