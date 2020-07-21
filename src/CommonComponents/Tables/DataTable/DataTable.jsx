import { DatePicker, Modal } from "antd";
import React, { useEffect, useState } from "react";
import DataTableFooter from "./DataTableFooter";
import DataTableHeader from "./DataTableHeader";
import DataTableMain from "./DataTableMain";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

// FIXME: Sort by date is not correct.

const DataTable = ({
    viewEntry,
    dataSample,
    deleteEntry,
    tableName,
    tableHeadData,
    statusFilter,
    badges,
    options,
    searchFields,
    existDateRange,
    setCurrentPage,
    pageID,
    setID,
}) => {
    // State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [data, setData] = useState(dataSample);
    const [dateRange, setDateRange] = useState([null, null]);
    const [sortingStatus, setSortingStatus] = useState({
        name: null,
        purchasedOn: null,
        customer: null,
        shipTo: null,
        basePrice: null,
        purchasedPrice: null,
    });

    // Additional data
    const numberOfEntriesOptions = [15, 20, 25];

    // Functions
    const changePageHandler = (current) => setPage(current);
    const changePageSizeHandler = (event) => {
        const value = event.target.value;
        setPageSize(~~value);
    };

    const setDataInRangeHandler = (dateRangeParams = null) => {
        const data = dateRangeParams || dateRange;
        if (data.filter(Boolean).length) {
            const start = new Date(data[0]),
                end = new Date(data[1]);

            const newData = dataSample.filter((item) => {
                const date = new Date(item.purchasedOn);
                return date >= start && date <= end;
            });

            setData(newData);
        }
    };

    const onRangePickerChangeHandler = (value, dateString) => {
        setDateRange(dateString);
        setDataInRangeHandler(dateString);
    };

    const resetDateRangeHandler = () => {
        setDateRange([null, null]);
        setData(dataSample);
    };

    const searchHandler = (event, att) => {
        const searchQuery = event.target.value.toLowerCase();

        // Absolute search
        const searchResult =
            (searchQuery &&
                searchQuery.length > 0 &&
                data &&
                data.filter((e) =>
                    e[att].toLowerCase().includes(searchQuery)
                )) ||
            dataSample;
        setData(searchResult);
    };

    const selectFilterHandler = (event, dataSample) => {
        const newData = statusFilter(event, dataSample);
        setData(newData);
    };

    const sortDataHandler = (item) => {
        const { att, name, isDate } = item;

        const sortedData =
            data?.length &&
            data.sort((a, b) => {
                if (isDate) {
                    return new Date(a[att]) - new Date(b[att]);
                }
                return a[att] - b[att];
            });

        if (!sortingStatus[name] || sortingStatus[name] === "DESC") {
            setSortingStatus({
                ...sortingStatus,
                [name]: "ASC",
            });
        } else {
            sortedData.reverse();
            setSortingStatus({
                ...sortingStatus,
                [name]: "DESC",
            });
        }

        setData([...sortedData]);
    };

    // Life cycle
    useEffect(() => {
        setData(dataSample);
        existDateRange && setDataInRangeHandler();
    }, [dataSample]);

    // config and data processing
    const from = (page - 1) * pageSize;
    const to = Math.min(page * pageSize - 1, data.length);
    const filterData = (data && data.slice(from, to)) || [];

    const deleteModalConfig = (item) => ({
        content: <p>Are you sure to delete this {tableName} ?</p>,
        onOk() {
            deleteEntry(item);
        },
        onCancel() {},
    });

    // Console Field

    return (
        <div className="data-table">
            <div className="data-table-content">
                <DataTableHeader
                    changePageSizeHandler={changePageSizeHandler}
                    numberOfEntriesOptions={numberOfEntriesOptions}
                    onRangePickerChangeHandler={onRangePickerChangeHandler}
                    dateRange={dateRange}
                    resetDateRangeHandler={resetDateRangeHandler}
                    options={options}
                    dataSample={dataSample}
                    selectFilterHandler={selectFilterHandler}
                    searchFields={searchFields}
                    searchHandler={searchHandler}
                />

                <DataTableMain
                    tableHeadData={tableHeadData}
                    tableData={filterData}
                    badges={badges}
                    viewEntry={viewEntry}
                    deleteModalConfig={deleteModalConfig}
                    sortDataHandler={sortDataHandler}
                    setCurrentPage={setCurrentPage}
                    pageID={pageID}
                    setID={setID}
                />

                <DataTableFooter
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    changePageHandler={changePageHandler}
                    from={from}
                    to={to}
                />
            </div>
        </div>
    );
};

export default DataTable;
