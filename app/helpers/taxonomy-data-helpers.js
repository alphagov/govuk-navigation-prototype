var fs = require('fs');

var taxonomyData = JSON.parse(fs.readFileSync("app/data/taxonomy-data.json"));

var fetchCurrentTaxonTitle = function (taxonSlug) {
  return taxonomyData[taxonSlug].title;
}

// Retrieve content items tagged to a specific taxon, ordered public_updated_at
// ascending.
var fetchTaggedItems = function (taxonSlug) {
  return taxonomyData[taxonSlug]["tagged_content"].sort(function(a, b) {
    return new Date(a.public_updated_at) - new Date(b.public_updated_at);
  });
}

// Retrieve array containing title, modified slug and 3 example pieces of
// content for all child taxons.
var fetchChildTaxons = function (taxonSlug) {
  var childTaxons = taxonomyData[taxonSlug]["children"];
  childTaxons = childTaxons.map( function (taxon) {
    slug = taxon.base_path.replace(/^\/alpha-taxonomy\//, '')
    return {
      // Strip any leading digits indicating the taxon 'level'
      title: taxon.title.replace(/^\d - /, ''),
      //  Convert the content store slug into one that's suitable for linking to pages within the prototype
      localHref: slug,
      sampleContent: taxonomyData[slug].tagged_content.slice(0,3)
    }
  });

  if (childTaxons.length > 0) {
    return childTaxons;
  }
  else { return null }
}

var fetchParentTaxon = function (taxonSlug) {
  var parentTaxon = taxonomyData[taxonSlug]["parent"]
  if (parentTaxon != null) {
    parentPayload = parentTaxon[0];
    return {
      // Strip any leading digits indicating the taxon 'level'
      title: parentPayload.title.replace(/^\d - /, ''),
      //  Convert the content store slug into one that's suitable for linking to pages within the prototype
      localHref: parentPayload.base_path.replace(/^\/alpha-taxonomy\//, '')
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
