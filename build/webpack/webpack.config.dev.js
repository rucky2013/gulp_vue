var webpack = require('webpack');
var baseWebpackConf = require('./webpack.config.base');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var config = require('../config');

module.exports = merge(baseWebpackConf,{
    devtools: '#eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin('common.js'),

        new ExtractTextPlugin(path.join("../../../src/assets",'css','/[name].css')),
    ],
    watch:false,
});
