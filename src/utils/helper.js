/* eslint-disable no-unused-expressions */
import axios from "axios";
import { isArray } from "jquery";
import { API_URL } from "../variables";

const resetAnimation = (el) => {
    if (el && el.style) {
        el.style.animation = "none";
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null;
    }
};

const formatDateForm = (date) => {
    // Format to Tháng ngày, năm
    // const monthName = [
    // 	"Một",
    // 	"Hai",
    // 	"Ba",
    // 	"Bốn",
    // 	"Năm",
    // 	"Sáu",
    // 	"Bảy",
    // 	"Tám",
    // 	"Chín",
    // 	"Mười",
    // 	"Mười một",
    // 	"Mười hai",
    // ];

    const monthName = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jul",
        "Jun",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const dateData = date.split("/");
    const formattedDateData = dateData.map((e, index) => {
        if (index !== 1 && e.length < 2) e = `0${e}`;

        return e;
    });

    return `${monthName[formattedDateData[1]]} ${formattedDateData[0]}, ${
        formattedDateData[2]
    }`;
};

const dateConverter = (date) => {
    const d = new Date(date);
    const convertedDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    return formatDateForm(convertedDate);
};

// hide all elements specified
const hideAllSpecifiedElements = (...el) =>
    [...el].forEach((e) => (e.style.display = "none"));

// get the scroll position of the current page
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

// Ví dụ:
getScrollPosition(); // {x: 0, y: 20}

// Scroll to top smoothly
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

// Check if the elements specified is visible in the viewport
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
              (bottom > 0 && bottom < innerHeight)) &&
              ((left > 0 && left < innerWidth) ||
                  (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// Fetch all images within an element
const getImages = (el, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName("img")].map((img) =>
        img.getAttribute("src")
    );
    return includeDuplicates ? images : [...new Set(images)];
};

// Figure out if the device is a mobile device or a desktop/laptop?
const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
        ? "Mobile"
        : "Desktop";

// Get URL Params
const getURLParameters = (url) =>
    [...new URL(url).searchParams].reduce(
        (obj, [key, value]) => (
            (obj[key] = key in obj ? [].concat(obj[key], value) : value), obj
        ),
        Object.create(null)
    );

// Encode a set of form element as an object?
const formToObject = (form) =>
    Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value,
        }),
        {}
    );

// Remove event listener from an element
const offEventListener = (element, event, func, opts = false) =>
    element.removeEventListener(event, func, opts);

// Format the given number of milliseconds
const formatTime = (ms) => {
    if (ms < 0) ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000,
    };
    return Object.entries(time)
        .filter((val) => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
        .join(", ");
};

// Ví dụ:
// formatTime(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

// Get the difference between two dates
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24);

// Ví dụ:
// getDaysDiffBetweenDates(new Date("2020-04-20"), new Date("2020-04-22")) // 2

// Remove duplicate object in array
const removeDuplicateObjectInArray = (list) =>
    list.filter((item, index) => {
        const _item = JSON.stringify(item);
        return (
            index ===
            list.findIndex((obj) => {
                return JSON.stringify(obj) === _item;
            })
        );
    });

// Copy to clipBoard
const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-99999px";
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

const toggleClass = (el, className) =>
    el && el.classList && el.classList.toggle(className);

toggleClass(document.querySelector("p.dark"), "dark"); // This will remove class dark from p element

const validateEmail = (email) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(String(email).toLowerCase());
};

const smoothScroll = (element) =>
    document.querySelector(element).scrollIntoView({ behavior: "smooth" });

const removeNonASCII = (str) => str.replace(/[^\x20-\x7E]/g, "");

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

// Example
// getStyle(document.querySelector("p"), "font-size"); // '16px'

const encodeStr = (encodeStr) => {
    try {
        encodeStr = encodeStr.toString().toLowerCase().trim();
        encodeStr = encodeStr.replace(
            /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
            "a"
        );
        encodeStr = encodeStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e");
        encodeStr = encodeStr.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        encodeStr = encodeStr.replace(
            /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g,
            "o"
        );
        encodeStr = encodeStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        encodeStr = encodeStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        encodeStr = encodeStr.replace(/đ/g, "d");

        encodeStr = encodeStr.replace(/[^\w\s]/gi, "");
        encodeStr = encodeStr.replace(/\(|\)|\:/g, "");
        encodeStr = encodeStr.replace(/\//g, "-");
        encodeStr = encodeStr.replace(/^\-+|\-+$/g, "");
        encodeStr = encodeStr.replace(/ /g, "-");
        encodeStr = encodeStr.replace(/-+-/g, "-");

        return encodeStr;
    } catch (err) {
        return "";
    }
};

const splitImageData = (images) => images.split(",");

const parseData = (data) => (data && data[Object.keys(data)]) || [];

const parseData2 = (data) =>
    (!isArray(data) && data && Object.values(data)) || data;

const uploadData = async (name, data) => {
    return await axios.post(`${API_URL}/${name}.json`, data);
};

const getRandomNumber = (from, to) => {
    return Math.round(Math.random() * (to - from) + from);
};

export {
    copyToClipboard,
    dateConverter,
    detectDeviceType,
    elementIsVisibleInViewport,
    encodeStr,
    formatDateForm,
    formatTime,
    formToObject,
    getDaysDiffBetweenDates,
    getImages,
    getScrollPosition,
    getStyle,
    getURLParameters,
    hideAllSpecifiedElements,
    offEventListener,
    removeDuplicateObjectInArray,
    removeNonASCII,
    resetAnimation,
    scrollToTop,
    smoothScroll,
    toggleClass,
    validateEmail,
    splitImageData,
    parseData,
    uploadData,
    getRandomNumber,
    parseData2,
};
