import React from "react";

const UserStatistic = () => {
    
    
    
    return (
        <section className="userStatistic">
            <section className="row userStatistic-cards">
                <article className="col-md-4 userStatistic-orderStatistic">
                    <p>Total Orders</p>
                    <p></p>
                </article>
                <article className="col-md-4 userStatistic-reviewsStatistic">
                    <p>Total Reviews</p>
                    <p></p>
                </article>
                <article className="col-md-4 userStatistic-expense">
                    <p>Expenses</p>
                    <p></p>
                </article>
            </section>
        </section>
    );
};

export default UserStatistic;
