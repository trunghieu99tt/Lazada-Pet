import React from "react";
import cb from "classnames";

import classes from "./loader.module.css";

const Loader = () => {
    return (
        <React.Fragment>
            <div className="fixed top-0 z-50 w-full h-screen bg-black">
                <div
                    className={cb(
                        classes.loader,
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200px h-200px"
                    )}
                >
                    {[...Array(6)].map((e, idx) => {
                        return (
                            <span
                                key={`loader-span-${idx}`}
                                className="absolute top-0 left-0 w-full h-full block animate-loader"
                                style={{
                                    animationDelay: `${200 * (idx + 1)}ms`,
                                }}
                            ></span>
                        );
                    })}
                </div>
                <svg className="w-0 h-0">
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
