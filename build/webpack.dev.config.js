'use strict'

const path = require('path');
const HtmlWebpackPlugn = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

function resolvePath(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: resolvePath('dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugn({
            template: resolvePath('public/index.html'),
            filename: 'app.html'
        }),
    ]
})
