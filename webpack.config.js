/*
 * @Author: leobaixinxin 
 * @Date: 2018-01-18 22:46:36 
 * @Last Modified by: leobaixinxin
 * @Last Modified time: 2018-01-28 10:54:43
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//
var getHtmlConfig = function(name,title){
    return {
                title:title,
                template:"./src/view/"+name+".html",
                filename:"view/"+name+".html",
                inject:true,
                hash:true,
                chunks:["vender","base",name],
                chunksSortMode:"dependency"
           }
    
}
var config = {
    entry:{
        'vender':['jquery'],
        'base':['./src/page/common/index.js',
        './src/page/common/common.js',
        './src/page/module.js'
        ],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output:{
        path:'./dist',
        filename:'js/[name].js',
        publicPath:'/dist'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders:[
            {
                test:   /\.css$/,
                // exclude: /node_modules|bootstrap/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader"),
            },
            {
                test:   /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                // exclude: /node_modules|bootstrap/,
                loader: "url-loader?limit=200&name=resource/[name].[ext]",
            }
        ]

    },
    plugins:[

        //独立通用模块到js文件夹下
        new webpack.optimize.CommonsChunkPlugin({
            names:['base','vender'],
            filename: 'js/[name].js'
        }),
        
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),

        // html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登陆')),
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.base.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;