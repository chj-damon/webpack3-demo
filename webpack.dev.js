const path = require('path');
// const fs = require('fs');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const AutoDllPlugin = require('autodll-webpack-plugin');
// const lessToJs = require('less-vars-to-js');

const publicPath = '/';
// antd自定义主题
// const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/assets/ant-theme-vars.less'), 'utf8'));
const themeVariables = require('./theme')();

module.exports = {
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            './src/index.jsx'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'happypack/loader?id=jsx'
                ],
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
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name].js',
            entry: {
                vendor: [
                    'react',
                    'react-dom',
                    'react-router', 
                    'redux', 
                    'react-redux', 
                    'babel-polyfill',
                    'axios',
                    'qs',
                    'moment'
                ]
            }
        }),
        new ExtractTextPlugin('styles.css'),
        // momentjs包含大量本地化代码，需筛选
        new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /zh-cn/),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: 'report.html',
        //     openAnalyzer: false,
        //     generateStatsFile: false
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), // enable HMR
        new WebpackManifestPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Webpack@3'
        })
    ],
    devtool: '#eval'
};
