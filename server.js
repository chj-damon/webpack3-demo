const express = require('express');
const path = require('path');
const fs = require('fs');
const socket = require('socket.io');

const app = express();

// 加载指定目录静态资源
app.use(express.static(path.join(__dirname, 'dist')));

// 配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.use((req, res) => {
    fs.readFile(path.resolve(__dirname, 'dist', 'index.html'), (err, data) => {
        if (err) {
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                Connection: 'keep-alive'
            });
            res.end(data);
        }
    });
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
        console.log(1, data);
        socket.join(data.room);
    });
    socket.on('leave', (data) => {
        console.log(2, data);
        socket.leave(data.room);
    });
    socket.on('coding', (data) => {
        console.log(3, data);
        io.to(data.room).emit('receive', '123');
    });
});