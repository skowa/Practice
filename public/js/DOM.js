;
(function(arr) {
  arr.user = "skowik";
  arr.postsAmount = 0;

  arr.show = function showPhotoPost(post, position) {
    let isUser = (arr.user === post.author);

    let photo = document.createElement("div");
    photo.className = "photo";
    let photoImg = document.createElement("div");
    photoImg.className = "photoImg";
    photoImg.innerHTML = "<img src=\"" + post.photoLink + "\" alt=\"\">";

    let contentPhoto = document.createElement("div");
    contentPhoto.className = "contentPhoto";
    photo.id = "post" + post.id;
    if (isUser) {
      contentPhoto.innerHTML = "<h1>Ваша публикация</h1>\n" +
        "<h3>" + getFormatDate(post) + "<br />" + getFormatTime(post) + "</h3>\n" +
        "<p class=\"photoDescription\">" + post.description + "</p>\n" +
        "<p class=\"photoTags\">" + post.hashtags.join(", ") + "</p>\n" +
        "<button class=\"delete\"></button>\n" +
        "<button class=\"edit\"></button>";
    } else {
      contentPhoto.innerHTML = "<h1>@" + post.author + "</h1>\n" +
        "<h3>" + getFormatDate(post) + "<br />" + getFormatTime(post) + "</h3>\n" +
        "<p class=\"photoDescription\">" + post.description + "</p>\n" +
        "<p class=\"photoTags\">" + post.hashtags.join(", ") + "</p>\n"; // +
    }

    if (post.likes.indexOf(arr.user) === -1) {
      contentPhoto.innerHTML += "<div class=\"like\"><img src=\"img/noLike.png\">\n" + "<p>" + post.likes.length + "</p></div>\n";
    } else {
      contentPhoto.innerHTML += "<div class=\"like\"><img src=\"img/like.png\">\n" + "<p>" + post.likes.length + "</p></div>\n";
    }

    photo.appendChild(contentPhoto);
    photo.appendChild(photoImg);

    photos.insertBefore(photo, photos.children[position]);
  }

  let news = document.getElementsByClassName("news")[0];
  let photos = document.createElement("div");
  photos.className = "photos";
  news.appendChild(photos);

  function getFormatDate(post) {
    let date = new Date(post.createdAt);

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;

    let year = date.getFullYear();

    return day + "." + month + "." + year;
  }

  function getFormatTime(post) {
    let date = new Date(post.createdAt);

    let hours = date.getHours();
    if (hours < 10)
      hours = "0" + hours;

    let minutes = date.getMinutes();
    if (minutes < 10)
      minutes = "0" + minutes;

    return hours + ":" + minutes;
  }

  arr.showPosts = function showPosts(skip, top, filterConfig) {
    arr.postsAmount = 0;
    document.body.getElementsByClassName("photos")[0].innerHTML = "";

    let allPosts = JSON.parse(localStorage.getItem("AllPosts"));
    let photoPosts = newsPost.getPhotoPosts(allPosts, skip, top, filterConfig);

    for (let i = 0; i < photoPosts.length; i++) {
      arr.show(photoPosts[i], i);
      ++arr.postsAmount;
    }
  }
})(this.dom = {});



function addPost(post) {
  let posts = JSON.parse(localStorage.getItem("AllPosts"));
  newsPost.addPhotoPost(posts, post);
  showPosts();
}

function editPost(id, post) {
  let posts = JSON.parse(localStorage.getItem("AllPosts"));
  newsPost.editPhotoPost(id, post);
  showPosts();
}

dom.showPosts();
