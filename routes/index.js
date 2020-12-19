var express = require('express');
var router = express.Router();
//....................................................................................................................
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/arafni';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//...................................................................................................................................
// require
var Post=require('../model/post');
var User=require('../model/user');

// add post
// test http://localhost:3000/addpost
router.get('/addpost', function(req, res, next) {
  var post = new Post(
      {
        titel: "handel data from req",
        description: "String",
        username: "String",
        going: 7,
        interest: 70,
        comments: [{ username: "String",comment: "String" },{ username: "String",comment: "String" }]
        });
  post.save(function(error, post){
    res.send(post);
  });

});


// registration
// test  http://localhost:3000/register
router.get('/register', function(req, res, next) {
  var user = new User(
      {
        name: 'handel data from req',
        email: 'String',
        pass: 'String',
        about: 'String',
        location: 'String',
        phone: 'String',
        sex: 'String',
        age: 'String',
        imgurl: 'String',
        state: [{ postid: 'String',method: 'String' }]
      });
  user.save(function(error, user){
    res.send(user);
  });

});


// login
// test  http://localhost:3000/login/String/String
router.get('/login/:emaill/:pass', function(req, res, next) {
  User.findOne({email:req.params.emaill,about:req.params.pass}, function(error, user) {
    if(!user){
      res.send('invalid user');
    }else {
      res.send(user);
    }
  });
});


// top 3 interest
//http://localhost:3000/interest
router.get('/interest', function(req, res, next) {
  Post.find({}).sort({interest: -1}).limit(3).exec(
      function(err, posts) {
        res.send(posts);

      }
  );});

// top 3 going
// test http://localhost:3000/going
router.get('/going', function(req, res, next) {
  Post.find({}).sort({going: -1}).limit(3).exec(
      function(err, posts) {
        res.send(posts);

      }
  );});


//   going++

// test http://localhost:3000/going/5fdd2d7563c4d82fe414f6ee/5fdd39bcc2712c10d887f70d
router.get('/going/:id/:userid', function(req, res, next) {
  Post.findOne({_id:req.params.id}, function(error, post) {
    res.send(post);
    var going=post.going+1;
    post.set({interest:going});
    post.save(function(error, post){
    });
  });
  User.findOne({_id:req.params.userid}, function(error, user) {
    var state=user.state;
    state.push({postid:req.params.id,method:"going"})
    user.set({states:state});
    user.save(function(error, post){
      res.send(user);
    });
  });
});

//   interest++
//test  http://localhost:3000/interest/5fdd2d7563c4d82fe414f6ee/5fdd39bcc2712c10d887f70d

router.get('/interest/:id/:userid', function(req, res, next) {
  Post.findOne({_id:req.params.id}, function(error, post) {
    res.send(post);
     var interest=post.interest+1;
    post.set({interest:interest});
    post.save(function(error, post){
    });
  });
  User.findOne({_id:req.params.userid}, function(error, user) {
    var state=user.state;
    state.push({postid:req.params.id,method:"interest"})
    user.set({states:state});
    user.save(function(error, post){
      res.send(user);
    });
  });
});


// get posts
// test http://localhost:3000/post
router.get('/post', function(req, res, next) {
  Post.find({},function(error, post){
    res.json(post);

  });
});


// post comment
// test http://localhost:3000/comment/5fdd1c97b958833260255fad/String/comerfgdsfdfg
router.get('/comment/:id/:user/:comment', function(req, res, next) {
  Post.findOne({_id:req.params.id}, function(error, post) {
    var comment=post.comments;
    comment.push({username:req.params.user,comment:req.params.comment})
    post.set({comments:comment});
    post.save(function(error, post){
      res.send(post);
    });
  });});

module.exports = router;
