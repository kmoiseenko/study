let path = require('path');
let webpack = require('webpack');
let extractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let outputDir = process.env.NODE_ENV === 'dev' ? './dev' : './public';

let extractPlugin = new extractTextPlugin({
   filename: 'css/main.css'
});

let copyPlugin = new CopyWebpackPlugin([
    {
        from: 'index.html',
        to: ''
    }
]);

let definePlugin = new webpack.DefinePlugin({
   API_KEY: JSON.stringify('rom93FHJOFb6TF4jSC7USdH03jogPMtfg7qDHrMd')
});

module.exports = {
    context: path.resolve(__dirname, './dev/'),
    entry: {
        'js/app.js' : './js/router.jsx',
        'css/main.css': './styles/main.scss'
    },
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name]'
    },
    module: {
        rules: [
            {
                test: /\.(es6|jsx?)$/,
                exclude: /(node_modules|bower_components$)/,
                loaders: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        copyPlugin,
        definePlugin
    ],
    devServer: {
        host: "0.0.0.0",
        historyApiFallback: true,
        inline: true,
        port: 9000,
        headers: { "Access-Control-Allow-Origin": "*" },
        publicPath: 'http://0.0.0.0:9000/',
        contentBase: path.resolve(__dirname, './dev')
    }
};