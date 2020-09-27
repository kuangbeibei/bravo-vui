'use strict'
const path = require('path');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolvePath(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        'bravovui': './packages/index.js'
    },
    output: {
        path: resolvePath('lib'),
        publicPath: '/lib/',
        library: 'BravoVui',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'bravo-vui-common.js'
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/bravo-vui.min.css'
        })
    ]
}) 
