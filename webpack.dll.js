const path = require('path');
const webpack = require('webpack');

const outputPath = path.join(__dirname, 'lib');
const vendors = [
    'react',
    'react-dom',
    'react-router', 
    'redux', 
    'react-redux', 
    'babel-polyfill',
    'axios',
    'qs',
    'moment'
];
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: outputPath,
        filename: 'dll.[name].js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(outputPath, 'manifest.json'),
            name: '[name]',
            context: __dirname
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true)
    ],
    devtool: 'cheap-source-map'
};