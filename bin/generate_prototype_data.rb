#!/usr/bin/env ruby

require 'pry'
require 'net/http'
require 'json'
require 'date'

class GeneratePrototypeData
  # TODO: add error handling (particularly network errors)

  def run
    dataset = {}
    taxons.each do |taxon_slug|
      puts "*** FETCH START - #{taxon_slug} ***"

      puts "Getting the parent taxon..."
      taxon_endpoint = URI "#{hostname}/api/content/alpha-taxonomy/#{taxon_slug}"
      taxon_document = JSON.parse(Net::HTTP.get taxon_endpoint)
      parent_document = taxon_document["links"]["parent"]

      puts "Getting the child taxons..."
      children_endpoint = URI "#{hostname}/api/incoming-links/alpha-taxonomy/#{taxon_slug}?types[]=parent&#{DateTime.now}"
      children_documents = JSON.parse(Net::HTTP.get children_endpoint)["parent"]

      puts "Getting tagged content items..."
      content_endpoint = URI "#{hostname}/api/incoming-links/alpha-taxonomy/#{taxon_slug}?types[]=alpha_taxons"
      content_items    = JSON.parse(Net::HTTP.get content_endpoint)["alpha_taxons"]

      puts "Getting format and display_type for each content item..."
      content_items.each do |content_item|

        puts "-- Fetching updated_at & public_updated_at for #{content_item["base_path"]}"
        content_item_endpoint = JSON.parse(Net::HTTP.get(URI(content_item["api_url"])))
        content_item["updated_at"]        = content_item_endpoint["updated_at"]
        content_item["public_updated_at"] = content_item_endpoint["public_updated_at"]

        puts "-- Fetching search data for #{content_item["base_path"]}"
        search_endpoint = URI "#{hostname}/api/search.json?filter_link=#{content_item["base_path"]}"
        search_result = JSON.parse(Net::HTTP.get search_endpoint)

        if search_result["results"].first
          content_item["display_type"] = search_result["results"].first["display_type"]
          content_item["format"] = search_result["results"].first["format"]
        end
      end

      puts "*** FETCH END - #{taxon_slug} ***"
      puts

      dataset[taxon_slug] = {
        base_path:       taxon_document["base_path"],
        title:           taxon_document["title"],
        parent:          parent_document,
        children:        children_documents,
        tagged_content:  content_items
      }
    end

    writable_data = JSON.dump dataset
    File.open("#{File.dirname(__FILE__)}/../app/data/taxonomy-data.json", 'wb') do |file|
      file.write(writable_data)
    end
  end

  private
  def taxons
    @taxons ||= %w{
      14-to-19-years
      a-level
      annual-tests-for-buses-and-coaches
      annual-tests-for-lorrys-buses-and-trailers
      approved-driving-instruction-adi
      being-an-hgv-operator
      being-an-mot-tester
      booking-tests
      booking-tests-and-checking-licences-for-your-pupils
      bus-and-coach-accessibility-certification-forms
      car-tax
      cars
      cars-and-trailers
      childcare-and-early-years
      childminders
      children-s-centres
      curriculum-and-qualifications
      despatch-newsletter-for-driver-and-rider-trainers
      drink-drive-rehabilitation
      driving
      driving-and-vehicle-businesses
      driving-and-vehicles
      driving-licenses
      driving-lorries-buses-or-goods-vehicles
      driving-test-policies-and-test-centre-rules
      driving-vans-and-running-fleets-of-vans
      driving-with-a-disability-or-health-condition
      early-years-foundation-stage-eyfs
      early-years-pupil-premium
      early-years-settings
      education
      gcse
      get-and-check-an-mot
      good-practice
      highway-code
      improving-your-training-skills
      individual-vehicle-approval-iva
      inspections
      key-stage-3
      large-goods-vehicle-instruction
      learning-to-drive-or-ride
      lorries-and-buses
      lorry-bus-or-trailer-tests-and-permits
      moped-and-motorcycle-training
      mot-and-vehicle-insurance
      mot-forms
      mot-manuals-and-notices
      mot-test-service-modernisation
      motorcycle-instruction
      motorcycle-single-vehicle-approval-msva
      motorcycles
      national-curriculum
      number-plates-and-vehicle-registration
      nurseries
      operating-buses-and-coaches
      parking-including-blue-badge
      phonics
      primary
      public-service-vehicle-licenses-psvs
      running-a-local-bus-service
      running-an-approved-tachograph-centre
      running-an-mot-test-station
      schools-and-colleges
      special-educational-needs-send
      specialist-vehicles
      statistics-research-department-information
      teaching-people-to-drive-or-ride
      tests-and-licenses-for-lorries
      training-for-early-years-staff
      vehicle-recalls-and-safety-defects
      vehicle-safety
      vehicles
    }
  end

  def hostname
    if ENV["DEV"]
      "http://content-store.dev.gov.uk"
    else
      "https://www.gov.uk"
    end
  end
end

GeneratePrototypeData.new.run
