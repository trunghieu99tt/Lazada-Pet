import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import Rating from "../../componentsWeb/SmallComponents/Rating";
import { dateConverter } from "../../utils/helper";
import { API_URL_1 } from "../../variables";

const UserReviewDetail = ({ id }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await Axios.get(`${API_URL_1}/reviews/${id}/`);
		setData(response.data);
	};

	if (!data) return <Loader1 />;

	return (
		<section className="userReviewDetail">
			<div className="group-container">
				<figure className="userReviewDetail-product">
					<img
						src={data?.productImage}
						alt={data?.productName}
						className="userReviewDetail-product__image"
					/>
					<figcaption className="userReviewDetail-product__detail">
						<h3 className="userReviewDetail-product__name">
							{data?.productName}
						</h3>
						<p className="userReviewDetail-product__type">
							{data?.productType}
						</p>
						<p className="userReviewDetail-product__price">
							{Math.round(data?.productPrice)}$
						</p>
					</figcaption>
				</figure>

				<div className="userReviewDetail-content">
					<div className="row">
						<Rating rating={data?.rating} />
						<p>{dateConverter(data?.createdAt)} </p>
					</div>

					<p className="userReviewDetail-content__main">
						<FontAwesomeIcon icon={faQuoteLeft} />
						<span>{data?.reviewContent}</span>
						<FontAwesomeIcon icon={faQuoteRight} />
					</p>
				</div>
			</div>
		</section>
	);
};

export default UserReviewDetail;
