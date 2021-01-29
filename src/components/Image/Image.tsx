import React from "react";

interface Props {
    src: string;
    alt: string;

    classes?: object;
    width?: number;
    height?: number;
}

const Image = ({ src, alt, width, height }: Props) => {
    let styles = {};

    if (width) styles = { ...styles, width };
    if (height) styles = { ...styles, height };

    return (
        <figure className="m-0" style={styles}>
            <img src={src} alt={alt} className="w-full h-full object-contain" />
        </figure>
    );
};

export default Image;
