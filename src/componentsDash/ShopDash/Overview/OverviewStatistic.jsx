import {
	faChartArea,
	faGem,
	faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card1 from "../../../componentsDash/Cards/Card1";

const OverviewStatistic = () => {
	const sampleData = [
		{
			icon: <FontAwesomeIcon icon={faShoppingBag} className="icon-lg" />,
			name: "Daily Order",
			number: "213",
		},
		{
			icon: <FontAwesomeIcon icon={faGem} className="icon-lg" />,
			name: "Monthly Sales",
			number: "213",
		},
		{
			icon: <FontAwesomeIcon icon={faChartArea} className="icon-lg" />,
			name: "Total Revenue",
			number: "213",
		},
	];

	return (
		<section className="shopDash-overview__statistic">
			<div className="row">
				{sampleData?.length > 0 &&
					sampleData.map((item) => <Card1 {...item} />)}
			</div>
		</section>
	);
};

export default OverviewStatistic;
