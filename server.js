const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

let posts = JSON.parse(fs.readFileSync('./server/data/posts.json'));
let users = JSON.parse(fs.readFileSync('./server/data/users.json'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

function getPhotoPost(id) {
    return posts.find((element) => element.id === id);
}

function validatePhotoPost(photoPost) {
    return !(photoPost && typeof photoPost.description === 'string' && typeof photoPost.hashTags === 'string' && photoPost.photoLink !== '');
}

function addPhotoPost(objectPhotoPost) {
    objectPhotoPost.createdAt = new Date();
    if (validatePhotoPost(objectPhotoPost)) {
        posts.push(objectPhotoPost);
   }
    fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
}

function compareDate(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
}

function getPhotoPosts(skip, top, filterConfig) {
    skip = skip || 0;
    top = top || 10;
    posts.sort(compareDate);
    if (filterConfig.length === 0) {
        return posts.slice(skip, skip + top);
    }
    else {
        if (filterConfig.author) {
            posts = posts.filter((element) => element.author === filterConfig.author);
        }
        if (filterConfig.hashTags) {
            let postFilterHashTag = [];
            for (let index = 0; index < posts.length; index++) {
                if (posts[index].hashTags.findIndex((element) => element === filterConfig.hashTags) >= 0) {
                    postFilterHashTag.push(posts[index]);
                }
            }
            posts = postFilterHashTag;
        }
        if (filterConfig.createdAt) {
            posts = posts.filter((element) => new Date(element.createdAt).toLocaleDateString() === filterConfig.createdAt);
        }
        return posts.slice(skip, skip + top);
    }
}

function editPhotoPost(id, objectPhotoPost) {
    if (!objectPhotoPost) return null;
    const editPhotoPost = getPhotoPost(objectPhotoPost.id);
    if (editPhotoPost) {
        Object.assign(editPhotoPost, objectPhotoPost);
    }
    fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
}

function removePost(id) {
    let index = posts.findIndex((element) => element.id === id);
    if (index >= 0) {
        posts.splice(index, 1);
        fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
    }
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Expires, Authorization, Authentication');
    next()
});

app.get('/allUsers', (req, res) => {
    if (posts) {
        res.send(users);
    } else {
        res.status(404).end();
    }
});

app.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFile(req.file.originalname,
        req.file.buffer);
});

app.get('/allPosts', (req, res) => {
    if (posts) {
        res.send(posts);
    } else {
        res.status(404).end();
    }
});

app.get('/getPost', (req, res) => {
    let post = getPhotoPost(req.query.id);
    if (post) {
        res.send(post);
    } else {
        res.status(404).end();
    }
});

app.post('/addPost', (req, res) => {
    if (posts) {
        addPhotoPost(req.body);
        res.send(posts);
    } else {
        res.status(404).end();
    }
});
app.post('/getPosts', (req, res) => {

    if (posts) {
        res.send(getPhotoPosts(req.query.skip, req.query.top, req.body));
    } else {
        res.status(404).end();
    }
});

app.put('/editPost', (req, res) => {
    let post = req.body;
    if (post) {
        editPhotoPost(req.query.id, post);
        res.send(posts);
    } else {
        res.status(404).end();
    }
});

app.delete('/removePost', (req, res) => {
    if (posts) {
        removePost(req.query.id);
        res.send(posts);
    } else {
        res.status(404).end();
    }
});

app.listen(3000, () => {
    console.log('Server is running...');
});