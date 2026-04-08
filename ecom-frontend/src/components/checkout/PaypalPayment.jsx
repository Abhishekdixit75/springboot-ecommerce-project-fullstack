import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const PaypalPayment = () => {
	return (
		<div className="h-96 flex justify-center items-center">
			<Alert severity="warning" variant="filled" style={{maxWidth: "400px"}}>
				<AlertTitle>Paypal Method Unavailable</AlertTitle>
				Paypal Method is Unavailable. Please use another payment method to proceed with your order.
                <br />
                We apologize for the inconvenience and are working to resolve this issue as soon as possible.
                <br />
                Thank you for your understanding and patience.
			</Alert>
		</div>
	);
};

export default PaypalPayment;
