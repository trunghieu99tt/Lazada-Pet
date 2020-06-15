import React from "react";

const FormInput = ({ handleChange, label, required, ...otherProps }) => (
	<div className="group">
		{label ? (
			<label className="form-input-label">
				{label}
				{required ? "*" : ""}
			</label>
		) : null}
		<input className="form-input" onChange={handleChange} {...otherProps} />
	</div>
);

export default FormInput;
