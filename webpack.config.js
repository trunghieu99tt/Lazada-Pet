const multi = require("multi-loader");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: multi("css-loader", "postcss-loader"),
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
};
