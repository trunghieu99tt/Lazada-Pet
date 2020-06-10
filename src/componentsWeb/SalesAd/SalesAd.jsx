import React, { Component } from "react";
import { resetAnimation } from "../../utils/helper";
import SalesAdsCard from "../Cards/Card3";

class SalesAds extends Component {
	state = {
		activeCardIndex: 0,
	};

	activeCard = (idx) => {
		this.setState({ activeCardIndex: idx }, () =>
			this.resetAnimationCard(this.state.activeCardIndex)
		);
	};

	resetAnimationCard = (idx) => {
		const cardNames = document.querySelectorAll(".card3__name");
		const cardSubNames = document.querySelectorAll(".card3__subName");
		const cardDescriptions = document.querySelectorAll(
			".card3__description"
		);

		if (cardNames.length > idx) {
			resetAnimation(cardNames[idx]);
		}
		if (cardSubNames.length > idx) {
			resetAnimation(cardSubNames[idx]);
		}
		if (cardDescriptions.length > idx) {
			resetAnimation(cardDescriptions[idx]);
		}
	};

	render() {
		const { salesAds } = this.props;
		const { activeCardIndex } = this.state;
		const salesAdsData = salesAds && Object.values(salesAds);

		return (
			<React.Fragment>
				<section className="home-sales-ads">
					<div className="row">
						<div className="col-md-6 home-sales-ads-banner"></div>
						<div className="col-md-6 home-sales-ads-content">
							<div className="home-sales-ads-content-sidebar">
								{salesAdsData &&
									salesAdsData.length > 0 &&
									salesAdsData.map((_, index) => {
										return (
											<div
												className="home-sales-ads-content-sidebar__item"
												onClick={() =>
													this.activeCard(index)
												}
											>
												{index + 1}
											</div>
										);
									})}
							</div>
							{salesAdsData &&
								salesAdsData.length > 0 &&
								salesAdsData.map((item, index) => {
									return (
										<SalesAdsCard
											{...item}
											active={index === 0}
											index={index + 1}
											isActive={index === activeCardIndex}
										/>
									);
								})}
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default SalesAds;
