import React from "react";
import Slick from "react-slick";

// talons
import { useSlider } from "../../talons/useSlider";

interface SliderProps {
    children: Array<JSX.Element> | JSX.Element | null;
    settings: object;
}

const Slider = ({ children, settings }: SliderProps) => {
    const {
        handleAfterChange,
        handleBeforeChange,
        handleOnItemClick,
    } = useSlider();

    return (
        <Slick
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
            {...settings}
        >
            {React.Children.map(children, (child) => (
                <div onClickCapture={handleOnItemClick}>{child}</div>
            ))}
        </Slick>
    );
};

export default Slider;
