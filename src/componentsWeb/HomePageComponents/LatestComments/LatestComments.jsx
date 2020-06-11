import React, { Component } from "react";
import Slider from "react-slick";
import { parseData2 } from "../../../utils/helper";
import Card6 from "../../Cards/Card6";

class LatestComments extends Component {
	render() {
		const { latestComments } = this.props;

		const latestCommentsData = parseData2(latestComments);

		return (
			<section className="component-wrapper home-latest-comments">
				<div className="row">
					<div className="col-md-6 home-latest-comments-content">
						<Slider
							draggable={true}
							slidesToScroll={1}
							infinite={true}
							speed={1000}
						>
							{latestCommentsData &&
								latestCommentsData.length > 0 &&
								latestCommentsData.map((item) => {
									const { description, title, author } = item;

									return (
										<Card6
											title={title}
											description={description}
											author={author}
										/>
									);
								})}
						</Slider>
					</div>
					<div className="col-md-6 home-latest-comments-banner"></div>
				</div>
			</section>
		);
	}
}

export default LatestComments;
