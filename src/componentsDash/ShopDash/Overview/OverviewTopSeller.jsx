import { Table } from "antd";
import React from "react";

const { Column, ColumnGroup } = Table;

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Revenue",
		dataIndex: "revenue",
		key: "revenue",
		render: (text) => <p>${text}</p>,
	},
	{
		title: "Stocks status",
		key: "stocksStatus",
		dataIndex: "stocksStatus",
		render: (text) => {
			const status = {
				available: "badge-success",
				"out of stock": "badge-danger",
				"in stock": "badge-info",
			};
			const className = `badge ${status[text]}`;
			return (
				<label className={`${className} text-capitalize`}>{text}</label>
			);
		},
	},
];

const data = [
	{
		key: "1",
		name: "John Brown",
		revenue: 1000,
		stocksStatus: "available",
	},
	{
		key: "2",
		name: "John Brown",
		revenue: 1000,
		stocksStatus: "out of stock",
	},
	{
		key: "3",
		name: "John Brown",
		revenue: 1000,
		stocksStatus: "in stock",
	},
];

const OverviewTopSeller = () => {
	return (
		<section className="shopDash-overview__topSeller">
			<Table columns={columns} dataSource={data} />
		</section>
	);
};

export default OverviewTopSeller;
