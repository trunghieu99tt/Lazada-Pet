import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cb from "classnames";

// talons
import { useRecoilValue } from "recoil";

// utils
import { encodeStr } from "../../utils/helper";

// states
import { SiteInfo } from "../../recoil/states/webInfo.state";
import NavigationSkeleton from "./NavigationSkeleton";

// styles
import classes from "./navigation.module.css";

const Navigation = () => {
    const siteInfo = useRecoilValue(SiteInfo);

    useEffect(() => {}, [siteInfo]);

    if (!siteInfo) return <NavigationSkeleton />;

    const { menu } = siteInfo!;

    return (
        <React.Fragment>
            {menu?.length > 0 &&
                menu.map((item) => {
                    return (
                        <li
                            className={cb(
                                "relative block overflow-hidden p-2",
                                classes.item
                            )}
                        >
                            <Link
                                className="relative leading-9 text-3xl uppercase font-bold text-white"
                                to={`/${encodeStr(item)}`}
                            >
                                {item}
                            </Link>
                        </li>
                    );
                })}
        </React.Fragment>
    );
};

export default Navigation;
