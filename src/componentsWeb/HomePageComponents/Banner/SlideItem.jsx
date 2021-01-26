import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as shopDashTypes from "../../../redux/darshboard/shop/shop.types";

const SlideItem = ({ background, image, title, description, url }) => {
    

    return (
        <div
            className="slide-item"
            style={{
                background: `url(${background})`,
                backgroundSize: "cover",
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="slide-item__title">{title}</div>

                        <div className="slide-item__description">
                            {description}
                        </div>

                        <div>
                            <a href={url} className="button--1">
                                Xem thêm
                            </a>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <img src={image} alt={title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideItem;
