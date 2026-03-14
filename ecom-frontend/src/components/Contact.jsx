import {FaEnvelopeOpen, FaMapMarkedAlt, FaPhone} from "react-icons/fa";

const Contact = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen py-12">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
				<h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
				<p className="text-gray-600 text-center mb-4">
					Have questions? Reach out to us directly or please fill out the form
					below!
				</p>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							required
							className="mt-1 block w-full border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							required
							className="mt-1 block w-full border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							rows="4"
							required
							className="mt-1 block w-full border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus: ring-blue-500"
						/>
					</div>
					<button
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-300"
						type="submit"
					>
						Send Message
					</button>
				</form>

				<div className="mt-8 text-center">
					<h2 className="font-semibold text-lg">Contact Information</h2>
					<div className="flex flex-col items-center space-y-2 mt-4">
						<div className="flex text-center items-center">
							<FaPhone className="text-blue-500 mr-2" />
							<span className="text-gray-600">: +91-9989665880</span>
						</div>

						<div className="flex text-center items-center">
							<FaEnvelopeOpen className="text-blue-500 mr-2" />
							<span className="text-gray-600">
								: abhishekdixit8228@gmail.com
							</span>
						</div>

						<div className="flex text-center items-center">
							<FaMapMarkedAlt className="text-blue-500 mr-2" />
							<span className="text-gray-600">: My Hostel Rooms, Pune</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
