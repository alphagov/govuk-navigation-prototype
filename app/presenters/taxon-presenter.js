var taxonHelpers = require('../helpers/taxon-helpers.js');
var filterHelpers = require('../helpers/filter-helpers.js');

function TaxonPresenter (request, defaultView) {
  this.taxonSlug = request.params.taxonSlug; // the slug of the taxon in the Content Store
  this.selectedView = request.query.view || defaultView;
  this.pageTitle = taxonHelpers.fetchCurrentTaxonTitle(this.taxonSlug);

  // Fetch appropriate taxonomy data
  this.childTaxons = taxonHelpers.fetchChildTaxons(this.taxonSlug);
  this.parentTaxon = taxonHelpers.fetchParentTaxon(this.taxonSlug);
  this.allContent  = taxonHelpers.fetchTaggedItems(this.taxonSlug);

  // Used when the type of view means only a subset of all documents get
  // rendered on a page, e.g. - guidance pages, policy pages.
  this.determineContentList = function () {
    switch (this.selectedView) {
      case 'all':
        return this.allContent; break;
      default:
        return filterHelpers.sectionFilter(this.allContent, this.selectedView);
    }
  };
  this.contentListToRender = this.determineContentList();

  // TODO: curated and latest content are quite design-specific - revisit these
  // and consider whether or not to move them down into the specific templates
  // they're used by.
  this.curatedContent = this.contentListToRender.slice(0,6);
  this.latestContent  = this.contentListToRender.slice(0,3);

  this.resolveViewTemplateName = function () {
    return request.path.replace(this.taxonSlug, '').replace(/^\//, 'design-') + this.selectedView;
  };
  this.viewTemplateName = this.resolveViewTemplateName();
}

module.exports = TaxonPresenter;
