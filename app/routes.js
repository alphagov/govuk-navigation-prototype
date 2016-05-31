var express = require('express');
var router = express.Router();

var TaxonPresenter = require('./presenters/taxon-presenter.js');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/tabbed/:taxonSlug', function (req, res) {
  var presenter = new TaxonPresenter(req, 'all');
  res.render(presenter.viewTemplateName, presenter);
});

router.get('/mvp/:taxonSlug', function (req, res) {
  var presenter = new TaxonPresenter(req, 'all');
  res.render(presenter.viewTemplateName, presenter);
});

module.exports = router;
