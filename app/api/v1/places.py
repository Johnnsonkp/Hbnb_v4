from flask_restx import Namespace, Resource, fields
# from app.services.facade import HBnBFacade
from app.services import facade
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify
import http.client
import json
import os
import random
import requests
from flask import request
from datetime import datetime


api = Namespace('places', description='Place operations')

# Define the models for related entities
amenity_model = api.model('Amenity', {
    'id': fields.String(description='Amenity ID'),
    'name': fields.String(description='Name of the amenity')
})

user_model = api.model('User', {
    'id': fields.String(description='User ID'),
    'first_name': fields.String(description='First name of the owner'),
    'last_name': fields.String(description='Last name of the owner'),
    'email': fields.String(description='Email of the owner')
})

# Adding the review model
review_model = api.model('Review', {
    'id': fields.String(description='Review ID'),
    'text': fields.String(description='Text of the review'),
    'rating': fields.Integer(description='Rating of the place (1-5)'),
    'user_id': fields.String(description='ID of the user')
})

place_model = api.model('Place', {
    'title': fields.String(required=True, description='Title of the place'),
    'description': fields.String(description='Description of the place'),
    'price': fields.Float(required=True, description='Price per night'),
    'latitude': fields.Float(required=True, description='Latitude of the place'),
    'longitude': fields.Float(required=True, description='Longitude of the place'),
    'owner_id': fields.String(required=True, description='ID of the owner'),
    'owner': fields.Nested(user_model, description='Owner of the place'),
    'amenities': fields.List(fields.Nested(amenity_model), description='List of amenities'),
    'reviews': fields.List(fields.Nested(review_model), description='List of reviews')
})

# facade = HBnBFacade()


# @api.route('/', methods=['GET', 'POST', 'OPTIONS'])
@api.route('/', methods=['GET', 'POST', 'OPTIONS'])
class PlaceList(Resource):

    @api.expect(place_model)
    @api.response(201, 'Place successfully created')
    @api.response(400, 'Invalid input data')
    @api.response(400, 'Setter validation failure')
    def post(self):
        """Register a new place"""
        # places_data = api.payload
        # print(f"requests.form. {requests.form}")
        title = request.form.get('title')
        price = request.form.get('price')
        address = request.form.get('address')
        city = request.form.get('city')
        property_type = request.form.get('property_type')  # fixed
        description = request.form.get('description')
        bedrooms = request.form.get('bedrooms')
        beds = request.form.get('beds')
        bathrooms = request.form.get('bathrooms')
        owner_id = request.form.get('owner_id')
        latitude = request.form.get('latitude')
        longitude = request.form.get('longitude')
        url = request.form.get('url')
        deeplink = request.form.get('deeplink')
        host_thumbnail = request.form.get('host_thumbnail')
        rating = request.form.get('rating')
        super_host = request.form.get('super_host', 'false').lower() == 'true'

        # images = request.files.getlist('images')
        images = request.form.get('images')

        # user = facade.get_user(str(places_data.get('owner_id')))
        user = facade.get_user(str(owner_id))
        if not user:
            return { 'error': "Invalid input data - user does not exist" }, 400
        
        all_places = facade.get_all_places()
        if any(place.title == title for place in all_places):
            return { 'error': "Listing already exists" }, 400

        # the try catch is here in case setter validation fails
        # new_place = None
        img_urls = []
        # for index, img in enumerate(images):
        #     public_id = str(city) + str(owner_id) + str(datetime.now())
        #     print(f"public id {public_id}")

        #     img_url = facade.uploadImage(img, public_id)
        #     if url:
        #         img_urls.append(img_url)

        # if not img_urls:
        #     return { 'error': "Failed to upload images" }, 400

        place_data = {
            'title': title,
            'price': int(price),
            'address': address,
            'city': city,
            'property_type': property_type,
            'description': description,
            'bedrooms': bedrooms,
            'beds': beds,
            'bathrooms': bathrooms,
            'owner_id': owner_id,
            'latitude': latitude,
            'longitude': longitude,
            'url': url,
            'deeplink': deeplink,
            'host_thumbnail': host_thumbnail,
            'rating': rating,
            'super_host': super_host,
            # 'images': img_urls,
            'images': images  
        }
        
        new_place = facade.create_place(place_data)

        output = {
            "id": str(new_place.id),
            "title": new_place.title,
            "latitude": new_place.latitude,
            "longitude": new_place.longitude,
            "description": new_place.description,
            "price": new_place.price,
            "owner_id": str(new_place.owner_id),
            "url": new_place.url,
            "deeplink": new_place.deeplink,
            "bathrooms": new_place.bathrooms,
            "bedrooms": new_place.bedrooms,
            "beds": new_place.beds,
            "city": new_place.city,
            "images": new_place.images,
            "host_thumbnail": new_place.host_thumbnail,
            "super_host": new_place.super_host,
            "rating": new_place.rating,
            "property_type": new_place.property_type,
            "address": new_place.address,
        }

        print(f"Place created successfully: {output}")
        return output, 201
    

    # @api.expect(place_model)
    # @api.response(400, 'Invalid input data')
    # @api.response(200, 'List of places retrieved successfully')
    def get(self):
        """Retrieve a list of all places"""
        all_places = facade.get_all_places()
        output = []

        for place in all_places:
            output.append({
                "id": str(place.id),
                "title": place.title,
                "latitude": place.latitude,
                "longitude": place.longitude,
                "description": place.description,
                "price": place.price,
                "owner_id": str(place.owner_id),
                "url": place.url,
                "deeplink": place.deeplink,
                "bathrooms": place.bathrooms,
                "bedrooms": place.bedrooms,
                "beds": place.beds,
                "city": place.city,
                "images": place.images,
                "host_thumbnail": place.host_thumbnail,
                "super_host": place.super_host,
                "rating": place.rating,
                "property_type": place.property_type,
                "address": place.address,
            })

        # print(f"places {output}")

        return output, 200


