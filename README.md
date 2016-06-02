# Navigation Prototype

This app serves up prototype navigation flows for the work-in-progress GOV.UK
taxonomy.

## Screenshots

None yet - the navigation screens are in an ongoing state of flux so any
screenshots included here would very quickly be out of date.

## Nomenclature

- **taxon**: a single node within the taxonomy.

## Technical documentation

This is a node app built using the
[govuk_prototype_kit](https://github.com/alphagov/govuk_prototype_kit). It
serves up several endpoints, each containing a specific design variation. These
endpoints accept a taxon slug as a parameter and subsequently display a page
representing that level of the taxonomy.

The taxonomy data represented in these pages is cached locally in
[app/data/taxonomy-data.json](app/data/taxonomy-data.json). This saves us from
having to make multiple calls to the publishing API to render a single page in
the prototype. The Ruby script
[bin/generate_prototype_data.rb](bin/generate_prototype_data.rb) regenerates
the taxonomy data file, picking up the latest changes from the publishing API.
The taxons that are imported by this script are hard-coded in
[app/data/taxon-slugs.yaml](app/data/taxon-slugs.yaml).

### Dependencies



### Running the application

Run `npm install` if running for the first time or if you've added anything to
package.json.

`node start`

Open the app at http://localhost:3000/

## Licence

[MIT License](LICENCE)

