import { faEdit, faSort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const { confirm } = Modal;

const DataTableMain = ({
    tableHeadData,
    tableData,
    badges,
    deleteModalConfig,
    sortDataHandler,
    prefix,
}) => {
    const tableHead = tableHeadData.map(
        ({ width, name, sortable, att, isDate }) => {
            return (
                <th
                    className="sorting"
                    key={name}
                    style={{ width }}
                    onClick={
                        sortable
                            ? () => sortDataHandler({ att, name, isDate })
                            : null
                    }
                >
                    {name}
                    {sortable && <FontAwesomeIcon icon={faSort} />}
                </th>
            );
        }
    );

    const attributes =
        tableHeadData?.length > 0 && tableHeadData.map((e) => e.att);

    return (
        <div className="table-responsive data-table-main">
            <div className="row">
                <div className="col-sm-12">
                    <table
                        id="order-listing"
                        className="table dataTable no-footer"
                        role="grid"
                        aria-describedby="order-listing_info"
                    >
                        <thead>
                            <tr role="row">{tableHead}</tr>
                        </thead>
                        <tbody>
                            {tableData?.length > 0 &&
                                tableData.map((item) => {
                                    const values = Object.entries(item)
                                        .map((item) => {
                                            if (attributes.includes(item[0]))
                                                return item[1];
                                            return null;
                                        })
                                        .filter((e) => e !== null);

                                    console.log("values", values);

                                    const badgeClass =
                                        badges?.length > 0 &&
                                        badges.find(
                                            (e) => e[0] === item.status
                                        );

                                    return (
                                        <tr
                                            role="row"
                                            className="odd data-table-main__row"
                                            key={`${item.name}-${item.id}`}
                                        >
                                            {values?.length > 0 &&
                                                values.map((e, idx) => {
                                                    return (
                                                        <td key={e}>
                                                            {((idx <
                                                                values.length -
                                                                    1 ||
                                                                !badges) &&
                                                                e) || (
                                                                <label
                                                                    className={`badge ${badgeClass[1]}`}
                                                                >
                                                                    {e}
                                                                </label>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            <td>
                                                <Link
                                                    to={`/shop-dash/${prefix}/${values?.[0]}`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="data-table-icons"
                                                    />
                                                </Link>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="data-table-icons"
                                                    onClick={() => {
                                                        confirm(
                                                            deleteModalConfig(
                                                                item
                                                            )
                                                        );
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataTableMain;
