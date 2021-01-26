import React from "react";
import { Link } from "react-router-dom";
import EyeGif from "../../static/images/eye.gif";
import { encodeStr } from "../../utils/helper";

const Card4 = ({ imageURL, name }) => {
	return (
		<article className="card4">
			<Link to={`/services/${encodeStr(name || "")}`}>
				<figure className="card4__image-container">
					<img src={imageURL} alt={name} className="card4__image" />

					<figcaption className="card4__extra-image">
						<img src={EyeGif} alt="eye gif" />
					</figcaption>
				</figure>
			</Link>
		</article>
	);
};

export default Card4;
