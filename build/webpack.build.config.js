'use strict'
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

function resolvePath(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    mode: 'production',
    entry: {
        'bravo-vui': './packages/index.js'
    },
    output: {
        path: resolvePath('package'),
        publicPath: '/package/',
        library: 'BravoVui',
        libraryTarget: 'umd',
        umdNamedDefine: true
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
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}