var express = require('express');
var router  = express.Router();


/* GET list */
router.get('/', function(req, res) {
  _getCollection(req).find({}, {}, function(e, docs){
    res.render('references/list', { references : docs });
  })
});


/* GET new */
router.get('/new', function(req, res) {
  res.render('references/new');
});

/* POST create */
router.post('/', function(req, res) {  
  var payload = {
    name        : req.body.name,
    category    : req.body.category,
    description : req.body.description,
  };
    
  _getCollection(req).insert(payload, function (err, doc) {
    if (err) {      
      res.send("There was a problem adding the information to the database.");
    } else {      
      res.redirect("/references/" + doc._id);
    }
  });
});


/* GET show */
router.get('/:id', function(req, res) {
  _getCollection(req).findById(req.params.id, function(err, doc) {
    res.render('references/show', { reference: doc });
  });
 
});


/* GET edit */
router.get('/:id/edit', function(req, res) {
    _getCollection(req).findById(req.params.id, function(err, doc) {
        res.render('references/edit', { reference: doc });
    });
});

/* PUT update */
router.put('/:id', function(req, res) {
  var id = req.params.id;
  
  var payload = {
    name        : req.body.name,
    category    : req.body.category,
    description : req.body.description  
  };

  _getCollection(req).updateById(id, payload, function(err) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.redirect('/references/' + id);
    }
  });
});


function _getCollection(req) {
    return req.db.get('references');
}


module.exports = router;
