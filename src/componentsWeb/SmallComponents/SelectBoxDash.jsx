import React from "react";

const SelectBoxDash = ({
	options,
	onChangeHandler,
	className,
	name,
	defaultValue,
}) => {
	return (
		<select
			name={name}
			className={className}
			onChange={onChangeHandler}
			defaultValue={defaultValue}
		>
			{options?.length > 0 &&
				options.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
		</select>
	);
};

export default SelectBoxDash;
