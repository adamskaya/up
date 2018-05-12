(function () {

    let numberPhotoPostsOnPage = 0;
    const getNumberPhotoPostsOnPage = 10;
    // const hashTags = JSON.parse(localStorage.getItem('hashTags'));
    let username = document.getElementById('name').textContent;

    const postsList = document.getElementById('site-content');
    const signInView = document.getElementById('sign-in');
    const addPostView = document.getElementById('add');
    const buttonLoadPosts = document.getElementById('button-load');
    const buttonSignIn = document.getElementById('sign-out-sign-in');
    const postForm = document.getElementById('button-search');
    const buttonAddPost = document.getElementById('button-add');

    const model = new PhotoPostsCollection();
    const users = new Users(username);
    const listView = new PostView(postsList);
    const registrationView = new RegistrationFormView(signInView);
    const newElemListView = new newPostView(addPostView);

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

    // function addDataToLocalStorage() {
    //     let users = [
    //         {
    //             username: 'Adamskaya Yuliya',
    //             password: '111111'
    //         },
    //         {
    //             username: 'Murashko Yuliya',
    //             password: '222222'
    //         },
    //         {
    //             username: 'Ambrosyonok Marina',
    //             password: '333333'
    //         }];
    //     localStorage.setItem('users', JSON.stringify(users));
    //     localStorage.setItem('user', JSON.stringify(null));
    //     localStorage.setItem('hashTags', JSON.stringify(getHashTags(listPhotoPosts)));
    // }

    function getHashTags(listPhotoPosts) {
        let hashTags = [];
        listPhotoPosts.forEach(function (item) {
            for (let index = 0; index < item.hashTags.length; index++) {
                if (hashTags.findIndex((element) => element === item.hashTags[index]) < 0) {
                    hashTags.push(item.hashTags[index]);
                }
            }
        });
        return hashTags;
    }

    function addHashTags() {
        const listHashTags = document.getElementById('hashTags');
        hashTags.forEach(function (hashTags) {
            let options = document.createElement('option');
            options.innerHTML = hashTags;
            listHashTags.appendChild(options);
        });
    }

    function addUser() {
        const user = document.querySelector('.user');
        if (users.username === '') {
            if (user) {
                user.classList.add('hide');
            }
            document.getElementById('sign-out-sign-in').textContent = 'Sign in';
        } else {
            document.getElementById('name').textContent = users.username;
        }
    }

    function onUpdate() {
        addUser();
        const listPhotoPosts = model.getPhotoPosts(numberPhotoPostsOnPage, getNumberPhotoPostsOnPage);
        listView.clearPage();
        listView.addAllPost(listPhotoPosts);
        // addHashTags();
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
            registrationView.showMessageErrorInData('Incorrect username!');
            event.preventDefault();
        } else {
            if (formData.password === users.findUser(formData.username).password) {
                document.getElementById('name').textContent = formData.username;
            } else {
                registrationView.showMessageErrorInData('Incorrect password!');
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
            // localStorage.setItem('user', JSON.stringify(null));
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
        const entry = document.getElementById('newEntry');
        const formData = new FormData(entry);
        return {
            id: post ? post.id : ' ',
            author: username,
            description: formData.get('description'),
            photoLink: 'images/21.jpg',
            hashTags: parseHashTags(formData.get('hashTags'))
        }
    }

    async function onPostEdit(id) {
        const post = model.getPhotoPost(id);
        showView('add-post');
        newElemListView.clearPage();
        newElemListView.addFormForNewPost();
        setFormPostData(post);
        document.getElementById('button-submit-post').addEventListener('click', async () => {
            await model.editPhotoPost(getDataNewPost(post));
            // localStorage.setItem('my_application', JSON.stringify(model.list));
            // localStorage.setItem('hashTags', JSON.stringify(getHashTags(model.list)));
        });
    }

    async function onPostAdd() {
        showView('add-post');
        newElemListView.clearPage();
        newElemListView.addFormForNewPost();
        setFormPostData();
        document.getElementById('button-submit-post').addEventListener('click', async () => {
            await model.addPhotoPost(getDataNewPost());
            // localStorage.setItem('my_application', JSON.stringify(model.list));
            // localStorage.setItem('hashTags', JSON.stringify(getHashTags(model.list)));
        });
    }

    async function onPostDelete(id) {
        listView.removePost(id);
        await model.removePhotoPost(id);
        // localStorage.setItem('my_application', JSON.stringify(model.list));
        // localStorage.setItem('hashTags', JSON.stringify(getHashTags(model.list)));
    }

    function isLikedByUser(likes) {
        return likes.find((likeOwn) => likeOwn === username);
    }

    function onPostLike(id) {
        if (username) {
            const post = model.getPhotoPost(id);
            const postView = listView.find(id);
            if (!isLikedByUser(post.likes)) {
                post.likes.push(username);
                postView.querySelector('.like').classList.add('active');
            }
            else {
                post.likes.splice(post.likes.findIndex((element) => element === username), 1);
                postView.querySelector('.like').classList.remove('active');
            }
            postView.querySelector('.number-of-likes').textContent = 'Likes: ' + post.likes.length;
            // localStorage.setItem('my_application', JSON.stringify(model.list));
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


