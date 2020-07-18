import React, { useEffect, useState } from "react";
import { API_URL_1 } from "../../variables";
import Loader1 from "../../componentsWeb/SmallComponents/Loader1";
import Axios from "axios";
import Rating from "../../componentsWeb/SmallComponents/Rating";
import { Pagination } from "antd";

const UserReviewsList = ({ setCurrentPage, setID }) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await Axios.get(`${API_URL_1}/reviews`);
        setData(response.data);
    };

    const changePagination = (current) => setPage(current);

    if (!data) return <Loader1 />;

    const from = pageSize * (page - 1);
    const to = pageSize * page;
    const currentShowData = data?.slice(from, Math.min(to, data.length));

    return (
        <section className="userReviewsList">
            <h3>Reviews List</h3>
            {currentShowData?.map((item) => (
                <article className="group-container row justify-content-between align-items-center userReviewsList-item">
                    <p>{item.productName}</p>
                    <Rating rating={item.rating} />
                    <p className="userReviewsList-item__shortDescription">
                        {item.reviewContent}
                    </p>
                    <button
                        className="button--1"
                        onClick={() => {
                            setCurrentPage(5);
                            setID(item.id);
                        }}
                    >
                        Detail
                    </button>
                </article>
            ))}

            <Pagination
                defaultCurrent={1}
                total={data?.length || 0}
                defaultPageSize={pageSize}
                current={page}
                onChange={changePagination}
            />
        </section>
    );
};

export default UserReviewsList;
