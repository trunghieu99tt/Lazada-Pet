import React from "react";
import styled from "styled-components";

const Card1 = ({ icon, name, number }) => {
	return (
		<article className="col-md-6 col-lg-3 grid-margin stretch-card">
			<div className="card">
				<div className="card-body">
					<div className="d-flex align-items-center justify-content-center">
						{icon}
						<div className="ml-3">
							<p className="mb-0">{name}</p>
							<CardNumber>{number}</CardNumber>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

const CardNumber = styled.p`
	font-size: 15px;
	font-weight: bold;
`;

export default Card1;
