import {GiShoppingCart} from "react-icons/gi";
import { Link } from "react-router-dom";

const EmptyCart = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[800px] p-8 text-center">
			<GiShoppingCart size={56} className="text-gray-400 mb-4" />
			<div className="text-4xl font-bold text-gray-800 mb-2">
				Your Cart is Empty
			</div>
			<p className="text-gray-500 text-lg mb-6">Add items to get started</p>
			<Link
				to="/"
				className="px-6 py-2 bg-custom-blue text-white rounded-sm font-semibold hover:opacity-90 transition duration-500"
			>
				Continue Shopping
			</Link>
		</div>
	);
};

export default EmptyCart;