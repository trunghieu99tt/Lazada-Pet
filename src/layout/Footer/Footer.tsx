import * as React from "react";
import { useRecoilValue } from "recoil";
import { SiteInfo } from "../../recoil/states/webInfo.state";

type FooterProps = {};

const Footer = (props: FooterProps) => {
    const siteInfo = useRecoilValue(SiteInfo);

    return <footer></footer>;
};

export default Footer;
