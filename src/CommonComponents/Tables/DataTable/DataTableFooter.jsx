import { Pagination } from "antd";
import React from "react";

const DataTableFooter = ({
	data,
	page,
	pageSize,
	changePageHandler,
	from,
	to,
}) => {
	return (
		<footer className="data-table-footer">
			<div className="row">
				<div className="col-md-5">
					{(data?.length > 0 && (
						<p>
							Showing {from + 1} to {to} of {data.length} entries
						</p>
					)) || <p>No entry</p>}
				</div>
				<div className="col-md-7 d-flex">
					<Pagination
						key={data.length}
						curr={page}
						total={data.length}
						pageSize={pageSize}
						onChange={changePageHandler}
						className="ml-auto"
					/>
				</div>
			</div>
		</footer>
	);
};

export default DataTableFooter;
