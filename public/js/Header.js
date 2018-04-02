;(function(arr) {
  arr.fillHeader = function fillHeader() {
      let isUser = (dom.user !== null);

      document.getElementsByClassName("header")[0].innerHTML =  "<h1 class=\"logo\">PHOTOGALLERY</h1>\n";
      if (isUser) {
          document.getElementsByClassName("header")[0].innerHTML +=
              "<p class=\"authorsName\">@" + dom.user + "</p>\n" +
              "<a href=\"#\" class=\"quit\">ВЫЙТИ</a>\n" +
              "<a href=\"#\" class=\"addPhotoIcon\"> </a>";
      }
      else {
          document.getElementsByClassName("header")[0].innerHTML += "<a href=\"#\" class=\"quit\">ВОЙТИ</a>";
      }
  }
})(this.header = {});

header.fillHeader();
