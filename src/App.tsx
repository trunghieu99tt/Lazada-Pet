import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

// * components
import PublicRoute from "./layout/PublicRoute";
import Loader from "./components/Loader";

const App = () => {
    const [init, setInit] = useState<boolean | null>(true);

    if (init) return <Loader />;

    return (
        <Switch>
            {/* <PublicRoute path="/">
                <Home />
            </PublicRoute> */}
        </Switch>
    );
};

export default App;
