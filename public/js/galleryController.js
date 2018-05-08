;
(function (exp) {
  let filterButton;
  let likeButton;
  let moreButton;
  let authButton;
  let quitButton;
  let deleteButton;
  let addButton;
  let editButton;
  let saveChangesButton;
  let idToEdit = null;
  let flag = false;
  exp.flagPhoto = false;

  async function moreShow() {
    try {
      await getPostsLengthServer();
      let length = parseInt(localStorage.getItem("length"));
      if (!flag) {
        loadPosts(0, galleryView.postsAmount + 10)
          .then(() => {
            if (length - galleryView.postsAmount <= 0) {
              moreButton.style.display = "none";
            }
          })
          .catch(err => console.log(err));
      } else {
        let filterConfig = localStorage.getItem("filters");
        length = parseInt(localStorage.getItem("lengthFilter"));
        loadPosts(0, galleryView.postsAmount + 10, filterConfig)
          .then(() => {
            if (length - galleryView.postsAmount <= 0) {
              moreButton.style.display = "none";
            }
          })
          .catch(err => console.log(err));
      }
    } catch (e) {
      throw new Error("Button click failed! (" + e.message + ")");
    }
  }

  async function loadPosts(skip, top, filters) {
    try {
      const postsRes = await loadPostsServer(skip, top, filters);
      const posts = await JSON.parse(postsRes);
      galleryView.showPosts(posts, skip, top);

      deleteAddHandler();
      likeAddHandler();
      editAddHandler();

      await getPostsLength();
      let length = parseInt(localStorage.getItem("length"));
      if (length <= 10) {
        moreButton.style.display = "none";
      }
    } catch (e) {
      throw new Error("Load posts failed! (" + e.message + ")");
    }
  }

  exp.startWork = function startWork() {
    galleryView.fillHeader();
    if (document.getElementsByClassName("errorPic")[0] === undefined) {
      galleryView.createMain();
      loadPosts()
        .catch(err => console.log(err));
    }
    let user = localStorage.getItem("user") || null;

    if (user !== null) {
      addPhotoAddHandler();
    }

    quitAddHandler();
    moreButtonAddHandler();
    filterAddHandler();
  }

  async function like(i) {
    try {
      let user = localStorage.getItem("user") || null;
      if (user !== null) {
        let id = likeButton[i].parentNode.parentNode.getAttribute("id").substring(4);
        const res = await likePostServer(id, user);

        let icon = "";
        let length = parseInt(likeButton[i].children[1].innerHTML);

        if (res === "true") {
          icon = "img/like.png";
          likeButton[i].children[1].innerHTML = length + 1;
        }
        if (res === "false") {
          icon = "img/noLike.png";
          likeButton[i].children[1].innerHTML = length - 1;
        }

        likeButton[i].firstChild.src = icon;
      }
    } catch (e) {
      throw new Error("Like post failed! (" + e.message + ")");
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
      let filterConfig = {
        author: nameFilter,
        createdAt: date,
        hashtags: tagFilter
      };

      localStorage.setItem("filters", JSON.stringify(filterConfig));
      loadPosts(0, 10, JSON.stringify(filterConfig))
        .catch(err => console.log(err));

      getPostsFilteredLength(filterConfig)
        .catch(err => console.log(err));
    } else {
      flag = false;
      loadPosts()
        .catch(err => console.log(err));
      moreButton.style.display = "block";
    }
  }

  async function getPostsLength() {
    try {
      const length = await getPostsLengthServer();

      localStorage.setItem("length", length);
      if (length <= 10) {
        moreButton.style.display = "none";
      }
    } catch (e) {
      throw new Error("Getting length failed! (" + e.message + ")");
    }
  }

  async function getPostsFilteredLength(filterConfig) {
    try {
      const length = await getFilteredLengthServer(JSON.stringify(filterConfig));

      localStorage.setItem("lengthFilter", length);
      if (length <= 10) {
        moreButton.style.display = "none";
      } else {
        moreButton.style.display = "block";
      }

      if (length == 0) {
        loadFilterMsg("news");
      }
    } catch (e) {
      throw new Error("Getting filter length failed! (" + e.message + ")");
    }
  }

  async function deletePhoto(i) {
    try {
      var toDelete = confirm("Вы действительно хотите удалить пост?");
      if (toDelete) {
        let id = deleteButton[i].parentNode.parentNode.getAttribute("id").substring(4);

        let isDeleted = await deletePostServer(id);
        if (!flag) {
          loadPosts(0, galleryView.postsAmount)
            .catch(err => console.log(err));

          let length = parseInt(localStorage.getItem("length"));
          localStorage.setItem("length", JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = "none";
          }
        } else {
          loadPosts(0, galleryView.postsAmount, localStorage.getItem("filters"))
            .catch(err => console.log(err));

          let length = parseInt(localStorage.getItem("lengthFilter"));
          localStorage.setItem("lengthFilter", JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = "none";
          }
        }
      }
    } catch (e) {
      throw new Error("Deleting post failed! (" + e.message + ")");
    }
  }

  function log() {
    let user = localStorage.getItem("user") || null;

    if (user !== null) {
      user = null;
      localStorage.removeItem("user");

      galleryView.clearMain();
      galleryController.startWork();
    } else {
      galleryView.clearMain();
      galleryView.createLogin();

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
      localStorage.setItem("user", name);
      galleryView.clearMain();
      galleryController.startWork();
    } else {
      errorMsg("formLog");
    }
  }

  function add() {
    let user = localStorage.getItem("user");

    galleryView.fillHeader();
    galleryView.clearMain();
    galleryView.createAddAndEdit();

    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
  }

  function edit(i) {
    let id = deleteButton[i].parentNode.parentNode.getAttribute("id");
    idToEdit = id.substring(4)
    let user = localStorage.getItem("user");

    let post = {
      descr: '',
      createdAt: '',
      hashtags: ''
    };
    post.createdAt = document.getElementById(id).firstChild.childNodes[3].textContent;
    post.description = document.getElementById(id).firstChild.childNodes[5].textContent;
    post.hashtags = document.getElementById(id).firstChild.childNodes[7].textContent.split(',').join('');
    post.photoLink = document.getElementById(id).childNodes[1].firstChild.src;
    post.author = user;

    galleryView.fillHeader();
    galleryView.clearMain();
    galleryView.createAddAndEdit(post);

    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
  }

  async function addPost(photoPost) {
    try {
      await addPostServer(JSON.stringify(photoPost));
      galleryController.flagPhoto = false;
    } catch (e) {
      errorMsg("photoAdd");
      throw new Error("Adding photo failed! (" + e.message + ")");
    }
  }

  async function editPost(photoPost) {
    try {
      await editPostServer(idToEdit, JSON.stringify(photoPost));
      idToEdit = null;
      galleryController.flagPhoto = false;
    } catch (e) {
      errorMsg("photoAdd");
      throw new Error("Editing photo failed! (" + e.message + ")");
    }
  }

  async function setID(photoPost) {
    try {
      let idRes = await setMaxIDServer();
      localStorage.setItem("maxID", parseInt(idRes) + 1);
    } catch (e) {
      throw new Error("Setting id failed! (" + e.message + ")");
    }
  }


  function saveChanges() {
    let user = localStorage.getItem("user");

    let form = document.getElementsByClassName("photoAdd")[0];
    let descr = document.getElementById("descr").value || null;
    let tags = document.getElementById("tags").value || null;

    let dropArea = document.getElementsByClassName("dropArea")[0];
    let photoLink = dropArea.lastChild.getAttribute('src');
    if (photoLink == "img/question.png") {
      errorMsg("photoAdd");
    } else {
      let tagAdd = null;
      if (tags !== null) {
        tagAdd = tags.split(" ");
      } else {
        tagAdd = [];
      }

      if (idToEdit === null) {
        setID()
          .then(() => {
            let photoPost = {
              id: localStorage.getItem("maxID"),
              description: descr,
              author: localStorage.getItem("user"),
              hashtags: tagAdd,
              photoLink: localStorage.getItem("photolink").substring(1, localStorage.getItem("photolink").length - 1)
            };

            addPost(photoPost)
              .then(() => {
                galleryView.clearMain();
                galleryController.startWork();
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        let photoPost;
        if (galleryController.flagPhoto) {
          photoPost = {
            description: descr,
            hashtags: tagAdd,
            photoLink: localStorage.getItem("photolink").substring(1, localStorage.getItem("photolink").length - 1)
          };
        } else {
          photoPost = {
            description: descr,
            hashtags: tagAdd
          };
        }

        editPost(photoPost)
          .then(() => {
            galleryView.clearMain();
            galleryController.startWork();
          })
          .catch(err => console.log(err));

      }
    }
  }

  exp.loadImage = function loadImage(post) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      formData.append('file', post);

      xhr.open("POST", "/uploadImage");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send(formData);
    })
  }

  function loadPostsServer(skip, top, filter) {
    skip = skip || 0;
    top = top || 10;
    filter = filter || '{}';

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/getPosts?skip=" + skip + "&top=" + top, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send(filter);
    })
  }

  function setMaxIDServer() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', '/getMaxID/');
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send();
    })
  }

  function addPostServer(post) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/add", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ": " + xhr.statusText);
        } else {
          resolve(true);
        }
      };

      xhr.send(post);
    })
  }

  function editPostServer(id, post) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", "/editPost/" + id, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(true);
        }
      };

      xhr.send(post);
    })
  }

  function getPostsLengthServer() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "/getLength", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send();
    })
  }

  function getFilteredLengthServer(filter) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/getFilteredLength", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send(filter);
    })
  }

  function deletePostServer(id) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("DELETE", "/removePost/" + parseInt(id), true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(true);
        }
      };

      xhr.send();
    })
  }

  function likePostServer(id, user) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/likePost/" + parseInt(id) + '&' + user, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(xhr.status + ': ' + xhr.statusText);
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send();
    })
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

  function moreButtonAddHandler() {
    moreButton = document.getElementsByClassName("morePhotos")[0];
    moreButton.addEventListener("click", function (e) {
      moreShow()
        .catch(err => console.log(err));
    });
  }

  function quitAddHandler() {
    quitButton = document.getElementsByClassName("quit")[0];
    quitButton.addEventListener("click", log);
  }

  function deleteAddHandler() {
    deleteButton = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener("click", function (e) {
        deletePhoto(i)
          .catch(err => console.log(err));
      });
    }
  }

  function likeAddHandler() {
    likeButton = document.getElementsByClassName("like");
    for (let i = 0; i < galleryView.postsAmount; i++) {
      likeButton[i].addEventListener("click", function (e) {
        like(i)
          .catch(err =>
            console.log(err));
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
      editButton[i].addEventListener("click", function (e) {
        edit(i)
          .catch(err =>
            console.log(err));
      });
    }
  }

  function saveChangesAddHandler() {
    saveChangesButton = document.getElementById("OK3");
    saveChangesButton.addEventListener("click", saveChanges);
  }
})(this.galleryController = {});

galleryController.startWork();