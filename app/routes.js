var express = require('express');
var router = express.Router();

var PagePresenter = require('./page-presenter.js');

router.get('/', function (req, res) {
  res.render('index');
});

// ****************** Education Routes BEGIN ******************
router.get('/education', function (req, res) {
  var presenter = new PagePresenter("education", "Education", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/childcare-and-early-years', function (req, res) {
  var presenter = new PagePresenter("2-childcare-and-early-years", "Childcare and early years", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/early-years-settings', function (req, res) {
  var presenter = new PagePresenter("3-early-years-settings", "Early years settings", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/childminders', function (req, res) {
  var presenter = new PagePresenter("4-childminders", "Childminders", req)
  res.render(presenter.viewTemplatePath, presenter);
});
// ****************** Education Routes END ******************

// ****************** Driving Routes BEGIN ******************
router.get('/driving-and-vehicles', function (req, res) {
  var presenter = new PagePresenter("driving-and-vehicles", "Driving and vehicles", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/driving-and-vehicle-businesses', function (req, res) {
  var presenter = new PagePresenter("driving-and-vehicle-businesses", "Driving and vehicle businesses", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/running-an-mot-test-station', function (req, res) {
  var presenter = new PagePresenter("running-an-mot-test-station", "Running an MOT test station", req)
  res.render(presenter.viewTemplatePath, presenter);
});

router.get('/mot-test-service-modernisation', function (req, res) {
  var presenter = new PagePresenter("mot-test-service-modernisation", "MOT test service modernisation", req)
  res.render(presenter.viewTemplatePath, presenter);
});
// ****************** Driving Routes END ******************

module.exports = router;