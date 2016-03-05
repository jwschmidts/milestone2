var express = require('express');
var router = express.Router();

var re = [
{ slug:"Nav Bar", body: "I have been very interested in Web Development for a
while. While at work I do a little html coding, but most of it is for functional
value and not for style. I use mostly other peoples css so I do not know it as
much. I spent the time to learn how to make a nave bar that looks a little
better than the basic list.", created_at: "Created by John Schmidt,
02-10-2016"}
];

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
  res.render('entries/index', { title: 'Today I learned', re: re });
});

/* CREATE entry form: GET /entries/new */
router.get('/new', function(req, res, next) {
  res.render('entries/new', {title: "Create new entry"});
});

/*CREATE entry: POST /entries/ */
router.post('/', function(req, res, next) {
  re.push(req.body);
  res.render('entries/index', { title: 'Today I learned', re: re });
});

/* UPDATE entry form: GET /entries/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('entries/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: re[req.params.id]
  });
});

/* UPDATE entry: POST /entries/1 */
router.post('/:id', function(req, res, next) {
  re[req.params.id] = req.body;
  res.render('entries/index',
  {
    title: 'Update an entry',
    re: re
  });
});

/* DELETE entry: GET /entries/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  re = re.slice(0,id).concat(re.slice(id+1, re.length));
  res.render('entries/index', { title: 'Today I learned', re: re });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /entries/0 */
router.get('/:id', function(req, res, next) {
  res.render('entries/entry', {title: "a entry", entry: re[req.params.id]});
});

module.exports = router;

