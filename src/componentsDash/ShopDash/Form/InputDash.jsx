import React from "react";

const InputDash = ({
	name,
	labelName,
	placeHolder,
	type,
	value,
	disabled,
	onChange,
}) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{labelName}</label>
			<input
				type={type}
				className="form-control"
				name={name}
				id={name}
				placeholder={placeHolder}
				value={value}
				disabled={disabled}
				onChange={onChange}
			/>
		</div>
	);
};

export default InputDash;
