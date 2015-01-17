var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

/**
 * When parameter :id is set, find the user of this id.
 */
router.param('id', function(req, res, next, id) {
  User.findOne({'_id': id}, function(err, user) {
    req.user = user;
    next();
  });
});

/**
 * GET /users
 * Gives back all the available users.
 */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.send({
      users : users,
      links : [
        { method: "GET", href: "/users/:_id", ref: "show_user" },
        { method: "PUT", href: "/users/:_id", ref: "change_user" },
        { method: "DELETE", href: "/users/:_id", ref: "delete_user" },
        { method: "POST", href: "/users", ref: "create_user" }
      ]
    });
  });
});

/**
 * POST /users
 * Creates a new user.
 */
router.post('/', function(req, res) {
  user = new User(req.body);
  user.save(function(err) {
    res.status(201).send({
      user : user,
      links : [ { method: "GET", href: "/users/" + user._id, ref: "show_user" } ]
    });
  });
});

/**
 * GET /users/:id
 * Returns a specific user according it's id.
 */
router.get('/:id', function(req, res) {
  if (req.user != null) {
    res.send({
      user : req.user,
      links : [
        { method: "PUT", href: "/users/" + user._id, ref: "change_user" },
        { method: "DELETE", href: "/users/" + user._id, ref: "delete_user" },
        { method: "GET", href: "/users", ref: "list_users" },
      ]
    });
  } else {
    res.status(404).send({ error: "user not found" });
  }
});

/**
 * PUT /users/:id
 * Changes a the user with :id whith the new data.
 */
router.put('/:id', function(req, res) {
  if (req.user != null) {
    user.update(req.body, function(err) {
      res.send({
        user: user,
        links: [
          { method: "GET", href: "/users/" + user._id, ref: "show_user" },
          { method: "PUT", href: "/users/" + user._id, ref: "change_user" },
          { method: "DELETE", href: "/users/" + user_id, ref: "delete_user" },
          { method: "GET", href: "/users", ref: "list_users" },
          { method: "POST", href: "/users", ref: "create_user" }
        ]
      });
    });
  }
});

/**
 * DELETE /users/:id
 * Deletes user with the given :id
 */
router.delete('/:id', function(req, res) {
  if (req.user != null) {
    name = req.user.name;
    user.remove(function(err) {
      res.send({
        message: 'user "' + name + '" deleted' ,
        links: [ { method: "GET", href: "/users", ref: "list_users" } ]
      });
    });
  }
});

module.exports = router;
