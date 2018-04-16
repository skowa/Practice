;(function(arr) {
  let user = JSON.parse(localStorage.getItem("user"));
  arr.postsAmount = 0;

  arr.createMain = function createMenu() {
    let content = document.getElementsByClassName("wrapperContent")[0];
    let news = document.createElement("div");
    news.className = "news";
    content.appendChild(news);
    let filtr = document.createElement("div");
    filtr.className = "filtr";
    filtr.innerHTML = `
    <form>
        Дата: <br>
        <input id="date" type="date" name="calendar" placeholder="24/02/2018" />
        <br>Автор: <br>
        <input id="author" type="text" name="author" placeholder="Автор" />
        <br>Хештег: <br>
        <input id="tag" type="text" name="tag" placeholder="Хештег" />
        </form>
        <input id="OK" type="submit" value="OK" />`;
    news.appendChild(filtr);
    let photos = document.createElement("div");
    photos.className = "photos";
    news.appendChild(photos);
    let button = document.createElement("div");
    button.innerHTML = "<button class=\"morePhotos\" title=\"more\"><p>Загрузить следующие фото</p></button>";
    news.appendChild(button);
  }

  arr.clearMain = function clearMain() {
    let content = document.getElementsByClassName("wrapperContent")[0];
    content.innerHTML = "";
  }

  arr.createLogin = function createLogin() {
    let content = document.getElementsByClassName("wrapperContent")[0];
    let formAuth = document.createElement("div");
    formAuth.className = "authorizeForm";
    formAuth.innerHTML = `
    <form class="formLog">
        Логин: <br>
        <input id="wrLogin" type="text" name="wrLogin" placeholder="Введите логин">
        <br>Пароль: <br>
        <input id="wrPassword" type="text" name="wrPassword" placeholder="Введите пароль">
        </form>
        <input id="OK2" type="submit" value="OK">`;
    content.appendChild(formAuth);

  }

  arr.createAddAndEdit = function createAddAndEdit(post) {
    let content = document.getElementsByClassName("wrapperContent")[0];

    let photoLoad = document.createElement("div");
    photoLoad.className = "photoLoad";
    content.appendChild(photoLoad);

    let dropArea = document.createElement('div');
       dropArea.className = 'dropArea';

       let dropAreaText = document.createElement("p");
       dropAreaText.innerHTML = "DRUG & DROP AREA";

       dropArea.appendChild(dropAreaText);

       let imgDropArea = document.createElement('img');
       if (post)
       {
         imgDropArea.setAttribute('src', post.photoLink);
       }
       else {
         imgDropArea.setAttribute('src', "img/question.png");
       }

       dropArea.appendChild(imgDropArea);

       dropArea.addEventListener("dragover", function (event) {
           event.preventDefault();
       }, false);

       dropArea.addEventListener("drop", function (event) {
           event.preventDefault();
           let files = event.dataTransfer.files;
           let reader = new FileReader();
           reader.readAsDataURL(files[0]);
           reader.onloadend = function () {
               imgDropArea.setAttribute('src',reader.result);
           };
       }, false);

       content.appendChild(dropArea);

    let photoAdd = document.createElement("div");
    photoAdd.className = "photoAdd";

    if (post !== undefined) {
      photoAdd.innerHTML = `
      <h1>@` + post.author + `</h1>
      <form>
        <h3>` +  getFormatDate(post) + `<br />` + getFormatTime(post) + `</h3>
        <p>
          Описание:
        </p>
        <textarea id="descr" rows="6" cols="50" type = "text" name="descr">` + post.description + `</textarea>
        <p>
          Хештеги:
        </p>
        <textarea id="tags" rows="6" cols="50" name="tags" placeholder="Пишите хештеги через пробел">` + post.hashtags.join(" ") + `</textarea>
      </form>
      <input id="OK3" type="submit" value="OK">`;
    }
    else {
      user = JSON.parse(localStorage.getItem("user"));
      photoAdd.innerHTML = `
      <h1>@` + user + `</h1>
      <form>
        <h3>` +  getFormatDate() + `<br />` + getFormatTime() + `</h3>
        <p>
          Описание:
        </p>
        <textarea id="descr" rows="6" cols="50" type = "text" name="descr"></textarea>
        <p>
          Хештеги:
        </p>
        <textarea id="tags" rows="6" cols="50" name="tags" placeholder="Пишите хештеги через пробел"></textarea>
      </form>
      <input id="OK3" type="submit" value="OK">`;
    }

    content.appendChild(photoAdd);
  }

  arr.show = function showPhotoPost(post, position) {
    user = JSON.parse(localStorage.getItem("user"));
    let isUser = (user === post.author);

    let photo = document.createElement("div");
    photo.className = "photo";
    let photoImg = document.createElement("div");
    photoImg.className = "photoImg";
    photoImg.innerHTML = "<img src=\"" + post.photoLink + "\" alt=\"\">";

    let contentPhoto = document.createElement("div");
    contentPhoto.className = "contentPhoto";
    photo.id = "post" + post.id;
    if (isUser) {
      contentPhoto.innerHTML = `
      <h1>Ваша публикация</h1>
        <h3>` + getFormatDate(post) + `<br />` + getFormatTime(post) + `</h3>
        <p class="photoDescription">` + post.description + `</p>
        <p class="photoTags">` + post.hashtags.join(", ") + `</p>
        <button class="delete"></button>
        <button class="edit"></button>`;
    } else {
      contentPhoto.innerHTML = `<h1>@` + post.author + `</h1>
        <h3>` + getFormatDate(post) + `<br />` + getFormatTime(post) + `</h3>
        <p class=\"photoDescription\">` + post.description + `</p>
        <p class=\"photoTags\">` + post.hashtags.join(", ") + `</p>`;
    }

    if (post.likes.indexOf(user) === -1) {
      contentPhoto.innerHTML += `<div class="like"><img src="img/noLike.png">
      <p>` + post.likes.length + `</p></div>`;
    } else {
      contentPhoto.innerHTML += `<div class="like"><img src="img/like.png">
      <p>` + post.likes.length + `</p></div>`;
    }

    photo.appendChild(contentPhoto);
    photo.appendChild(photoImg);

    let photos = document.getElementsByClassName("photos")[0];
    photos.insertBefore(photo, photos.children[position]);
  }

  function getFormatDate(post) {
    let date;
    if (post !== undefined) {
      date = new Date(post.createdAt);
    }
    else {
      date = new Date();
    }

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;

    let year = date.getFullYear();

    return day + "." + month + "." + year;
  }

  function getFormatTime(post) {
    let date;
    if (post !== undefined) {
      date = new Date(post.createdAt);
    }
    else {
      date = new Date();
    }

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

    let photoPosts = module.getPhotoPosts(allPosts, skip, top, filterConfig);

    for (let i = 0; i < photoPosts.length; i++) {
      arr.show(photoPosts[i], i);
      ++arr.postsAmount;
    }

  }
})(this.dom = {});

dom.createMain();
dom.showPosts();
