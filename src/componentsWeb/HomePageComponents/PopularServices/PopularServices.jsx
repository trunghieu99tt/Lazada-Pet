import React, { Component } from "react";
import { parseData2 } from "../../../utils/helper";
import Card4 from "../../Cards/Card4";

class PopularServices extends Component {
	state = {};

	render() {
		const { popularServices } = this.props;

		const popularServicesData = parseData2(popularServices);

		return (
			<section className="home-popular-services">
				<header className="component-header home-popular-services-header">
					<h2 className="component-heading">Popular Services</h2>
					<p className="component-description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Tempore repellendus ab repellat sit soluta consequuntur
						obcaecati veniam aliquam. Rerum suscipit nam nisi
						dignissimos soluta nulla illum, voluptas sequi obcaecati
						molestiae.
					</p>
				</header>

				<div className="home-popular-services-content">
					{popularServicesData &&
						popularServicesData.length &&
						popularServicesData.map((item) => {
							return (
								<Card4
									name={(item && item.name) || ""}
									imageURL={(item && item.imageURL) || ""}
								/>
							);
						})}
				</div>
			</section>
		);
	}
}

export default PopularServices;
