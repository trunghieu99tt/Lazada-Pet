const plugin = require("tailwindcss/plugin");

module.exports = {
    theme: {
        extend: {
            transitionDelay: {
                400: "400ms",
                600: "600ms",
                800: "800ms",
                1200: "1200ms",
                1400: "1400ms",
            },
            width: {
                "200px": "200px",
            },
            height: {
                "200px": "200px",
            },
            animation: {
                loader: "loadingAnimation 3s ease-in-out infinite",
            },
            keyframes: {
                loadingAnimation: {
                    "0%": {
                        transform: "rotate(0)",
                    },
                    "50%,100%": {
                        transform: "rotate(360deg)",
                    },
                },
            },
        },
    },
    variants: {},
    plugins: [
        plugin(({ addVariant, e }) => {
            addVariant("before", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`before${separator}${className}`)}::before`;
                });
            });
            addVariant("after", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`after${separator}${className}`)}::after`;
                });
            });
        }),
    ],
    purge: {
        // Filenames to scan for classes
        content: [
            "./src/**/*.html",
            "./src/**/*.js",
            "./src/**/*.jsx",
            "./src/**/*.ts",
            "./src/**/*.tsx",
            "./public/index.html",
        ],
        // Options passed to PurgeCSS
        options: {
            // Whitelist specific selectors by name
            // safelist: [],
        },
    },
};
