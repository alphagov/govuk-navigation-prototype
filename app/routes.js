var express = require('express');
var router = express.Router();

var taxonHelpers = require('./taxon-helpers.js');

router.get('/', function (req, res) {
  res.render('index');
});

function PagePresenter (taxonSlug, pageTitle, pageSection) {
	this.taxonSlug = taxonSlug; // the slug of the taxon in the Content Store
	this.pageTitle= pageTitle; // how you want the page title to appear
	this.pageSection = pageSection; // the tabbed 'section' you're rendering

  // Fetch appropriate taxonomy data
  this.childTaxons         = taxonHelpers.fetchChildTaxons(this.taxonSlug);
	this.parentTaxon         = taxonHelpers.fetchParentTaxon(this.taxonSlug);
  this.allContent          = taxonHelpers.fetchTaggedItems(this.taxonSlug);
  this.guidanceContentOnly = taxonHelpers.filterOutGuidance(this.allContent);

  // Resolve the section we're rendering
  this.sectionTemplate = 'guidance'; // default view
  if ( this.pageSection != undefined ) { this.sectionTemplate = this.pageSection; };

  this.determineContentList = function () {
    switch (this.pageSection) {
      case 'all-content':
        return this.allContent; break;
      case 'policy':
        return this.allContent; break;
      default:
        return this.guidanceContentOnly;
    }
  }
  // Determine what the content item list looks like for this page
  this.contentListToRender = this.determineContentList();
}

// ****************** Education Routes BEGIN ******************
router.get('/education', function (req, res) {
  var taxonSlug = "education";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  res.render('education', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/childcare-and-early-years', function (req, res) {
  var taxonSlug = "2-childcare-and-early-years";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  if ( req.query.section === 'detailed' ) {
    res.render('childcare-and-early-years_detailed', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childcare-and-early-years_policy', {childTaxons: childTaxons});
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childcare-and-early-years_publications', {taggedItems: taggedItems, childTaxons: childTaxons});
  }
  else {
    res.render('childcare-and-early-years', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
  }
});

router.get('/early-years-settings', function (req, res) {
  var taxonSlug = "3-early-years-settings";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);
  var childTaxons = taxonHelpers.fetchChildTaxons(taxonSlug);

  res.render('early-years-settings', {taggedItems: guidanceItemsOnly, childTaxons: childTaxons});
});

router.get('/childminders', function (req, res) {
  var taxonSlug = "4-childminders";

  var taggedItems = taxonHelpers.fetchTaggedItems(taxonSlug);
  var guidanceItemsOnly = taxonHelpers.filterOutGuidance(taggedItems);

  if ( req.query.section === 'detailed' ) {
    res.render('childminders_detailed');
  }
  else if ( req.query.section === 'policy' ) {
    res.render('childminders_policy');
  }
  else if ( req.query.section === 'publications' ) {
    res.render('childminders_publications', {taggedItems: taggedItems});
  }
  else {
    res.render('childminders', {taggedItems: guidanceItemsOnly});
  }
});
// ****************** Education Routes END ******************

// ****************** Driving Routes BEGIN ******************
router.get('/driving-and-vehicles', function (req, res) {
  var presenter = new PagePresenter(
    "driving-and-vehicles",
    "Driving and vehicles",
    req.query.section
  )

  res.render(
    'driving-and-vehicles/' + presenter.sectionTemplate,
    presenter
  );

});

router.get('/driving-and-vehicle-businesses', function (req, res) {
  var presenter = new PagePresenter(
    "driving-and-vehicle-businesses",
    "Driving and vehicle businesses",
    req.query.section
  )

  res.render(
    'driving-and-vehicle-businesses/' + presenter.sectionTemplate,
    presenter
  );
});

router.get('/running-an-mot-test-station', function (req, res) {
  var presenter = new PagePresenter(
    "running-an-mot-test-station",
    "Running an MOT test station",
    req.query.section
  )

  res.render(
    'running-an-mot-test-station/' + presenter.sectionTemplate,
    presenter
  );
});

router.get('/mot-test-service-modernisation', function (req, res) {
  var presenter = new PagePresenter(
    "mot-test-service-modernisation",
    "MOT test service modernisation",
    req.query.section
  )

  res.render(
    'mot-test-service-modernisation/' + presenter.sectionTemplate,
    presenter
  );
});

// ****************** Driving Routes END ******************
module.exports = router;