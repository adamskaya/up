const multer = require('multer');
const express = require('express');
const actions = require('./server/module.js');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// const router = express.Router();
const passport = require('passport');
//const expressSession = require('express-session');
// app.use(expressSession({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true,
//     // store: new MongoStore({
//     //     url: 'mongodb://localhost/passport',
//     // })
// }));

app.use(passport.initialize());
app.use(passport.session());


const JsonStrategy = require('passport-json').Strategy;

passport.use(new JsonStrategy((username, password, done) => {
    if (username === undefined) {
        return done(null, false);
    }
    const user = actions.getUser(username);
    if (user.username !== username) {
        return done(null, false);
    }
    if (!actions.validatePassword(password, username)) {
        return done(null, false);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    actions.getUserById(id, (error, user) => {
        done(error, user);
    });
});

app.post(
    '/signIn',
    passport.authenticate('json', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

// app.get('/signOut', (request) => {
//     request.logout();
// });

const upload = {
    storage: multer.diskStorage({
        destination: (req, file, sb) => {
            sb(null, './public/images');
        },
        filename: (req, file, sb) => {
            sb(null, file.originalname);
        }
    })
};

app.get('/allUsers', (req, res) => {
    const users = actions.getUsers();
    if (users) {
        res.send(users);
    } else {
        res.status(404).end();
    }
});

app.post('/uploadImage', multer(upload).single('file'), (req, res) => {
    res.send(req.file.filename);
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
    const post = actions.getPhotoPost(req.query.id);
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
    const post = req.body;
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
