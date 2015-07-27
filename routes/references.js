var express   = require('express');
var router    = express.Router();
var Reference = require('../models/reference');


/* GET list */
router.get('/', function(req, res) {
  Reference.find({}, function(err, docs){
    res.render('references/list', { references : docs });
  })
});


/* GET new */
router.get('/new', function(req, res) {
  res.render('references/form', {
      title     : 'New Reference',
      action    : '/references',
      reference : new Reference(),
  });
});

/* POST create */
router.post('/', function(req, res) {  
  Reference.create(req.body, function (err, doc) {
    if (err) {      
      res.send("There was a problem adding the information to the database.");
    } else {      
      res.redirect("/references/" + doc._id);
    }
  });
});


/* GET show */
router.get('/:id', function(req, res) {
  Reference.findById(req.params.id, function(err, doc) {
    res.render('references/show', { reference: doc });
  });
 
});


/* GET edit */
router.get('/:id/edit', function(req, res) {
    Reference.findById(req.params.id, function(err, doc) {
        res.render('references/form', { 
            reference : doc,
            title     : 'Edit ' + doc.name,
            action    : '/references/' + doc._id + '?_method=PUT'
        });
    });
});

/* PUT update */
router.put('/:id', function(req, res) {
  var id = req.params.id;

  Reference.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.redirect('/references/' + id);
    }
  });
});


module.exports = router;
