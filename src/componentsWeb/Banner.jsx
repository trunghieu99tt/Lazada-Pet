import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actionTypes from "../redux/web/webs.types";
import { parseData } from "../utils/helper";
import SlideItem from "./SlideItem";

class Banner extends Component {
	componentDidMount() {
		const { slides } = this.props;
		if (!slides || slides.length === 0) {
			this.getDataSlides();
		}
	}

	getDataSlides = async () => {
		console.log("Go here");
		const { fetchSlides } = this.props;
		fetchSlides();
	};

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

const mapStateToProps = (state) => ({
	slides: state.web.slides,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSlides: () => dispatch({ type: actionTypes.FETCH_SLIDES_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
