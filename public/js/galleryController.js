((exp) => {
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

  exp.loadImage = function loadImage(post) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', post);

      xhr.open('POST', '/uploadImage');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send(formData);
    });
  };

  function loadPostsServer(skip, top, _filter) {
    skip = skip || 0;
    top = top || 10;
    _filter = _filter || '{}';

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/getPosts?skip=' + skip + '&top=' + top, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send(_filter);
    });
  }

  function setMaxIDServer() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/getMaxID/');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send();
    });
  }

  function addPostServer(post) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/add', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(true);
        }
      };

      xhr.send(post);
    });
  }

  function editPostServer(id, post) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', '/editPost/' + id, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(true);
        }
      };

      xhr.send(post);
    });
  }

  function getPostsLengthServer() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/getLength', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send();
    });
  }

  function getFilteredLengthServer(_filter) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/getFilteredLength', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };
      xhr.send(_filter);
    });
  }

  function deletePostServer(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', '/removePost/' + parseInt(id, 10), true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(true);
        }
      };

      xhr.send();
    });
  }

  function likePostServer(id, user) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/likePost/' + parseInt(id, 10) + '&' + user, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status !== 200) {
          reject(new Error(xhr.status + ': ' + xhr.statusText));
        } else {
          resolve(xhr.responseText);
        }
      };

      xhr.send();
    });
  }

  function errorMsg(className) {
    const message = document.createElement('div');
    message.className = 'title';
    message.id = 'messageError';
    message.innerText = 'invalid data';
    document.getElementsByClassName(className)[0].appendChild(message);
  }

  function loadFilterMsg(className) {
    const message = document.createElement('div');
    message.className = 'title';
    message.id = 'message';
    message.innerText = 'There are no such photoposts.';
    document.getElementsByClassName(className)[0].appendChild(message);
  }

  async function deletePhoto(i) {
    try {
      const toDelete = confirm('Вы действительно хотите удалить пост?');
      if (toDelete) {
        const id = deleteButton[i].parentNode.parentNode.getAttribute('id').substring(4);

        await deletePostServer(id);
        if (!flag) {
          loadPosts(0, galleryView.postsAmount)
            .catch(err => console.log(err));

          const length = parseInt(localStorage.getItem('length'), 10);
          localStorage.setItem('length', JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = 'none';
          }
        } else {
          loadPosts(0, galleryView.postsAmount, localStorage.getItem('filters'))
            .catch(err => console.log(err));

          const length = parseInt(localStorage.getItem('lengthFilter'), 10);
          localStorage.setItem('lengthFilter', JSON.stringify(length - 1));
          if (galleryView.postsAmount >= length - 1) {
            moreButton.style.display = 'none';
          }
        }
      }
    } catch (e) {
      throw new Error('Deleting post failed! (' + e.message + ')');
    }
  }

  async function like(i) {
    try {
      const user = localStorage.getItem('user') || null;
      if (user !== null) {
        const id = likeButton[i].parentNode.parentNode.getAttribute('id').substring(4);
        const res = await likePostServer(id, user);

        let icon = '';
        const length = parseInt(likeButton[i].children[1].innerHTML, 10);

        if (res === 'true') {
          icon = 'img/like.png';
          likeButton[i].children[1].innerHTML = length + 1;
        }
        if (res === 'false') {
          icon = 'img/noLike.png';
          likeButton[i].children[1].innerHTML = length - 1;
        }

        likeButton[i].firstChild.src = icon;
      }
    } catch (e) {
      throw new Error('Like post failed! (' + e.message + ')');
    }
  }

  async function addPost(photoPost) {
    try {
      await addPostServer(JSON.stringify(photoPost));
      galleryController.flagPhoto = false;
    } catch (e) {
      errorMsg('photoAdd');
      throw new Error('Adding photo failed! (' + e.message + ')');
    }
  }

  async function editPost(photoPost) {
    try {
      await editPostServer(idToEdit, JSON.stringify(photoPost));
      idToEdit = null;
      galleryController.flagPhoto = false;
    } catch (e) {
      errorMsg('photoAdd');
      throw new Error('Editing photo failed! (' + e.message + ')');
    }
  }

  async function setID() {
    try {
      const idRes = await setMaxIDServer();
      localStorage.setItem('maxID', parseInt(idRes, 10) + 1);
    } catch (e) {
      throw new Error('Setting id failed! (' + e.message + ')');
    }
  }

  function authorize() {
    const msg = document.getElementById('message');
    if (msg) {
      document.getElementsByClassName('formLog')[0].removeChild(msg);
    }
    const name = document.getElementById('wrLogin').value || null;
    const password = document.getElementById('wrPassword').value || null;
    if (name && password) {
      localStorage.setItem('user', name);
      galleryView.clearMain();
      galleryController.startWork();
    } else {
      errorMsg('formLog');
    }
  }

  async function getPostsLength() {
    try {
      const length = await getPostsLengthServer();

      localStorage.setItem('length', length);
      if (length <= 10) {
        moreButton.style.display = 'none';
      }
    } catch (e) {
      throw new Error('Getting length failed! (' + e.message + ')');
    }
  }

  async function getPostsFilteredLength(filterConfig) {
    try {
      const length = await getFilteredLengthServer(JSON.stringify(filterConfig));

      localStorage.setItem('lengthFilter', length);
      if (length <= 10) {
        moreButton.style.display = 'none';
      } else {
        moreButton.style.display = 'block';
      }

      if (length == 0) {
        loadFilterMsg('news');
      }
    } catch (e) {
      throw new Error('Getting filter length failed! (' + e.message + ')');
    }
  }

  function log() {
    let user = localStorage.getItem('user') || null;

    if (user !== null) {
      user = null;
      localStorage.removeItem('user');

      galleryView.clearMain();
      galleryController.startWork();
    } else {
      galleryView.clearMain();
      galleryView.createLogin();

      authButton = document.getElementById('OK2');
      authButton.addEventListener('click', authorize);
    }
  }

  function filter() {
    const msg = document.getElementById('message');
    if (msg) {
      document.getElementsByClassName('news')[0].removeChild(msg);
    }

    const nameFilter = document.getElementById('author').value || null;
    const date = document.getElementById('date').value || null;
    const tag = document.getElementById('tag').value || null;
    let tagFilter = null;
    if (tag !== null) {
      tagFilter = tag.split(' ') || null;
    }
    const dateFilter = (date) ? new Date(date) : null;

    if (dateFilter || nameFilter || tagFilter) {
      flag = true;
      const filterConfig = {
        author: nameFilter,
        createdAt: date,
        hashtags: tagFilter
      };

      localStorage.setItem('filters', JSON.stringify(filterConfig));
      loadPosts(0, 10, JSON.stringify(filterConfig))
        .catch(err => console.log(err));

      getPostsFilteredLength(filterConfig)
        .catch(err => console.log(err));
    } else {
      flag = false;
      loadPosts()
        .catch(err => console.log(err));
      moreButton.style.display = 'block';
    }
  }

  function saveChanges() {
    const descr = document.getElementById('descr').value || null;
    const tags = document.getElementById('tags').value || null;

    const dropArea = document.getElementsByClassName('dropArea')[0];
    const photoLink = dropArea.lastChild.getAttribute('src');
    if (photoLink == 'img/question.png') {
      errorMsg('photoAdd');
    } else {
      let tagAdd = null;
      if (tags !== null) {
        tagAdd = tags.split(' ');
      } else {
        tagAdd = [];
      }

      if (idToEdit === null) {
        setID()
          .then(() => {
            const photoPost = {
              id: localStorage.getItem('maxID'),
              description: descr,
              author: localStorage.getItem('user'),
              hashtags: tagAdd,
              photoLink: localStorage.getItem('photolink').substring(1, localStorage.getItem('photolink').length - 1)
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
            photoLink: localStorage.getItem('photolink').substring(1, localStorage.getItem('photolink').length - 1)
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

  function quitAddHandler() {
    quitButton = document.getElementsByClassName('quit')[0];
    quitButton.addEventListener('click', log);
  }

  function deleteAddHandler() {
    deleteButton = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener('click', () => {
        deletePhoto(i)
          .catch(err => console.log(err));
      });
    }
  }

  function likeAddHandler() {
    likeButton = document.getElementsByClassName('like');
    for (let i = 0; i < galleryView.postsAmount; i++) {
      likeButton[i].addEventListener('click', () => {
        like(i)
          .catch(err =>
            console.log(err));
      });
    }
  }

  function editAddHandler() {
    editButton = document.getElementsByClassName('edit');
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].addEventListener('click', () => {
        edit(i)
          .catch(err =>
            console.log(err));
      });
    }
  }

  function addPhotoAddHandler() {
    addButton = document.getElementsByClassName('addPhotoIcon')[0];
    addButton.addEventListener('click', add);
  }

  function saveChangesAddHandler() {
    saveChangesButton = document.getElementById('OK3');
    saveChangesButton.addEventListener('click', saveChanges);
  }

  function moreButtonAddHandler() {
    moreButton = document.getElementsByClassName('morePhotos')[0];
    moreButton.addEventListener('click', () => {
      moreShow()
        .catch(err => console.log(err));
    });
  }

  function filterAddHandler() {
    flag = false;
    filterButton = document.getElementById('OK');
    filterButton.addEventListener('click', filter);
  }

  function add() {
    galleryView.fillHeader();
    galleryView.clearMain();
    galleryView.createAddAndEdit();

    addPhotoAddHandler();
    quitAddHandler();
    saveChangesAddHandler();
  }

  function edit(i) {
    const id = deleteButton[i].parentNode.parentNode.getAttribute('id');
    idToEdit = id.substring(4);
    const user = localStorage.getItem('user');

    const post = {
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

  async function loadPosts(skip, top, filters) {
    try {
      const postsRes = await loadPostsServer(skip, top, filters);
      const posts = await JSON.parse(postsRes);
      galleryView.showPosts(posts, skip, top);

      deleteAddHandler();
      likeAddHandler();
      editAddHandler();

      await getPostsLength();
      const length = parseInt(localStorage.getItem('length'), 10);
      if (length <= 10) {
        moreButton.style.display = 'none';
      }
    } catch (e) {
      throw new Error('Load posts failed! (' + e.message + ')');
    }
  }

  async function moreShow() {
    try {
      await getPostsLengthServer();
      let length = parseInt(localStorage.getItem('length'), 10);
      if (!flag) {
        loadPosts(0, galleryView.postsAmount + 10)
          .then(() => {
            if (length - galleryView.postsAmount <= 0) {
              moreButton.style.display = 'none';
            }
          })
          .catch(err => console.log(err));
      } else {
        const filterConfig = localStorage.getItem('filters');
        length = parseInt(localStorage.getItem('lengthFilter'), 10);
        loadPosts(0, galleryView.postsAmount + 10, filterConfig)
          .then(() => {
            if (length - galleryView.postsAmount <= 0) {
              moreButton.style.display = 'none';
            }
          })
          .catch(err => console.log(err));
      }
    } catch (e) {
      throw new Error('Button click failed! (' + e.message + ')');
    }
  }

  exp.startWork = function startWork() {
    galleryView.fillHeader();
    if (document.getElementsByClassName('errorPic')[0] === undefined) {
      galleryView.createMain();
      loadPosts()
        .catch(err => console.log(err));
    }
    const user = localStorage.getItem('user') || null;

    if (user !== null) {
      addPhotoAddHandler();
    }

    quitAddHandler();
    moreButtonAddHandler();
    filterAddHandler();
  };
})(this.galleryController = {});

galleryController.startWork();
