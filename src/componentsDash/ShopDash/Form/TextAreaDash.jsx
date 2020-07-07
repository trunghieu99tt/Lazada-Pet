import React from "react";

const TextAreaDash = ({ id, name, disabled }) => {
	return (
		<div className="form-group">
			<label htmlFor={id}>{name}</label>
			<textarea
				className="form-control"
				id={id}
				rows="2"
				disabled={disabled}
			></textarea>
		</div>
	);
};

export default TextAreaDash;
