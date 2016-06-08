var webpack = require('webpack');
var baseWebpackConf = require('./webpack.config.base');
var merge = require('webpack-merge');
var cssLoader = require('./css-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');

module.exports = merge(baseWebpackConf,{
    devtools: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin(path.join("../../../src/assets",'css','/[name].css')),
    ],
    vue:{
        loaders: cssLoader({
            sourceMap: process.env.NODE_ENV !== 'production',
            extract: true,
        })
    },
    watch:false,
});
