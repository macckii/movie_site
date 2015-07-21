module.exports = {
    entry: "./js/scripts.js",
    output: {
        path: "public/assets",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};