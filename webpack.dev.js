const path = require('path');
// const fs = require('fs');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');

const BUILD_DIR = path.resolve(__dirname, './dist')
const APP_DIR = path.resolve(__dirname, './src');
// antd自定义主题
const themeVariables = require('./theme')();

module.exports = {
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            `${APP_DIR}/index.jsx`
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modules: [
            'node_modules',
            APP_DIR
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'happypack/loader?id=jsx'
                ],
                include: APP_DIR,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'happypack/loader?id=js'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [autoPrefixer]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                modifyVars: themeVariables
                            }
                        }    
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'jsx',
            threads: 4,
            loaders: ['react-hot-loader', 'babel-loader']
        }),
        new HappyPack({
            id: 'js',
            threads: 2,
            loaders: ['babel-loader']
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./lib/manifest.json')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: require.resolve('./lib/dll.vendor.js'),
            includeSourcemap: true
        }),
        // momentjs包含大量本地化代码，需筛选
        new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /zh-cn/),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), // enable HMR
        new WebpackManifestPlugin()
    ],
    cache: true,
    devtool: 'eval'
};
