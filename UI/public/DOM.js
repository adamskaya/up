var PostView = (function () {

        function setUser(user) {
            if (user === null) {
                if (document.querySelector('.avatar')) {
                    document.querySelector('main').removeChild(document.querySelector('.avatar'));
                    document.getElementById('sign_out_sign_in').textContent = 'Sign up';
                }
            } else {
                var userName = document.getElementById('user');
                userName.textContent = user;
            }
        }

        function isLiked(likes, user) {
            if (likes.findIndex((element) => element === user) >= 0) {
                return true;
            }
            return false;
        }

        function setLikes(index, post, user) {
            if (!isLiked(post.like, user)) {
                document.getElementsByClassName('button_like')[index].lastElementChild.className = 'like';
            } else {
                document.getElementsByClassName('button_like')[index].lastElementChild.className = 'like-active';
            }
            document.getElementsByClassName('number_of_likes')[index].textContent = post.like.length;
        }

        function buildPhotoPost(objectPhotoPost, user) {
            var photoPost = document.createElement('div');
            photoPost.className = 'photo_post';
            photoPost.setAttribute('data_post_id', objectPhotoPost.id);
            photoPost.innerHTML = `
            <div class="post">
                <div class="image_name_date">
                    <img class="post_image" src="images/avatar.png"/>
                    <p class="name">${objectPhotoPost.author}</p>
                    <p class="date_post">${new Date(objectPhotoPost.createdAt).toLocaleDateString()}</p>
                </div>
             </div>
            <img class="photo" src="${ objectPhotoPost.photoLink}">
            <div class="entry">
                <p class="description">${objectPhotoPost.description}</p>
                <p class="hashTag">${objectPhotoPost.hashTag}</p>
                    <div class="users_like">
                        <p>Likes:</p>
                        <p class = "number_of_likes"> ${objectPhotoPost.like.length}</p>
                    </div>
            </div>
            <div class = 'button_like'>
                <div class="like${isLiked(objectPhotoPost.like, user) ? '-active' : ''}">
                </div>
            </div>`;
            if (objectPhotoPost.author === user) {
                var edit_delete = document.createElement("div");
                edit_delete.className = 'delete_edit';
                edit_delete.innerHTML = `
                <button  type="button" class="delete" >
                    <img src="images/delete.png" class="delete_post"/>
                </button>
                <button type="button" class="edit">
                    <img src="images/edit.png" class="edit_post"/>
                </button>`;
                photoPost.querySelector('.post').appendChild(edit_delete);
            }
            return photoPost;
        }

        function displaySignUpForm() {
            document.querySelector('form').innerHTML = '';
            document.querySelector('main').removeChild(document.querySelector('.site_content'));
            var signUp = document.createElement('div');
            signUp.className = 'sign_up';
            signUp.innerHTML = `
            <form name="registrationForm" action="" class="registration">
                <div class="userRegistration">
                    <img src="images/userRegistration.png"/>
                        <input name="username" id="username" placeholder=" Username...">
                </div>
                <div class="keyRegistration">
                    <img src="images/keyRegistration.png"/>
                    <input name="password" id="password" placeholder=" Password...">
                </div>
                <button type="submit" id="button_registration" value="Sign up">
                    <a href="index.html"> Sign up</a>
                </button>
            </form>`;
            document.querySelector('main').appendChild(signUp);
        }

        function displayHtmlAddPhotoPost() {
            document.querySelector('main').removeChild(document.querySelector('.avatar'));
            document.querySelector('form').innerHTML = '';
            document.querySelector('main').removeChild(document.querySelector('.site_content'));
            var addPhotoPost = document.createElement('div');
            addPhotoPost.className = 'add_post';
            document.querySelector('main').appendChild(addPhotoPost);
        }

        function postsNullError(photoPost){
            if(photoPost !== undefined) {
                document.querySelector('.site_content').removeChild(document.querySelector('.site_content').lastChild);
                for (var index = 0; index < document.getElementsByClassName('photo_post').length; index++) {
                    document.getElementsByClassName('photo_post')[index].innerHTML = '';
                }
            }
            document.querySelector('.site_content').classList.add('error');
            var textError = document.createElement("div");
            textError.className = 'error_text';
            textError.textContent = 'PhotoPosts not found!';
            document.querySelector('.site_content').appendChild(textError);
        }
        function buildButtonDownload(flag) {
            if (flag) {
                var downloadButton = document.createElement("div");
                downloadButton.innerHTML = `
                <button type="button" id="download">    
                    <b>...</b>
                </button>`;
                document.querySelector('.site_content').insertBefore(downloadButton, document.querySelector('.site_content').lastChild);
            }
            else {
                document.querySelector('.site_content').removeChild(document.querySelector('.site_content').lastChild);
            }
        }

        function pagination(photoPosts, user) {
            document.querySelector('.site_content').removeChild(document.querySelector('.site_content').lastChild);
            for (var index = 0; index < photoPosts.length; index++) {
                document.querySelector('.site_content').insertBefore(buildPhotoPost(photoPosts[index], user), document.querySelector('.site_content').lastChild);
            }

        }

        function addPhotoPost(objectPhotoPost, user) {
            document.querySelector('.site_content').insertBefore(buildPhotoPost(objectPhotoPost, user), document.querySelector('.site_content').firstChild);
            if (objectPhotoPost.hashTag !== '') {
                for (var index = 0; index < objectPhotoPost.hashTag.length; index++) {
                    addOptionToSelect(objectPhotoPost.hashTag[index], document.getElementById('hashTag'));
                }
            }
        }

        function displayHtmlPhotoPosts(photoPosts, user) {
            for (var index = 0; index < document.getElementsByClassName('photo_post').length; index++) {
                document.getElementsByClassName('photo_post')[index].innerHTML = '';
            }
            if (document.getElementById('download')) {
                document.querySelector('.site_content').removeChild(document.querySelector('.site_content').lastChild);
            }
            setUser(user);
            for (var index = 0; index < photoPosts.length; index++) {
                document.querySelector('.site_content').insertBefore(buildPhotoPost(photoPosts[index], user), document.querySelector('.site_content').lastChild);
            }

        }

        function editPhotoPost(photoPost, id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined) {
                return false;
            }
            var index = photoPost.findIndex((element) => element.id === id);
            if (index >= 0) {
                if (objectPhotoPost.hasOwnProperty('photoLink')) {
                    var editPhotoLink = document.getElementsByClassName('photo')[index];
                    editPhotoLink.src = objectPhotoPost.photoLink;
                }
                if (objectPhotoPost.hasOwnProperty('description') && objectPhotoPost.description.length < 200) {
                    var editDescription = document.getElementsByClassName('description')[index];
                    editDescription.textContent = objectPhotoPost.description;
                }
                if (objectPhotoPost.hasOwnProperty('hashTag')) {
                    var editHashTag = document.getElementsByClassName('hashTag')[index];
                    editHashTag.textContent = objectPhotoPost.hashTag;
                }
            }
        }

        function removePhotoPost(photoPosts, id) {
            var index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                var container = document.querySelector('.site_content');
                var deleteElem = document.getElementsByClassName('photo_post')[index];
                container.removeChild(deleteElem);
            }
        }

        function addOptionToSelect(elementArr, select) {
            var option = document.createElement('option');
            option.innerHTML = elementArr;
            select.appendChild(option);
        }

        return {
            pagination: pagination,
            displaySignUpForm: displaySignUpForm,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            displayHtmlPhotoPosts: displayHtmlPhotoPosts,
            buildButtonDownload: buildButtonDownload,
            setLikes: setLikes,
            postsNullError: postsNullError
        }
    }
)();
//console.log(PostView.displayHtmlPhotoPosts());
// console.log(module.getPhotoPosts(0, 10, {author: 'Adamskaya Yuliya'}));
// console.log(module.removePhotoPost(1));
// console.log(module.editPhotoPost(5, {description: 'newText', photoLink: 'images/22.jpg'}));
// console.log(module.editPhotoPost(2, {hashTag: ['#otherHashtag1', '#otherHashtag2']}));
// console.log(module.addPhotoPost({
//     id: 21,
//     description: 'Text',
//     createdAt: '07.04.2018',
//     author: 'Adamskaya Yuliya',
//     photoLink: 'images/21.jpg',
//     hashTag: ['#flowers'],
//     like: ['']
// }));

