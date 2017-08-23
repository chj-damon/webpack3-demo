const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./webpack.dev');
const socket = require('socket.io');

const app = express();
const webpackCompiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
    filename: webpackDevConfig.output.filename,
    publicPath: webpackDevConfig.output.publicPath,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}));
app.use(webpackHotMiddleware(webpackCompiler));

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
        console.log(1, data);
        socket.join(data.room);
    });
    socket.on('leave', (data) => {
        console.log(2, data);
        socket.leave(data.room);
    });
    socket.on('coding', (data) => {
        console.log(3, data);
        io.to(data.room).emit('receive', { test: 123 });
    });
});