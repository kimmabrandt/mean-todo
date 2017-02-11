var express = require("express");
var mongoose = require("mongoose");
var app = express();

app.use(express.static('public'));

mongoose.connect("mongodb://localhost/todoAppTest");

// Create a schema
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);

// callback function to avoid duplicating it all over
var callback = function(err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
};


// //////// MIDDLEWARE
// // Log the IP of a client on every request
// app.use(function(req, res, next) {
//   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log('Client IP:', ip);
//   next();
// });
/*
// Each middleware has 3 parameters:
req: contain all the requests objects like URLs, path, …
res: is the response object where we can send the reply back to the client.
next: continue with the next middleware in the chain.
 */

 // Specify path for middleware to activate on
 app.use('/todos/:id', function (req, res, next) {
   console.log('Request Type:', req.method);
   next();
 })

//
// app.get('/todos/:id', function(req, res, next) {
//   Todo.findById(req.params.id, function(err, todo) {
//     if(err) res.send(err);
//     res.json(todo);
//   });
// });
