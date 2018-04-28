const http = require('http');
let express = require('express');
let app = express();
app.use('/', express.static('public'));

http.createServer(app).listen(3000, () => {
    console.log('Server is running...');
});