const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const posts = require("./public/js/galleryModel.js");
const jsonFile = "server/data/posts.json";
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/public/img/tmp');
  },
  filename: function (req, file, callback) {
    let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    callback(null, filename);
  }
});

const upload = multer({
  storage: storage
});

app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.get('/getPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  let photoPost = posts.galleryModel.getPhotoPost(allPosts, req.params.id);

  if (photoPost && !photoPost.isDeleted) {
    res.send(photoPost);
    res.statusCode = 200;
  } else {
    res.status(400).end();
  }
});

app.get('/getMaxID', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (allPosts !== null) {
    let id = 0;
    for (let i = 0; i < allPosts.length; i++) {
      if (Number(allPosts[i].id) > id) {
        id = Number(allPosts[i].id);
      }
    }
    res.send(JSON.stringify(id));
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.post('/uploadImage', upload.single('file'), (req, res) => {
  let filename = req.file.filename;
  if (filename !== null) {
    filename = 'img/tmp/' + filename;
    res.send(JSON.stringify(filename));
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.post('/add', (req, res) => {
  let post = req.body;
  post.createdAt = new Date();
  post.isDeleted = false;
  post.likes = [];

  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.addPhotoPost(allPosts, post)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.post('/getPosts', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let postsFilt;
  let filterConfig = req.body;

  if ("author" in filterConfig || "createdAt" in filterConfig ||
    "hashtags" in filterConfig) {
    postsFilt = posts.galleryModel.getPhotoPosts(allPosts, req.query.skip, req.query.top, filterConfig);
  } else {
    postsFilt = posts.galleryModel.getPhotoPosts(allPosts, req.query.skip, req.query.top);
  }

  if (postsFilt) {
    res.statusCode = 200;
    res.send(postsFilt);
  } else {
    res.status(400).end();
  }
});

app.post('/getFilteredLength', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let filter = req.body;
  let postsFilt = posts.galleryModel.getPhotoPosts(allPosts, 0, allPosts.length, filter);

  if (postsFilt.length >= 0) {
    res.statusCode = 200;
    res.send(JSON.stringify(postsFilt.length));
  } else {
    res.status(400).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.editPhotoPost(allPosts, req.params.id, req.body)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end();
  } else {
    res.status(400).end();
  }

});

app.delete('/removePost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.removePhotoPost(allPosts, req.params.id)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end()
  } else {
    res.status(400).end();
  }
});

app.post('/likePost/:id&:user', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let flag = posts.galleryModel.likePost(allPosts, req.params.id, req.params.user);
  fs.writeFileSync(jsonFile, JSON.stringify(allPosts));
  res.send(flag);
});

app.get('/getLength', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let array = allPosts.filter(function (photoPost) {
    return photoPost.isDeleted === false
  });

  if (array.length !== 0) {
    res.send(JSON.stringify(array.length));
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.use((req, res) => {
  res.sendFile('error.html', {
    root: 'public'
  });
});

app.listen(3000, () => console.log("Server is working!"));