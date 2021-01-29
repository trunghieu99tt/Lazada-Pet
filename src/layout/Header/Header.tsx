import React from "react";

// *components
import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";

const Header = () => {
    return (
        <header className="fixed z-10 w-full">
            <div className="container m-auto">
                <div className="flex justify-between items-center">
                    <Logo />
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
