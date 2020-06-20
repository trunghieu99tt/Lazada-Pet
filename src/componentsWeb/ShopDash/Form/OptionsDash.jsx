import React from "react";

const OptionsDash = ({ options, name, disabled }) => {
	return (
		<select
			name={name}
			className="form-control options-dash"
			disabled={disabled}
		>
			{options &&
				options.length > 0 &&
				options.map((item) => <option value={item}>{item}</option>)}
		</select>
	);
};

export default OptionsDash;
