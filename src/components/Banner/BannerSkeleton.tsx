import React from "react";
import Skeleton from "react-loading-skeleton";

const BannerSkeleton = () => {
    return (
        <section className="w-full">
            <Skeleton height={500} />
        </section>
    );
};

export default BannerSkeleton;
