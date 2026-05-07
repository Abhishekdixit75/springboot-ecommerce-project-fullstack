import {FaEdit, FaEye, FaImage, FaTrashAlt} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";

export const adminOrderTableColumn = (handleEdit) => [
	{
		// Column for order ID.
		sortable: true, // this enables sorting for this column
		disableColumnMenu: false, // this lets us have some options in the column header menu
		field: "id", // this is the key in our data that this column will display
		headerName: "orderId", // this is the name that will show up in the column header
		minWidth: 180, // this sets a minimum width for the column
		headerAlign: "center", // this centers the header text
		editable: false, // this means the cells in this column cannot be edited directly
		headerClassName: "text-black font-semibold border", // this applies some styling to the header
		cellClassName: "text-slate-700 font-normal border", // this applies some styling to the cells
		renderHeader: (params) => <span className="text-center">Order ID</span>, // this customizes how the header is rendered, in this case just centering the text
	},
	{
		// Column for customer email.
		disableColumnMenu: false,
		field: "email",
		headerName: "Email",
		align: "center",
		width: 250,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Email</span>,
	},
	{
		// Column for showing total amount of the order.
		disableColumnMenu: false,
		field: "totalAmount",
		headerName: "Total Amount",
		align: "center",
		width: 200,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Total Amount</span>,
	},
	{
		// Column to display order status (e.g., Pending, Shipped).
		disableColumnMenu: false,
		field: "status",
		headerName: "Status",
		align: "center",
		width: 200,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Status</span>,
	},
	{
		// Column for order creation date.
		disableColumnMenu: false,
		field: "date",
		headerName: "Order Date",
		align: "center",
		width: 200,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Order Date</span>,
	},
	{
		// Custom action column with an "Edit" button.
		field: "action",
		headerName: "Action",
		headerAlign: "center",
		editable: false,
		headerClassName: "text-black font-semibold text-center",
		cellClassName: "text-slate-700 font-normal",
		sortable: true,
		width: 250,
		renderHeader: (params) => <span>Action</span>,
		renderCell: (params) => {
			return (
				<div className="flex justify-center items-center space-x-2 h-full pt-2">
					<button
						onClick={() => handleEdit(params.row)}
						className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
					>
						<FaEdit className="mr-2" />
						Edit
					</button>
				</div>
			);
		},
	},
];

export const categoryTableColumn = (handleEdit, handleDelete) => [
	{
		sortable: true,
		disableColumnMenu: false,
		field: "id",
		headerName: "CategoryId",
		minWidth: 300,
		headerAlign: "center",
		editable: false,
		headerClassName: "text-black font-semibold border",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="text-center">Category ID</span>,
	},
	{
		disableColumnMenu: false,
		field: "categoryName",
		headerName: "Category Name",
		align: "center",
		width: 400,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Category Name</span>,
	},
	{
		field: "action",
		headerName: "Action",
		headerAlign: "center",
		editable: false,
		headerClassName: "text-black font-semibold text-center",
		cellClassName: "text-slate-700 font-normal",
		sortable: true,
		width: 400,
		renderHeader: (params) => <span>Action</span>,
		renderCell: (params) => {
			return (
				<div className="flex justify-center space-x-2 h-full pt-2">
					<button
						onClick={() => handleEdit(params.row)}
						className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
					>
						<FaEdit className="mr-2" />
						Edit
					</button>

					{/* Delete Button */}
					<button
						onClick={() => handleDelete(params.row)}
						className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
					>
						<FaTrashAlt className="mr-2" />
						Delete
					</button>
				</div>
			);
		},
	},
];

export const adminProductTableColumn = (
	handleEdit,
	handleDelete,
	handleImageUpload,
	handleProductView,
) => [
	{
		disableColumnMenu: false,
		sortable: true,
		field: "id",
		headerName: "ID",
		minWidth: 200,
		headerAlign: "center",
		align: "center",
		editable: false,
		headerClassName: "text-black font-semibold border",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="text-center">ProductID</span>,
	},
	{
		disableColumnMenu: false,
		field: "productName",
		headerName: "Product Name",
		align: "center",
		width: 260,
		editable: false,
		sortable: true,
		headerAlign: "center",
		headerClassName: "text-black font-semibold text-center border ",
		cellClassName: "text-slate-700 font-normal border text-center",
		renderHeader: (params) => <span>Product Name</span>,
	},

	{
		disableColumnMenu: false,
		field: "price",
		headerName: "Price",
		minWidth: 200,
		headerAlign: "center",
		align: "center",
		editable: false,
		headerClassName: "text-black font-semibold border",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="text-center">Price</span>,
	},
	{
		disableColumnMenu: false,
		field: "quantity",
		headerName: "Quantity",
		minWidth: 200,
		headerAlign: "center",
		align: "center",
		editable: false,
		headerClassName: "text-black font-semibold border",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="text-center">Quantity</span>,
	},
	{
		disableColumnMenu: false,
		field: "specialPrice",
		headerName: "Price",
		minWidth: 200,
		headerAlign: "center",
		align: "center",
		editable: false,
		headerClassName: "text-black font-semibold border",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => (
			<span className="text-center">Special Price</span>
		),
	},
	{
		sortable: true,
		field: "description",
		headerName: "Image",
		headerAlign: "center",
		align: "center",
		width: 200,
		editable: false,
		disableColumnMenu: false,
		headerClassName: "text-black font-semibold border ",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="ps-10">Description</span>,
	},
	{
		sortable: true,
		field: "image",
		headerName: "Image",
		headerAlign: "center",
		align: "center",
		width: 200,
		editable: false,
		disableColumnMenu: false,
		headerClassName: "text-black font-semibold border ",
		cellClassName: "text-slate-700 font-normal border",
		renderHeader: (params) => <span className="ps-10">Image</span>,
	},

	{
		field: "action",
		headerName: "Action",
		headerAlign: "center",
		editable: false,
		headerClassName: "text-black font-semibold text-center",
		cellClassName: "text-slate-700 font-normal",
		sortable: true,
		width: 400,
		renderHeader: (params) => <span>Action</span>,
		renderCell: (params) => {
			return (
				<div className="flex justify-center items-center space-x-2 h-full pt-2">
					<button
						onClick={() => handleImageUpload(params.row)}
						className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
					>
						<FaImage className="mr-2" />
						Image
					</button>
					<button
						onClick={() => handleEdit(params.row)}
						className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
					>
						<FaEdit className="mr-2" />
						Edit
					</button>

					<button
						onClick={() => handleDelete(params.row)}
						className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
					>
						<FaTrashAlt className="mr-2" />
						Delete
					</button>
					<button
						onClick={() => handleProductView(params.row)}
						className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
					>
						<FaEye className="mr-2" />
						View
					</button>
				</div>
			);
		},
	},
];
