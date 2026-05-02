const InputField = ({
	label,
	id,
	type,
	errors,
	register,
	message,
	classname,
	min,
	value,
	placeholder,
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label
				htmlFor={id}
				className={`${
					classname ? classname : ""
				} font-semibold text-sm text-slate-800`}
			>
				{label}
			</label>

			<input
				type={type}
				placeholder={placeholder}
				id={id}
				className={`${classname ? classname : ""} px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
					errors[id]?.message ? "border-red-500" : "border-slate-700"
				}`}
				{...register(id, {
					required: {value: true, message},

					minLength: min
						? {value: min, message: `Minimum ${min} character is required`}
						: null,

					pattern:
						type === "email"
							? {
									value:
										/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/,
									message: "Invalid email",
								}
							: type === "url"
								? {
										value:
											/^https?:\/\/(?:[\w\-]+:[\w\-]+@)?(?:(?:[\w\-]+\.)+[a-zA-Z]{2,}|localhost|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?::\d{1,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/,
										message: "Please enter a valid url",
									}
								: null,
				})}
			/>

			{errors[id]?.message && (
				<p className="text-sm font-semibold text-red-600 mt-0">
					{errors[id]?.message}
				</p>
			)}
		</div>
	);
};

export default InputField;
