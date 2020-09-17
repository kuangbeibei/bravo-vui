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
                include: resolvePath('src'),
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugn({
            template: resolvePath('public/index.html'),
            filename: 'app.html'
        }),
        new VueLoaderPlugin()
    ]
}