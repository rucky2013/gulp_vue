var path = require('path')
var pkg  = require('../package')

var PUBLIC = 'public'
var DIST = 'dist'
var SRC = 'src'

var timestamp = Date.now();

var config = {
    version: '0.1.0',
    root: SRC,
    static: 'static',
    build:{
        dest: DIST,
    },
    dev: {
        dest: PUBLIC,
    },
    CDN: {
        cdn: '',
        exec: '',
        css: {
            extensions: ['png','jpg','jpeg','gif'],
            version:timestamp
        },
        img: {},
        script: {},
        link: {}
    },
    tasks: {
        browserSync: {
            port: 8888,     // 服务器端口
            open: true,     // 是否自动打开浏览器
            server: {
                baseDir: "./" + PUBLIC,    // 服务器文件夹
                index: "views/index.html", // 默认主页
            },
            // proxy: {
            //     target: ''          // 代理
            // },
            https: false,           // 是否开启https
            logPrefix: pkg.name,        // 自定义日志前缀
            browser: ['google chrome']      // 默认打开的浏览器  其他值： firefox
        },
        html: {
            src: 'views',         // 入口文件夹
            dest:'./',
            htmlmin: {
                removeComments: true,
                collapseWhitespace: false,
                removeEmptyAttributes: true,
                collapseBooleanAttributes: true,
            },
            htmlInsert: {
                css:{
                    path: 'src/static',
                    output: '../static',
                    compress: true,
                    version: 'hash'
                },
                js:{
                    path: 'src/static',
                    output: '../static/js',
                    compress: true,
                    version: 'hash'
                }
            },
            extensions: ['html']
        },
        js: {
            src: 'views',
            dest:'js',
            uglify: {

            },
            "extensions": ["js","vue"]
        },
        css: {
            src:['assets/less','assets/css','static/css'],
            dest:'css',
            minifyCss: {
                compatibility: 'ie10'
            },
            postcss: {
                autoprefixer: ['last 2 version'],
                px2rem: {
                    remUnit:75
                }
            },
            ingoreFold: ['assets/less/lib','assets/less/func'],
            extensions: ['css','less']
        },
        images: {
            src: 'images',
            dest: 'images',
            imagemin: {
                optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            },
            extensions: ['jpg','jpeg','png','gif','webp']
        },

    },
};

module.exports = config;
