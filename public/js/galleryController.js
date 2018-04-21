;
(function(exp) {
  let filterButton;
  let likeButton;
  let moreButton;
  let authButton;
  let quitButton;
  let deleteButton;
  let flag = false;
  let flagPhoto = false;
  let addButton;
  let editButton;
  let saveChangesButton;
  let idToEdit = null;

  function moreShow() {
    getPostsLengthServer();
    let length = parseInt(localStorage.getItem("length"));
    if (!flag) {
      loadPostsServer(0, galleryView.postsAmount + 10)
      if (length - galleryView.postsAmount <= 10) {
        this.style.display = "none";
      }
    } else {
      let filterConfig = localStorage.getItem("filters");
      length = parseInt(localStorage.getItem("lengthFilter"));
      loadPostsServer(0, galleryView.postsAmount + 10, filterConfig)
      if (length - galleryView.postsAmount <= 10) {
        this.style.display = "none";
      }
    }
  }

  exp.startWork = function startWork() {
    galleryView.fillHeader();
    if (document.getElementsByClassName("errorPic")[0] === undefined) {
      galleryView.createMain();
      loadPostsServer();
    }
    let user = localStorage.getItem("user") || null;

    if (user !== null) {
      addPhotoAddHandler();
    }

    quitAddHandler();
    moreButtonAddHandler();
    filterAddHandler();
  }

  function like(i) {
    let user = localStorage.getItem("user") || null;
    if (user !== null) {
      let id = likeButton[i].parentNode.parentNode.getAttribute("id").substring(4);
      localStorage.setItem("toLike", i);
      likePostServer(id, user);
    }
  }

  function filter() {
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
      loadPostsServer(0, 10, JSON.stringify(filterConfig));
      getFilteredLengthServer(JSON.stringify(filterConfig));
    } else {
      flag = false;
      loadPostsServer();
      document.getElementsByClassName("morePhotos")[0].style.display = "block";
    }
  }

  function deletePhoto(i) {
    var toDelete = confirm("Вы действительно хотите удалить пост?");
    if (toDelete) {
      let id = deleteButton[i].parentNode.parentNode.getAttribute("id").substring(4);

      deletePostServer(id);
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

    let post = {descr: '', createdAt: '', hashtags: ''};
    post.createdAt = document.getElementById(id).firstChild.childNodes[3].textContent;
    post.description = document.getElementById(id).firstChild.childNodes[5].textContent;
    post.hashtags = document.getElementById(id).firstChild.childNodes[7].textContent.split (',' ).join ('');
    post.photoLink = document.getElementById(id).childNodes[1].firstChild.src;
    post.author = user;

    galleryView.fillHeader();
    galleryView.clearMain();
    galleryView.createAddAndEdit(post);
    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
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
        setMaxIDServer(descr, tagAdd);
      } else {
        let photoPost;
        if (flagPhoto)
        {
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
        editPostServer(idToEdit, JSON.stringify(photoPost));
      }
    }
  }

  exp.loadImage = function loadImage(post) {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('file', post);

    xhr.open("POST", "/uploadImage");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        localStorage.setItem("photolink", xhr.responseText);
        flagPhoto = true;
      }
    };

    xhr.send(formData);
  }

  function loadPostsServer(skip, top, filter) {
    skip = skip || 0;
    top = top || 10;
    filter = filter || '{}';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/getPosts?skip=" + skip + "&top=" + top, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        galleryView.showPosts(JSON.parse(xhr.responseText), skip, top);
        deleteAddHandler();
        likeAddHandler();
        editAddHandler();
        getPostsLengthServer();
      }
    };

    xhr.send(filter);
  }

  function setMaxIDServer(descr, tags) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/getMaxID/');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        let id = parseInt(xhr.responseText) + 1;
        let photoPost = {
          id: JSON.stringify(id),
          description: descr,
          author: localStorage.getItem("user"),
          hashtags: tags,
          photoLink: localStorage.getItem("photolink").substring(1, localStorage.getItem("photolink").length - 1)
        };
        addPostServer(JSON.stringify(photoPost));
      }
    };
    xhr.send();
  }

  function addPostServer(post) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/add", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.status !== 200 || xhr.readyState !== 4) {
        console.log(xhr.status + ": " + xhr.statusText);
        errorMsg("photoAdd");
      } else {
        galleryView.clearMain();
        galleryController.startWork();
        flagPhoto = false;
        }
      };

    xhr.send(post);
  }

  function editPostServer(id, post) {
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", "/editPost/" + id, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
          if (xhr.readyState !== 4) return;

          if (xhr.status !== 200) {
              console.log(xhr.status + ': ' + xhr.statusText);
              errorMsg("photoAdd");
          }
          else {
            galleryView.clearMain();
            galleryController.startWork();
            idToEdit = null;
            flagPhoto = false;
          }
      };

      xhr.send(post);
  }

  function getPostsLengthServer() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/getLength", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        localStorage.setItem("length", xhr.responseText);
        if (xhr.responseText <= 10) {
          document.getElementsByClassName("morePhotos")[0].style.display = "none";
        }
      }
    };
    xhr.send();
  }

  function getFilteredLengthServer(filter) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/getFilteredLength", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
        loadFilterMsg("news");
        document.getElementsByClassName("morePhotos")[0].style.display = "none";
      } else {
        localStorage.setItem("lengthFilter", xhr.responseText);
        if (xhr.responseText <= 10) {
          document.getElementsByClassName("morePhotos")[0].style.display = "none";
        } else {
          document.getElementsByClassName("morePhotos")[0].style.display = "block";
        }
      }
    };
    xhr.send(filter);
  }

  function deletePostServer(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/removePost/" + parseInt(id), true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        if (!flag) {
          loadPostsServer(0, galleryView.postsAmount);
          let length = parseInt(localStorage.getItem("length"));
          localStorage.setItem("length", JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = "none";
          }
        } else {
          loadPostsServer(0, galleryView.postsAmount, localStorage.getItem("filters"));
          let length = parseInt(localStorage.getItem("lengthFilter"));
          localStorage.setItem("lengthFilter", JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = "none";
          }
        }
      }
    };

    xhr.send();
  }

  function likePostServer(id, user) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/likePost/" + parseInt(id) + '&' + user, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
      } else {
        let icon = "";
        let i = parseInt(localStorage.getItem("toLike"));
        let length = parseInt(likeButton[i].children[1].innerHTML);

        if (xhr.responseText === "true") {
          icon = "img/like.png";
          likeButton[i].children[1].innerHTML = length + 1;
        }
        if (xhr.responseText === "false"){
          icon = "img/noLike.png";
          likeButton[i].children[1].innerHTML = length - 1;
        }

        likeButton[i].firstChild.src = icon;
      }
    };

    xhr.send();
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
    for (let i = 0; i < galleryView.postsAmount; i++) {
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
    saveChangesButton = document.getElementById("OK3");
    saveChangesButton.addEventListener("click", saveChanges);
  }
})(this.galleryController = {});

galleryController.startWork();
