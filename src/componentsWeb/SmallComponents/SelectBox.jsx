import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SelectBox = ({ value, orderBy }) => {
	const [isShownSelection, setIsShownSelection] = useState(false);

	const toggleShowSelection = () => setIsShownSelection(!isShownSelection);

	const onClickEvents = (value) => {
		toggleShowSelection();
		orderBy(value);
	};

	return (
		<div className="custom-selectBox">
			<div
				className="custom-selectBox__value"
				onClick={toggleShowSelection}
			>
				<span>{value || "Default Sorting"}</span>
				<FontAwesomeIcon icon={faChevronDown} />
			</div>

			<div
				className={`custom-selectBox-options ${
					isShownSelection ? "active" : ""
				}`}
			>
				<div className="custom-selectBox-options-inner">
					<div
						value="menu_order"
						selected="selected"
						onClick={() => onClickEvents("menu_order")}
						className="custom-selectBox-option"
					>
						Default sorting
					</div>

					{/* <div
						className="custom-selectBox-option"
						onClick={() => onClickEvents("rating")}
					>
						Sort by average rating
					</div> */}
					{}
					<div
						className="custom-selectBox-option"
						onClick={() => onClickEvents("price")}
					>
						Sort by price: low to high
					</div>
					<div
						className="custom-selectBox-option"
						onClick={() => onClickEvents("price-desc")}
					>
						Sort by price: high to low
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectBox;

/* <div onClick={() => orderBy("popularity")}>
					Sort by popularity
				</div> */

/* <div onClick={() => orderBy("date")}>Sort by latest</div> */
