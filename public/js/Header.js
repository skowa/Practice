;(function(arr) {
  arr.fillHeader = function fillHeader() {
    let user = JSON.parse(localStorage.getItem("user"));
      let isUser = (user !== null);

      document.getElementsByClassName("header")[0].innerHTML =  `<h1 class="logo">PHOTOGALLERY</h1>`;
      if (isUser) {
          document.getElementsByClassName("header")[0].innerHTML +=`
              <p class="authorsName">@` + user + `</p>
              <button class="quit"><p>ВЫЙТИ</p></button>
              <button class="addPhotoIcon"> </button>`;
      }
      else {
          document.getElementsByClassName("header")[0].innerHTML += `<button class="quit"><p>ВОЙТИ</p></button>`;
      }
  }
})(this.header = {});

header.fillHeader();