@api.route('/search')
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(200, 'List of places retrieved successfully')
    def post(self):
        # searchParams = api.payload 
        # location = searchParams['market']

        # result = facade.get_airbnb_api_data(location)
        # print(location)

        # return result

        def get_airbnb_api_data(location='australia', checkin='2025-09-12', checkout='2025-10-13', adults=1, children=0, infants=0):
            conn = http.client.HTTPSConnection("airbnb13.p.rapidapi.com")

            print(f"env var {os.getenv('RAPID_API_KEY')}")

            headers = {
                'x-rapidapi-key': os.getenv('RAPID_API_KEY'),
                'x-rapidapi-host': "airbnb13.p.rapidapi.com"
            }

            conn.request("GET", f"/search-location?location={location}&checkin={checkin}&checkout={checkout}&adults={adults}&children={children}&infants={infants}&pets=0&page=1&currency=AUD", headers=headers)

            res = conn.getresponse()
            data = res.read()
            list_arr = []
      
            return json.loads(data.decode("utf-8"))


        location = "NewYork"
        created_places = get_airbnb_api_data(location)

        if(created_places):
            for index, place in enumerate(created_places):
                if (index > 25):
                    return

                print(f"created_places {created_places}")
                print(f"place {place}")

                place_data = {
                    'title': place['title'],
                    'price': place['price']['rate'],
                    'address': place['address'],
                    'city': place['city'],
                    'property_type': place['property_type'],
                    'description': place['description'],
                    'bedrooms': place['bedrooms'],
                    'beds': place['beds'],
                    'bathrooms': place['bathrooms'],
                    'owner_id': place['owner_id'],
                    'latitude': place['latitude'],
                    'longitude': place['longitude'],
                    'url': place['url'],
                    'deeplink': place['deeplink'],
                    'host_thumbnail': place['host_thumbnail'],
                    'rating': place['rating'],
                    'super_host': place['super_host'],
                    'images': place['images']
                }

                print(f"place_data {place_data}")
                
                # new_place = facade.create_place(place_data) 


    @api.response(200, 'List of places retrieved successfully')
    def get(self):

        def save_details_to_file(details, output_file):
            try:
                with open(output_file, 'w') as f:
                    json.dump(details, f, indent=2)
                print(f"Details written to: {output_file}")
            except Exception as e:
                print(f"Failed to write file: {e}")

        result = facade.get_airbnb_api_data()

        if result:
            print(result)
            save_details_to_file(result, 'listing_details_1.txt')



