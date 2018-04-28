let PostView = (function () {

        function setUser(user) {
            if (user === null) {
                if (document.querySelector('.avatar')) {
                    document.querySelector('main').removeChild(document.querySelector('.avatar'));
                    document.getElementById('sign-out-sign-in').textContent = 'Sign up';
                }
            } else {
                let userName = document.getElementById('user');
                userName.textContent = user;
            }
        }

        function setLikes(user, photoPost, likes) {
            if (Functional.isLikedByUser(likes, user)) {
                photoPost.querySelector('.like').classList.add('active');
            } else {
                photoPost.querySelector('.like').classList.remove('active');
            }
            photoPost.querySelector('.number-of-likes').textContent = likes.length;
        }

        function buildPhotoPost(objectPhotoPost, user) {
            let photoPost = document.createElement('div');
            photoPost.className = 'photo-post';
            photoPost.setAttribute('data-post-id', objectPhotoPost.id);
            photoPost.innerHTML = `
            <div class="post">
                <div class="image-name-date">
                    <img class="post-image" src="images/avatar.png"/>
                    <p class="name">${objectPhotoPost.author}</p>
                    <p class="date-post">${new Date(objectPhotoPost.createdAt).toLocaleDateString()}</p>
                </div>
             </div>
            <img class="photo" src="${ objectPhotoPost.photoLink}">
            <div class="entry">
                <p class="description">${objectPhotoPost.description}</p>
                <p class="hashTag">${objectPhotoPost.hashTag}</p>
                    <div class="users-like">
                        <p>Likes:</p>
                        <p class = "number-of-likes"> ${objectPhotoPost.like.length}</p>
                    </div>
            </div>
            <div class = 'button-like'>
                <div id = "likes" class="like${Functional.isLikedByUser(objectPhotoPost.like, user) ? ' active' : ''}">
                </div>
            </div>`;
            if (objectPhotoPost.author === user) {
                let editRemove = document.createElement("div");
                editRemove.className = 'remove-edit';
                editRemove.innerHTML = `
                <button  type="button" class="delete" >
                    <img src="images/delete.png" class="remove-post"/>
                </button>
                <button type="button" class="edit">
                    <img src="images/edit.png" class="edit-post"/>
                </button>`;
                photoPost.querySelector('.post').appendChild(editRemove);
            }
            return photoPost;
        }

        function displaySignUpForm() {
            document.querySelector('form').innerHTML = '';
            document.querySelector('main').removeChild(document.querySelector('.site-content'));
            let signUp = document.createElement('div');
            signUp.className = 'sign-up';
            signUp.innerHTML = `
            <form name="registrationForm" action="" id="registration">
                <div class="userRegistration">
                    <img src="images/userRegistration.png"/>
                        <input name="username" id="username" placeholder=" Username...">
                </div>
                <div class="keyRegistration">
                    <img src="images/keyRegistration.png"/>
                    <input name="password" id="password" placeholder=" Password...">
                </div>
                <button type="submit" id="button-registration" value="Sign up">
                    <a href="index.html"> Sign up</a>
                </button>
            </form>`;
            document.querySelector('main').appendChild(signUp);
        }

        // function displayHtmlAddPhotoPost() {
        //     document.querySelector('main').removeChild(document.querySelector('.avatar'));
        //     document.querySelector('form').innerHTML = '';
        //     document.querySelector('main').removeChild(document.querySelector('.site-content'));
        //     let addPhotoPost = document.createElement('div');
        //     addPhotoPost.className = 'add_post';
        //     document.querySelector('main').appendChild(addPhotoPost);
        // }

        function postsNullError(photoPost) {
            const posts = document.getElementsByClassName('photo-post');
            const container = document.querySelector('.site-content');
            if (photoPost !== undefined) {
                container.removeChild(container.lastChild);
                for (let index = 0; index < posts.length; index++) {
                    posts[index].innerHTML = '';
                }
            }
            container.classList.add('error');
            let textError = document.createElement("div");
            textError.className = 'error-text';
            textError.textContent = 'PhotoPosts not found!';
            container.appendChild(textError);
        }

        function buildButtonDownload(flag) {
            if (flag) {
                document.querySelector('.download').classList.remove('hide');
            } else {
                document.querySelector('.download').classList.add('hide');
            }
        }

        function pagination(photoPosts, user) {
            const container = document.querySelector('.site-content');
            photoPosts.forEach(function (item) {
                container.insertBefore(buildPhotoPost(item, user), container.lastChild);
            });
        }

        function addPhotoPost(photoPosts, objectPhotoPost, user) {
            const container = document.querySelector('.site-content');
            container.insertBefore(buildPhotoPost(objectPhotoPost, user), container.firstChild);
            if (objectPhotoPost.hashTag.length !== 0) {
                objectPhotoPost.hashTag.forEach(function (item) {
                    addOptionToSelect(item, document.getElementById('hashTag'));
                });
            }
        }

        function displayHtmlPhotoPosts(photoPosts, user, hashTags) {
            const posts = document.getElementsByClassName('photo-post');
            const container = document.querySelector('.site-content');
            for (let index = 0; index < posts.length; index++) {
                posts[index].innerHTML = '';
            }
            photoPosts.forEach(function (item) {
                container.insertBefore(buildPhotoPost(item, user), container.lastChild);
            });
            if (hashTags) {
                hashTags.forEach(function (item) {
                    addOptionToSelect(item, document.getElementById('hashTag'));
                });
            }
        }

        function editPhotoPost(post, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (objectPhotoPost.hasOwnProperty('photoLink')) {
                let editPhotoLink = post.querySelector('.photo');
                editPhotoLink.src = objectPhotoPost.photoLink;
            }
            if (objectPhotoPost.hasOwnProperty('description') && objectPhotoPost.description.length < 200) {
                let editDescription = post.querySelector('.description');
                editDescription.textContent = objectPhotoPost.description;
            }
            if (objectPhotoPost.hasOwnProperty('hashTag')) {
                let editHashTag = post.querySelector('.hashTag');
                editHashTag.textContent = objectPhotoPost.hashTag;
            }
            if (objectPhotoPost.hashTag.length !== 0) {
                objectPhotoPost.hashTag.forEach(function (item) {
                    addOptionToSelect(item, document.getElementById('hashTag'));
                });
            }
        }

        function removePhotoPost(post) {
                post.classList.add('hide');
        }

        function addOptionToSelect(elementArr, select) {
            let options = document.createElement('option');
            if (!Functional.getHashTag(elementArr, setHashTag())) {
                options.innerHTML = elementArr;
                select.appendChild(options);
            }
        }

        function setHashTag() {
            let hashTags = [];
            let options = document.querySelector('select');
            for (let index = 1; index < options.length; index++) {
                hashTags.push(options[index].value);
            }
            return hashTags;
        }

        return {
            pagination: pagination,
            displaySignUpForm: displaySignUpForm,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            displayHtmlPhotoPosts: displayHtmlPhotoPosts,
            buildButtonDownload: buildButtonDownload,
            postsNullError: postsNullError,
            setLikes: setLikes,
            setHashTag: setHashTag,
            setUser:setUser
        }
    }
)();


