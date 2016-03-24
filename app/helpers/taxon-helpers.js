var fs = require('fs');

var taxonomyData = JSON.parse(fs.readFileSync("app/data/taxonomy-data.json"));

var fetchCurrentTaxonTitle = function (taxonSlug) {
  return taxonomyData[taxonSlug].title;
}
// Retrieve content items tagged to a specific taxon.
var fetchTaggedItems = function (taxonSlug) {
  return taxonomyData[taxonSlug]["tagged_content"];
}

// Retrieve array containing title and modified slug of all child taxons.
var fetchChildTaxons = function (taxonSlug) {
  var childTaxons = taxonomyData[taxonSlug]["children"];
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
  var parentTaxon = taxonomyData[taxonSlug]["parent"]
  if (parentTaxon != null) {
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

module.exports = {
  fetchChildTaxons: fetchChildTaxons,
  fetchTaggedItems: fetchTaggedItems,
  fetchParentTaxon: fetchParentTaxon,
  fetchCurrentTaxonTitle: fetchCurrentTaxonTitle,
}

