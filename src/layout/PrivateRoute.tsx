import React from "react";
import { useRecoilValue } from "recoil";

import { Redirect, Route } from "react-router-dom";

// states
import { userState } from "../recoil/states/user.state";

type PrivateRouteProps = {
    children: JSX.Element;
    path: string;
    exact?: boolean;
};

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
    const user = useRecoilValue(userState);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
