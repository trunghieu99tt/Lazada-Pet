import React from "react";

const Avatar = ({ src, className }) => {
    return (
        <figure className={className}>
            <img src={src} alt="" />
        </figure>
    );
};

export default Avatar;
