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


////////CREATING
// Create a todo in memory
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there..'});

// Save it to the DB
todo.save(function(err){
  if(err)
    console.log(err);
  else
    console.log(todo);
});

// Create and save together
Todo.create({name: 'Creating something! YAYUH', completed: true, note: 'this is one'}, function(err, todo){
  if(err) console.log(err);
  else console.log(todo);
});


///////// FIND / QUERYING
// Find all data in Todo collection
Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos);
});

// callback function to avoid duplicating it all over
var callback = function(err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
}

// Find only completed tasks
Todo.find({completed: true}, callback);

// Find all tasks ending in JS
Todo.find({name: /JS$/ }, callback);

// Chaining queries
var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);
// Get all tasks starting with 'Master', not completed and created from a year ago til now
Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);



/////// UPDATING
// model.update
Todo.update({ name: /master/i }, { completed: true }, { multi: true }, callback);

// model.findOneAndUpdate
Todo.findOneAndUpdate({name: /JS$/ }, { completed: false}, callback);



/////////// DELETING
// model.remove(conditions, [callback])
Todo.remove({name: "Remove me!"}, callback);

// model.findOneAndRemove(conditions, [options], callback)
Todo.findOneAndRemove({name: "Remove me!"}, callback);

// model.findByIdAndRemove(id, [options], [callback])



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

app.get('/todos/:id', function(req, res, next) {
  Todo.findById(req.params.id, function(err, todo) {
    if(err) res.send(err);
    res.json(todo);
  });
});

/* Default Express middleware
morgan: logger

body-parser: parse the body so you can access parameters in requests in req.body. e.g. req.body.name.

cookie-parser: parse the cookies so you can access parameters in cookies req.cookies. e.g. req.cookies.name.

serve-favicon: exactly that, serve favicon from route /favicon.ico. Should be call on the top before any other routing/middleware takes place to avoids unnecessary parsing.
*/
