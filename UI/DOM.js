(function () {
        var photoPosts = [];
        var AllPosts = [{
            id: 1,
            description: 'Text',
            createdAt: "25.01.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/20.jpg',
            hashTag: ["#nature", "#flowers"],
            like: ["author1", "author2"]
        }, {
            id: 2,
            description: 'Text',
            createdAt: "26.01.2018",
            author: "Murashko Yuliya",
            photoLink: 'images/19_2.jpg',
            hashTag: ["#nature", "#flowers"],
            like: ["author1", "author3"]
        }, {
            id: 3,
            description: 'Text',
            createdAt: "02.01.2018",
            author: "Ambrosyonok Marina",
            photoLink: 'images/18.jpg',
            hashTag: ["#coffe"],
            like: ["author2"]
        }, {
            id: 4,
            description: 'Text',
            createdAt: "27.01.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/17.jpg',
            hashTag: ["#coffe"],
            like: ["author3"]
        }, {
            id: 5,
            description: 'Text',
            createdAt: "02.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/16_1.jpg',
            hashTag: ["#food"],
            like: ["author1", "author2"]
        }, {
            id: 6,
            description: 'Text',
            createdAt: "10.01.2018",
            author: "Ambrosyonok Marina",
            photoLink: 'images/15.jpg',
            hashTag: ["#flowers"],
            like: ["author1", "author2"]
        }, {
            id: 7,
            description: 'Text',
            createdAt: "03.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/14.jpg',
            hashTag: ["#food"],
            like: ["author2"]
        }, {
            id: 8,
            description: 'Text',
            createdAt: "01.02.2018",
            author: "Murashko Yuliya",
            photoLink: 'images/13.jpg',
            hashTag: ["#food"],
            like: ["author1", "author2", "author3"]
        }, {
            id: 9,
            description: 'Text',
            createdAt: "10.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/12.jpg',
            hashTag: ["#flowers"],
            like: ["author1"]
        }, {
            id: 10,
            description: 'Text',
            createdAt: "20.02.2018",
            author: "Murashko Yuliya",
            photoLink: 'images/11.jpg',
            hashTag: ["#food"],
            like: ["author1", "author2"]
        }, {
            id: 11,
            description: 'Text',
            createdAt: "12.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/10.jpg',
            hashTag: ["#nature"]
        }, {
            id: 12,
            description: 'Text',
            createdAt: "01.02.2018",
            author: "Ambrosyonok Marina",
            photoLink: 'images/9.jpg',
            hashTag: ["#food"],
            like: ["author1", "author3"]
        }, {
            id: 13,
            description: 'Text',
            createdAt: "15.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/8.jpg',
            hashTag: ["#flowers"],
            like: ["author2"]
        }, {
            id: 14,
            description: 'Text',
            createdAt: "25.02.2018",
            author: "Murashko Yuliya",
            photoLink: 'images/7_1.jpg',
            like: ["author3"]
        }, {
            id: 15,
            description: 'Text',
            createdAt: "28.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/6.jpg',
            hashTag: ["#coffe"],
            like: ["author1", "author2"]
        }, {
            id: 16,
            description: 'Text',
            createdAt: "12.02.2018",
            author: "Ambrosyonok Marina",
            photoLink: 'images/5_1.jpg',
            hashTag: ["#flowers", "#nature"],
            like: ["author1", "author2"]
        }, {
            id: 17,
            description: 'Text',
            createdAt: "01.03.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/1.jpg',
            hashTag: ["#food"],
            like: ["author1", "author2", "author3"]
        }, {
            id: 18,
            description: 'Text',
            createdAt: "04.02.2018",
            author: "Adamskaya Yuliya",
            photoLink: 'images/3.jpg',
            hashTag: ["#food"],
            like: ["author2"]
        }, {
            id: 19,
            description: 'Text',
            createdAt: '05.03.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/2.jpg',
            hashTag: ['#nature'],
            like: ["author1"]
        }, {
            id: 20,
            description: 'Text',
            createdAt: "06.03.2018",
            author: "Murashko Yuliya",
            photoLink: 'images/1_1.jpg',
            hashTag: ["#coffe"],
            like: ["author1", "author2"]
        }];

        function addPhotoPost(objectPhotoPost) {
            var container = document.querySelector('.site_content');
            var newElem = document.createElement("div");
            var firstElem = document.getElementsByClassName("photo_post")[0];
            newElem.className = "photo_post";
            if (objectPhotoPost.hashTag === undefined) {
                objectPhotoPost.hashTag = '';
            }
            if (objectPhotoPost.like === undefined) {
                objectPhotoPost.like = '';
            }
            if (objectPhotoPost.author === "Adamskaya Yuliya") {
                newElem.innerHTML = '<div class="post">' +
                    '\<div class="image_name_date">' +
                    '\<img class="post_image" src="images/101.png"/><p class="name">' + objectPhotoPost.author + '</p><p class="date_post">' + objectPhotoPost.createdAt + '</p></div>' +
                    '\<div class="delete_redact">' +
                    '\<button type="button" class="delete"><img src="images/delete.png" alt="delete post"/></button><button type="button" class="redact"><img src="images/edit.png" alt="redact post"/></button></div>' +
                    '</div>' +
                    '<div class="entry">\<p class="description">' + objectPhotoPost.description + '</p>' +
                    '<p class="hashTag">' + objectPhotoPost.hashTag + '</p>' +
                    '<div class="like"><p>Like:</p><p>' + objectPhotoPost.like + '</p></div></div>' +
                    '<button type="button" class="put_like"><img src="images/heart1.png" alt="like"/></button>' +
                    '</div>';
                var imageAdamskaya = document.createElement("img");
                imageAdamskaya.className = "photo";
                imageAdamskaya.src = objectPhotoPost.photoLink;
                newElem.insertBefore(imageAdamskaya, newElem.children[1]);
                container.insertBefore(newElem, firstElem);

            }
            if (objectPhotoPost.author === "Ambrosyonok Marina") {
                newElem.innerHTML = '<div class="post">' +
                    '\<div class="image_name_date">' +
                    '\<img class="post_image" src="images/102.png"/><p class="name">' + objectPhotoPost.author + '</p><p class="date_post">' + objectPhotoPost.createdAt + '</p></div>' +
                    '</div>' +
                    '<div class="entry">\<p class="description">' + objectPhotoPost.description + '</p>' +
                    '<p class="hashTag">' + objectPhotoPost.hashTag + '</p>' +
                    '<div class="like"><p>Like: </p> <p>' + objectPhotoPost.like + '</p></div></div>' +
                    '<button type="button" class="put_like"><img src="images/heart1.png" alt="like"/></button>' +
                    '</div>';
                var imageAmbrosyonok = document.createElement("img");
                imageAmbrosyonok.className = "photo";
                imageAmbrosyonok.src = objectPhotoPost.photoLink;
                newElem.insertBefore(imageAmbrosyonok, newElem.children[1]);
                container.insertBefore(newElem, firstElem);
            }
            if (objectPhotoPost.author === "Murashko Yuliya") {
                newElem.innerHTML = '<div class="post">' +
                    '\<div class="image_name_date">' +
                    '\<img class="post_image" src="images/103.png"/><p class="name">' + objectPhotoPost.author + '</p><p class="date_post">' + objectPhotoPost.createdAt + '</p></div>' +
                    '</div>' +
                    '<div class="entry">\<p class="description">' + objectPhotoPost.description + '</p>' +
                    '<p class="hashTag">' + objectPhotoPost.hashTag + '</p>' +
                    '<div class="like"><p>Like: </p> <p>' + objectPhotoPost.like + '</p></div></div>' +
                    '<button type="button" class="put_like"><img src="images/heart1.png" alt="like"/></button>' +
                    '</div>';
                var imageMurashko = document.createElement("img");
                imageMurashko.className = "photo";
                imageMurashko.src = objectPhotoPost.photoLink;
                newElem.insertBefore(imageMurashko, newElem.children[1]);
                container.insertBefore(newElem, firstElem);
            }
            if (objectPhotoPost.id > AllPosts.length) {
                AllPosts.push(objectPhotoPost);
                return true;
            }
        }

        function displayHtmlPhotoPosts() {
            for (var item in AllPosts) {
                addPhotoPost(AllPosts[item]);
            }
        }

        function getHtmlPhotoPosts() {
            for (var i = 0; i < document.getElementsByClassName("photo_post").length; i++) {
                var posts = [];
                var hashTag = [];
                var like = [];
                posts.id = i + 1;
                posts.description = document.getElementsByClassName("description")[i].innerHTML;
                posts.createdAt = document.getElementsByClassName("date_post")[i].innerHTML;
                posts.author = document.getElementsByClassName("name")[i].innerHTML;
                posts.photoLink = document.getElementsByClassName("photo")[i].src;
                for (var j = 0; j < document.getElementsByClassName("hashTag")[i].getElementsByTagName("li").length; j++) {
                    hashTag.push(document.getElementsByClassName("hashTag")[i].getElementsByTagName("li")[j].innerHTML);
                }
                posts.hashTag = hashTag;
                for (var k = 0; k < document.getElementsByClassName("like")[i].getElementsByTagName("li").length; k++) {
                    like.push(document.getElementsByClassName("like")[i].getElementsByTagName("li")[k].innerHTML);
                }
                posts.like = like;
                photoPosts.push(posts);
            }
        }

        function editPhotoPost(id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined) {
                return false;
            }
            for (var i = 0; i < AllPosts.length; i++) {
                if (i === id) {
                    var post = photoPosts[i - 1];
                    if (objectPhotoPost.photoLink !== undefined && objectPhotoPost.photoLink !== 0) {
                        var editPhotoLink = document.getElementsByClassName("photo")[i - 1];
                        editPhotoLink.src = objectPhotoPost.photoLink;
                        post.photoLink = objectPhotoPost.photoLink;
                    }
                    if (objectPhotoPost.description !== undefined && objectPhotoPost.description !== 0 && objectPhotoPost.description.length < 200) {
                        var editDescription = document.getElementsByClassName("description")[i - 1];
                        editDescription.innerHTML = objectPhotoPost.description;
                        post.description = objectPhotoPost.description;
                    }
                    if (objectPhotoPost.hashTag !== undefined && objectPhotoPost.hashTag.length > 0) {
                        var editHashTag = document.getElementsByClassName("hashTag")[i - 1];
                        editHashTag.innerHTML = objectPhotoPost.hashTag;
                        post.hashTag = objectPhotoPost.hashTag;
                    }
                    photoPosts[i - 1] = post;
                    return true;
                }
            }
            return false;
        }

        function removePhotoPost(id) {
            for (var i = 0; i < AllPosts.length; i++) {
                if (i === id) {
                    var container = document.querySelector('.site_content');
                    var deleteElem = document.getElementsByClassName("photo_post")[i - 1];
                    container.removeChild(deleteElem);
                    AllPosts.splice(i - 1, 1);
                    console.log(AllPosts);
                    return true;
                }

            }
            return false;
        }

        console.log(displayHtmlPhotoPosts());
        console.log(getHtmlPhotoPosts());
        console.log(photoPosts);
        console.log(addPhotoPost({
            id: 21,
            description: 'Text',
            createdAt: '12.03.2018',
            author: 'Adamskaya Yuliya',
            photoLink: 'images/21.jpg',
            hashTag: ['#flowers']
        }));
        console.log(removePhotoPost(1));
        console.log(editPhotoPost(5, {photoLink: 'images/22.jpg'}));
        console.log(editPhotoPost(2, {hashTag: ['#otherHashtag1', '#otherHashtag2']}));
    }
)();
