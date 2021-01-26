import React, { useState } from "react";
import CancelIcon from "../static/images/cancel.svg";
import SearchIcon from "../static/images/search.svg";
import { useHistory, withRouter } from "react-router-dom";

const SearchTop = ({ closeSearchTop }) => {
    const [query, setQuery] = useState("");
    const history = useHistory();

    const onChangeHandler = (event) => setQuery(event.target.value);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        history.push(`/searchProduct/${query}`);
    };

    return (
        <form className="search-top" onSubmit={onSubmitHandler}>
            <input
                type="text"
                placeholder="Enter keywords..."
                value={query}
                onChange={onChangeHandler}
                className="search-top__input"
            />

            <img
                src={SearchIcon}
                alt="search-icon"
                onClick={onSubmitHandler}
                className="search-top__button search-top__button--submit"
            />

            <img
                src={CancelIcon}
                alt="cancel-icon"
                onClick={closeSearchTop}
                className="search-top__button search-top__button--cancel"
            />
        </form>
    );
};

export default withRouter(SearchTop);
