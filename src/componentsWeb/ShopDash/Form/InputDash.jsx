import React from "react";

const InputDash = ({ name, labelName, placeHolder, type, value, disabled }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{labelName}</label>
			<input
				type={type}
				className="form-control"
				id={name}
				placeholder={placeHolder}
				value={value}
				disabled={disabled}
			/>
		</div>
	);
};

export default InputDash;
