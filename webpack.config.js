const path = require('path');

module.exports = {
    context: path.resolve(__dirname, "./dev/"),
    entry: ['webpack-dev-server/client?http://localhost:9000', './js/app.jsx', './styles/main.scss'],
    output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/app.bundle.js'
    },
    devServer: {
        host: "0.0.0.0",
        historyApiFallback: true,
        inline: true,
        port: 9000,
        headers: { "Access-Control-Allow-Origin": "*" },
        publicPath: 'http://0.0.0.0:9000/',
        contentBase: path.resolve(__dirname, './public')
    },
    module: {
        loaders: [
            {
                test: /\.(es6|jsx?)$/,
                exclude: /(node_modules|bower_components$)/,
                loaders: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: "style-loader" // creates style nodes from JS strings
            },
            {
                test: /\.scss$/,
                loader: "css-loader" // translates CSS into CommonJS
            },
            {
                test: /\.scss$/,
                loader: "sass-loader" // compiles Sass to CSS
            }
        ]
    }
};