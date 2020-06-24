import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import SearchDash from "../../../componentsWeb/SmallComponents/SearchDash";
import SelectBoxDash from "../../../componentsWeb/SmallComponents/SelectBoxDash";

const { RangePicker } = DatePicker;

const DataTableHeader = ({
	changePageSizeHandler,
	numberOfEntriesOptions,
	onRangePickerChangeHandler,
	dateRange,
	resetDateRangeHandler,
	options,
	dataSample,
	selectFilterHandler,
	searchFields,
	searchHandler,
}) => {
	return (
		<header className="data-table-header">
			<div className="row align-items-center">
				<span className="data-table-select-container">
					Show
					<SelectBoxDash
						name="number_of_entries"
						className="data-table-select"
						onChangeHandler={changePageSizeHandler}
						options={numberOfEntriesOptions}
						defaultValue={15}
					/>
					Entries
				</span>
				<RangePicker
					onChange={onRangePickerChangeHandler}
					value={
						dateRange.filter(Boolean).length
							? [moment(dateRange[0]), moment(dateRange[1])]
							: null
					}
				/>
				{dateRange && dateRange.filter(Boolean).length > 0 && (
					<button
						className="btn btn-success ml-3"
						onClick={resetDateRangeHandler}
					>
						Reset Date Range
					</button>
				)}
				{options && (
					<SelectBoxDash
						name="status"
						className="data-table-select"
						onChangeHandler={(event) =>
							selectFilterHandler(event, dataSample)
						}
						options={options}
						defaultValue={options?.length > 0 && options[0]}
					/>
				)}
				{searchFields?.length > 0 &&
					searchFields.map(({ name, attribute }) => {
						return (
							<SearchDash
								name={name}
								handleOnChange={(e) =>
									searchHandler(e, attribute)
								}
							/>
						);
					})}
			</div>
		</header>
	);
};

export default DataTableHeader;
