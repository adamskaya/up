const fs = require('fs');

let posts = JSON.parse(fs.readFileSync('./server/data/posts.json'));
const users = JSON.parse(fs.readFileSync('./server/data/users.json'));

function compareDate(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
}
const actions = {

    getPhotoPost(id) {
        return posts.find((element) => element.id === id);
    },

    getUsers(){
        return users;
    },

    validatePhotoPost(photoPost) {
        return !(photoPost && typeof photoPost.description === 'string' && typeof photoPost.hashTags === 'string' && photoPost.photoLink !== '');
    },

    addPhotoPost(objectPhotoPost) {
        objectPhotoPost.createdAt = new Date();
        if (actions.validatePhotoPost(objectPhotoPost)) {
            posts.push(objectPhotoPost);
        }
        fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
    },

    getPhotoPosts(skip, top, filterConfig) {
        posts.sort(compareDate);
        if(skip === undefined && top === undefined){
            return posts;
        }
        skip = skip || 0;
        top = top || 10;
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
    },

    editPhotoPost(id, objectPhotoPost) {
        if (!objectPhotoPost) return null;
        const editPhotoPost = actions.getPhotoPost(objectPhotoPost.id);
        if (editPhotoPost) {
            Object.assign(editPhotoPost, objectPhotoPost);
        }
        fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
    },

    removePost(id) {
        let index = posts.findIndex((element) => element.id === id);
        if (index >= 0) {
            posts.splice(index, 1);
            fs.writeFile(('./server/data/posts.json'), JSON.stringify(posts));
        }
    }
};
module.exports = actions;


