import React, { Component } from "react";
import Slider from "react-slick";
import { parseData } from "../../../utils/helper";
import SlideItem from "./SlideItem";

class Banner extends Component {
	render() {
		const { slides } = this.props;
		const slidesData = parseData(slides);

		return (
			<section className="banner">
				<Slider
					draggable={true}
					slidesToScroll={1}
					infinite={true}
					speed={1000}
				>
					{slidesData &&
						slidesData.length > 0 &&
						slidesData.map((item) => {
							const { description, images, title, url } = item;

							return (
								<SlideItem
									background={images?.length > 0 && images[0]}
									image={images?.length > 1 && images[1]}
									title={title}
									url={url}
									description={description}
								/>
							);
						})}
				</Slider>
			</section>
		);
	}
}

export default Banner;
