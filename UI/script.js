var photoPosts = [{
    id: '1',
    description: 'Text',
    createdAt: new Date('2018-03-01T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/1.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author1", "author2"]
}, {
    id: '2',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Murashko Yuliya',
    photoLink: 'images/2.jpg',
    hashTag: ['#hashTag'],
    like: ["author1"]
}, {
    id: '3',
    description: 'Text',
    createdAt: new Date('2018-02-28T23:00:00'),
    author: 'Ambrosyonok Marina',
    photoLink: 'images/3.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author2"]
}, {
    id: '4',
    description: 'Text',
    createdAt: new Date('2018-02-27T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/4.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author1", "author2", "author3"]
}, {
    id: '5',
    description: 'Text',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/5.jpg',
    hashTag: ['#hashtag_2'],
    like: ["author1", "author2"]
}, {
    id: '6',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Ambrosyonok Marina',
    photoLink: 'images/6.jpg',
    hashTag: ['#hashtag_10'],
    like: ["author1", "author2"]
}, {
    id: '7',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/7.jpg',
    hashTag: ['#hashTag'],
    like: ["author3"]
}, {
    id: '8',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Murashko Yuliya',
    photoLink: 'images/8.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author2"]
}, {
    id: '9',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/9.jpg',
    hashTag: ['#hashtag_11'],
    like: ["author1", "author3"]
}, {
    id: '10',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/10.jpg',
    hashTag: ['#hashtag_5'],
    like: ["author1", "author2"]
}, {
    id: '11',
    description: 'Text',
    createdAt: new Date('2018-03-01T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/11.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author1", "author2"]
}, {
    id: '12',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Murashko Yuliya',
    photoLink: 'images/12.jpg',
    hashTag: ['#hashTag'],
    like: ["author1"]
}, {
    id: '13',
    description: 'Text',
    createdAt: new Date('2018-02-28T23:00:00'),
    author: 'Ambrosyonok Marina',
    photoLink: 'images/13.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author2"]
}, {
    id: '14',
    description: 'Text',
    createdAt: new Date('2018-02-27T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/14.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author1", "author2", "author3"]
}, {
    id: '15',
    description: 'Text',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/15.jpg',
    hashTag: ['#hashtag_2'],
    like: ["author1", "author2"]
}, {
    id: '16',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Ambrosyonok Marina',
    photoLink: 'images/16.jpg',
    hashTag: ['#hashtag_10'],
    like: ["author1", "author2"]
}, {
    id: '17',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/17.jpg',
    hashTag: ['#hashTag'],
    like: ["author3"]
}, {
    id: '18',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Murashko Yuliya',
    photoLink: 'images/18.jpg',
    hashTag: ['#hashtag_1'],
    like: ["author2"]
}, {
    id: '19',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/19.jpg',
    hashTag: ['#hashtag_11'],
    like: ["author1", "author3"]
}, {
    id: '20',
    description: 'Text',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/20.jpg',
    hashTag: ['#hashtag_5'],
    like: ["author1", "author2"]
}];

var module = (function () {
        function compareDate(a, b) {
            return a.createdAt - b.createdAt;
        }

        function getPhotoPosts(skip, top, filterConfig) {
            skip = skip || 0;
            top = top || 10;
            if (filterConfig === undefined) {
                return photoPosts.sort(compareDate).slice(skip, skip + top);
            } else {
                if (filterConfig.author !== undefined) {
                    photoPosts = photoPosts.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.hashTag !== undefined) {
                    photoPosts = photoPosts.filter((element) => element.hashTag === filterConfig.hashTag);
                }
                return photoPosts.sort(compareDate).slice(skip, skip + top);
            }
        }

        function getPhotoPost(id) {
            return photoPosts.find((element) => element.id === id);
        }

        function validatePhotoPost(photoPost) {
            if (typeof(photoPost.id) !== "string" || typeof(photoPost.author) !== "string" || typeof(photoPost.description) !== "string"
                || typeof(photoPost.photoLink) !== "string") {
                return false;
            }
            if (photoPost.id.trim() === "" || photoPost.author.trim() === "" || photoPost.description.trim() === "" || photoPost.photoLink.trim() === ""
                || photoPost.hashTag.length === 0 || photoPost.like.length === 0) {
                return false;
            }
            for (var index = 0; index < photoPost.hashTag.length; index++) {
                if (typeof(photoPost.hashTag[index]) !== "string" || photoPost.hashTag[index].trim() === "") {
                    return false;
                }
            }

            for (var index = 0; index < photoPost.like.length; index++) {
                if (typeof(photoPost.like[index]) !== "string" || photoPost.like[index].trim() === "") {
                    return false;
                }
            }

            if (!photoPost.createdAt instanceof Date) {
                return false;
            }
            return true;
        }

        function removePhotoPost(id) {
            var index = photoPosts.findIndex((element) => element.id === id);
            if (index) {
                photoPosts = photoPosts.splice(index, 1);
                return true;
            } else {
                return false;
            }
        }

        function addPhotoPost(objectPhotoPost) {
            if (validatePhotoPost(objectPhotoPost)) {
                photoPosts.push(objectPhotoPost);
                return true;
            }
            return false;
        }

        function editPhotoPost(id, objectPhotoPost) {
            if (!objectPhotoPost) {
                return false;
            }
            if (id === undefined || typeof id !== 'string') {
                return false;
            }
            var index = photoPosts.findIndex((element) => element.id === id);

            var post = photoPosts[index];
            if (objectPhotoPost.photoLink !== undefined && objectPhotoPost.photoLink !== 0) {
                post.photoLink = objectPhotoPost.photoLink;
            }
            if (objectPhotoPost.description !== undefined && objectPhotoPost.description !== 0 && objectPhotoPost.description.length < 200) {

                post.description = objectPhotoPost.description;
            }
            if (objectPhotoPost.hashTag !== undefined && objectPhotoPost.hashTag.length > 0) {

                post.hashTag = objectPhotoPost.hashTag;
            }
            console.log(post);
            return true;

        }

        return {
            getPhotoPosts: getPhotoPosts,
            removePhotoPost: removePhotoPost,
            editPhotoPost: editPhotoPost,
            addPhotoPost: addPhotoPost,
            getPhotoPost: getPhotoPost
        }
    }
)
();
console.log(module.getPhotoPosts(0, 10));
console.log(module.getPhotoPosts(0, 10, {author: "Adamskaya Yuliya"}));
console.log(module.getPhotoPost('9'));
console.log(module.editPhotoPost('1', {hashTag: ['#hashtag_1', '#hashtag_8']}));
console.log(module.addPhotoPost({
    id: '21',
    description: 'Text',
    createdAt: new Date('2018-02-23T21:00:00'),
    author: 'Adamskaya Yuliya',
    photoLink: 'images/21.jpg',
    hashTag: ['#hashtag_1', '#hashtag_2'],
    like: ['author21']
}));
console.log(module.removePhotoPost('4'));
