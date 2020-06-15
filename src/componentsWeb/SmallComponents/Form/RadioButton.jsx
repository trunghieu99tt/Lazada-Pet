import React from "react";

const RadioButton = ({ label, name, id, value, handleOnChange }) => {
	return (
		<div class="form__radio-group">
			<input
				class="form__radio-input"
				type="radio"
				name={name}
				id={id}
				value={value}
			/>
			<label htmlFor={id} class="form__radio-label">
				<span class="form__radio-button"></span>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
