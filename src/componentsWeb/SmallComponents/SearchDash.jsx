import React from "react";

const SearchDash = ({ name, handleOnChange }) => {
	return (
		<input
			type="search"
			placeholder={`Search ${name}`}
			className="form-control search-dash"
			onChange = {handleOnChange}
		></input>
	);
};

export default SearchDash;
