import React from "react";

const CustomButton = ({
	children,
	isGoogleSignIn,
	inverted,
	...otherProps
}) => (
	<button
		className={`${inverted ? "inverted" : ""} ${
			isGoogleSignIn ? "google-sign-in" : ""
		} form-button button--1`}
		{...otherProps}
	>
		{children}
	</button>
);

export default CustomButton;
