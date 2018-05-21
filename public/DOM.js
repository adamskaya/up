(function () {
    class PostsView {
        static get template() {
            if (!PostsView._template) {
                PostsView._template = document.getElementById('post-template');
            }
            return PostsView._template;
        }

        constructor(posts) {
            this.posts = posts;
        }

        showMessageNoPosts() {
            let messageError = document.createElement("div");
            messageError.className = 'error-text';
            messageError.textContent = 'Фотопостов не найдено!';
            this.posts.classList.add('error');
            this.posts.appendChild(messageError);
        }

        addPost(post) {
            if (!isNaN(+post.id)) {
                const newPost = this.buildPost(post);
                this.posts.appendChild(newPost, this.posts.lastChild);
            }
        }

        addAllPost(posts) {
            posts.forEach(post => this.addPost(post));
        }

        removePost(post) {
            let postRemove = this.find(post.id || post);
            if (postRemove) {
                this.posts.removeChild(postRemove);
            }
        }

        clearPage() {
            this.posts.innerHTML = '';
        }

        find(id) {
            return this.posts.querySelector(`.photo-post[data-id="${id}"]`);
        }

        createEmptyPost() {
            const fragment = document.importNode(PostsView.template.content, true);
            return fragment.firstElementChild;
        }

        buildPost(post) {
            const newPost = this.createEmptyPost();
            const user = getUser();
            newPost.setAttribute('data-id', post.id);
            const author = newPost.querySelector('.author');
            const date = newPost.querySelector('.date-post');
            const photo = newPost.querySelector('.photo');
            const text = newPost.querySelector('.description');
            const hashTags = newPost.querySelector('.hashTags');
            const numberLikes = newPost.querySelector('.number-of-likes');
            const buttonLike = newPost.querySelector('.like');
            const buttonsEditAndRemove = newPost.querySelector('.remove-edit');

            author && post.author && (author.textContent = post.author);
            date && post.createdAt && (date.textContent = formatDate(post.createdAt));
            photo && post.photoLink && (photo.src = post.photoLink);
            text && post.description && (text.textContent = post.description);
            hashTags && post.hashTags && (hashTags.textContent = post.hashTags);
            numberLikes && post.likes && (numberLikes.textContent = 'Likes: ' + post.likes.length);
            if (!isLikedByUser(post.likes)) {
                buttonLike.classList.remove('active');
            } else {
                buttonLike.classList.add('active');
            }
            if (post.author !== user) {
                buttonsEditAndRemove.classList.add('hide');
            }
            return newPost;
        }
    }

    class RegistrationFormView {
        static get template() {
            if (!RegistrationFormView._template) {
                RegistrationFormView._template = document.getElementById('registration-form-template');
            }
            return RegistrationFormView._template;
        }

        constructor(registrationData) {
            this.registrationData = registrationData;
        }

        showMessageErrorInData(error) {
            const formRegistration = document.getElementById('form-registration');
            let messageError = document.querySelector('.error-text');
            if (messageError) {
                messageError.innerText = error;

            } else {
                let messageError = document.createElement('div');
                messageError.className = 'error-text';
                messageError.innerText = error;
                formRegistration.insertBefore(messageError, formRegistration.firstChild);
            }
        }
        addRegistrationForm() {
            const registrationForm = this.createEmpty();
            this.registrationData.appendChild(registrationForm, this.registrationData.lastChild);
        }

        clearPage() {
            document.getElementById('search-form').innerHTML = '';
            document.querySelector('.download').classList.add('hide');
            this.registrationData.innerHTML = '';
        }

        createEmpty() {
            const fragment = document.importNode(RegistrationFormView.template.content, true);
            return fragment.firstElementChild;
        }
    }

    class NewPostView {
        static get template() {
            if (!NewPostView._template) {
                NewPostView._template = document.getElementById('add-post-template');
            }
            return NewPostView._template;
        }

        constructor(newPostView) {
            this.newPostView = newPostView;
        }

        addFormForNewPost() {
            const newPostView = this.createEmpty();
            this.newPostView.appendChild(newPostView, this.newPostView.lastChild);
        }

        clearPage() {
            document.getElementById('search-form').innerHTML = '';
            document.querySelector('.download').classList.add('hide');
            this.newPostView.innerHTML = '';
        }

        showMessageNoData(error) {
            let messageError = document.querySelector('.error-text');
            if (messageError) {
                messageError.innerText = error;

            } else {
                let messageError = document.createElement("div");
                messageError.className = 'error-text';
                messageError.textContent = error;
                document.getElementById('newEntry').appendChild(messageError);
            }

        }

        createEmpty() {
            const fragment = document.importNode(NewPostView.template.content, true);
            return fragment.firstElementChild;
        }
    }

    function formatDate(date) {
        return new Date(date).toLocaleTimeString() + '  ' + new Date(date).toLocaleDateString();
    }

    function getUser() {
        const user =  document.getElementById('name').textContent;
        if (user.length) {
            return user;
        } else return null;
    }

    function isLikedByUser(likes) {
        const user = getUser();
        if(user && likes) {
            return likes.find((likeOwn) => likeOwn === user);
        } else return null;
    }

    window.PostView = PostsView;
    window.RegistrationFormView = RegistrationFormView;
    window.NewPostView = NewPostView;
})();
