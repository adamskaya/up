const multer = require('multer');
const express = require('express');
const actions = require('./server/module.js');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const upload = {
    storage: multer.diskStorage({
        destination: function (req, file, sb) {
            sb(null, './public/images');
        },
        filename: function (req, file, sb) {
            sb(null, file.originalname);
        }
    })
};

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Expires, Authorization, Authentication');
    next();
});

app.get('/allUsers', (req, res) => {
    const users = actions.getUsers();
    if (users) {
        res.send(users);
    } else {
        res.status(404).end();
    }
});

app.post('/uploadImage', multer(upload).single('file'), function (req, res) {
    let filename = req.file.filename;
    res.send(filename);
});

app.get('/allPosts', (req, res) => {
    const posts = actions.getPhotoPosts();
    if (posts) {
        res.send(posts);
    } else {
        res.status(404).end();
    }
});

app.get('/getPost', (req, res) => {
    let post = actions.getPhotoPost(req.query.id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).end();
    }
});

app.post('/addPost', (req, res) => {
    const posts = actions.getPhotoPosts();
    if (posts) {
        actions.addPhotoPost(req.body);
        res.send(actions.getPhotoPosts());
    } else {
        res.status(404).end();
    }
});
app.post('/getPosts', (req, res) => {
    const posts = actions.getPhotoPosts();
    if (posts) {
        res.send(actions.getPhotoPosts(req.query.skip, req.query.top, req.body));
    } else {
        res.status(404).end();
    }
});

app.put('/editPost', (req, res) => {
    let post = req.body;
    if (post) {
        actions.editPhotoPost(req.query.id, post);
        res.send(actions.getPhotoPosts());
    } else {
        res.status(404).end();
    }
});

app.delete('/removePost', (req, res) => {
    const posts = actions.getPhotoPosts();
    if (posts) {
        actions.removePost(req.query.id);
        res.send(actions.getPhotoPosts());
    } else {
        res.status(404).end();
    }
});

app.listen(3000, () => {
    console.log('Server is running...');
});