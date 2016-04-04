var express = require('express');
var router = express.Router();

var TaxonPresenter = require('./presenters/taxon-presenter.js');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/taxons/:taxonSlug', function (req, res) {
  var presenter = new TaxonPresenter(req.params.taxonSlug, req);
  res.render(presenter.viewTemplateName, presenter);
});

router.get('/mvp/:taxonSlug', function (req, res) {
	var presenter = new TaxonPresenter(req.params.taxonSlug, req);
  res.render(presenter.viewTemplateName, presenter);
});

// add your routes here

module.exports = router;
