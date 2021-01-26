import React from "react";
import { useRecoilValue } from "recoil";

// components
import Slider from "../Slider";

// states
import { BannerState } from "../../recoil/states/banners.state";
import BannerItem from "./BannerItem";
import { useBanner } from "../../talons/useBanner";
import BannerSkeleton from "./BannerSkeleton";

const settings = {
    draggable: true,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
    autoplay: false,
};

const Banner = () => {
    const banners = useRecoilValue(BannerState);

    const { isLoading, error } = useBanner();   

    if (isLoading) return <BannerSkeleton />;

    if (error || (!isLoading && (!banners || !banners.length))) return null;

    const children = banners!.map((banner) => {
        return <BannerItem {...banner} />;
    });

    return (
        <section className="">
            <Slider settings={settings}>{children}</Slider>
        </section>
    );
};

export default Banner;
