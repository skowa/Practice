;(function(arr) {
    var user = "skowik";

    arr.show = function showPhotoPost(post, position) {
        var isUser = (user === post.author);

        var photo = document.createElement("div");
        photo.className = "photo";

        var photoImg = document.createElement("div");
        photoImg.className = "photoImg";
        photoImg.innerHTML = "<img src=\"" + post.photoLink + "\" alt=\"\">";

        var contentPhoto= document.createElement("div");
        contentPhoto.className = "contentPhoto";

        if (isUser) {
            contentPhoto.innerHTML = "<h1>Ваша публикация</h1>\n" +
                "<h3>" + getFormatDate(post) + "<br />" + getFormatTime(post) + "</h3>\n" +
                "<p class=\"photoDescription\">" + post.description + "</p>\n" +
                "<p class=\"photoTags\">" + post.hashtags.join(", ")+ "</p>\n" +
                "<a href=\"#\" class=\"like\">\n" + "<p>" + post.likes.length + "</p>\n" + "</a>\n" +
                "<a href=\"#\" class=\"delete\"></a>\n" +
                "<a href=\"#\" class=\"edit\"></a>";
        }
        else {
            contentPhoto.innerHTML = "<h1>@" + post.author + "</h1>\n"  +
                "<h3>" + getFormatDate(post) + "<br />" + getFormatTime(post) + "</h3>\n" +
                "<p class=\"photoDescription\">" + post.description + "</p>\n" +
                "<p class=\"photoTags\">" + post.hashtags.join(", ") + "</p>\n" +
                "<a href=\"#\" class=\"like\">\n" + "<p>" + post.likes.length + "</p>\n" + "</a>\n";
        }

        photo.appendChild(contentPhoto);
        photo.appendChild(photoImg);

        photos.insertBefore(photo, photos.children[position]);
    }

    var news = document.getElementsByClassName("news")[0];
    var photos = document.createElement("div");
    photos.className = "photos";
    news.appendChild(photos);

    function getFormatDate(post) {
        var date = post.createdAt;

        var day = date.getDate();
        if (day < 10) day = "0" + day;

        var month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;

        var year = date.getFullYear();

        return day + "." + month + "." + year;
    }

    function getFormatTime(post) {
        var date = post.createdAt;

        var hours = date.getHours();
        if (hours < 10)
            hours = "0" + hours;

        var minutes = date.getMinutes();
        if (minutes < 10)
            minutes = "0" + minutes;

        return hours + ":" + minutes;
    }

    arr.fillHeader = function fillHeader() {
        var isUser = (user !== null);

        document.getElementsByClassName("header")[0].innerHTML =  "<h1 class=\"logo\">PHOTOGALLERY</h1>\n";
        if (isUser) {
            document.getElementsByClassName("header")[0].innerHTML +=
                "<p class=\"authorsName\">@" + user + "</p>\n" +
                "<a href=\"#\" class=\"quit\">ВЫЙТИ</a>\n" +
                "<a href=\"#\" class=\"addPhotoIcon\"> </a>";
        }
        else {
            document.getElementsByClassName("header")[0].innerHTML += "<a href=\"#\" class=\"quit\">ВОЙТИ</a>";
        }
    }

} )(this.dom = {});

function showPosts(skip, top, filterConfig) {
    document.body.getElementsByClassName("photos")[0].innerHTML="";

    var photoPosts = newsPost.getPhotoPosts(skip, top, filterConfig);

    for (var i = 0; i < photoPosts.length; i++)
        dom.show(photoPosts[i], i);
}

function addPost(post) {
    newsPost.addPhotoPost(post);
    showPosts();
}

function removePost(id) {
    newsPost.removePhotoPost(id);
    showPosts();
}

function editPost(id,post) {
    newsPost.editPhotoPost(id, post);
    showPosts();
}

function fillHeader() {
    dom.fillHeader();
}

fillHeader();
showPosts();