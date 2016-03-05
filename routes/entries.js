var express = require('express');
var router = express.Router();

var entries = [
  {slug:"Nav Bar", body: "I have been very interested in Web Development for a while. While at work I do a little html coding, but most of it is for functional value and not for style. I use mostly other peoples css so I do not know it as much. I spent the time to learn how to make a nave bar that looks a little better than the basic list.", created_at: "02-10-2016"},
  {slug:"xkill", body: "Today while working in my virtual machine that is running linux, a program stopped responding and I could not kill it. I was forced to find another way to do that. This was through xkill. You type that in the command line and it allows you to then click on the window that you would like to close and stops it. It seems to be like the task manager on a windows machine.", created_at: "02-10-2016"}
];

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
  res.render('entries/index', { title: 'Today I learned', entries: entries });
});

/* CREATE entry form: GET /entries/new */
router.get('/new', function(req, res, next) {
  res.render('entries/new', {title: "Create new entry"});
});

/*CREATE entry: POST /entries/ */
router.post('/', function(req, res, next) {
  entries.push(req.body);
  res.render('entries/index', { title: 'Today I learned', entries: entries });
});

/* UPDATE entry form: GET /entries/1/edit */
router.get('/:id/edit', function(req, res, next) {
  res.render('entries/update',
  {
    title: 'Update an entry',
    id: req.params.id,
    entry: entries[req.params.id]
  });
});

/* UPDATE entry: POST /entries/1 */
router.post('/:id', function(req, res, next) {
  entries[req.params.id] = req.body;
  res.render('entries/index',
  {
    title: 'Update an entry',
    entries: entries
  });
});

/* DELETE entry: GET /entries/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  var id = req.params.id
  entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
  res.render('entries/index', { title: 'Today I learned', entries: entries });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /entries/0 */
router.get('/:id', function(req, res, next) {
  res.render('entries/entry',
  {
    title: "Today I learned",
    entry: entries[req.params.id]
  });
});

module.exports = router;
