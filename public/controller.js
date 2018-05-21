(function () {

    let numberPhotoPostsOnPage = 0;
    const getNumberPhotoPostsOnPage = 10;
    const username = JSON.parse(localStorage.getItem('user'));

    const postsList = document.getElementById('site-content');
    const signInView = document.getElementById('sign-in');
    const addPostView = document.getElementById('add');
    const buttonLoadPosts = document.getElementById('button-load');
    const buttonSignIn = document.getElementById('sign-out-sign-in');
    const postForm = document.getElementById('button-search');
    const buttonAddPost = document.getElementById('button-add');

    const model = new PhotoPostsCollection();
    const users = new Users();
    const listView = new PostView(postsList);
    const registrationView = new RegistrationFormView(signInView);
    const newElemListView = new NewPostView(addPostView);

    function bindEvents() {
        buttonLoadPosts.addEventListener('click', loadMorePhotoPosts);
        buttonSignIn.addEventListener('click', signIn);
        postsList.addEventListener('click', onItemClick);
        postForm.addEventListener('click', onPostFormSubmit);
        buttonAddPost.addEventListener('click', onPostAdd)
    }

    // ================= INIT ======================
    load();

    // =============================================
    async function load() {
        await model.loadPhotoPosts();
        await users.loadUsers();
        showView('list');
        onUpdate();
        bindEvents();
    }

    function getHashTags(listPhotoPosts) {
        let hashTags = [];
        listPhotoPosts.forEach(function (item) {
            if (item.hashTags) {
                for (let index = 0; index < item.hashTags.length; index++) {
                    if (hashTags.findIndex((element) => element === item.hashTags[index]) < 0) {
                        hashTags.push(item.hashTags[index]);
                    }
                }
            }
        });
        return hashTags;
    }

    function addHashTags() {
        let hashTags = getHashTags(model.list);
        localStorage.setItem('hashTags', JSON.stringify(hashTags));
        const listHashTags = document.getElementById('hashTags');
        hashTags.forEach(function (hashTags) {
            let options = document.createElement('option');
            options.innerHTML = hashTags;
            listHashTags.appendChild(options);
        });
    }

    function addUser() {
        const username = JSON.parse(localStorage.getItem('user'));
        const user = document.querySelector('.user');
        if (!username) {
            if (user) {
                user.classList.add('hide');
            }
            document.getElementById('sign-out-sign-in').textContent = 'Sign in';
        } else {
            user.classList.remove('hide');
            document.getElementById('name').textContent = username;
        }
    }

    function onUpdate() {
        addUser();
        const listPhotoPosts = model.getPhotoPosts(numberPhotoPostsOnPage, getNumberPhotoPostsOnPage);
        listView.clearPage();
        listView.addAllPost(listPhotoPosts);
        addHashTags();
        checkNumberPhotoPosts(listPhotoPosts);
    }

    function checkNumberPhotoPosts(listPhotoPosts) {
        numberPhotoPostsOnPage = numberPhotoPostsOnPage + listPhotoPosts.length;
        if (listPhotoPosts.length === getNumberPhotoPostsOnPage && model.list.length !== numberPhotoPostsOnPage) {
            document.querySelector('.download').classList.remove('hide');
        } else {
            document.querySelector('.download').classList.add('hide');
        }
    }

    function loadMorePhotoPosts() {
        const listPhotoPosts = model.getPhotoPosts(numberPhotoPostsOnPage, getNumberPhotoPostsOnPage);
        checkNumberPhotoPosts(listPhotoPosts);
        listView.addAllPost(listPhotoPosts);
        numberPhotoPostsOnPage = numberPhotoPostsOnPage + getNumberPhotoPostsOnPage;
    }

    function getRegistrationData() {
        const formRegistration = document.getElementById('form-registration');
        const formData = new FormData(formRegistration);
        return {
            username: formData.get('username'),
            password: formData.get('password')
        }
    }

    function handlerRegistrationData() {
        const formData = getRegistrationData();
        if (formData.username === '') {
            registrationView.showMessageErrorInData('Данные некорректные!');
            event.preventDefault();
        } else {
            if (formData.password === users.findUser(formData.username).password) {
                localStorage.setItem('user', JSON.stringify(formData.username));
            } else {
                registrationView.showMessageErrorInData('Неправильный пароль!');
                event.preventDefault();
            }
        }
    }

    function signIn() {
        if (buttonSignIn.textContent === 'Sign in') {
            showView('sign-in');
            registrationView.clearPage();
            registrationView.addRegistrationForm();
            document.getElementById('button-registration').addEventListener('click', handlerRegistrationData);
            event.preventDefault();
        }
        if (buttonSignIn.textContent === 'Sign out') {
            localStorage.setItem('user', JSON.stringify(null));
            addUser();
            event.preventDefault();
        }
    }

    function onItemClick(event) {
        const target = event.target.closest('[data-action]');
        if (target) {
            const post = event.target.closest('.photo-post');
            switch (target.dataset.action) {
                case 'edit':
                    onPostEdit(post.dataset.id);
                    break;
                case 'delete':
                    onPostDelete(post.dataset.id);
                    break;
                case 'like':
                    onPostLike(post.dataset.id);
            }
            event.preventDefault();
        }
    }

    function parseHashTags(stringOfHashTags) {
        let hashTag = '';
        let listHashTags = [];
        let countHashTags = 0;
        let isHashTag = false;
        for (let index = 0; index < stringOfHashTags.length; index++) {
            if (stringOfHashTags[index] === '#') {
                isHashTag = true;
                countHashTags++;
            }
            if (isHashTag) {
                if (!(stringOfHashTags[index] === ',') && !(stringOfHashTags[index] === ' ')) {
                    hashTag = hashTag + stringOfHashTags[index];
                }
                if (stringOfHashTags[index] === ' ' || index === stringOfHashTags.length - 1 || stringOfHashTags[index] === ',') {
                    listHashTags.push(hashTag);
                    hashTag = '';
                    isHashTag = false;
                }
            }
        }
        return listHashTags;
    }

    function getDataNewPost(post) {
        let newPost = {};
        const entry = document.getElementById('newEntry');
        const formData = new FormData(entry);
        newPost.id = post ? post.id : ' ';
        newPost.author = username;
        newPost.description = formData.get('description');
        newPost.hashTags = parseHashTags(formData.get('hashTags'));
        const image = document.querySelector('.fileInput').files[0];
        if (image !== undefined) {
            newPost.photoLink = 'images/' + image.name;
        }
        return newPost;
    }

    function uploadImage(file) {
        let formData = new FormData();
        formData.append('file', file);

        let image = document.createElement('img');
        image.src = window.URL.createObjectURL(formData.get('file'));
        let newPost = document.querySelector('.new-photo');
        newPost.src = image.src;
        newPost.classList.add('image');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadImage');
        xhr.send(formData);
    }

    async function onPostEdit(id) {
        const post = model.getPhotoPost(id);
        showView('add-post');
        newElemListView.clearPage();
        newElemListView.addFormForNewPost();
        setFormPostData(post);
        let postEdit = document.querySelector('.new-photo');
        postEdit.src = post.photoLink;
        postEdit.classList.add('image');
        document.querySelector('.download-photo').classList.add('hide');
        document.getElementById('button-submit-post').addEventListener('click', async () => {
            await model.editPhotoPost(getDataNewPost(post));
        });
    }

    async function onPostAdd() {
        showView('add-post');
        newElemListView.clearPage();
        newElemListView.addFormForNewPost();
        setFormPostData();
        document.getElementsByClassName('fileInput')[0].addEventListener('change', (event) => {
            uploadImage(event.target.files[0]);
        });
        document.getElementById('button-submit-post').addEventListener('click', async () => {
            const image = document.querySelector('.fileInput').files[0];
            if (image !== undefined) {
                await model.addPhotoPost(getDataNewPost());
            } else {
                newElemListView.showMessageNoData('Выберите изображение!');
                event.preventDefault();
            }
        });
    }

    async function onPostDelete(id) {
        listView.removePost(id);
        await model.removePhotoPost(id);
    }

    function isLikedByUser(likes) {
        return likes.find((likeOwn) => likeOwn === username);
    }

    async function onPostLike(id) {
        if (username) {
            const post = model.getPhotoPost(id);
            const postView = listView.find(id);
            if (!isLikedByUser(post.likes)) {
                post.likes.push(username);
                await model.editPhotoPost(post);
                postView.querySelector('.like').classList.add('active');
            }
            else {
                post.likes.splice(post.likes.findIndex((element) => element === username), 1);
                await model.editPhotoPost(post);
                postView.querySelector('.like').classList.remove('active');
            }
            postView.querySelector('.number-of-likes').textContent = 'Likes: ' + post.likes.length;
        }
    }

    function getFilterData() {
        const searchForm = document.getElementById('search-form');
        const searchFormData = new FormData(searchForm);
        const date = searchFormData.get('date');
        const username = searchFormData.get('username');
        const hashTags = searchFormData.get('listHashTags');
        return {
            author: username,
            createdAt: date,
            hashTags: hashTags
        }
    }

    function onPostFormSubmit() {
        const formData = getFilterData();
        const filteredPosts = model.getPhotoPosts(0, 10, formData);
        numberPhotoPostsOnPage = 0;
        if (filteredPosts.length) {
            listView.clearPage();
            checkNumberPhotoPosts(filteredPosts);
            listView.addAllPost(filteredPosts);
        } else {
            listView.clearPage();
            checkNumberPhotoPosts(filteredPosts);
            listView.showMessageNoPosts();
        }
        event.preventDefault();
    }

    function setFormPostData(post) {
        const postForm = document.getElementById('newEntry');
        postForm.querySelector('[name="description"]').value = post ? post.description : '';
        postForm.querySelector('[name="hashTags"]').value = post ? post.hashTags : '';
    }

    function showView(viewName) {
        const views = document.querySelectorAll('section[data-role]');
        [].slice.call(views).forEach((view) => {
            if (view.dataset.role === viewName) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
    }
})();


