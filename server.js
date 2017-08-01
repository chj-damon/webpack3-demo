const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(8000, () => {
    console.log('App listening at port 8000');
});