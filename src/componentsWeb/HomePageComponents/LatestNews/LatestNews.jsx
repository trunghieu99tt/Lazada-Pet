import React, { Component } from "react";
import { parseData2 } from "../../../utils/helper";
import Card5 from "../../Cards/Card5";

class LatestNews extends Component {
	render() {
		const { latestNews } = this.props;
		const latestNewsData = parseData2(latestNews);
		return (
			<section className="home-latest-news">
				<header className="component-header latest-latest-news-header">
					<h2 className="component-heading">Latest News</h2>
					<p className="component-description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Tempore repellendus ab repellat sit soluta consequuntur
						obcaecati veniam aliquam. Rerum suscipit nam nisi
						dignissimos soluta nulla illum, voluptas sequi obcaecati
						molestiae.
					</p>
				</header>

				<div className="home-latest-news-content row">
					{latestNewsData &&
						latestNewsData.length > 0 &&
						latestNewsData
							.slice(0, Math.min(latestNewsData.length, 3))
							.map((item) => {
								return <Card5 {...item} />;
							})}
				</div>
			</section>
		);
	}
}

export default LatestNews;
