import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

// Talons
import { useApp } from "./talons/useApp";

// * layout
import BaseView from "./layout/BaseView";

// * components
import Home from "./components/Home";
import Loader from "./components/Loader";

// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./app.css";

const App = () => {
    const { productLoading, siteInfoLoading } = useApp();

    if (productLoading || siteInfoLoading) return <Loader />;

    return (
        <Switch>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default BaseView(App);
