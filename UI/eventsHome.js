var moduleEventsHome = (function () {

        function addPhotoPostsToLocalStorage() {
            // var users =[
            //     {
            //         username: 'Adamskaya Yuliya',
            //         password: '111111'
            //     },
            //     {
            //         username: 'Murashko Yuliya',
            //         password: '222222'
            //     },
            //     {
            //         username: 'Ambrosyonok Marina',
            //         password: '333333'
            //     }];
            //localStorage.setItem('users', JSON.stringify(users));
            //localStorage.setItem('my_application', JSON.stringify(moduleScript.photoPosts));
            var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            moduleDomScript.displayHtmlPhotoPosts(moduleScript.getPhotoPosts(photoPosts, 0, 10), JSON.parse(localStorage.getItem('user')));
            moduleDomScript.displayHtmlButtonDownload(true);
        }

        function getLike(post, user) {
            if (post.like.findIndex((element) => element === user) >= 0) {
                return true;
            }
            return false;
        }

        function like(id, photoPosts) {
            var index = photoPosts.findIndex((element) => element.id === id);
            var post = photoPosts[index];
            var user = JSON.parse(localStorage.getItem('user'));
            if (!getLike(post, user)) {
                post.like.push(user);
                moduleDomScript.getLikes(index, post, user);
                photoPosts[index] = post;
                return photoPosts;
            }
            else {
                post.like.splice(post.like.findIndex((element) => element === user), 1);
                moduleDomScript.getLikes(index, post, user);
                photoPosts[index] = post;
                return photoPosts;
            }

        }

        function getUser(name) {
            var users = JSON.parse(localStorage.getItem('users'));
            return (users.find((user) => {
                return user.username === name;
            }));
        }

        function getPassword(name) {
            var users = JSON.parse(localStorage.getItem('users'));
            var index = users.findIndex((element) => element.username === name);
            if (index >= 0) {
                return users[index].password;
            }
        }

        var addPhotoCountForPagination = 0;

        function events() {
            document.getElementById('button_search').addEventListener('click', (event) => {
                var username = document.search_form.username.value;
                var date = document.search_form.date.value;
                var hashTag = document.search_form.select.value;
                var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                photoPosts = moduleScript.getPhotoPosts(photoPosts, 0, photoPosts.length, {
                    author: username,
                    createdAt: date,
                    hashTag: hashTag
                });
                moduleDomScript.displayHtmlPhotoPosts(photoPosts, JSON.parse(localStorage.getItem('user')));
                moduleDomScript.displayHtmlButtonDownload(false);
                event.preventDefault();
            });

            document.getElementById('download').addEventListener('click', (event) => {
                addPhotoCountForPagination = addPhotoCountForPagination + 10;
                var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                photoPosts = moduleScript.getPhotoPosts(photoPosts, addPhotoCountForPagination, 10);
                moduleDomScript.pagination(photoPosts, JSON.parse(localStorage.getItem('user')));
                addPhotoCountForPagination--;
                if (photoPosts.length < 10) {
                    moduleDomScript.displayHtmlButtonDownload(false);
                }
            });

            document.getElementById('sign_out_sign_in').addEventListener('click', (event) => {
                if (document.getElementById('sign_out_sign_in').textContent === 'Sign up') {
                    moduleDomScript.displayHtmlSignUp();
                    document.getElementById('button_registration').addEventListener('click', (event) => {
                        var username = document.registrationForm.username.value;
                        if (getUser(username) === undefined) {
                            alert("Incorrect username!");
                            event.preventDefault();
                        } else {
                            var password = document.registrationForm.password.value;
                            if (password === getPassword(username)) {
                                localStorage.setItem('user', JSON.stringify(username));
                            } else {
                                alert("Incorrect password!");
                                event.preventDefault();
                            }
                        }
                    });
                    event.preventDefault();
                }
                if (document.getElementById('sign_out_sign_in').textContent === 'Sign out') {
                    localStorage.setItem('user', JSON.stringify(null));
                }
            });

            document.querySelector('.site_content').addEventListener('click', (event) => {
                if (event.target.className === 'delete_post') {
                    var post = event.target.parentNode.parentNode.parentNode.parentNode;
                    var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                    moduleDomScript.removePhotoPost(moduleScript.getPhotoPosts(photoPosts, 0, 10), Number(post.getAttribute('data_post_id')));
                    photoPosts = moduleScript.removePhotoPost(photoPosts, Number(post.getAttribute('data_post_id')));
                    localStorage.setItem('my_application', JSON.stringify(photoPosts));
                    event.preventDefault();
                }
                if (event.target.className === 'edit_post') {
                    var post = event.target.parentNode.parentNode.parentNode.parentNode;
                    var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                    //moduleDomScript.displayHtmlAddPhotoPost();
                    var editPhotoPost = {
                        description: 'Text',
                        photoLink: 'images/22.jpg',
                        hashTag: ['#flowers'],
                    };
                    moduleScript.editPhotoPost(photoPosts, Number(post.getAttribute('data_post_id')), editPhotoPost, editPhotoPost);
                    moduleDomScript.editPhotoPost(moduleScript.getPhotoPosts(photoPosts, 0, 10), Number(post.getAttribute('data_post_id')), editPhotoPost);
                    localStorage.setItem('my_application', JSON.stringify(photoPosts));
                    event.preventDefault();
                }
                if (event.target.className === 'like') {
                    if (JSON.parse(localStorage.getItem('user'))) {
                        var post = event.target.parentNode.parentNode.parentNode;
                        var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                        photoPosts = moduleScript.getPhotoPosts(photoPosts, 0, photoPosts.length);
                        photoPosts = like(Number(post.getAttribute('data_post_id')), photoPosts);
                        localStorage.setItem('my_application', JSON.stringify(photoPosts));
                    }
                }
            });
            var id = 21;
            document.querySelector('.avatar').addEventListener('click', (event) => {
                var photoPosts = JSON.parse(localStorage.getItem('my_application'));
                //moduleDomScript.displayHtmlAddPhotoPost();
                var newPhotoPost = {
                    id: id,
                    description: 'Text',
                    createdAt: new Date(2018, 4, 20),
                    author: JSON.parse(localStorage.getItem('user')),
                    photoLink: 'images/21.jpg',
                    hashTag: ['#nature'],
                    like: []
                };
                moduleScript.addPhotoPost(newPhotoPost, photoPosts);
                moduleDomScript.addPhotoPost(newPhotoPost, JSON.parse(localStorage.getItem('user')));
                localStorage.setItem('my_application', JSON.stringify(photoPosts));
                id = id + 1;
                event.preventDefault();
            });
        }

        return {
            events: events,
            addPhotoPostsToLocalStorage: addPhotoPostsToLocalStorage,
        }
    }
)();
console.log(moduleEventsHome.addPhotoPostsToLocalStorage());
moduleEventsHome.events();
//console.log(module.getPhotoPosts(0, 10, {hashTag: '#coffe'}));
// console.log(module.removePhotoPost(21));
// console.log(module.editPhotoPost(5, {description: 'newText', photoLink: 'images/22.jpg'}));
// console.log(module.editPhotoPost(3, {hashTag: ['#otherHashtag1', '#otherHashtag2']}));
// console.log(module.addPhotoPost({
//     id: 21,
//     description: 'Text',
//     createdAt: '07.04.2018',
//     author: 'Adamskaya Yuliya',
//     photoLink: 'images/21.jpg',
//     hashTag: ['#flowers'],
//     like: ['']
// }));


