const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const posts = require("./public/js/script.js");
const jsonFile = "server/data/posts.json";

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/getPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  let photoPost = posts.module.getPhotoPost(allPosts, req.params.id);

  if(photoPost && !photoPost.isDeleted){
    res.send(photoPost);
    res.statusCode = 200;
  }
  else{
    res.status(400).end();
  }
});

app.post('/add', (req, res) => {
  let post = req.body;
  post.isDeleted = false;
  post.createdAt = new Date();

  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.module.addPhotoPost(allPosts, post)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error){
        throw error;
      }
    });

    res.status(200).end();
  }
  else {
    res.status(400).end();
  }
});

app.post('/getPosts', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let postsFilt;
  let filterConfig = req.body;

  if ("author" in filterConfig || "createdAt" in filterConfig
|| "hashtags" in filterConfig) {
    postsFilt = posts.module.getPhotoPosts(allPosts, req.query.skip, req.query.top, filterConfig);
  }
  else {
    postsFilt = posts.module.getPhotoPosts(allPosts, req.query.skip, req.query.top);
  }

  if (postsFilt) {
    res.statusCode = 200;
    res.send(postsFilt);
  }
  else {
    res.status(400).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.module.editPhotoPost(allPosts, req.params.id, req.body)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error) {
        throw error;
      }
    });

    res.status(200).end();
  } else {
    res.status(400).end();
  }

});

app.delete('/removePost/:id', (req, res) => {
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.module.removePhotoPost(allPosts, req.params.id)) {
    fs.writeFile(jsonFile, JSON.stringify(allPosts), function (error) {
      if (error) {
        throw error;
      }
    });

    res.status(200).end()
  } else {
    res.status(400).end();
  }
});

app.use((req, res) => {
  res.sendFile('error.html', { root: 'public' });
});

app.listen(3000, () => console.log("Server is working!"));
