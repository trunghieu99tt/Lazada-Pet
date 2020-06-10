import React from "react";
import { Link } from "react-router-dom";
import { encodeStr } from "../../utils/helper";

const Card5 = ({ imageURL, title, shortDescription, date, hashtag }) => {
	return (
		<article className="col-md-4 card5">
			<Link to={`/news/${encodeStr(title || "")}`}>
				<figure className="card5__image-container">
					<img
						src={imageURL || ""}
						alt={title || ""}
						className="card5__image"
					/>
				</figure>
			</Link>

			<div className="card5__info">
				<div className="card5-hashtag-container">
					{hashtag &&
						hashtag.length > 0 &&
						hashtag.map((item) => (
							<div className="card5-hashtag-element">
								<img
									src={require("../../static/images/hashtag.svg")}
									alt="hashtag-logo"
									className="card5-hashtag-element__logo"
								/>
								<span className="card5-hashtag-element__name">
									{item}
								</span>
							</div>
						))}
				</div>

				<Link to={`/news/${encodeStr(title || "")}`}>
					<h5 className="card5__title">{title || ""}</h5>
				</Link>

				<p className="card5__shortDescription">
					{shortDescription || ""}
				</p>

				<Link to={`/news/${encodeStr(title || "")}`}>
					<div className="button--1">View more</div>
				</Link>
			</div>
		</article>
	);
};

export default Card5;
