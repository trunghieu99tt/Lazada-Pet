import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SearchDash from "../../componentsWeb/SmallComponents/SearchDash";

const DataTable = () => {
	return (
		<div className="data-table">
			<div className="data-table-content">
				<header className="data-table-header">
					<div className="row">
						<div className="col-md-6">
							<span className="data-table-select-container">
								Show
								<select
									name="order-listing_length"
									aria-controls="order-listing"
									class="data-table-select"
								>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="-1">All</option>
								</select>
								Entries
							</span>
						</div>
						<div className="col-md-6">
							<SearchDash />
						</div>
					</div>
				</header>
				<div className="table-responsive data-table-main">
					<div class="row">
						<div class="col-sm-12">
							<table
								id="order-listing"
								class="table dataTable no-footer"
								role="grid"
								aria-describedby="order-listing_info"
							>
								<thead>
									<tr role="row">
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Order #: activate to sort column ascending"
											style={{ width: "117px" }}
										>
											Order #
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Purchased On: activate to sort column ascending"
											style={{ width: "190px" }}
										>
											Purchased On
										</th>
										<th
											class="sorting_desc"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Customer: activate to sort column ascending"
											aria-sort="descending"
											style={{ width: "139px" }}
										>
											Customer
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Ship to: activate to sort column ascending"
											style={{ width: "111px" }}
										>
											Ship to
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Base Price: activate to sort column ascending"
											style={{ width: "152px" }}
										>
											Base Price
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Purchased Price: activate to sort column ascending"
											style={{ width: "213px" }}
										>
											Purchased Price
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Status: activate to sort column ascending"
											style={{ width: "115px" }}
										>
											Status
										</th>
										<th
											class="sorting"
											tabIndex="0"
											aria-controls="order-listing"
											rowspan="1"
											colspan="1"
											aria-label="Actions: activate to sort column ascending"
											style={{ width: "122px" }}
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									<tr role="row" class="odd">
										<td class="">10</td>
										<td>2003/12/26</td>
										<td class="sorting_1">Tom</td>
										<td>Germany</td>
										<td>$1100</td>
										<td>$2300</td>
										<td>
											<label class="badge badge-danger">
												Pending
											</label>
										</td>
										<td>
											<FontAwesomeIcon
												icon={faEdit}
												className="data-table-icons"
											/>
											<FontAwesomeIcon
												icon={faTrash}
												className="data-table-icons"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
