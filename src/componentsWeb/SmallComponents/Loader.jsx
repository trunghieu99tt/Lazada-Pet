import React from "react";

const Loader = () => {
	return (
		<React.Fragment>
			<div className="loader-container">
				<div class="loader">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<svg>
					<filter id="gooey">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="10"
						></feGaussianBlur>
						<feColorMatrix
							values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10
                "
						></feColorMatrix>
					</filter>
				</svg>
			</div>
		</React.Fragment>
	);
};

export default Loader;
