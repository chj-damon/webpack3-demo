const path = require('path');
const os = require('os');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const publicPath = '/';
const sourcedir = path.resolve(__dirname, 'src'); // 源码和资源文件的放置位置
// antd自定义主题
// const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/assets/ant-theme-vars.less'), 'utf8'));
const themeVariables = require('./theme')();

module.exports = {
    entry: {
        app: './src/index.jsx'
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
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
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
        new ExtractTextPlugin('styles.css'),
        new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /zh-cn/),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ParallelUglifyPlugin({
            workerCount: os.cpus().length,
            cacheDir: '.cache/',
            uglifyJS: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                comments: false,
                sourceMap: true,
                mangle: true
            }
        }),
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: path.resolve(sourcedir, 'assets'),
            to: 'assets'
        }]),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Webpack@3'
        })
    ]
};
