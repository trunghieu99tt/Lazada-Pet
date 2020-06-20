import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Modal, Pagination } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SearchDash from "../../componentsWeb/SmallComponents/SearchDash";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const DataTable = ({ viewOrder, dataSample, deleteOrder }) => {
	// State
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(15);
	const [data, setData] = useState(dataSample);
	const [dateRange, setDateRange] = useState([null, null]);

	// Additional data
	const options = [
		["Pending", "badge-danger"],
		["Processing", "badge-info"],
		["Completed", "badge-success"],
	];

	// Functions
	const changePage = (current) => setPage(current);
	const changePageSize = (event) => {
		const value = event.target.value;
		setPageSize(~~value);
	};

	const setDataInRange = (dateRangeParams = null) => {
		const data = dateRangeParams || dateRange;
		if (data.filter(Boolean).length) {
			const start = new Date(data[0]),
				end = new Date(data[1]);

			const newData = dataSample.filter((item) => {
				const date = new Date(item.purchasedOn);
				return date >= start && date <= end;
			});

			setData(newData);
		}
	};

	const onRangePickerChange = (value, dateString) => {
		console.log("value", value);
		setDateRange(dateString);
		setDataInRange(dateString);
	};

	const resetDateRange = () => {
		setDateRange([null, null]);
		setData(dataSample);
	};

	// Life cycle
	useEffect(() => {
		setData(dataSample);
		setDataInRange();
	}, [dataSample]);

	// config and data processing
	const from = (page - 1) * pageSize;
	const to = Math.min(page * pageSize - 1, data.length);
	const filterData = data.slice(from, to);

	const deleteModalConfig = (item) => ({
		content: <p>Are you sure to delete this order ?</p>,
		onOk() {
			deleteOrder(item);
		},
		onCancel() {},
	});

	// Console Field

	return (
		<div className="data-table">
			<div className="data-table-content">
				<header className="data-table-header">
					<div className="row">
						<div className="col-md-6 d-flex align-items-center justify-content-between">
							<span className="data-table-select-container">
								Show
								<select
									name="order-listing_length"
									aria-controls="order-listing"
									className="data-table-select"
									onChange={changePageSize}
								>
									<option value="15">15</option>
									<option value="20">20</option>
									<option value="25">25</option>
								</select>
								Entries
							</span>
							<RangePicker
								onChange={onRangePickerChange}
								value={
									dateRange.filter(Boolean).length
										? [
												moment(dateRange[0]),
												moment(dateRange[1]),
										  ]
										: null
								}
							/>
							{dateRange && dateRange.filter(Boolean).length > 0 && (
								<button
									className="btn btn-success ml-3"
									onClick={resetDateRange}
								>
									Reset Date Range
								</button>
							)}
						</div>
						<div className="col-md-6">
							<SearchDash />
						</div>
					</div>
				</header>
				<div className="table-responsive data-table-main">
					<div className="row">
						<div className="col-sm-12">
							<table
								id="order-listing"
								className="table dataTable no-footer"
								role="grid"
								aria-describedby="order-listing_info"
							>
								<thead>
									<tr role="row">
										<th
											className="sorting"
											style={{ width: "117px" }}
										>
											Order #
										</th>

										<th
											className="sorting"
											style={{ width: "117px" }}
										>
											Name
										</th>

										<th
											className="sorting"
											style={{ width: "117px" }}
										>
											Type
										</th>

										<th
											className="sorting"
											style={{ width: "190px" }}
										>
											Purchased On
										</th>
										<th
											className="sorting_desc"
											style={{ width: "139px" }}
										>
											Customer
										</th>
										<th
											className="sorting"
											style={{ width: "111px" }}
										>
											Ship to
										</th>
										<th
											className="sorting"
											style={{ width: "152px" }}
										>
											Base Price
										</th>
										<th
											className="sorting"
											style={{ width: "213px" }}
										>
											Purchased Price
										</th>
										<th
											className="sorting"
											style={{ width: "115px" }}
										>
											Status
										</th>
										<th
											className="sorting"
											style={{ width: "122px" }}
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{filterData?.length > 0 &&
										filterData.map((item) => {
											const values = Object.values(item);
											const badgeClass = options.find(
												(e) => e[0] === item.status
											);

											return (
												<tr role="row" className="odd">
													{values?.length > 0 &&
														values.map((e, idx) => {
															if (
																idx <
																values.length -
																	1
															)
																return (
																	<td>{e}</td>
																);
															return (
																<td>
																	<label
																		className={`badge ${badgeClass[1]}`}
																	>
																		{e}
																	</label>
																</td>
															);
														})}
													<td>
														<FontAwesomeIcon
															icon={faEdit}
															className="data-table-icons"
															onClick={() => {
																viewOrder(item);
															}}
														/>
														<FontAwesomeIcon
															icon={faTrash}
															className="data-table-icons"
															onClick={() => {
																confirm(
																	deleteModalConfig(
																		item
																	)
																);
															}}
														/>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<footer className="data-table-footer">
					<div className="row">
						<div className="col-md-5">
							<p>
								Showing {from + 1} to {to} of {data.length}{" "}
								entries
							</p>
						</div>
						<div className="col-md-7 d-flex">
							<Pagination
								key={data.length}
								curr={page}
								total={data.length}
								pageSize={pageSize}
								onChange={changePage}
								className="ml-auto"
							/>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default DataTable;
