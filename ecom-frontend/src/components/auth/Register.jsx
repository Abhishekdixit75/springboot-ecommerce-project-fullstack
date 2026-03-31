import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import InputField from "../shared/InputField";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";

const Register = () => {
	const navigate = useNavigate();
    const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: {errors},
	} = useForm({mode: "onTouched"});

	const registerHandler = async (data) => {
        console.log("Register clicked");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
			<form
				onSubmit={handleSubmit(registerHandler)}
				className="sm:w-112.5 w-90 shadow-custom py-8 sm:px-8 px-4 rounded-md"
			>
				<div className="flex flex-col items-center justify-center space-y-4">
					<FaUserPlus className="text-slate-800 text-5xl" />
					<h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-3xl font-bold">
						Register Here
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
						label="Email"
						required
						id="email"
						type="email"
						message="*Email is required"
						register={register}
						errors={errors}
						placeholder="Enter your email"
					/>
					<InputField
						label="Password"
						required
						id="password"
						type="password"
                        min={6}
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
					{loader ? "logging in..." : "Register"}
				</button>

				<p>
					Already have an account ?
					<Link
						className="font-semibold underline hover:text-black"
						to="/login"
					>
						<span>LogIn</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
