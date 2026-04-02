import {Stepper} from "@mui/material";
import {Step} from "@mui/material";
import {StepLabel} from "@mui/material";
import {useEffect, useState} from "react";
import AddressInfo from "./AddressInfo";
import { useDispatch } from "react-redux";
import { getUserAddresses } from "../../store/actions";

const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const dispatch = useDispatch();
	
	const steps = ["Address", "Payment Method", "Order summary", "Payment"];

	useEffect(() => {
		dispatch(getUserAddresses());
	}, [dispatch]);

	return (
		<div className="py-14 min-h-[calc(100h-100px)]">
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label, index) => (
					<Step key={index}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>

			<div className="mt-5">
				{activeStep === 0 && <AddressInfo />}
				{activeStep === 1 && <PaymentMethod />}
				{activeStep === 2 && <OrderSummary />}
				{activeStep === 3 && <Payment />}
			</div>
		</div>
	);
};

export default Checkout;