@api.route('/all')
class PlaceList(Resource):
    @api.expect(place_model)
    @api.response(200, 'List of places retrieved successfully')
    def get(self):
        
        # path = "listing_details.txt"
        # listings = facade.parse_listings(path, 10)

        # path = "listing_details_1.txt"
        # listings = facade.extract_property_data_from_file(path, 10)

        # if listings:
        #   return jsonify(listings)
        all_places = facade.get_all_places()
        output = []

        for place in all_places:
            output.append({
                "id": str(place.id),
                "title": place.title,
                "latitude": place.latitude,
                "longitude": place.longitude,
                "description": place.description,
                "price": place.price,
                "owner_id": str(place.owner_id),
                "url": place.url,
                "deeplink": place.deeplink,
                "bathrooms": place.bathrooms,
                "bedrooms": place.bedrooms,
                "beds": place.beds,
                "city": place.city,
                "images": place.images,
                "host_thumbnail": place.host_thumbnail,
                "super_host": place.super_host,
                "rating": place.rating,
                "property_type": place.property_type,
                "address": place.address,
            })

        if output:
          return output, 200


@api.route('/<place_id>')
class PlaceResource(Resource):
    # @api.response(200, 'Place details retrieved successfully')
    # @api.response(404, 'Place not found')
    def get(self, place_id):
        # path = "listing_details_1.txt"
        # listings = facade.get_property_data_by_id_from_file(path, place_id)

        # if listings:
        #   # print(f"listing {listings}")
        #   return jsonify(listings)
        
        print(f"place_id {place_id}")
        place = facade.get_place(place_id)

        if not place:
            return {'error': 'Place not found'}, 404
        
        output = []

        if place:
          # print(f"place {place}")

          output.append({
              "id": str(place.id),
              "title": place.title,
              "latitude": place.latitude,
              "longitude": place.longitude,
              "description": place.description,
              "price": place.price,
              "owner_id": str(place.owner_id),
              "url": place.url,
              "deeplink": place.deeplink,
              "bathrooms": place.bathrooms,
              "bedrooms": place.bedrooms,
              "beds": place.beds,
              "city": place.city,
              "images": place.images,
              "host_thumbnail": place.host_thumbnail,
              "super_host": place.super_host,
              "rating": place.rating,
              "property_type": place.property_type,
              "address": place.address,
          })

        if output:
          return output, 200



    @api.expect(place_model)
    @api.response(200, 'Place updated successfully')
    @api.response(400, 'Invalid input data')
    @api.response(400, 'Setter validation failure')
    @api.response(404, 'Place not found')
    def put(self, place_id):
        # curl -X PUT "http://127.0.0.1:5000/api/v1/places/<place_id>" -H "Content-Type: application/json" -H "Authorization: Bearer <token_goes_here>" -d '{"title": "Not So Cozy Apartment","description": "A terrible place to stay","price": 999.99}'

        """Update a place's information"""
        place_data = api.payload
        wanted_keys_list = ['title', 'description', 'price']

        if len(place_data) != len(wanted_keys_list) or not all(key in wanted_keys_list for key in place_data):
            return {'error': 'Invalid input data - required attributes missing'}, 400

        # Check that place exists first before updating them
        place = facade.get_place(place_id)
        if place:
            try:
                facade.update_place(place_id, place_data)
            except ValueError as error:
                return { 'error': "Setter validation failure: {}".format(error) }, 400

            return {'message': 'Place updated successfully'}, 200
        return {'error': 'Place not found'}, 404
    
    @api.response(200, 'Place deleted successfully')
    @api.response(404, 'Place not found')
    def delete(self, place_id):
        """Delete a specific place by ID."""
        place = facade.get_place(place_id)
        if not place:
            return {"message": "Place not found"}, 404
        
        facade.delete_place(place_id)
        return {"message": "Place deleted successfully"}, 200

        

@api.route('/<place_id>/amenities')
class PlaceAmenity(Resource):
    """
    Resource class for managing amenities linked to a place.
    """
    @api.response(200, 'List of amenities for the place retrieved successfully')
    @api.response(404, 'Place not found')
    def get(self, place_id):
        """Get all amenities related to a specific place."""
        place = facade.get_place(place_id)
        if not place:
            return {"message": "Place not found"}, 404
        return {
            'place_id': place_id,
            'amenities': [{'id': a.id, 'name': a.name} for a in place.amenities_r]
        }, 200

    @api.expect(place_model)
    @api.response(200, 'Amenity added to place successfully')
    @api.response(404, 'Place or amenity not found')
    def post(self, place_id):
        """Add an amenity to a specific place"""
        data = api.payload
        amenity_id = data.get('amenity_id')

        if not amenity_id:
            return {'message': "Amenit ID is required"}, 400

        try:
            facade.add_amenity_to_place(place_id, amenity_id)
            return {"message": "Amenity added to place successfully"}, 200
        except ValueError as e:
            return {"message": str(e)}, 404
        except AttributeError as e:
            return {"message": str(e)}, 500
