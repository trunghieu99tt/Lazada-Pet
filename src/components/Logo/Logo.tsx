import React from "react";
import { Link } from "react-router-dom";

// talons
import { useRecoilValue } from "recoil";

// components
import Image from "../Image";
import LogoPlaceholder from "./LogoPlaceholder";

// states
import { SiteInfo } from "../../recoil/states/webInfo.state";

/**
 * A component that render a logo in the header
 *
 * @typedef Logo
 *
 * @param {props}
 *
 * @returns {React.Element} A react component that display a logo
 */

const width = 100;
const height = 100;

const Logo = () => {
    const siteInfo = useRecoilValue(SiteInfo);

    if (!siteInfo || !siteInfo.logo) return <LogoPlaceholder />;

    return (
        <Link to="/">
            <Image
                src={siteInfo.logo}
                width={width}
                height={height}
                alt={`${siteInfo.meta_title} logo`}
            />
        </Link>
    );
};

export default Logo;
