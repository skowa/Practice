;
(function() {
  let moreButton = document.getElementsByClassName("morePhotos")[0];
  let filterButton = document.getElementById("OK");
  let likeButton = document.getElementsByClassName("like");
  let deleteButton;
  let allPhotos = 0;
  let flag = false;
  let filterConfig;

  function moreShow() {
    if (!flag) {
      dom.showPosts(0, dom.postsAmount + 10);
      if (dom.postsAmount >= newsPost.photoAm) {
        this.style.display = "none";
      }
    } else {
      dom.showPosts(0, dom.postsAmount + 10, filterConfig);
      if (dom.postsAmount >= allPhotos) {
        this.style.display = "none";
      }
    }
    likeAddHandler();
    deleteAddHandler();
  }

  function like(i) {
    let id = likeButton[i].parentNode.parentNode.getAttribute("id").substring(4);
    let posts = JSON.parse(localStorage.getItem("AllPosts"));
    let post = newsPost.getPhotoPost(posts, id);
    let index = post.likes.indexOf(dom.user);
    let icon = "";

    if (index === -1) {
      post.likes.push(dom.user);
      icon = "img/like.png";
    } else {
      post.likes.splice(index, 1);
      icon = "img/noLike.png";
    }

    newsPost.editPhotoPost(id, post);
    localStorage.setItem("AllPosts", JSON.stringify(posts));

    likeButton[i].firstChild.src = icon
    likeButton[i].children[1].innerHTML = post.likes.length;
  }

  function filter() {
    let msg = document.getElementById("message");
    if (msg) {
      document.getElementsByClassName("news")[0].removeChild(msg);
    }

    let filtr = document.getElementsByClassName("filtr")[0];
    let nameFilter = document.getElementById("author").value || null;
    let date = document.getElementById("date").value || null;
    let tag = document.getElementById("tag").value || null;
    let tagFilter = null;
    if (tag !== null) {
      tagFilter = tag.split(" ") || null;
    }
    let dateFilter = (date) ? new Date(date) : null;

    if (dateFilter || nameFilter || tagFilter) {
      flag = true;
      filterConfig = {
        author: nameFilter,
        createdAt: dateFilter,
        hashtags: tagFilter
      };

      let posts = JSON.parse(localStorage.getItem("AllPosts"));
      allPhotos = newsPost.getPhotoPosts(posts, 0, newsPost.photoAm, filterConfig).length;

      dom.showPosts(0, 10, {
        author: nameFilter,
        createdAt: dateFilter,
        hashtags: tagFilter
      });


      hideMoreButton();
      likeAddHandler();
      deleteAddHandler();

      if (dom.postsAmount === 0) {
        loadFilterMsg("news");
      }
    } else {
      reloadMain();
    }
  }

  function deletePhoto(i) {
    var toDelete = confirm("Вы действительно хотите удалить пост?");
    if (toDelete) {
      let id = deleteButton[i].parentNode.parentNode.getAttribute("id").substring(4);
      let posts = JSON.parse(localStorage.getItem("AllPosts"));
      newsPost.removePhotoPost(posts, id);
      localStorage.setItem("AllPosts", JSON.stringify(posts));

      if (!flag) {
        dom.showPosts(0, dom.postsAmount);
        if (dom.postsAmount >= newsPost.photoAm) {
          moreButton.style.display = "none";
        }
      } else {
        dom.showPosts(0, dom.postsAmount, filterConfig);
        --allPhotos;
        if (dom.postsAmount >= allPhotos) {
          moreButton.style.display = "none";
        }
      }

      likeAddHandler();
      deleteAddHandler();
    }
  }

  function loadFilterMsg(className) {
    let message = document.createElement('div');
    message.className = "title";
    message.id = "message";
    message.innerText = "There are no such photoposts.";
    document.getElementsByClassName(className)[0].appendChild(message);
  }

  function reloadMain() {
    flag = false;
    dom.showPosts(0, 10);
    document.getElementsByClassName("morePhotos")[0].style.display = "block";
  }

  function hideMoreButton() {
    if (allPhotos > 10) {
      document.getElementsByClassName("morePhotos")[0].style.display = "block";
    } else {
      document.getElementsByClassName("morePhotos")[0].style.display = "none";
    }

  }

  moreButton.addEventListener("click", moreShow);
  filterButton.addEventListener("click", filter);

  function deleteAddHandler() {
    deleteButton = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", function(e) {
        deletePhoto(i);
      });
    }
  }

  function likeAddHandler() {
    for (let i = 0; i < dom.postsAmount; i++) {
      likeButton[i].addEventListener("click", function(e) {
        like(i);
      });
    }
  }
  likeAddHandler();
  deleteAddHandler();

})();
