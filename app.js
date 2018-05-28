const express = require('express');

const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const posts = require('./public/js/galleryModel.js');

const jsonFile = 'server/data/posts.json';
const multer = require('multer');
const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const authorization = require('./authorization.js');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/public/img/tmp');
  },
  filename: (req, file, callback) => {
    const filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
    callback(null, filename);
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new JsonStrategy(async function (username, password, done) {
  try {
    let user = await authorization.checkPassword(username, password);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

async function connectToDataBase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/photoPostsData');
    console.log('Successfully connected');
  } catch (error) {
    console.log(error);
  }
}

passport.deserializeUser((id, done) => {
  console.log('deserializeUser method worked');
  authorization.Users.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post('/login', passport.authenticate('json', { failureRedirect: '/loginfail' }), async (req, res) => {
  res.redirect('/');
});

app.get('/loginfail', async (req, res) => {
  res.status(200).send(false);
});

app.get('/logout', async (req, res) => {
  req.logout();
  res.status(200).send(true);
});


app.get('/getPost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));

  const photoPost = posts.galleryModel.getPhotoPost(allPosts, req.params.id);

  if (photoPost && !photoPost.isDeleted) {
    res.send(photoPost);
    res.statusCode = 200;
  } else {
    res.status(400).end();
  }
});

app.get('/getMaxID', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));

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
  const post = req.body;
  post.createdAt = new Date();
  post.isDeleted = false;
  post.likes = [];

  const allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.addPhotoPost(allPosts, post)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.post('/getPosts', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const filterConfig = req.body;

  const postsFilt = posts.galleryModel.getPhotoPosts(allPosts, req.query.skip, req.query.top, filterConfig);

  if (postsFilt) {
    res.statusCode = 200;
    res.send(postsFilt);
  } else {
    res.status(400).end();
  }
});

app.post('/getFilteredLength', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const filter = req.body;
  const postsFilt = posts.galleryModel.getPhotoPosts(allPosts, 0, allPosts.length, filter);

  if (postsFilt.length >= 0) {
    res.statusCode = 200;
    res.send(JSON.stringify(postsFilt.length));
  } else {
    res.status(400).end();
  }
});

app.put('/editPost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.editPhotoPost(allPosts, req.params.id, req.body)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.delete('/removePost/:id', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));

  if (posts.galleryModel.removePhotoPost(allPosts, req.params.id)) {
    fs.writeFileSync(jsonFile, JSON.stringify(allPosts));

    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.post('/likePost/:id&:user', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const flag = posts.galleryModel.likePost(allPosts, req.params.id, req.params.user);
  fs.writeFileSync(jsonFile, JSON.stringify(allPosts));
  res.send(flag);
});

app.get('/getLength', (req, res) => {
  const allPosts = JSON.parse(fs.readFileSync(jsonFile));
  const array = allPosts.filter(photoPost => photoPost.isDeleted === false);

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

app.listen(3000, () => console.log('Server is working!'));
connectToDataBase();
 authorization.cleanDataBase();
  authorization.fillDataBase();
