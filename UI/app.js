const http = require('http');
var express = require('express');
var app = express();
app.use('/', express.static('public'));

// const server = http.createServer((request, response) => {

//     response.end();
// });

http.createServer(app).listen(3000, () => {
    console.log('Server is running...');
});