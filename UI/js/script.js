;(function() {
    var photoPosts = [
        {
            id: "1",
            description: "На второй день нашего путешествия мы ездили в Люцерн.",
            createdAt: new Date("2018-02-23T20:00:00"),
            author: "skowik",
            hashtags: ["#Luzern", "#Switzerland", "#travel"],
            likes: ["viviBo", "alexSommver", "marinaGo12"],
            photoLink: "../img/photo1.jpg"
        },
        {
            id: "2",
            description: "После Люцерна мы на фуникулерах поднялись на гору Пилатес. Она около 2км над уровнем моря. Было невероятно.",
            createdAt: new Date("2018-02-23T22:44:00"),
            author: "skowik",
            hashtags: ["#Pilates", "#Switzerland", "#travel", "#mountain"],
            likes: ["viviBo", "alexSommver", "ira2903"],
            photoLink: "../img/photo2.jpg"
        },
        {
            id: "3",
            description: "А вы нашли здесь жирафов?:)",
            createdAt: new Date("2018-02-26T15:13:00"),
            author: "viviBo",
            likes: ["skowik", "alexSommver", "marinaGo12", "ira2903"],
            hashtags: ["#nature", "#animal", "#giraffe"],
            photoLink: "../img/photo3.jpg"
        },
        {
            id: "4",
            description: "Зимнее утро также может быть прекрасным!",
            createdAt: new Date("2018-02-24T09:12:34"),
            author: "ira2903",
            hashtags: ["#winter", "#sun", "#beauty", "#nature"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "skowik"],
            photoLink: "../img/photo4.jpg"
        },
        {
            id: "5",
            description: "Чувство, будто ящерица мне позировала:)",
            createdAt: new Date("2018-02-28T22:44:00"),
            author: "viviBo",
            hashtags: ["#nature", "#lizard", "#animal"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "skowik", "ira2903"],
            photoLink: "../img/photo5.jpg"
        },
        {
            id: "6",
            description: "Котята такие забавные!",
            createdAt: new Date("2018-02-28T23:15:00"),
            author: "tanya0023",
            hashtags: ["#cat", "#animal"],
            likes: ["viviBo", "alexSommver", "marinaGo12", "ira2903"],
            photoLink: "../img/photo6.jpg"
        },
        {
            id: "7",
            description: "На третий день мы поехали на Рейнский водопад. Было захватывающе.",
            createdAt: new Date("2018-03-01T22:44:00"),
            author: "skowik",
            hashtags: ["#waterfall", "#Switzerland", "#travel"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "viviBo", "ira2903"],
            photoLink: "../img/photo7.jpg"
        },
        {
            id: "8",
            description: "Белые васильки",
            createdAt: new Date("2018-02-25T20:41:00"),
            author: "ira2903",
            hashtags: ["#flower", "#nature", "#summer"],
            likes: ["tanya0023", "alexSommver", "skowik"],
            photoLink: "../img/photo8.jpg"
        },
        {
            id: "9",
            description: "Успел захватить полет аиста:)",
            createdAt: new Date("2018-01-29T12:12:45"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "greatGuy", "marinaGo12", "skowik", "ira2903"],
            photoLink: "../img/photo9.jpg"
        },
        {
            id: "10",
            description: "Мой котенок вырос! Он уже не такой забавный:(",
            createdAt: new Date("2018-03-02T12:44:00"),
            author: "tanya0023",
            hashtags: ["#cat", "#animal"],
            likes: ["viviGo", "alexSommver", "marinaGo12", "skowik", "ira2903"],
            photoLink: "../img/photo10.jpg"
        },
        {
            id: "11",
            description: "Неожиданная поездка в солнечную Италию.",
            createdAt: new Date("2018-02-27T20:15:00"),
            author: "skowik",
            hashtags: ["#Italy", "#Milan", "#travel", "#nature"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "greatGuy", "ira2903"],
            photoLink: "../img/photo11.jpg"
        },
        {
            id: "12",
            description: "Лебедь затаился в кустах.",
            createdAt: new Date("2018-02-26T13:23:00"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "inkognito", "marinaGo12", "skowik", "ira2903", "lera33"],
            photoLink: "../img/photo12.jpg"
        },
        {
            id: "13",
            description: "Люблю горы!:)",
            createdAt: new Date("2018-02-12T15:13:00"),
            author: "marinaGo12",
            hashtags: ["#nature", "#mountain", "#travel"],
            likes: ["tanya0023", "alexSommver", "skowik", "ira2903"],
            photoLink: "../img/photo13.jpg"
        },
        {
            id: "14",
            description: "Больше всего в Чикаго мне понравилась капля",
            createdAt: new Date("2018-02-24T09:12:34"),
            author: "marinaGo12",
            hashtags: ["#USA", "#travel"],
            likes: ["tanya0023", "alexSommver", "greatGuy", "skowik", "ira2903"],
            photoLink: "../img/photo14.jpg"
        },
        {
            id: "15",
            description: "Какое-то сооружение в центре NASA",
            createdAt: new Date("2018-02-04T14:14:10"),
            author: "viviBo",
            hashtags: ["#space", "#travel", "#USA"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "skowik", "ira2903", "ivanGu"],
            photoLink: "../img/photo15.jpg"
        },
        {
            id: "16",
            description: "По Риму можно гулять и гулять. Уникальная архитектура.",
            createdAt: new Date("2018-03-03T23:15:00"),
            author: "tanya0023",
            hashtags: ["#travel", "#Italy", "#beauty"],
            likes: ["alexSommver", "marinaGo12", "skowik", "ira2903"],
            photoLink: "../img/photo16.jpg"
        },
        {
            id: "17",
            description: "Довольно экзотический экземляр.",
            createdAt: new Date("2018-03-01T12:46:00"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "inkognito", "marinaGo12", "skowik", "ira2903"],
            photoLink: "../img/photo17.jpg"
        },
        {
            id: "18",
            description: "На выходных были в Париже. Больше всего впечатлил Собор Парижской Богоматери.",
            createdAt: new Date("2018-02-15T20:34:00"),
            author: "marinaGo12",
            hashtags: ["#travel", "#Paris", "#summer"],
            likes: ["tanya0023", "alexSommver", "viviBo", "skowik", "ira2903"],
            photoLink: "../img/photo18.jpg"
        },
        {
            id: "19",
            description: "Стоунхендж паразительно фотогеничен)",
            createdAt: new Date("2018-01-29T13:15:06"),
            author: "marinaGo12",
            hashtags: ["#nature", "#England", "#travel"],
            likes: ["tanya0023", "alexSommver", "ira2903"],
            photoLink: "../img/photo19.jpg"
        },
        {
            id: "20",
            description: "Корабль и Женевское озеро",
            createdAt: new Date("2018-03-02T15:24:00"),
            author: "skowik",
            hashtags: ["#Switzerland", "#nature", "#travel"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "viviBo", "greatGuy", "ira2903"],
            photoLink: "../img/photo20.jpg"
        }
    ];

    function getPhotoPosts(skip, top, filterConfig) {
        var newPhotoPosts = [];

        if (skip < 0 || skip >= photoPosts.length || skip === undefined) {
            skip = 0;
        }

        if (top < 0 || top === undefined) {
            top = 10;
        }

        var flag = false;
        if (filterConfig !== undefined) {
            if ("author" in filterConfig) {
                newPhotoPosts = photoPosts.filter(function (photoPost) { return photoPost.author === filterConfig.author });
                flag = true;
            }

            if ("hashtags" in filterConfig) {
                if (!flag) {
                    newPhotoPosts = filterByHashTags(photoPosts, filterConfig.hashtags);
                    flag = true;
                }
                else {
                    newPhotoPosts = filterByHashTags(newPhotoPosts, filterConfig.hashtags);
                }
            }

            if ("createdAt" in filterConfig) {
                if (!flag) {
                    newPhotoPosts = photoPosts.filter(function (photoPost) {
                        return photoPost.createdAt <= filterConfig.createdAt
                    });
                }
                else {
                    newPhotoPosts = newPhotoPosts.filter(function (photoPost) {
                        return photoPost.createdAt <= filterConfig.createdAt
                    });
                }
            }
            newPhotoPosts = sortByDate(newPhotoPosts).slice(skip, skip + top);
        }
        else {
            newPhotoPosts = sortByDate(photoPosts).slice(skip, skip + top);
        }

        return newPhotoPosts;
    }

    function sortByDate(array) {
        return array.sort(function (a, b) { return a.createdAt - b.createdAt });
    }

    function filterByHashTags(array, hashtags) {
        if (hashtags === undefined
            || hashtags.length === 0) {
            return [];
        }

        var newArray = array;
        for (var i = 0; i < hashtags.length; i++) {
            newArray = findHashTag(newArray, hashtags[i]);
        }

        return newArray;
    }

    function findHashTag(array, hashtag) {
        if(array === null || hashtag === undefined) {
            return [];
        }

        var newArray = [];

        for(var j = 0; j < array.length; j++) {
            if (array[j].hashtags.indexOf(hashtag) !== -1) {
                newArray.push(array[j]);
            }
        }

        return newArray;
    }

    function getPhotoPost(id) {
        if (id === undefined) {
            return null;
        }

        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                return photoPosts[i];
            }
        }

        return null;
    }
    
    function validatePhotoPost(photoPost) {
        if (photoPost.id === undefined) {
            return false;
        }
        if (photoPost.description === undefined) {
            return false;
        }
        if (photoPost.author === undefined) {
            return false;
        }
        if (photoPost.createdAt === undefined) {
            return false;
        }
        if (photoPost.hashtags === undefined) {
            return false;
        }
        if (photoPost.likes === undefined) {
            return false;
        }
        if (photoPost.photoLink === undefined) {
            return false;
        }

        if (photoPost.description.length >= 200 ||
        photoPost.author.length === 0 ||
        photoPost.photoLink.length === 0) {
            return false;
        }

        for (var i = 0; i < photoPost.hashtags.length; i++) {
            if (photoPost.hashtags[i].length >= 20) {
                return false;
            }
        }

        return true;
    }

    function addPhotoPost(photoPost) {
        if (photoPost === undefined ||
            !validatePhotoPost(photoPost) ||
            getPhotoPost(photoPost.id) !== null) {
            return false;
        }

        photoPosts.push(photoPost);
        return true;
    }

    function editPhotoPost(id, photoPost) {
        if (id === undefined || photoPost === undefined) {
            return false;
        }

        var editedPhotoPost = getPhotoPost(id);
        if (editedPhotoPost === null) {
            return false;
        }

        for (var i = 0; i < photoPosts.length; i++) {
            if (id === photoPosts[i].id) {
                var editedPhotoPostIndex = i;
                break;
            }
        }

        var flag = false;

        if (photoPost.description !== undefined) {
            editedPhotoPost.description = photoPost.description;
            flag = true;
        }
        if (photoPost.photoLink !== undefined) {
            editedPhotoPost.photoLink = photoPost.photoLink;
            flag = true;
        }
        if (photoPost.hashtags !== undefined) {
            editedPhotoPost.hashtags = photoPost.hashtags;
            flag = true;
        }

        if(validatePhotoPost(editedPhotoPost) && flag) {
            photoPosts[editedPhotoPostIndex] = editedPhotoPost;
            return true;
        }

        return false;

    }

    function removePhotoPost(id) {
        if (id === undefined) {
            return false;
        }

        for (var i = 0; i < photoPosts.length; i++)
            if (photoPosts[i].id === id) {
                photoPosts.splice(i, 1);
                return true;
            }

        return false;
    }

    function showOnConsole() {
        console.group("getPhotoPosts method:");
        console.log("Showing, how sorting by date works:");
        console.log(sortByDate(photoPosts));
        console.log("\nWithout parameters: (expected: first 10 posts sorted by date:)");
        console.log(getPhotoPosts());
        console.log("\nSkip = 3: (expected: 10 posts from 4 to 13)");
        console.log(getPhotoPosts(3));
        console.log("\nSkip = 4, top = 12: (expected: 12 posts from 5 to 16)");
        console.log(getPhotoPosts(4, 12));
        console.log("\nSkip = 4, top = 20: (expected: 16 posts from 5 to 20)");
        console.log(getPhotoPosts(4, 20));
        console.log("\nfilterConfig = {author: 'viviBo'}: (expected: sorted by date posts by viviBo (3 posts))");
        console.log(getPhotoPosts(0, 10, {author: "viviBo"}));
        console.log("\nfilterConfig = {hashtags: ['#nature', '#travel']}: (expected: 4 posts)");
        console.log(getPhotoPosts(0, 10, {hashtags: ['#nature', '#travel']}));
        console.log("\nfilterConfig = {createdAt: '2018-02-25T13:15:06'}: (expected: 9 posts )");
        console.log(getPhotoPosts(0, 10, {createdAt: new Date ("2018-02-25T13:15:06")}));
        console.log("\nfilterConfig = {skip = 1,top = 2, author: \"skowik\", hashtags: [\"#Switzerland\"]}: (expected: 2 posts)");
        console.log(getPhotoPosts(1, 2, {author: "skowik", hashtags: ["#Switzerland"]}));
        console.groupEnd();

        console.group("\n\ngetPhotoPost method");
        console.log("Post with id = 3");
        console.log(getPhotoPost("3"));
        console.log("\nPost with id = 29(expected: null)");
        console.log(getPhotoPost("29"));
        console.groupEnd();

        console.group("\n\nvalidatePhotoPost method");
        console.log("Return true :");
        console.log(validatePhotoPost( {
            id: "2",
            description: "description",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "tayl3",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "asdfghjk"}));
        console.log("Return false, because the description is >= 200 : ");
        console.log(validatePhotoPost( {
            id: "2",
            description: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678902",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "tayl3",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "asdfghjk"}));
        console.log("Return false, because author length is 0:");
        console.log(validatePhotoPost( {
            id: "2",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "asdfghjk"}));
        console.log('Return false, because photoLink length is 0 : ');
        console.log(validatePhotoPost( {
            id: "2",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "author",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: ""}));
        console.log("Return false, because some hashtags are >= 20 symbols");
        console.log(validatePhotoPost( {
            id: "2",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "author",
            likes: ["author1", "author2"],
            hashtags: ["#123456789012345678901", "#tag2"],
            photoLink: ""}));
        console.log('Return false, because of absence of some arguments: ');
        console.log(validatePhotoPost( {
            id: "2",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "author",
            hashtags: ["#tag1", "#tag2"],
            photoLink: ""}));
        console.groupEnd();

        console.group("\n\naddPhotoPost method:");
        console.log("Return true(add post with id = 21) : ");
        console.log(addPhotoPost({
            id: "21",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "author",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "../img/somePhoto"}));
        console.log("Return false, because of validation(author length is 0) : ");
        console.log(addPhotoPost({
            id: "22",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "../img/somePhoto"}));
        console.log("Return false, because post with this ID exists: ");
        console.log(addPhotoPost({
            id: "2",
            description: "some text",
            createdAt: new Date('2018-02-03T12:00:00'),
            author: "author",
            likes: ["author1", "author2"],
            hashtags: ["#tag1", "#tag2"],
            photoLink: "../img/somePhoto"}));
        console.groupEnd();

        console.group("\n\neditPhotoPost method");
        console.log("Return true: ");
        console.log(editPhotoPost("2", {description : "Люблю горы!"}));
        console.log("PhotoPost with id = 2 after editing: ");
        console.log(getPhotoPost("2"));
        console.log("Return false, because such post doesn't exist:");
        console.log(editPhotoPost('30', {photoLink : "alljhg"}));
        console.log("Return false, because changeable parameters haven't been written:");
        console.log(editPhotoPost("2", {}));
        console.log("Return false, because of validation(photoLink length is 0): ");
        console.log(editPhotoPost("2", {photoLink : ""}));
        console.groupEnd();

        console.group("\n\nremovePhotoPost method");
        console.log("Return true(delete photoPost with id = 15): ");
        console.log(removePhotoPost("15"));
        console.log("Return false, because there is no post ith such id:");
        console.log(removePhotoPost("34"));
        console.groupEnd();

    }

    showOnConsole();
}());