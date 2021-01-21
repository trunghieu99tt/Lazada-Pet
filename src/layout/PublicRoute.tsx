import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Route, Redirect, useHistory } from "react-router-dom";

// states
import { userState } from "../recoil/states/user.state";

type PublicRouteProps = {
    children: JSX.Element;
    path: string;
    exact?: boolean;
};

const PublicRoute = ({ children, ...rest }: PublicRouteProps) => {
    const user = useRecoilValue(userState);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, []);

    return (
        <Route
            {...rest}
            render={() => (!user && children) || <Redirect to="/" />}
        ></Route>
    );
};

export default PublicRoute;
