var request = require('sync-request');

var baseUrls= {
  dev:  "http://content-store.dev.gov.uk/",
  prod: "https://www.gov.uk/",
}

// Set this to one of the baseUrls above to change source of data for fetch
// functions below.
var hostName = baseUrls.prod;

// Retrieve content items tagged to a specific taxon.
var fetchTaggedItems = function (taxonSlug) {
  endpoint = hostName + "api/incoming-links/alpha-taxonomy/" + taxonSlug + "?types[]=alpha_taxons";
  console.log("Fetching documents via: " + endpoint);
  var result = request('GET', endpoint);
  return JSON.parse(result.getBody('utf8')).alpha_taxons;
}

// Retrieve array containing title and modified slug of all child taxons.
var fetchChildTaxons = function (taxonSlug) {
  var childrenEndpoint = hostName + "api/incoming-links/alpha-taxonomy/" + taxonSlug + "?types[]=parent" + "&" + (new Date).getTime();
  console.log("Fetching children of " + childrenEndpoint);
  childTaxons = JSON.parse(
    request('GET', childrenEndpoint).getBody('utf8')
  ).parent;

  childTaxons = childTaxons.map( function (taxon) {
    return {
      // Strip any leading digits indicating the taxon 'level'
      title: taxon.title.replace(/^\d - /, ''),
      //  Convert the content store slug into one that's suitable for linking to pages within the prototype
      localHref: taxon.base_path.replace(/^\/alpha-taxonomy\//, '').replace(/^\d-/, '')
    }
  });

  return childTaxons;
}

var fetchParentTaxon = function (taxonSlug) {
  var taxonEndpoint = hostName + "api/content/alpha-taxonomy/" + taxonSlug
  console.log("Fetching api data for " + taxonSlug);
  parentTaxon = JSON.parse(
    request('GET', taxonEndpoint).getBody()
  ).links.parent

  if (parentTaxon != undefined) {
    parentPayload = parentTaxon[0];
    return {
      // Strip any leading digits indicating the taxon 'level'
      title: parentPayload.title.replace(/^\d - /, ''),
      //  Convert the content store slug into one that's suitable for linking to pages within the prototype
      localHref: parentPayload.base_path.replace(/^\/alpha-taxonomy\//, '').replace(/^\d-/, '')
    }
  }
  else { return null }
};

// Given an array of content items, return only those with path that begins with
// '/guidance/'.
var filterOutGuidance = function (contentItems) {
  filtered = contentItems.filter( function (contentItem) {
    regexp = /^\/guidance/;
    if ( contentItem.base_path.match(regexp) ) {
      return true;
    } else {
      return false;
    }
  });

  return filtered;
}

module.exports = {
  filterOutGuidance: filterOutGuidance,
  fetchChildTaxons: fetchChildTaxons,
  fetchTaggedItems: fetchTaggedItems,
  fetchParentTaxon: fetchParentTaxon
}

