;(function(arr) {
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
            newPhotoPosts = sortByDate(newPhotoPosts).slice(skip, skip + top);
        }
        else {
            newPhotoPosts = sortByDate(array).slice(skip, skip + top);
        }

        return newPhotoPosts;
    }

    function sortByDate(array) {
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
            !validatePhotoPost(photoPost)) {
            return false;
        }

        array.push(photoPost);
        return true;
    }

    arr.editPhotoPost = function editPhotoPost(array, id, photoPost) {
        if (id === undefined || photoPost === undefined) {
            return false;
        }

        let editedPhotoPost = array.find(post => Number(post.id) === Number(id));
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
                return true;
        }

        return false;
    }
}(this.module = {}));
