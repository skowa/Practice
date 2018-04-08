;(function(arr) {
    let photoPosts = [
        {
            id: 1,
            description: "На второй день нашего путешествия мы ездили в Люцерн.",
            createdAt: new Date("2018-02-23T20:00:00"),
            author: "skowik",
            hashtags: ["#Luzern", "#Switzerland", "#travel"],
            likes: ["viviBo", "alexSommver", "marinaGo12"],
            photoLink: "img/photo1.jpg",
            isDeleted: false
        },
        {
            id: 2,
            description: "После Люцерна мы на фуникулерах поднялись на гору Пилатес. Она около 2км над уровнем моря. Было невероятно.",
            createdAt: new Date("2018-02-23T22:44:00"),
            author: "skowik",
            hashtags: ["#Pilates", "#Switzerland", "#travel", "#mountain"],
            likes: ["viviBo", "alexSommver", "ira2903"],
            photoLink: "img/photo2.jpg",
            isDeleted: false
        },
        {
            id: "3",
            description: "А вы нашли здесь жирафов?:)",
            createdAt: new Date("2018-02-26T15:13:00"),
            author: "viviBo",
            likes: ["skowik", "alexSommver", "marinaGo12", "ira2903"],
            hashtags: ["#nature", "#animal", "#giraffe"],
            photoLink: "img/photo3.jpg",
            isDeleted: false
        },
        {
            id: "4",
            description: "Зимнее утро также может быть прекрасным!",
            createdAt: new Date("2018-02-24T09:12:34"),
            author: "ira2903",
            hashtags: ["#winter", "#sun", "#beauty", "#nature"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "skowik"],
            photoLink: "img/photo4.jpg",
            isDeleted: false
        },
        {
            id: "5",
            description: "Чувство, будто ящерица мне позировала:)",
            createdAt: new Date("2018-02-28T22:44:00"),
            author: "viviBo",
            hashtags: ["#nature", "#lizard", "#animal"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "ira2903"],
            photoLink: "img/photo5.jpg",
            isDeleted: false
        },
        {
            id: "6",
            description: "Котята такие забавные!",
            createdAt: new Date("2018-02-28T23:15:00"),
            author: "tanya0023",
            hashtags: ["#cat", "#animal"],
            likes: ["viviBo", "alexSommver", "marinaGo12", "ira2903"],
            photoLink: "img/photo6.jpg",
            isDeleted: false
        },
        {
            id: "7",
            description: "На третий день мы поехали на Рейнский водопад. Было захватывающе.",
            createdAt: new Date("2018-03-01T22:44:00"),
            author: "skowik",
            hashtags: ["#waterfall", "#Switzerland", "#travel"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "viviBo", "ira2903"],
            photoLink: "img/photo7.jpg",
            isDeleted: false
        },
        {
            id: "8",
            description: "Белые васильки",
            createdAt: new Date("2018-02-25T20:41:00"),
            author: "ira2903",
            hashtags: ["#flower", "#nature", "#summer"],
            likes: ["tanya0023", "alexSommver", "skowik"],
            photoLink: "img/photo8.jpg",
            isDeleted: false
        },
        {
            id: "9",
            description: "Успел захватить полет аиста:)",
            createdAt: new Date("2018-01-29T12:12:45"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "greatGuy", "marinaGo12", "skowik", "ira2903"],
            photoLink: "img/photo9.jpg",
            isDeleted: false
        },
        {
            id: "10",
            description: "Мой котенок вырос! Он уже не такой забавный:(",
            createdAt: new Date("2018-03-02T12:44:00"),
            author: "tanya0023",
            hashtags: ["#cat", "#animal"],
            likes: ["viviGo", "alexSommver", "marinaGo12", "skowik", "ira2903"],
            photoLink: "img/photo10.jpg",
            isDeleted: false
        },
        {
            id: "11",
            description: "Неожиданная поездка в солнечную Италию.",
            createdAt: new Date("2018-02-27T20:15:00"),
            author: "skowik",
            hashtags: ["#Italy", "#Milan", "#travel", "#nature"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "greatGuy", "ira2903"],
            photoLink: "img/photo11.jpg",
            isDeleted: false
        },
        {
            id: "12",
            description: "Лебедь затаился в кустах.",
            createdAt: new Date("2018-02-26T13:23:00"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "inkognito", "marinaGo12", "skowik", "ira2903", "lera33"],
            photoLink: "img/photo12.jpg",
            isDeleted: false
        },
        {
            id: "13",
            description: "Люблю горы!:)",
            createdAt: new Date("2018-02-12T15:13:00"),
            author: "marinaGo12",
            hashtags: ["#nature", "#mountain", "#travel"],
            likes: ["tanya0023", "alexSommver", "skowik", "ira2903"],
            photoLink: "img/photo13.jpg",
            isDeleted: false
        },
        {
            id: "14",
            description: "Больше всего в Чикаго мне понравилась капля",
            createdAt: new Date("2018-02-24T09:12:34"),
            author: "marinaGo12",
            hashtags: ["#USA", "#travel"],
            likes: ["tanya0023", "alexSommver", "greatGuy", "skowik", "ira2903"],
            photoLink: "img/photo14.jpg",
            isDeleted: false
        },
        {
            id: "15",
            description: "Какое-то сооружение в центре NASA",
            createdAt: new Date("2018-02-04T14:14:10"),
            author: "viviBo",
            hashtags: ["#space", "#travel", "#USA"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "skowik", "ira2903", "ivanGu"],
            photoLink: "img/photo15.jpg",
            isDeleted: false
        },
        {
            id: "16",
            description: "По Риму можно гулять и гулять. Уникальная архитектура.",
            createdAt: new Date("2018-03-03T23:15:00"),
            author: "tanya0023",
            hashtags: ["#travel", "#Italy", "#beauty"],
            likes: ["alexSommver", "marinaGo12", "skowik", "ira2903"],
            photoLink: "img/photo16.jpg",
            isDeleted: false
        },
        {
            id: "17",
            description: "Довольно экзотический экземляр.",
            createdAt: new Date("2018-03-01T12:46:00"),
            author: "alexSommver",
            hashtags: ["#nature", "#bird"],
            likes: ["tanya0023", "inkognito", "marinaGo12", "skowik", "ira2903"],
            photoLink: "img/photo17.jpg",
            isDeleted: false
        },
        {
            id: "18",
            description: "На выходных были в Париже. Больше всего впечатлил Собор Парижской Богоматери.",
            createdAt: new Date("2018-02-15T20:34:00"),
            author: "marinaGo12",
            hashtags: ["#travel", "#Paris", "#summer"],
            likes: ["tanya0023", "alexSommver", "viviBo", "skowik", "ira2903"],
            photoLink: "img/photo18.jpg",
            isDeleted: false
        },
        {
            id: "19",
            description: "Стоунхендж паразительно фотогеничен)",
            createdAt: new Date("2018-01-29T13:15:06"),
            author: "marinaGo12",
            hashtags: ["#nature", "#England", "#travel"],
            likes: ["tanya0023", "alexSommver", "ira2903"],
            photoLink: "img/photo19.jpg",
            isDeleted: false
        },
        {
            id: "20",
            description: "Корабль и Женевское озеро",
            createdAt: new Date("2018-03-02T15:24:00"),
            author: "skowik",
            hashtags: ["#Switzerland", "#nature", "#travel"],
            likes: ["tanya0023", "alexSommver", "marinaGo12", "viviBo", "greatGuy", "ira2903"],
            photoLink: "img/photo20.jpg",
            isDeleted: false
        }
    ];

    arr.getPhotoPosts = function getPhotoPosts(givenArray, skip, top, filterConfig) {
        let newPhotoPosts = [];
        let array = givenArray.filter(function (photoPost) { return photoPost.isDeleted === false });
        if (skip < 0 || skip >= array.length || skip === undefined) {
            skip = 0;
        }

        if (top < 0 || top === undefined) {
            top = 10;
        }

        let flag = false;
        if (filterConfig !== undefined) {
            if ("author" in filterConfig  && filterConfig.author !== null) {
                newPhotoPosts = array.filter(function (photoPost) { return photoPost.author === filterConfig.author });
                flag = true;
            }

            if ("hashtags" in filterConfig && filterConfig.hashtags !== null) {
                if (!flag) {
                    newPhotoPosts = filterByHashTags(array, filterConfig.hashtags);
                    flag = true;
                }
                else {
                    newPhotoPosts = filterByHashTags(newPhotoPosts, filterConfig.hashtags);
                }
            }

            if ("createdAt" in filterConfig  && filterConfig.createdAt !== null) {
                if (!flag) {
                    newPhotoPosts = array.filter(function (photoPost) {
                        return new Date(photoPost.createdAt) <= filterConfig.createdAt
                    });
                }
                else {
                    newPhotoPosts = newPhotoPosts.filter(function (photoPost) {
                        return new Date(photoPost.createdAt) <= filterConfig.createdAt
                    });
                }
            }
            newPhotoPosts = newsPost.sortByDate(newPhotoPosts).slice(skip, skip + top);
        }
        else {
            newPhotoPosts = newsPost.sortByDate(array).slice(skip, skip + top);
        }

        return newPhotoPosts;
    }

    arr.sortByDate = function sortByDate(array) {
        return array.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt) });
    }

    function filterByHashTags(array, hashtags) {
        if (hashtags === undefined ||hashtags === null
            || hashtags.length === 0) {
            return [];
        }

        let newArray = array;
        for (let i = 0; i < hashtags.length; i++) {
            newArray = findHashTag(newArray, hashtags[i]);
        }

        return newArray;
    }

    function findHashTag(array, hashtag) {
        if(array === null || hashtag === undefined) {
            return [];
        }

        let newArray = [];

        for(let j = 0; j < array.length; j++) {
            if (array[j].hashtags.indexOf(hashtag) !== -1) {
                newArray.push(array[j]);
            }
        }

        return newArray;
    }

    arr.getPhotoPost = function getPhotoPost(array, id) {
        if (id === undefined) {
            return null;
        }

        for (let i = 0; i < array.length; i++) {
            if (String(array[i].id) === id) {
                return array[i];
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

        if (photoPost.hashtags !== []) {
          for (let i = 0; i < photoPost.hashtags.length; i++) {
              if (photoPost.hashtags[i].length >= 20) {
                  return false;
              }
          }
        }

        return true;
    }

    arr.addPhotoPost = function addPhotoPost(array, photoPost) {
        if (photoPost === undefined ||
            !validatePhotoPost(photoPost) ||
            newsPost.getPhotoPost(array, photoPost.id) !== null) {
            return false;
        }

        array.push(photoPost);
        return true;
    }

    arr.editPhotoPost = function editPhotoPost(array, id, photoPost) {
        if (id === undefined || photoPost === undefined) {
            return false;
        }

        let editedPhotoPost = newsPost.getPhotoPost(array, id);
        if (editedPhotoPost === null) {
            return false;
        }

        let editedPhotoPostIndex;
        for (let i = 0; i < array.length; i++) {
            if (id === String(array[i].id)) {
                editedPhotoPostIndex = i;
                break;
            }
        }

        let flag = false;

        if (photoPost.description === null) {
          return false;
        }

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
            array[editedPhotoPostIndex] = editedPhotoPost;
            return true;
        }

        return false;

    }

    arr.removePhotoPost = function removePhotoPost(array, id) {
        if (id === undefined) {
            return false;
        }

        for (let i = 0; i < array.length; i++)
            if (String(array[i].id) === id) {
                array[i].isDeleted = true;
                --arr.photoAm;
                return true;
        }

        return false;
    }

    let allPosts = JSON.parse(localStorage.getItem("AllPosts"));
    arr.photoAm = photoPosts.length;
    if(allPosts === null) {
        localStorage.setItem("AllPosts", JSON.stringify(photoPosts));
      }
    else {
        arr.photoAm = allPosts.filter(function (photoPost) { return photoPost.isDeleted === false }).length;
      }

}(this.newsPost = {}));
