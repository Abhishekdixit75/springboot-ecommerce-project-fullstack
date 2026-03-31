import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {AiOutlineLogin} from "react-icons/ai";
import InputField from "../shared/InputField";
import {useDispatch} from "react-redux";
import toast from "react-hot-toast";
import {authenticateSignInUser} from "../../store/actions";
import Spinners from "../shared/Spinners";

const LogIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({mode: "onTouched"});

	const loginHandler = async (data) => {
		dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
			<form
				onSubmit={handleSubmit(loginHandler)}
				className="sm:w-112.5 w-90 shadow-custom py-8 sm:px-8 px-4 rounded-md"
			>
				<div className="flex flex-col items-center justify-center space-y-4">
					<AiOutlineLogin className="text-slate-800 text-5xl" />
					<h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-3xl font-bold">
						Login Here
					</h1>
				</div>
				<hr className="mt-2 mb-5 text-black" />
				<div>
					<InputField
						label="Username"
						required
						id="username"
						type="text"
						message="*Username is required"
						register={register}
						errors={errors}
						placeholder="Enter your username"
					/>
					<InputField
						label="Password"
						required
						id="password"
						type="password"
						message="*Password is required"
						register={register}
						errors={errors}
						placeholder="Enter your password"
					/>
				</div>

				<button
					disabled={loader}
					className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-950 transition-colors duration-600 rounded-sm my-3"
				>
					{loader ? (
						<>
							{" "}
							<Spinners /> Loading{" "}
						</>
					) : (
						"Login"
					)}
				</button>

				<p>
					Don't have an account ?
					<Link
						className="font-semibold underline hover:text-black"
						to="/register"
					>
						<span>SignUp</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LogIn;
