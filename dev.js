const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.dev');

const app = express();
const webpackCompiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
    historyApiFallback: true,
    noInfo: false,
    stats: {
        colors: true,
        chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
        'errors-only': true
    },
    publicPath: webpackDevConfig.output.publicPath
}));
app.use(webpackHotMiddleware(webpackCompiler));

// 加载指定目录静态资源
app.use(express.static(path.join(__dirname, 'dist')));

// 配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(8888, () => {
    console.log('App listening at port 8888');
});