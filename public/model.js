(function () {
    class PhotoPostsCollection {
        constructor() {
            this.list = [];
        }

        addPhotoPost(photoPost) {
            photoPost.deleted = false;
            photoPost.id = String(generateId());
            photoPost.likes = [];
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/addPost');
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };

                xhr.send(JSON.stringify(photoPost));
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }

        editPhotoPost(objectPhotoPost) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', `/editPost?id=${objectPhotoPost.id}`);
                xhr.setRequestHeader('Content-type', 'application/json');

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };

                xhr.send(JSON.stringify(objectPhotoPost));
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }


        removePhotoPost(id) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', `/removePost?id=${id}`);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }

        getPhotoPost(id) {
            return this.list.find(item => item.id === id);
        }

        getPhotoPosts(skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 10;
            let photoPosts = this.list;
            photoPosts.sort(compareDate);
            if (filterConfig === undefined) {
                return photoPosts.slice(skip, skip + top);
            }
            else {
                if (filterConfig.hashTags) {
                    let postFilterHashTag = [];
                    photoPosts.forEach(function (item) {
                        if (item.hashTags.find((element) => element === filterConfig.hashTags)) {
                            postFilterHashTag.push(item);
                        }
                    });
                    photoPosts = postFilterHashTag;
                }
                if (filterConfig.author) {
                    photoPosts = photoPosts.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.createdAt) {
                    photoPosts = photoPosts.filter((element) => new Date(element.createdAt).toLocaleDateString() === filterConfig.createdAt);
                }
                return photoPosts;
            }
        }

        loadPhotoPosts() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'allPosts');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        this.list = JSON.parse(xhr.responseText);
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }
    }

    class Users {
        constructor() {
            this.users = [];
        }

        findUser(name) {
            return this.users.find((element) => element.username === name);
        }

        loadUsers() {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'allUsers');
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        this.users = JSON.parse(xhr.responseText);
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.send();
            }).then(data => JSON.parse(data))
                .catch((error) => {
                    throw error;
                });
        }
    }

    function compareDate(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    }

    function generateId() {
        return Number(Date.now() * 1000 + Math.floor(Math.random() * 1000));
    }

    window.PhotoPostsCollection = PhotoPostsCollection;
    window.Users = Users;
})();

