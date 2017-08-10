const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.dev');
const socket = require('socket.io');

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
    hot: true,
    publicPath: webpackDevConfig.output.publicPath
}));
app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log,
    reload: true
}));

// 加载指定目录静态资源
app.use(express.static(path.join(__dirname, 'dist')));

// 配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const server = app.listen(8888, () => {
    console.log('App listening at port 8888');
});

// socket io
const io = socket(server);
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected.');
    });
    socket.on('room', (data) => {
        socket.join(data.room);
    });
    socket.on('leave', (data) => {
        socket.leave(data.room);
    });
    socket.on('coding', (data) => {
        socket.broadcast.to(data.room).emit('receive code', data);
    });
});