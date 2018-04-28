let Functional = (function () {
        let photoPosts = [{
            id: 1,
            description: 'Text',
            createdAt: new Date(2018, 3, 25),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/20.jpg',
            hashTag: ['#nature', '#flowers'],
            like: ['author1', 'author2']
        }, {
            id: 2,
            description: 'Text',
            createdAt: new Date(2018, 3, 26),
            author: 'Murashko Yuliya',
            photoLink: 'images/19_2.jpg',
            hashTag: ['#nature', '#flowers'],
            like: ['author1', 'author3']
        }, {
            id: 3,
            description: 'Text',
            createdAt: new Date(2018, 1, 2),
            author: 'Ambrosyonok Marina',
            photoLink: 'images/18.jpg',
            hashTag: ['#coffe'],
            like: ['author2']
        }, {
            id: 4,
            description: 'Text',
            createdAt: new Date(2018, 1, 27),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/17.jpg',
            hashTag: ['#coffe'],
            like: ['author3']
        }, {
            id: 5,
            description: 'Text',
            createdAt: new Date(2018, 2, 2),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/16_1.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2']
        }, {
            id: 6,
            description: 'Text',
            createdAt: new Date(2018, 1, 10),
            author: 'Ambrosyonok Marina',
            photoLink: 'images/15.jpg',
            hashTag: ['#flowers'],
            like: ['author1', 'author2']
        }, {
            id: 7,
            description: 'Text',
            createdAt: new Date(2018, 3, 3),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/14.jpg',
            hashTag: ['#food'],
            like: ['author2']
        }, {
            id: 8,
            description: 'Text',
            createdAt: new Date(2018, 2, 1),
            author: 'Murashko Yuliya',
            photoLink: 'images/13.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2', 'author3']
        }, {
            id: 9,
            description: 'Text',
            createdAt: new Date(2018, 2, 10),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/12.jpg',
            hashTag: ['#flowers'],
            like: ['author1']
        }, {
            id: 10,
            description: 'Text',
            createdAt: new Date(2018, 2, 20),
            author: 'Murashko Yuliya',
            photoLink: 'images/11.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2']
        }, {
            id: 11,
            description: 'Text',
            createdAt: new Date(2018, 2, 12),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/10.jpg',
            hashTag: ['#nature'],
            like: []
        }, {
            id: 12,
            description: 'Text',
            createdAt: new Date(2018, 3, 13),
            author: 'Ambrosyonok Marina',
            photoLink: 'images/9.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author3']
        }, {
            id: 13,
            description: 'Text',
            createdAt: new Date(2018, 3, 15),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/8.jpg',
            hashTag: ['#flowers'],
            like: ['author2']
        }, {
            id: 14,
            description: 'Text',
            createdAt: new Date(2018, 2, 25),
            author: 'Murashko Yuliya',
            photoLink: 'images/7_1.jpg',
            hashTag: [],
            like: ['author3']
        }, {
            id: 15,
            description: 'Text',
            createdAt: new Date(2018, 2, 28),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/6.jpg',
            hashTag: ['#coffe'],
            like: ['author1', 'author2']
        }, {
            id: 16,
            description: 'Text',
            createdAt: new Date(2018, 3, 12),
            author: 'Ambrosyonok Marina',
            photoLink: 'images/5_1.jpg',
            hashTag: ['#flowers', '#nature'],
            like: ['author1', 'author2']
        }, {
            id: 17,
            description: 'Text',
            createdAt: new Date(2018, 3, 1),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/1.jpg',
            hashTag: ['#food'],
            like: ['author1', 'author2', 'author3']
        }, {
            id: 18,
            description: 'Text',
            createdAt: new Date(2018, 4, 3),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/3.jpg',
            hashTag: ['#food'],
            like: ['author2']
        }, {
            id: 19,
            description: 'Text',
            createdAt: new Date(2018, 3, 5),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/2.jpg',
            hashTag: ['#nature'],
            like: ['author1']
        }, {
            id: 20,
            description: 'Text',
            createdAt: new Date(2018, 4, 12),
            author: 'Murashko Yuliya',
            photoLink: 'images/1_1.jpg',
            hashTag: ['#coffe'],
            like: ['author1', 'author2']
        }];


        function compareDate(a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        function getPhotoPosts(photoPosts, skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 10;
            photoPosts.sort(compareDate);
            if (filterConfig === undefined) {
                return photoPosts.slice(skip, skip + top);
            }
            else {
                if (filterConfig.author !== '') {
                    photoPosts = photoPosts.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.hashTag !== '') {
                    let postFilterHashTag = [];
                    photoPosts.forEach(function (item) {
                        if (item.hashTag.findIndex((element) => element === filterConfig.hashTag) >= 0) {
                            postFilterHashTag.push(item);
                        }
                    });
                    photoPosts = postFilterHashTag;
                }
                if (filterConfig.createdAt !== '') {
                    photoPosts = photoPosts.filter((element) => new Date(element.createdAt).toLocaleDateString() === filterConfig.createdAt);
                }
                return photoPosts.slice(skip, skip + top);
            }
        }

        function getPhotoPost(id) {
            return photoPosts.find((element) => element.id === id);
        }

        function validatePhotoPost(photoPost) {
            if (photoPost.id === "" || photoPost.author === "" || photoPost.description === "" || photoPost.photoLink === ""
                || photoPost.hashTag.length === 0 || !photoPost.createdAt instanceof Date) {
                return false;
            }
            return true;
        }

        function removePhotoPost(photoPosts, id) {
            let index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                photoPosts.splice(index, 1);
                return photoPosts;
            }
        }

        function addPhotoPost(objectPhotoPost, photoPosts) {
            if (validatePhotoPost(objectPhotoPost)) {
                photoPosts.push(objectPhotoPost);
                return photoPosts;
            }
        }

        function editPhotoPost(photoPosts, id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined) {
                return false;
            }
            let index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                if (objectPhotoPost.hasOwnProperty('photoLink')) {
                    photoPosts[index].photoLink = objectPhotoPost.photoLink;
                }
                if (objectPhotoPost.hasOwnProperty('description') && objectPhotoPost.description.length < 200) {
                    photoPosts[index].description = objectPhotoPost.description;
                }
                if (objectPhotoPost.hasOwnProperty('hashTag')) {
                    photoPosts[index].hashTag = objectPhotoPost.hashTag;
                }
            }
            return photoPosts;
        }

        function putLike(photoPosts, id, user) {
            let index = photoPosts.findIndex((element) => element.id === id);
            if (index >= 0) {
                photoPosts[index].like.push(user);
                return true;
            }
        }

        function isLikedByUser(likes, user) {
            return likes.findIndex((likeOwn) => likeOwn === user) >= 0;
        }

        function getHashTag(elementArr, options) {
            return options.findIndex((hashTag) => hashTag === elementArr) >= 0;
        }

        return {
            photoPosts: photoPosts,
            getPhotoPosts: getPhotoPosts,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            getPhotoPost: getPhotoPost,
            putLike: putLike,
            isLikedByUser: isLikedByUser,
            getHashTag: getHashTag
        }
    }
)();

