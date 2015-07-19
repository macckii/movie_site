var express = require('express');
var router = express.Router();

/* GET Adding Reference page. */
router.get('/new', function(req, res) {
  res.render('references/new', { title: 'Add Reference' });
});

/* Showing a reference page. */
router.get('/:id', function(req, res) {
  var db = req.db;
  
  var collection = db.get('reference');
  
  console.log("Show params %s", req.params.id);
  
  collection.findById(req.params.id, function(err, doc) {
    res.render('references/show', { reference: doc });
  });
 
});

/* POST to Add Reference */
router.post('/', function(req, res) {
  // Set internal DB variable
  var db = req.db
  
  // Get form values. These rely on the "name" attributes
  var refName = req.body.refName;
  var refType = req.body.refType;
  var description = req.body.description;
  
  // Set collection
  var collection = db.get('reference');
  
  // Submit to the DB
  collection.insert({
    "refName" : refName,
    "refType" : refType,
    "description" : description
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("/references/" + doc._id);
    }
  });
});

/* GET reference list page. */
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('reference');
  collection.find({}, {}, function(e, docs){
    res.render('references/list', {
      references : docs,
      title: 'Reference List'
    });
  })
});

/* GET reference edit page. */
router.get('/:id/edit', function(req, res) {
    var db = req.db;
    var collection = db.get('reference');
    collection.findById(req.params.id, function(err, doc) {
        res.render('references/edit', {reference: doc, title: 'Edit page'});
    });
});

/* PUT from Edit page. */
router.put('/:id', function(req, res) {
  // Set internal DB variable
  var db = req.db
  
  // Get form values. These rely on the "name" attributes
  var refName = req.body.refName;
  var refType = req.body.refType;
  var description = req.body.description;
  
  // Set collection
  var collection = db.get('reference');
  
  var id = req.params.id;

  // Submit to the DB
  collection.updateById(id, {
    "refName"     : refName,
    "refType"     : refType,
    "description" : description
  }, function (err) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("/references/" + id);
    }
  });
});

module.exports = router;
