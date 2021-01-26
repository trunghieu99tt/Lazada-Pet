import React from "react";
import Footer from "../Footer";
import Header from "../Header/Header";

const BaseView = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => (props: P) => {
    return (
        <React.Fragment>
            <Header />
            <WrappedComponent {...props} />
            <Footer />
        </React.Fragment>
    );
};

export default BaseView;
