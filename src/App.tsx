import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";

// * components
import PublicRoute from "./layout/PublicRoute";
import Loader from "./components/Loader";
import Home from "./components/Home";

const App = () => {
    const [init, setInit] = useState<boolean | null>(true);
    const [loading, setLoading] = useState<boolean | null>(true);

    // if (loading) return <Loader />;

    return (
        <Switch>
            <PublicRoute path="/">
                <Home />
            </PublicRoute>
        </Switch>
    );
};

export default App;
