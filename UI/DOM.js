
var module = (function () {
        var AllPosts = [{
            id: 1,
            description: 'Text',
            createdAt: '25.01.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/20.jpg',
            hashTag: ['#nature', '#flowers'],
            like: ['author1', 'author2']
        }, {
            id: 2,
            description: 'Text',
            createdAt: '26.01.2018',
            author: 'Murashko Yuliya',
            photoLink: 'images/19_2.jpg',
            hashTag: ['#nature', '#flowers'],
            like: ['author1', 'author3']
        }, {
            id: 3,
            description: 'Text',
            createdAt: '02.01.2018',
            author: 'Ambrosyonok Marina',
            photoLink: 'images/18.jpg',
            hashTag: ['#coffe'],
            like: ['author2']
        }, {
            id: 4,
            description: 'Text',
            createdAt: '27.01.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/17.jpg',
            hashTag: ['#coffe'],
            like: ['author3']
        }, {
            id: 5,
            description: 'Text',
            createdAt: '02.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/16_1.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2']
        }, {
            id: 6,
            description: 'Text',
            createdAt: '10.01.2018',
            author: 'Ambrosyonok Marina',
            photoLink: 'images/15.jpg',
            hashTag: ['#flowers'],
            like: ['author1', 'author2']
        }, {
            id: 7,
            description: 'Text',
            createdAt: '03.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/14.jpg',
            hashTag: ['#food'],
            like: ['author2']
        }, {
            id: 8,
            description: 'Text',
            createdAt: '01.02.2018',
            author: 'Murashko Yuliya',
            photoLink: 'images/13.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2', 'author3']
        }, {
            id: 9,
            description: 'Text',
            createdAt: '10.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/12.jpg',
            hashTag: ['#flowers'],
            like: ['author1']
        }, {
            id: 10,
            description: 'Text',
            createdAt: '20.02.2018',
            author: 'Murashko Yuliya',
            photoLink: 'images/11.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2']
        }, {
            id: 11,
            description: 'Text',
            createdAt: '12.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/10.jpg',
            hashTag: ['#nature'],
            like: ['']
        }, {
            id: 12,
            description: 'Text',
            createdAt: '01.02.2018',
            author: 'Ambrosyonok Marina',
            photoLink: 'images/9.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author3']
        }, {
            id: 13,
            description: 'Text',
            createdAt: '15.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/8.jpg',
            hashTag: ['#flowers'],
            like: ['author2']
        }, {
            id: 14,
            description: 'Text',
            createdAt: '25.02.2018',
            author: 'Murashko Yuliya',
            photoLink: 'images/7_1.jpg',
            hashTag: [''],
            like: ['author3']
        }, {
            id: 15,
            description: 'Text',
            createdAt: '28.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/6.jpg',
            hashTag: ['#coffe'],
            like: ['author1', 'author2']
        }, {
            id: 16,
            description: 'Text',
            createdAt: '12.02.2018',
            author: 'Ambrosyonok Marina',
            photoLink: 'images/5_1.jpg',
            hashTag: ['#flowers', '#nature'],
            like: ['author1', 'author2']
        }, {
            id: 17,
            description: 'Text',
            createdAt: '01.03.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/1.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2', 'author3']
        }, {
            id: 18,
            description: 'Text',
            createdAt: '04.02.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/3.jpg',
            hashTag: ['#food'],
            like: ['author2']
        }, {
            id: 19,
            description: 'Text',
            createdAt: '05.03.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/2.jpg',
            hashTag: ['#nature'],
            like: ['author1']
        }, {
            id: 20,
            description: 'Text',
            createdAt: '06.03.2018',
            author: 'Murashko Yuliya',
            photoLink: 'images/1_1.jpg',
            hashTag: ['#coffe'],
            like: ['author1", "author2']
        }];
        var user = null;

        function unregisteredOrRegisteredUser() {
            if (user === null) {
                var blockAvatar = document.getElementsByClassName('avatar')[0];
                var main = document.querySelector('main');
                main.removeChild(blockAvatar);
                document.getElementsByClassName('sign_out')[0].textContent = 'Sign Up';
                return false;
            } else {
                var userName = document.getElementById('user');
                userName.textContent = user;
                return true;
            }
        }

        function addPhotoPost(objectPhotoPost) {
            var container = document.querySelector('.site_content');
            var newElem = document.createElement('div');
            var firstElem = document.getElementsByClassName('photo_post')[0];
            newElem.className = 'photo_post';
            newElem.innerHTML =
            `<div class="post">
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
            <p>${objectPhotoPost.like}</p>
        </div>
    </div>
    <button type="button" class="put_like">
        <img src="images/heart1.png" alt="like"/></button>
    </div>`;
            if (objectPhotoPost.author === user) {
                var edit_delete = document.createElement("div");
                edit_delete.className = 'delete_edit';
                edit_delete.innerHTML =
                    `<button type="button" class="delete"><img src="images/delete.png" alt="delete post"/></button>
        <button type="button" class="edit"><img src="images/edit.png" alt="redact post"/></button>`;
                newElem.getElementsByClassName('post')[0].appendChild(edit_delete);
            }
            container.insertBefore(newElem, firstElem);
            if (objectPhotoPost.id > AllPosts.length) {
                AllPosts.push(objectPhotoPost);
                return true;
            }
        }

        function displayHtmlPhotoPosts() {
            unregisteredOrRegisteredUser();

            for (var item in AllPosts) {
                addPhotoPost(AllPosts[item]);
            }
        }

        function compareDate(a, b) {
            return a.createdAt - b.createdAt;
        }

        function getPhotoPosts(skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 10;
            var PhotoPosts = AllPosts;
            if (filterConfig === undefined) {
                PhotoPosts.sort(compareDate);
                PhotoPosts = PhotoPosts.slice(skip, skip + top);
                console.log(PhotoPosts);

            } else {
                if (filterConfig.author !== undefined) {
                    PhotoPosts = PhotoPosts.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.hashTag !== undefined) {
                    PhotoPosts = PhotoPosts.filter((element) => element.hashTag === filterConfig.hashTag);
                }
                PhotoPosts.sort(compareDate);
                PhotoPosts = PhotoPosts.slice(skip, skip + top);
                console.log(PhotoPosts);

            }
        }

        function editPhotoPost(id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined) {
                return false;
            }
            var index = AllPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                var post = AllPosts[index];
                if (objectPhotoPost.hasOwnProperty('photoLink')) {
                    var editPhotoLink = document.getElementsByClassName('photo')[index];
                    editPhotoLink.src = objectPhotoPost.photoLink;
                    post.photoLink = objectPhotoPost.photoLink;
                }
                if (objectPhotoPost.hasOwnProperty('description') && objectPhotoPost.description.length < 200) {
                    var editDescription = document.getElementsByClassName('description')[index];
                    editDescription.textContent = objectPhotoPost.description;
                    post.description = objectPhotoPost.description;
                }
                if (objectPhotoPost.hasOwnProperty('hashTag')) {
                    var editHashTag = document.getElementsByClassName('hashTag')[index];
                    editHashTag.textContent = objectPhotoPost.hashTag;
                    post.hashTag = objectPhotoPost.hashTag;
                    for (var item = 0; item < objectPhotoPost.hashTag.length; item++) {
                        addOptionToSelect(objectPhotoPost.hashTag[item], document.getElementById('hashTag'));
                    }
                }
                AllPosts[index] = post;
            }
            return true;

        }

        function removePhotoPost(id) {
            var index = AllPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                var container = document.querySelector('.site_content');
                var deleteElem = document.getElementsByClassName('photo_post')[index];
                container.removeChild(deleteElem);
                AllPosts.splice(index, 1);
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

        return {
            getPhotoPosts: getPhotoPosts,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            displayHtmlPhotoPosts: displayHtmlPhotoPosts,

        }
    }
)();
console.log(module.displayHtmlPhotoPosts());
console.log(module.getPhotoPosts(0, 10, {author: 'Adamskaya Yuliya'}));
console.log(module.removePhotoPost(1));
console.log(module.editPhotoPost(5, {description: 'newText', photoLink: 'images/22.jpg'}));
console.log(module.editPhotoPost(2, {hashTag: ['#otherHashtag1', '#otherHashtag2']}));
console.log(module.addPhotoPost({
    id: 21,
    description: 'Text',
    createdAt: '12.03.2018',
    author: 'Adamskaya Yuliya',
    photoLink: 'images/21.jpg',
    hashTag: ['#flowers']
}));

