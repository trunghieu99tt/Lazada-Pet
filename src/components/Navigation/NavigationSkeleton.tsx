import React from "react";

const NavigationSkeleton = () => {
    return (
        <nav>
            {[...Array(6)].map((e, idx) => (
                <li key={`navigation-item-skeleton-${idx}`}>Test</li>
            ))}
        </nav>
    );
};

export default NavigationSkeleton;
