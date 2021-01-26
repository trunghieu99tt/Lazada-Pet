import React from "react";

const OptionsDash = ({
	options,
	name,
	disabled,
	value,
	onChange,
	defaultValue,
}) => {
	return (
		<select
			name={name}
			className="form-control options-dash"
			disabled={disabled}
			onChange={onChange}
		>
			{options &&
				options.length > 0 &&
				options.map((item) => (
					<option
						value={item}
						selected={item === defaultValue || item === value}
					>
						{item}
					</option>
				))}
		</select>
	);
};

export default OptionsDash;
