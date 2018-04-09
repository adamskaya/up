var module = (function () {
        // var allPosts = [{
        //     id: 1,
        //     description: 'Text',
        //     createdAt: '25.01.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/20.jpg',
        //     hashTag: ['#nature', '#flowers'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 2,
        //     description: 'Text',
        //     createdAt: '26.01.2018',
        //     author: 'Murashko Yuliya',
        //     photoLink: 'images/19_2.jpg',
        //     hashTag: ['#nature', '#flowers'],
        //     like: ['author1', 'author3']
        // }, {
        //     id: 3,
        //     description: 'Text',
        //     createdAt: '02.01.2018',
        //     author: 'Ambrosyonok Marina',
        //     photoLink: 'images/18.jpg',
        //     hashTag: ['#coffe'],
        //     like: ['author2']
        // }, {
        //     id: 4,
        //     description: 'Text',
        //     createdAt: '27.01.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/17.jpg',
        //     hashTag: ['#coffe'],
        //     like: ['author3']
        // }, {
        //     id: 5,
        //     description: 'Text',
        //     createdAt: '02.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/16_1.jpg',
        //     hashTag: ['#food'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 6,
        //     description: 'Text',
        //     createdAt: '10.01.2018',
        //     author: 'Ambrosyonok Marina',
        //     photoLink: 'images/15.jpg',
        //     hashTag: ['#flowers'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 7,
        //     description: 'Text',
        //     createdAt: '03.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/14.jpg',
        //     hashTag: ['#food'],
        //     like: ['author2']
        // }, {
        //     id: 8,
        //     description: 'Text',
        //     createdAt: '01.02.2018',
        //     author: 'Murashko Yuliya',
        //     photoLink: 'images/13.jpg',
        //     hashTag: ['#food'],
        //     like: ['author1', 'author2', 'author3']
        // }, {
        //     id: 9,
        //     description: 'Text',
        //     createdAt: '10.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/12.jpg',
        //     hashTag: ['#flowers'],
        //     like: ['author1']
        // }, {
        //     id: 10,
        //     description: 'Text',
        //     createdAt: '20.02.2018',
        //     author: 'Murashko Yuliya',
        //     photoLink: 'images/11.jpg',
        //     hashTag: ['#food'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 11,
        //     description: 'Text',
        //     createdAt: '12.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/10.jpg',
        //     hashTag: ['#nature'],
        //     like: ['']
        // }, {
        //     id: 12,
        //     description: 'Text',
        //     createdAt: '01.02.2018',
        //     author: 'Ambrosyonok Marina',
        //     photoLink: 'images/9.jpg',
        //     hashTag: ['#food'],
        //     like: ['author1', 'author3']
        // }, {
        //     id: 13,
        //     description: 'Text',
        //     createdAt: '15.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/8.jpg',
        //     hashTag: ['#flowers'],
        //     like: ['author2']
        // }, {
        //     id: 14,
        //     description: 'Text',
        //     createdAt: '25.02.2018',
        //     author: 'Murashko Yuliya',
        //     photoLink: 'images/7_1.jpg',
        //     hashTag: [''],
        //     like: ['author3']
        // }, {
        //     id: 15,
        //     description: 'Text',
        //     createdAt: '28.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/6.jpg',
        //     hashTag: ['#coffe'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 16,
        //     description: 'Text',
        //     createdAt: '12.02.2018',
        //     author: 'Ambrosyonok Marina',
        //     photoLink: 'images/5_1.jpg',
        //     hashTag: ['#flowers', '#nature'],
        //     like: ['author1', 'author2']
        // }, {
        //     id: 17,
        //     description: 'Text',
        //     createdAt: '01.03.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/1.jpg',
        //     hashTag: ['#food'],
        //     like: ['author1', 'author2', 'author3']
        // }, {
        //     id: 18,
        //     description: 'Text',
        //     createdAt: '04.02.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/3.jpg',
        //     hashTag: ['#food'],
        //     like: ['author2']
        // }, {
        //     id: 19,
        //     description: 'Text',
        //     createdAt: '05.03.2018',
        //     author: 'Adamskaya Yuliya',
        //     photoLink: 'images/2.jpg',
        //     hashTag: ['#nature'],
        //     like: ['author1']
        // }, {
        //     id: 20,
        //     description: 'Text',
        //     createdAt: '06.03.2018',
        //     author: 'Murashko Yuliya',
        //     photoLink: 'images/1_1.jpg',
        //     hashTag: ['#coffe'],
        //     like: ['author1", "author2']
        // }];


        function unregisteredOrRegisteredUser() {
            if (document.getElementsByClassName('avatar')[0]) {
                if (JSON.parse(localStorage.getItem('user')) === null) {
                    var blockAvatar = document.getElementsByClassName('avatar')[0];
                    document.querySelector('main').removeChild(blockAvatar);
                    document.getElementById('sign_out_sign_in').textContent = 'Sign up';
                    return false;
                } else {
                    var userName = document.getElementById('user');
                    userName.textContent = JSON.parse(localStorage.getItem('user'));
                    return true;
                }
            }
        }

        function displayHtmlPhotoPost(objectPhotoPost) {
            var photoPost = document.createElement('div');
            photoPost.className = 'photo_post';
            photoPost.setAttribute('data_post_id',objectPhotoPost.id);
            photoPost.innerHTML = `<div class="post" >
        <div class="image_name_date">
            <img class="post_image" src="images/avatar.png"/>
            <p class="name">${objectPhotoPost.author}</p>
            <p class="date_post">${objectPhotoPost.createdAt}</p>
        </div>
    </div>
    <img class="photo" src="${ objectPhotoPost.photoLink}">
    <div class="entry"><p class="description">${objectPhotoPost.description}</p>
        <p class="hashTag">${objectPhotoPost.hashTag}</p>
        <div class="like"><p>Like:</p>
            <p class = "users_like"> ${objectPhotoPost.like.length}</p>
        </div>
    </div>
    <button type="button" class="put_like">
        <img src="images/heart1.png" alt="like" data_like_id="${ objectPhotoPost.id}"/></button>
    </div>`;
            if (objectPhotoPost.author === JSON.parse(localStorage.getItem('user'))) {
                var edit_delete = document.createElement("div");
                edit_delete.className = 'delete_edit';
                edit_delete.innerHTML =
                    `<button  type="button" class="delete" ><img src="images/delete.png" alt="delete post" data_delete_id="${ objectPhotoPost.id}"/></button>
        <a href="addPhotoPost.html" type="button" id="edit"><img src="images/edit.png" alt="redact post"/></a>`;
                photoPost.getElementsByClassName('post')[0].appendChild(edit_delete);
            }
            return photoPost;
        }

        function addPhotoPosts() {
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
            // localStorage.setItem('users', JSON.stringify(users));
            //localStorage.setItem('my_application', JSON.stringify(allPosts));
            var photoPosts = [];
            for (var item = 0; item < JSON.parse(localStorage.getItem('my_application')).length; item++) {
                if (JSON.parse(localStorage.getItem('my_application'))[item]) {
                    photoPosts.push(JSON.parse(localStorage.getItem('my_application'))[item]);
                }
            }
            displayHtmlPhotoPosts(photoPosts);
        }

        function addPhotoPost(objectPhotoPost) {
            var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            photoPosts.push(objectPhotoPost);
            localStorage.setItem('my_application', JSON.stringify(photoPosts));
            displayHtmlPhotoPosts(photoPosts);
        }

        function displayHtmlPhotoPosts(photoPosts) {
            for (var item in document.getElementsByClassName('photo_post')) {
                document.getElementsByClassName('photo_post')[item].innerHTML = '';
            }
            var buttonDownload = document.getElementById('download');
            if (buttonDownload !== null) {
                //document.querySelector('.site_content').removeChild(document.querySelector('.site_content').firstChild);
                //document.getElementById('download').innerHTML = '';
                //document.querySelector('.site_content').removeChild(buttonDownload);
            }
            unregisteredOrRegisteredUser();
            photoPosts = photoPosts.splice(photoPosts.length - 10, 10)
            for (var item in photoPosts) {
                document.querySelector('.site_content').insertBefore(displayHtmlPhotoPost(photoPosts[item]), document.querySelector('.site_content').firstChild);
            }
            // var downloadButton = document.createElement("div");
            // downloadButton.innerHTML = `<button type="button" class="download"><b>...</b></button>`;
            // document.querySelector('.site_content').insertBefore(downloadButton, document.querySelector('.site_content').lastChild);
        }

        function compareDate(a, b) {
            return b.createdAt - a.createdAt;
        }

        function getPhotoPosts(filterConfig) {
            var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            if (filterConfig === undefined) {
                photoPosts.sort(compareDate);
                displayHtmlPhotoPosts(photoPosts);
            } else {
                if (filterConfig.author !== '') {
                    photoPosts = photoPosts.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.hashTag !== '') {
                    var photoPostHashTag = [];
                    for (var i = 0; i < photoPosts.length; i++) {
                        for (var j in photoPosts[i].hashTag) {
                            if (photoPosts[i].hashTag[j] === filterConfig.hashTag) {
                                photoPostHashTag.push(photoPosts[i]);
                            }
                        }
                    }
                    photoPosts = photoPostHashTag;
                }
                if (filterConfig.createdAt !== '') {
                    photoPosts = photoPosts.filter((element) => element.createdAt === filterConfig.createdAt);
                }
                photoPosts.sort(compareDate);
                displayHtmlPhotoPosts(photoPosts);
            }
        }

        function editPhotoPost(id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined) {
                return false;
            }
            var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            var index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                var post = photoPosts[index];
                if (objectPhotoPost.hasOwnProperty('photoLink')) {
                    post.photoLink = objectPhotoPost.photoLink;
                }
                if (objectPhotoPost.hasOwnProperty('description') && objectPhotoPost.description.length < 200) {
                    post.description = objectPhotoPost.description;
                }
                if (objectPhotoPost.hasOwnProperty('hashTag')) {
                    post.hashTag = objectPhotoPost.hashTag;
                    for (var item = 0; item < objectPhotoPost.hashTag.length; item++) {
                        addOptionToSelect(objectPhotoPost.hashTag[item], document.getElementById('hashTag'));
                    }
                }
                photoPosts[index] = post;
                localStorage.setItem('my_application', JSON.stringify(photoPosts));
                displayHtmlPhotoPosts(photoPosts);
                return true;
            }
        }

        function removePhotoPost(id) {
            var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            var index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                photoPosts[index] = '';
                localStorage.setItem('my_application', JSON.stringify(photoPosts));
                addPhotoPosts();
                return true;
            } else {
                return false;
            }
        }

        function addOptionToSelect(elementArr, select) {
            var option = document.createElement('option');
            option.innerHTML = elementArr;
            select.appendChild(option);
        }

        function userLike() {
            return false;
        }

        function like(id) {
            var photoPosts = [];
            for (var item = 0; item < JSON.parse(localStorage.getItem('my_application')).length; item++) {
                if (JSON.parse(localStorage.getItem('my_application'))[item]) {
                    photoPosts.push(JSON.parse(localStorage.getItem('my_application'))[item]);
                }
            }
            var index = photoPosts.findIndex((element) => element.id === id);
            console.log(id);
            var post = photoPosts[index];
            if (!userLike(post)) {
                // for (var item in photoPosts) {
                //     if(Number(document.getElementsByClassName('photo_post')[item].getAttribute('data_post_id')) === id);
                //     {
                //         console.log('gg');
                //     }
                // }
                //if(document.getElementsByClassName('post')[].getElementsByClassName('put_like'))
                //document.getElementsByClassName('users_like')[id].textContent = post.like.length;
                post.like.push(JSON.parse(localStorage.getItem('user')));
                photoPosts[index] = post;
                //localStorage.setItem('my_application', JSON.stringify(photoPosts));
                return true;
            } else {
                return false;
            }
        }

        function events() {
            document.getElementById('button_search').addEventListener('click', (event) => {
                var username = document.search_form.username.value;
                var date = document.search_form.date.value;
                var hashTag = document.search_form.select.value;
                getPhotoPosts({author: username, createdAt: date, hashTag: hashTag});
                event.preventDefault();
            });

            var photoLoading = 10;
            // document.getElementById('download').addEventListener('click', (event) => {
            //     var photoPosts = JSON.parse(localStorage.getItem('my_application'));
            //     var photoPostsDisplay = [];
            //     for (var item = 0; item < photoPosts.length; item++) {
            //         if (photoPosts[item]) {
            //             photoPostsDisplay.push(photoPosts[item]);
            //         }
            //     }
            //     for (var item = 0; item < 10 +photoLoading; item++) {
            //         if ((photoPostsDisplay.length - item - 1) < 10) {
            //             displayPhotoPost(photoPostsDisplay[item]);
            //         }
            //     //for (var item = photoLoading; item >=  photoLoading -10; item--) {
            //    // photoPostsDisplay.slice(0, 10 + photoLoading)
            //     //displayHtmlPhotoPosts(photoPostsDisplay.slice(0, 10 + photoLoading));
            //     photoLoading = photoLoading + 10;
            //     event.preventDefault();
            // });


            document.getElementById('sign_out_sign_in').addEventListener('click', (event) => {
                if (document.getElementById('sign_out_sign_in').textContent === 'Sign out') {
                    localStorage.setItem('user', JSON.stringify(null));
                    addPhotoPosts();
                    event.preventDefault();
                }
            });
            document.querySelector('.site_content').addEventListener('click', (event) => {
                if (event.target.getAttribute('data_delete_id')) {
                    removePhotoPost(Number(event.target.getAttribute('data_delete_id')));
                }
            });
            document.querySelector('.site_content').addEventListener('click', (event) => {
                if (event.target.getAttribute('data_like_id')) {
                    like(Number(event.target.getAttribute('data_like_id')));
                }
            });
        }

        return {
            events: events,
            addPhotoPost: addPhotoPost,
            getPhotoPosts: getPhotoPosts,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPosts: addPhotoPosts,
            displayHtmlPhotoPosts: displayHtmlPhotoPosts,

        }
    }
)();
console.log(module.addPhotoPosts());
module.events();
//console.log(module.getPhotoPosts(0, 10, {hashTag: '#coffe'}));
// console.log(module.removePhotoPost(21));
// console.log(module.editPhotoPost(5, {description: 'newText', photoLink: 'images/22.jpg'}));
// console.log(module.editPhotoPost(3, {hashTag: ['#otherHashtag1', '#otherHashtag2']}));
// console.log(module.addPhotoPost({
//     id: 0,
//     description: 'Text',
//     createdAt: '07.04.2018',
//     author: 'Adamskaya Yuliya',
//     photoLink: 'images/21.jpg',
//     hashTag: ['#flowers'],
//     like: ['']
// }));


