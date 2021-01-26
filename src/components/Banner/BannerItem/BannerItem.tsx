import React from "react";
import { Link } from "react-router-dom";

type BannerItemProps = {
    background: string;
    image?: string;
    title?: string;
    description?: string;
    url?: string;
};

const BannerItem = ({
    background,
    description,
    title,
    url,
    image,
}: BannerItemProps) => {
    return (
        <article
            className="h-screen"
            style={{
                background: `url(${background})`,
                backgroundSize: "cover",
            }}
        >
            <div className="container h-full">
                <div className="flex h-full items-center">
                    <div className="md:w-full lg:w-1/2">
                        <div className="text-8xl text-white font-black mb-2">
                            {title || ""}
                        </div>

                        <div className="text-3xl text-white mb-1">
                            {description}
                        </div>

                        <Link to={url!} className="button--1">
                            View More
                        </Link>
                    </div>
                    <div className="w-1/2 md:hidden">
                        <figure className="m-0">
                            <img src={image} alt={title} />
                        </figure>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BannerItem;
