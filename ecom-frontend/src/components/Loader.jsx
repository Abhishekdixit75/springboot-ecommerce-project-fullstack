import {MutatingDots} from "react-loader-spinner";

const Loader = ({text}) => {
	return (
		<div className="flex justify-center items-center w-full h-[450px]">
			<div className="flex flex-col items-center">
				<MutatingDots
					visible={true}
					height="100"
					width="100"
					color="#4fa94d"
					secondaryColor="#4fa94d"
					radius="12.5"
					ariaLabel="mutating-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
                <p className="text-slate-800">
					{text ? text : 'please wait...'}
				</p>
			</div>
		</div>
	);
};

export default Loader;
