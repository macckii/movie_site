var express = require('express');
var router = express.Router();

/* GET Adding Movie page. */
router.get('/new', function(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
});

router.get('/:id', function(req, res) {
  var db = req.db;
  
  var collection = db.get('moviecollection');
  
  var movie = collection.findById(req.params.id);
  res.render('movies/show', { movie: movie });
});

/* POST to Add Movie */
router.post('/', function(req, res) {
  // Set internal DB variable
  var db = req.db
  
  // Get form values. These rely on the "name" attributes
  var movieTitle = req.body.movietitle;
  var movieDescription = req.body.description;
  
  // Set collection
  var collection = db.get('moviecollection');
  
  // Submit to the DB
  collection.insert({
    "movietitle" : movieTitle,
    "description" : movieDescription
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("/movies/" + doc._id);
    }
  });
});

module.exports = router;
