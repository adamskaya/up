let Events = (function () {

        function addPhotoPostsToLocalStorage() {
            // let users = [
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
            // localStorage.setItem('users', JSON.stringify(users));
            // localStorage.setItem('my_application', JSON.stringify(Functional.photoPosts));
            // localStorage.setItem('hashTag', JSON.stringify(PostView.setHashTag()));
            // if (localStorage.getItem('my_application') === null) {
            //     PostView.postsNullError();
            // } else {
            let photoPosts = JSON.parse(localStorage.getItem('my_application'));
            let user = JSON.parse(localStorage.getItem('user'));
            PostView.displayHtmlPhotoPosts(Functional.getPhotoPosts(photoPosts, 0, 10), user, JSON.parse(localStorage.getItem('hashTag')));
            PostView.setUser(user);
            PostView.buildButtonDownload(true);
            //}
        }

        function like(id, photoPosts, photoPost) {
            let post = photoPosts.find((element) => element.id === id);
            const user = JSON.parse(localStorage.getItem('user'));
            if (!Functional.isLikedByUser(post.like, user)) {
                post.like.push(user);
                PostView.setLikes(user, photoPost, post.like);
            }
            else {
                post.like.splice(post.like.findIndex((element) => element === user), 1);
                PostView.setLikes(user, photoPost, post.like);

            }
        }

        function getUser(name) {
            const users = JSON.parse(localStorage.getItem('users'));
            let index = users.findIndex((element) => element.username === name);
            if (index >= 0) {
                return users[index];
            }
        }

        function getRegistrationData() {
            document.getElementById('button-registration').addEventListener('click', (event) => {
                const registrationForm = document.getElementById('registration');
                const formData = new FormData(registrationForm);
                const username = formData.get('username');
                if (getUser(username) === undefined) {
                    alert("Incorrect username!");
                    event.preventDefault();
                } else {
                    const password = formData.get('password');
                    if (password === getUser(username).password) {
                        localStorage.setItem('user', JSON.stringify(username));
                    } else {
                        alert("Incorrect password!");
                        event.preventDefault();
                    }
                }
            });
            event.preventDefault();
        }

        let addPhotoCountForPagination = 0;

        function bindEvents() {
            document.getElementById('button-search').addEventListener('click', (event) => {
                const searchForm = document.getElementById('search-form');
                const searchFormData = new FormData(searchForm);
                const date = searchFormData.get('date');
                const username = searchFormData.get('username');
                const hashTag = searchFormData.get('select');
                let user = JSON.parse(localStorage.getItem('user'));
                let photoPosts = JSON.parse(localStorage.getItem('my_application'));
                photoPosts = Functional.getPhotoPosts(photoPosts, 0, photoPosts.length, {
                    author: username,
                    createdAt: date,
                    hashTag: hashTag
                });
                PostView.buildButtonDownload(false);
                if (photoPosts.length) {
                    PostView.displayHtmlPhotoPosts(photoPosts, user);
                    PostView.setUser(user);
                } else {
                    PostView.postsNullError(photoPosts);
                }
                event.preventDefault();
            });

            document.querySelector('.download').addEventListener('click', (event) => {
                addPhotoCountForPagination = addPhotoCountForPagination + 10;
                let photoPosts = JSON.parse(localStorage.getItem('my_application'));
                let user = JSON.parse(localStorage.getItem('user'));
                photoPosts = Functional.getPhotoPosts(photoPosts, addPhotoCountForPagination, 10);
                PostView.pagination(photoPosts, user);
                if (photoPosts.length < 10) {
                    PostView.buildButtonDownload(false);
                }
            });

            document.getElementById('sign-out-sign-in').addEventListener('click', (event) => {
                if (document.getElementById('sign-out-sign-in').textContent === 'Sign up') {
                    PostView.displaySignUpForm();
                    PostView.buildButtonDownload(false);
                    getRegistrationData();
                }
                if (document.getElementById('sign-out-sign-in').textContent === 'Sign out') {
                    localStorage.setItem('user', JSON.stringify(null));
                }
            });

            document.querySelector('.site-content').addEventListener('click', (event) => {
                let photoPosts = JSON.parse(localStorage.getItem('my_application'));
                if (event.target.className === 'remove-post') {
                    let post = event.target.closest('.photo-post');
                    const id = Number(post.getAttribute('data-post-id'));
                    PostView.removePhotoPost(post);
                    photoPosts = Functional.removePhotoPost(photoPosts, id);
                    localStorage.setItem('my_application', JSON.stringify(photoPosts));
                }
                if (event.target.className === 'edit-post') {
                    let post = event.target.closest('.photo-post');
                    const id = Number(post.getAttribute('data-post-id'));
                    //PostView.displayHtmlAddPhotoPost();
                    let editPhotoPost = {
                        description: 'newText',
                        photoLink: 'images/22.jpg',
                        hashTag: ['#town'],
                    };
                    Functional.editPhotoPost(photoPosts, id, editPhotoPost);
                    PostView.editPhotoPost(post, editPhotoPost);
                    localStorage.setItem('hashTag', JSON.stringify(PostView.setHashTag()));
                    localStorage.setItem('my_application', JSON.stringify(photoPosts));
                }

                if (event.target.classList.contains('like')) {
                    if (JSON.parse(localStorage.getItem('user'))) {
                        let post = event.target.closest('.photo-post');
                        const id = Number(post.getAttribute('data-post-id'));
                        like(id, photoPosts, post);
                        localStorage.setItem('my_application', JSON.stringify(photoPosts));
                    }
                }
            });
            document.querySelector('.avatar').addEventListener('click', (event) => {
                let photoPosts = JSON.parse(localStorage.getItem('my_application'));
                let user = JSON.parse(localStorage.getItem('user'));
                //PostView.displayHtmlAddPhotoPost();
                let newPhotoPost = {
                    id: photoPosts.length + 1,
                    description: 'Text',
                    createdAt: new Date(2018, 4, 20),
                    author: user,
                    photoLink: 'images/21.jpg',
                    hashTag: ['#bird'],
                    like: []
                };
                Functional.addPhotoPost(newPhotoPost, photoPosts);
                PostView.addPhotoPost(photoPosts, newPhotoPost, user);
                localStorage.setItem('hashTag', JSON.stringify(PostView.setHashTag()));
                localStorage.setItem('my_application', JSON.stringify(photoPosts));
            });
        }

        return {
            bindEvents: bindEvents,
            addPhotoPostsToLocalStorage: addPhotoPostsToLocalStorage,
        }
    }
)();
console.log(Events.addPhotoPostsToLocalStorage());
Events.bindEvents();


