const path = require("path")
const { sync } = require("glob")
const webpack = require("webpack")
const TerserPlugin = require("terser-webpack-plugin")

const outputFolder = path.resolve(__dirname, "dist")
const outputFile = "extension-bundle.js"

module.exports = {
    mode: "production",
    entry: [
        ...sync(path.join(__dirname, "./src/hacks/**/*.ts{,x}").replace(/\\/g, "/")),
        "./src/index.tsx"
    ],
    output: {
        filename: outputFile,
        path: outputFolder
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            "process.env.EXTENSION": true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset"
            }
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            react: "preact/compat",
            "react-dom": "preact/compat"
        }
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false
            })
        ]
    }
}
