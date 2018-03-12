(function () {
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

        function compareDate(a, b) {
            return (a.createdAt) - (b.createdAt);
        }

        function filterAuthor(photoPosts, author) {
            var result = [];
            for (var item in photoPosts) {
                if (photoPosts[item].author === author) {
                    result.push(photoPosts[item]);
                }
            }
            return result;
        }

        function filterHashtag(photoPosts, hashtag) {
            var result = [];
            for (var item in photoPosts) {
                if (photoPosts[item].hashTag === hashtag) {
                    result.push(photoPosts[item]);
                }
            }
            return result;
        }

        function getPhotoPosts(skip, top, filterConfig) {
            var resultArray = [];
            if (filterConfig === undefined) {
                return photoPosts.sort(compareDate).slice(skip, skip + top);
            } else {
                resultArray = photoPosts.sort(compareDate).slice(skip, skip + top);
                if (filterConfig.author !== undefined) {
                    resultArray = filterAuthor(resultArray, filterConfig.author);
                }
                if (filterConfig.hashTag !== undefined) {
                    resultArray = filterHashtag(resultArray, filterConfig.hashTag);
                }
            }
            return resultArray;
        }

        function getPhotoPost(id) {
            for (var item in photoPosts) {
                if (photoPosts[item].id === id) {
                    return photoPosts[item];
                }
            }
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
            for (var item in photoPost.hashTag) {
                if (typeof(photoPost.hashTag[item]) !== "string" || photoPost.hashTag[item].trim() === "") {
                    return false;
                }
            }

            for (var item in photoPost.like) {
                if (typeof(photoPost.like[item]) !== "string" || photoPost.like[item].trim() === "") {
                    return false;
                }
            }

            if (!photoPost.createdAt instanceof Date) {
                return false;
            }
            return true;
        }

        function removePhotoPost(id) {
            for (var item in photoPosts) {
                if (photoPosts[item].id === id) {
                    photoPosts = photoPosts.splice(item, 1);
                    return true;
                }
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
            if (validatePhotoPost(objectPhotoPost)) {
                if (!objectPhotoPost) {
                    return false;
                }
                if (id === undefined) {
                    return false;
                }
                for (var item in photoPosts) {
                    if (photoPosts[item].id === id) {
                        var post = photoPosts[item];
                        if (objectPhotoPost.photoLink !== undefined && objectPhotoPost.photoLink !== 0) {
                            post.photoLink = objectPhotoPost.photoLink;
                        }
                        if (objectPhotoPost.description !== undefined && objectPhotoPost.description !== 0 && objectPhotoPost.description.length < 200) {

                            post.description = objectPhotoPost.description;
                        }
                        if (objectPhotoPost.hashTag !== undefined && objectPhotoPost.hashTag.length > 0) {

                            post.hashTag = objectPhotoPost.hashTag;
                        }
                        photoPosts[item] = post;
                        console.log(post);
                        return true;
                    }
                }
            }
            return false;
        }

        console.log(getPhotoPosts(0, 10));
        console.log(getPhotoPosts(0, 10, {hashTag: "#hashtag_1", author: "Adamskaya Yuliya"}));
        console.log(getPhotoPost("8"));
        addPhotoPost({
            id: '21',
            description: 'Text',
            createdAt: new Date('2018-02-23T21:00:00'),
            author: 'Adamskaya Yuliya',
            photoLink: 'images/21.jpg',
            hashTag: ['#hashtag_1', '#hashtag_2'],
            like: ['author21']
        });
        removePhotoPost('4');
        editPhotoPost('1', {hashTag: ['#hashtag_1', '#hashtag_8']});
        getPhotoPost('1');
    }

)();
