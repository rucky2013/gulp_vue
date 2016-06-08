var path = require('path');
var config = require('../config');
var cssLoader = require('./css-loader');
var projectRoot = path.resolve(__dirname,'../../src')

var config = {
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../../node_modules')],
        alias: {
            'components': path.resolve(__dirname,'../../src/components'),
            'views': path.resolve(__dirname,'../../src/views'),
            'static': path.resolve(__dirname,'../../src/static'),
            'assets': path.resolve(__dirname,"../../src/assets")
        }
    },
    resolveLoader:{
        fallback: [path.join(__dirname, '../../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            // include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: path.join('../','images' ,'[name].[ext]')
            }
        }]
    },
    vue:{
        loaders:cssLoader({
            sourceMap:true,
            extract: true
        }),
    },
}

module.exports = config;
