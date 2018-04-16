;(function() {
  let filterButton;
  let likeButton;
  let moreButton;
  let authButton;
  let quitButton;
  let deleteButton;
  let allPhotos = 0;
  let flag = false;
  let filterConfig;
  let addButton;
  let editButton;
  let saveChangesButton;
  let idToEdit = null;

  function moreShow() {
    if (!flag) {
      dom.showPosts(0, dom.postsAmount + 10);
      let posts = JSON.parse(localStorage.getItem("AllPosts"));
      let photoAm = posts.filter(function (photoPost) { return photoPost.isDeleted === false }).length;

      if (dom.postsAmount >= photoAm) {
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
    editAddHandler();
  }

  function like(i) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      let id = likeButton[i].parentNode.parentNode.getAttribute("id").substring(4);
      let posts = JSON.parse(localStorage.getItem("AllPosts"));
      let post = module.getPhotoPost(posts, id);

      let index = post.likes.indexOf(user);
      let icon = "";

      if (index === -1) {
        post.likes.push(user);
        icon = "img/like.png";
      } else {
        post.likes.splice(index, 1);
        icon = "img/noLike.png";
      }

      module.editPhotoPost(id, post);
      localStorage.setItem("AllPosts", JSON.stringify(posts));

      likeButton[i].firstChild.src = icon
      likeButton[i].children[1].innerHTML = post.likes.length;
    }
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
      let photoAm = posts.filter(function (photoPost) { return photoPost.isDeleted === false }).length;
      allPhotos = module.getPhotoPosts(posts, 0, photoAm, filterConfig).length;

      dom.showPosts(0, 10, {
        author: nameFilter,
        createdAt: dateFilter,
        hashtags: tagFilter
      });

      hideMoreButton();
      if (dom.postsAmount === 0) {
        loadFilterMsg("news");
      }
    } else {
      reloadMain();
    }
    likeAddHandler();
    deleteAddHandler();
    editAddHandler();
  }

  function deletePhoto(i) {
    var toDelete = confirm("Вы действительно хотите удалить пост?");
    if (toDelete) {
      let id = deleteButton[i].parentNode.parentNode.getAttribute("id").substring(4);
      let posts = JSON.parse(localStorage.getItem("AllPosts"));
      let photoAm = posts.filter(function (photoPost) { return photoPost.isDeleted === false }).length;

      module.removePhotoPost(posts, id);
      localStorage.setItem("AllPosts", JSON.stringify(posts));

      if (!flag) {
        dom.showPosts(0, dom.postsAmount);
        if (dom.postsAmount >= photoAm) {
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
      editAddHandler();
    }
  }

  function log() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      user = null;
      localStorage.setItem("user", JSON.stringify(user));
      header.fillHeader();
      dom.clearMain();
      dom.createMain();
      dom.showPosts();
      quitAddHandler();
      moreButtonAddHandler();
      filterAddHandler();
    }
    else {
      dom.clearMain();
      dom.createLogin();
      authButton = document.getElementById("OK2");
      authButton.addEventListener("click", authorize);
    }
  }

  function authorize() {
    let msg = document.getElementById("message");
    if (msg) {
      document.getElementsByClassName("formLog")[0].removeChild(msg);
    }

    let form = document.getElementsByClassName("formLog")[0];
    let name = document.getElementById("wrLogin").value || null;
    let password = document.getElementById("wrPassword").value || null;

    if (name && password) {
      localStorage.setItem("user", JSON.stringify(name));
      dom.clearMain();
      header.fillHeader();
      dom.createMain();
      dom.showPosts();
      likeAddHandler();
      deleteAddHandler();
      quitAddHandler();
      moreButtonAddHandler();
      filterAddHandler();
      editAddHandler();
      addPhotoAddHandler();

    } else {
      errorMsg("formLog");
    }
  }

  function add() {
    header.fillHeader();
    dom.clearMain();
    dom.createAddAndEdit();
    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
  }

  function edit(i) {
    idToEdit = deleteButton[i].parentNode.parentNode.getAttribute("id").substring(4);
    let posts = JSON.parse(localStorage.getItem("AllPosts"));
    header.fillHeader();
    dom.clearMain();
    dom.createAddAndEdit(module.getPhotoPost(posts, idToEdit));
    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
  }

  function saveChanges() {
    let msg = document.getElementById("message");
    if (msg) {
      document.getElementsByClassName("photoAdd")[0].removeChild(msg);
    }

    let posts = JSON.parse(localStorage.getItem("AllPosts"));
    let user = JSON.parse(localStorage.getItem("user"));

    let form = document.getElementsByClassName("photoAdd")[0];
    let descr = document.getElementById("descr").value || null;
    let tags = document.getElementById("tags").value || null;
    let dropArea = document.getElementsByClassName("dropArea")[0];
    let photoLink = dropArea.lastChild.getAttribute('src');
    if (photoLink == "img/question.png") {
      errorMsg("photoAdd");
    }
    else {
    let tagAdd = null;
    if (tags !== null) {
      tagAdd = tags.split(" ");
    }
    else {
      tagAdd = [];
    }

    if (idToEdit === null) {
      let id = 0;
      for (let i = 0; i < posts.length; i++) {
        if (Number(posts[i].id) > id) {
          id = Number(posts[i].id) ;
        }
      }

      id += 1;
      let photoPost = {
        id: id,
        description: descr,
        createdAt: new Date(),
        author: user,
        hashtags: tagAdd,
        likes: [],
        photoLink: photoLink,
        isDeleted: false
      };
      if (!module.addPhotoPost(posts, photoPost)) {
        errorMsg("photoAdd");
      }
      else {
        localStorage.setItem("AllPosts", JSON.stringify(posts));
        loadMain();
      }
    }
    else {
      let photoPost = {
        description: descr,
        hashtags: tagAdd,
        photoLink: photoLink
      };
      if (!module.editPhotoPost(posts, idToEdit, photoPost)) {
        errorMsg("photoAdd");
      }
      else {
        localStorage.setItem("AllPosts", JSON.stringify(posts));
        loadMain();
        idToEdit = null;
      }
    }
  }
  }

  function loadFilterMsg(className) {
    let message = document.createElement('div');
    message.className = "title";
    message.id = "message";
    message.innerText = "There are no such photoposts.";
    document.getElementsByClassName(className)[0].appendChild(message);
  }

  function errorMsg(className) {
    let message = document.createElement('div');
    message.className = "title";
    message.id = "messageError";
    message.innerText = "invalid data";
    document.getElementsByClassName(className)[0].appendChild(message);
  }

  function reloadMain() {
    flag = false;
    dom.showPosts();
    document.getElementsByClassName("morePhotos")[0].style.display = "block";
  }

  function loadMain() {
    dom.clearMain();
    header.fillHeader();
    dom.createMain();
    dom.showPosts();
    likeAddHandler();
    deleteAddHandler();
    quitAddHandler();
    moreButtonAddHandler();
    filterAddHandler();
    editAddHandler();
    addPhotoAddHandler();
  }

  function hideMoreButton() {
    if (allPhotos > 10) {
      document.getElementsByClassName("morePhotos")[0].style.display = "block";
    } else {
      document.getElementsByClassName("morePhotos")[0].style.display = "none";
    }
  }

  function moreButtonAddHandler() {
    moreButton =  document.getElementsByClassName("morePhotos")[0];
    moreButton.addEventListener("click", moreShow);
  }

  function quitAddHandler() {
    quitButton = document.getElementsByClassName("quit")[0];
    quitButton.addEventListener("click", log);
  }

  function deleteAddHandler() {
    deleteButton = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", function(e) {
        deletePhoto(i);
      });
    }
  }

  function likeAddHandler() {
    likeButton = document.getElementsByClassName("like");
    for (let i = 0; i < dom.postsAmount; i++) {
      likeButton[i].addEventListener("click", function(e) {
        like(i);
      });
    }
  }

  function filterAddHandler() {
    flag = false;
    filterButton = document.getElementById("OK");
    filterButton.addEventListener("click", filter);
  }

  function addPhotoAddHandler() {
    addButton = document.getElementsByClassName("addPhotoIcon")[0];
    addButton.addEventListener("click", add);
  }

function editAddHandler() {
  editButton = document.getElementsByClassName("edit");
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", function(e) {
      edit(i);
    });
  }
}

function saveChangesAddHandler() {
  saveChangesButton =  document.getElementById("OK3");
  saveChangesButton.addEventListener("click", saveChanges);
}

  quitAddHandler();
  likeAddHandler();
  deleteAddHandler();
  moreButtonAddHandler();
  filterAddHandler();
  addPhotoAddHandler();
  editAddHandler();
})();
