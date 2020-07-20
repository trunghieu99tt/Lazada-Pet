import React, { useState, useEffect } from "react";
import { API_URL_1 } from "../../variables";
import Axios from "axios";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import { Pagination } from "antd";
import SearchDash from "../../componentsWeb/SmallComponents/SearchDash";

const UserOrderList = ({ setID, setCurrentPage }) => {
    const [data, setData] = useState(null);
    const [initialData, setInitialData] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const id = 1;
        const response = await Axios.get(`${API_URL_1}/users/${id}/orders?`);
        setData(response?.data);
        setInitialData(response?.data);
    };

    const changePagination = (current) => setPage(current);

    const handleSearchInput = (event) => {
        const { value } = event.target;
        const searchResult = initialData?.filter((item) => {
            const name = item?.name?.toLowerCase();
            return name.includes(value.toLowerCase());
        });
        setData(searchResult);
    };

    if (!data) return <Loader1 />;

    const from = pageSize * (page - 1);
    const to = Math.min(pageSize * page, data.length);
    const showData = data?.slice(from, to);

    return (
        <section className="userOrdersList">
            <header className="userOrdersList-header">
                <h3>Orders List ({initialData?.length || 0})</h3>

                <SearchDash
                    name="Search Order by id, name,..."
                    handleOnChange={handleSearchInput}
                />
            </header>

            {(showData?.length > 0 &&
                showData.map((item) => (
                    <div
                        className="group-container userOrdersList-item"
                        deliverystatus="Delivering"
                    >
                        <figure className="userOrdersList-item__image-container">
                            <img
                                src={item.picture}
                                alt={item.name}
                                className="userOrdersList-item__image"
                            />
                        </figure>
                        <p className="userOrdersList-item__name">
                            <p>Name</p>
                            <p>{item.name}</p>
                        </p>
                        <p className="userOrdersList-item__price">
                            <p>Price</p>
                            <p>{item.price}$</p>
                        </p>
                        <p className="userOrdersList-item__amount">
                            <p>Amount</p>
                            <p>{item.amount}</p>
                        </p>
                        <p className="userOrdersList-item__total">
                            <p>Total</p>
                            <p>{item.price * item.amount}$</p>
                        </p>

                        <button
                            className="button--1"
                            onClick={() => {
                                setID(item.id);
                                setCurrentPage(3);
                            }}
                        >
                            View Order
                        </button>
                    </div>
                ))) || <p>No result found</p>}

            {data?.length > pageSize && (
                <div>
                    <Pagination
                        key={data.length}
                        defaultCurrent={1}
                        total={data?.length || 0}
                        defaultPageSize={pageSize}
                        current={page}
                        onChange={changePagination}
                    />
                </div>
            )}
        </section>
    );
};

export default UserOrderList;
