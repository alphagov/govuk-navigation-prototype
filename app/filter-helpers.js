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
  var filteredList = _filteredList(allContent, pageSection);

  console.log("Filtered out " + filteredList.length);
  console.log(filteredList);

  return filteredList;
}

var rowsWithThreeColumns = function(allContent, pageSection) {
  var filteredList = _filteredList(allContent, pageSection);

  var rows    = { rows: [] };
  var columns = [];

  for (var i = 0; i < filteredList.length; i++) {
    var base_path = filteredList[i].base_path;
    var title     = filteredList[i].title;

    var column = {base_path: base_path, title: title};

    if ((columns.length > 0) && (columns.length % 3 == 0)) {
      // when the columns array has reached 3 elements
      // then add those columns to the rows
      rows.rows.push({columns: columns});

      // Then clear the columns array
      // and push the current column to the columns array
      columns = [];
      columns.push(column);
    } else {
      columns.push(column);
    }
  }

  // push the last columns to the last row
  rows.rows.push({columns: columns});

  return rows;
}

var _filteredList = function(allContent, pageSection) {
  var filteredList = allContent.filter( function (contentItem) {
    var format      = contentItem["format"] || "none";
    var displayType = contentItem["display_type"] || "none";
    var mappingSearchString = format.replace(/(-|_)/,' ') + "|" + displayType.toLowerCase();

    if (formatLookup[mappingSearchString] == pageSection) { return true; }
    else { return false; }
  });

  return filteredList;
}

module.exports = {
  sectionFilter: sectionFilter,
  rowsWithThreeColumns: rowsWithThreeColumns,
}
