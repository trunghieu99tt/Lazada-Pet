import React from "react";

const SmallSearch = ({ handleSearch, handleChangeSearch, value, required }) => {
    return (
        <form onSubmit={handleSearch} className="custom-search">
            <input
                className="custom-search-input"
                type="text"
                value={value}
                onChange={handleChangeSearch}
                placeholder="Search Products..."
                required={required}
            />
            <button type="submit" style={{ border: "none" }}>
                <figure className="custom-search-image-container">
                    <img
                        className="custom-search-image"
                        src={require("../../static/images/search.svg")}
                        alt="search"
                    />
                </figure>
            </button>
        </form>
    );
};

export default SmallSearch;
