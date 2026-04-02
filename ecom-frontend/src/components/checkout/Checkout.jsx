import {Stepper} from "@mui/material";
import {Step} from "@mui/material";
import {StepLabel} from "@mui/material";
import {useState} from "react";
import AddressInfo from "./AddressInfo";

const Checkout = () => {

	const [activeStep, setActiveStep] = useState(0);
	const steps = ["Address", "Payment Method", "Order summary", "Payment"];

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
