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
/ model.remove(conditions, [callback])
Todo.remove({name: "Remove me!"}, callback);

// model.findOneAndRemove(conditions, [options], callback)
Todo.findOneAndRemove({name: "Remove me!"}, callback);

// model.findByIdAndRemove(id, [options], [callback])
