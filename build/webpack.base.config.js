'use strict'

const path = require('path');
const HtmlWebpackPlugn = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

function resolvePath(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    entry: resolvePath('src/index.js'),
    output: {
        path: resolvePath('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}