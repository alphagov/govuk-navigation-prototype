var taxonHelpers = require('../helpers/taxon-helpers.js');
var filterHelpers = require('../helpers/filter-helpers.js');

function TaxonPresenter (taxonSlug, request) {
  this.taxonSlug = taxonSlug; // the slug of the taxon in the Content Store
  this.selectedTab = request.query.tab;
  if (this.selectedTab == undefined) { this.selectedTab = 'guidance' }; //default view
  this.pageTitle = taxonHelpers.fetchCurrentTaxonTitle(this.taxonSlug);

  // Fetch appropriate taxonomy data
  this.childTaxons = taxonHelpers.fetchChildTaxons(this.taxonSlug);
  this.parentTaxon = taxonHelpers.fetchParentTaxon(this.taxonSlug);
  this.allContent  = taxonHelpers.fetchTaggedItems(this.taxonSlug);

  this.determineContentList = function () {
    switch (this.selectedTab) {
      case 'all':
        return this.allContent; break;
      default:
        return filterHelpers.sectionFilter(this.allContent, this.selectedTab);
    }
  };
  this.contentListToRender = this.determineContentList();

  this.curatedContent = this.contentListToRender.slice(0,6);
  this.latestContent  = this.contentListToRender.slice(0,3);

  this.resolveViewTemplateName = function () {
    return request.path.replace(this.taxonSlug, '').replace(/^\//, '') + this.selectedTab;
  };
  this.viewTemplateName = this.resolveViewTemplateName();
}

module.exports = TaxonPresenter;
