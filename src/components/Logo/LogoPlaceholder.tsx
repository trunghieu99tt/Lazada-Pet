import React from "react";

// components
import Image from "../Image";

// image
import LogoImage from "../../static/images/logo.svg";

interface Props {}

/**
 * A component that render a logo in the header
 *
 * @typedef LogoPlaceholder
 *
 * @param {props}
 *
 * @returns {React.Element} A react component that display a placeholder for logo
 */

const LogoPlaceholder = (props: Props) => {
    return <Image src={LogoImage} alt="logo placeholder" />;
};

export default LogoPlaceholder;
