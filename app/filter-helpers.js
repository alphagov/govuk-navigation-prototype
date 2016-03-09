var fs = require('fs');

var formatMappingData = JSON.parse(fs.readFileSync("app/data/format-mappings.json"));
var formatLookup = {}
for (var group in formatMappingData) {
  for (formatString of formatMappingData[group]) {
    formatLookup[formatString] = group;
  }
}

var sectionFilter = function (allContent, pageSection) {
  console.log("Filtering " + allContent.length + " items by " + pageSection);
  var filteredList = allContent.filter( function (contentItem) {
    var format = contentItem["format"] || "none";
    var displayType = contentItem["display_type"] || "none";
    var mappingSearchString = format.replace(/(-|_)/,' ') + "|" + displayType.toLowerCase();

    if (formatLookup[mappingSearchString] == pageSection) { return true; }
    else { return false; }
  })
  console.log("Filtered out " + filteredList.length);
  return filteredList;
}

module.exports = {
  sectionFilter: sectionFilter,
}

