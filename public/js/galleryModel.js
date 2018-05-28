((exp) => {
  function sortByDate(array) {
    return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function findHashTag(array, hashtag) {
    if (array === null || !hashtag) {
      return [];
    }

    const newArray = [];

    for (let j = 0; j < array.length; j++) {
      if (array[j].hashtags.indexOf(hashtag) !== -1) {
        newArray.push(array[j]);
      }
    }

    return newArray;
  }

  function filterByHashTags(array, hashtags) {
    if (!hashtags || hashtags === null ||
      hashtags.length === 0) {
      return [];
    }

    let newArray = array;
    for (let i = 0; i < hashtags.length; i++) {
      newArray = findHashTag(newArray, hashtags[i]);
    }

    return newArray;
  }

  exp.getPhotoPosts = function getPhotoPosts(givenArray, skip, top, filterConfig) {
    let newPhotoPosts = [];
    const array = givenArray.filter(photoPost => photoPost.isDeleted === false);
    if (skip < 0 || skip >= array.length || !skip) {
      skip = 0;
    }

    if (top < 0 || !top) {
      top = 10;
    }

    let flag = false;
    if (filterConfig && Object.keys(filterConfig).length !== 0) {
      if ('author' in filterConfig && filterConfig.author !== null) {
        newPhotoPosts = array.filter(photoPost => photoPost.author === filterConfig.author);
        flag = true;
      }

      if ('hashtags' in filterConfig && filterConfig.hashtags !== null) {
        if (!flag) {
          newPhotoPosts = filterByHashTags(array, filterConfig.hashtags);
          flag = true;
        } else {
          newPhotoPosts = filterByHashTags(newPhotoPosts, filterConfig.hashtags);
        }
      }

      if ('createdAt' in filterConfig && filterConfig.createdAt !== null) {
        if (!flag) {
          newPhotoPosts = array.filter(photoPost => new Date(photoPost.createdAt)
           <= new Date(filterConfig.createdAt));
        } else {
          newPhotoPosts = newPhotoPosts.filter(photoPost => new Date(photoPost.createdAt)
           <= new Date(filterConfig.createdAt));
        }
      }
      newPhotoPosts = sortByDate(newPhotoPosts).slice(skip, skip + top);
    } else {
      newPhotoPosts = sortByDate(array).slice(skip, skip + top);
    }

    return newPhotoPosts;
  };

  exp.getPhotoPost = function getPhotoPost(array, id) {
    if (!id) {
      return null;
    }

    for (let i = 0; i < array.length; i++) {
      if (String(array[i].id) === id) {
        return array[i];
      }
    }

    return null;
  };

  function validatePhotoPost(photoPost) {
    if (!photoPost.id) {
      return false;
    }
    if (!photoPost.description) {
      return false;
    }
    if (!photoPost.author) {
      return false;
    }
    if (!photoPost.createdAt) {
      return false;
    }
    if (!photoPost.hashtags) {
      return false;
    }
    if (!photoPost.likes) {
      return false;
    }
    if (!photoPost.photoLink) {
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

  exp.likePost = function likePost(allPosts, id, user) {
    const post = allPosts.find(_post => Number(_post.id) === Number(id));
    const index = post.likes.indexOf(user);

    if (index === -1) {
      post.likes.push(user);
      return true;
    }

    post.likes.splice(index, 1);
    return false;
  };

  exp.addPhotoPost = function addPhotoPost(array, photoPost) {
    if (!photoPost ||
      !validatePhotoPost(photoPost)) {
      return false;
    }

    array.push(photoPost);
    return true;
  };

  exp.editPhotoPost = function editPhotoPost(array, id, photoPost) {
    if (!id || !photoPost) {
      return false;
    }

    const editedPhotoPost = array.find(post => Number(post.id) === Number(id));
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

    if (photoPost.description) {
      editedPhotoPost.description = photoPost.description;
      flag = true;
    }
    if (photoPost.photoLink) {
      editedPhotoPost.photoLink = photoPost.photoLink;
      flag = true;
    }
    if (photoPost.hashtags) {
      editedPhotoPost.hashtags = photoPost.hashtags;
      flag = true;
    }

    if (validatePhotoPost(editedPhotoPost) && flag) {
      array[editedPhotoPostIndex] = editedPhotoPost;
      return true;
    }

    return false;
  };

  exp.removePhotoPost = function removePhotoPost(array, id) {
    if (!id) {
      return false;
    }

    for (let i = 0; i < array.length; i++) {
      if (String(array[i].id) === id) {
        array[i].isDeleted = true;
        return true;
      }
    }

    return false;
  };
})(this.galleryModel = {});
