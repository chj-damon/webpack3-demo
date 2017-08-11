const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

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