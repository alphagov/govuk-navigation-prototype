var taxonHelpers = require('../helpers/taxon-helpers.js');
var filterHelpers = require('../helpers/filter-helpers.js');

function TaxonPresenter (taxonSlug, request) {
  this.taxonSlug = taxonSlug; // the slug of the taxon in the Content Store
  this.selectedTab = request.query.tab; // the tabbed 'section' you're rendering
  if (this.selectedTab == undefined) { this.selectedTab = 'guidance' }; //default view
  this.taxonTitle = taxonHelpers.fetchCurrentTaxonTitle(this.taxonSlug);
  this.pageTitle = this.taxonTitle; // how you want the page title to appear

  // Fetch appropriate taxonomy data
  this.childTaxons = taxonHelpers.fetchChildTaxons(this.taxonSlug);
  this.parentTaxon = taxonHelpers.fetchParentTaxon(this.taxonSlug);
  this.allContent  = taxonHelpers.fetchTaggedItems(this.taxonSlug);

  // Return array of objects with fields 'base_path' and 'title'
  this.determineContentList = function () {
    switch (this.selectedTab) {
      case 'all-content':
        return this.allContent; break;
      default:
        return filterHelpers.sectionFilter(this.allContent, this.selectedTab);
    }
  };

  // Determine what the content item list looks like for this page
  this.contentListToRender = this.determineContentList();
}

module.exports = TaxonPresenter;
