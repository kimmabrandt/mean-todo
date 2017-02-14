var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

 // List: GET /todos listing
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// Create: POST /todos
router.post('/', function(req, res, next) {
  Todo.create(req.body, function(err, post) {
    if(err) return next(err);
    res.json(post);
  });
});

// Show: GET /todos/id
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update: PUT /todos/:id
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Destroy: DELETE /todos/:id
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;
