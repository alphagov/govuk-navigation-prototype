var taxonHelpers = require('./taxon-helpers.js');
var filterHelpers = require('./filter-helpers.js');

function PagePresenter(taxonSlug, pageTitle, request) {
  this.taxonSlug = taxonSlug; // the slug of the taxon in the Content Store
  this.pageTitle = pageTitle; // how you want the page title to appear
  this.requestPath = request.path; // the URL path only, no protocol or query string
  this.pageSection = request.query.section; // the tabbed 'section' you're rendering
  if (this.pageSection == undefined) { this.pageSection = 'guidance' }; //default view

  // Fetch appropriate taxonomy data
  this.childTaxons = taxonHelpers.fetchChildTaxons(this.taxonSlug);
  this.parentTaxon = taxonHelpers.fetchParentTaxon(this.taxonSlug);
  this.allContent  = taxonHelpers.fetchTaggedItems(this.taxonSlug);

  this.determineViewTemplatePath = function () {
    return this.requestPath.replace(/^\//, "") + "/" + this.pageSection;
  };

  // Return array of objects with fields 'base_path' and 'title'
  this.determineContentList = function () {
    switch (this.pageSection) {
      case 'all-content':
        return this.allContent;
      case 'guidance':
        return filterHelpers.rowsWithThreeColumns(this.allContent, this.pageSection);
      case 'policy':
        return filterHelpers.rowsWithThreeColumns(this.allContent, this.pageSection);
      default:
        console.log(filterHelpers.sectionFilter(this.allContent, this.pageSection));
        return filterHelpers.sectionFilter(this.allContent, this.pageSection);
    }
  };

  // Determine what the content item list looks like for this page
  this.contentListToRender = this.determineContentList();
  // Determine the view template path, based on internal convention
  this.viewTemplatePath = this.determineViewTemplatePath();
}

module.exports = PagePresenter;
