# Navigation Prototype

**~~ THIS APPLICATION IS NOW RETIRED ~~**

It has been replaced by [`govuk-nav-prototype`](https://github.com/alphagov/govuk-nav-prototype),
which is a prototype rewritten in Rails.

This app used to serve up prototype navigation flows for the work-in-progress GOV.UK
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
having to make multiple network calls to render a single page in the prototype.

The Ruby script
[bin/generate_prototype_data.rb](bin/generate_prototype_data.rb) regenerates
the taxonomy data file. It uses the production API endpoints for the
publishing-api, content-store and rummager to fetch various bits of data about
each taxon. The taxons that are imported by this script are hard-coded in
[app/data/taxon-slugs.yaml](app/data/taxon-slugs.yaml).

### Dependencies

See package.json.

### Running the application

Run `npm install` if running for the first time or if you've added anything to
package.json.

`node start`

Open the app at http://localhost:3000/

## Licence

[MIT License](LICENCE)

