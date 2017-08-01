const express = require('express');
const path = require('path');
const app = express();

// 加载指定目录静态资源
app.use(express.static(path.join(__dirname, 'dist')));

// 配置任何请求都转到index.html，而index.html会根据React-Router规则去匹配任何一个route
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(8888, () => {
    console.log('App listening at port 8888');
});