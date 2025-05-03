from app.persistence.repository import SQLAlchemyRepository
from app.models.user import User
from app.models.amenity import Amenity
from app.models.place import Place
from app.models.review import Review
from app.persistence.user_repository import UserRepository
from app.persistence.amenity_repository import AmenityRepository
from app.persistence.place_repository import PlaceRepository
import http.client
import json
import random
import requests
import re
import os
from dotenv import load_dotenv
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api


load_dotenv()

class HBnBFacade:
    def __init__(self):
        self.user_repo = UserRepository()
        self.place_repo = PlaceRepository()
        self.review_repository = SQLAlchemyRepository(Review)
        self.amenity_repository = AmenityRepository()


    # --- Users ---
    def create_user(self, user_data):
        if self.user_repo.email_exists(user_data['email']):
            raise ValueError("Email already exists")

        user = User(**user_data)
        self.user_repo.add(user)
        return user

    def get_user(self, user_id):
        return self.user_repo.get(user_id)

    def get_user_by_email(self, email):
        return self.user_repo.get_by_attribute('email', email)

    def get_all_users(self):
        return self.user_repo.get_all()

    def update_user(self, user_id, user_data):
        self.user_repo.update(user_id, user_data)

    def delete_user(self, user_id):
        user = self.user_repo.get(user_id)
        if not user:
            raise ValueError("User not found")
        self.user_repo.delete(user_id)

    # --- Amenities ---
    # Used during record insertion to prevent duplicate amenities
    def get_amenity_by_name(self, name):
        return self.amenity_repository.get_by_attribute('name', name)

    def create_amenity(self, amenity_data):
        amenity = Amenity(**amenity_data)
        self.amenity_repository.add(amenity)
        return amenity

    def get_amenity(self, amenity_id):
        return self.amenity_repository.get(amenity_id)

    def get_all_amenities(self):
        return self.amenity_repository.get_all()

    def update_amenity(self, amenity_id, amenity_data):
        self.amenity_repository.update(amenity_id, amenity_data)


    # --- Places ---
    def create_place(self, place_data):
        place = Place(**place_data)
        self.place_repo.add(place)
        return place

    def get_place(self, place_id):
        return self.place_repo.get(place_id)

    def get_all_places(self):
        return self.place_repo.get_all()

    def update_place(self, place_id, place_data):
        place = self.get_place(place_id)
        if not place:
            raise ValueError("Place not found")
        self.place_repo.update(place_id, place_data)

    def delete_place(self, place_id):
        return self.place_repo.delete(place_id)
    
    def get_address_from_lat_long(self, place_latitude, place_longitude):
        conn = http.client.HTTPSConnection("address-from-to-latitude-longitude.p.rapidapi.com")

        headers = {
            'x-rapidapi-key': os.getenv('RAPID_API_KEY'),
            'x-rapidapi-host': os.getenv('RAPID_API_HOST')
        }
        
        conn.request("GET", f"/geolocationapi?lat={place_latitude}&lng={place_longitude}", headers=headers)
        res = conn.getresponse()
        data = res.read()

        return data.decode("utf-8")


    def parse_listings(self, path, length=None):
        with open(path, 'r') as file:
            raw_data = json.load(file)

        listings = []
        for i, block in enumerate(raw_data):
            if length is not None and i >= length:
                break

            try:
                result = block['results']
                if not result:
                    continue

                listing = result[0]
                extracted = {
                    "id": str(listing.get("airbnb_id")),
                    "title": listing.get("listingTitle"),
                    "description": listing.get("propertyType"),
                    "price": listing.get("cleaning_fee_native") or int(random.uniform(200, 1000)),
                    "latitude": listing.get("listingLat"),
                    "longitude": listing.get("listingLng"),
                    "city": listing.get("city"),
                    "propertyType": listing.get("propertyType"),
                    "reviewCount": listing.get("reviewCount"),
                    "starRating": listing.get("starRating"),
                    "roomType": listing.get("roomType"),
                    "amenities": listing.get("amenities"),
                    "market": listing.get("market"),
                    "image": listing.get("image") or "",
                    "isSuperhost": listing.get("isSuperhost"),
                    "instant_bookable": listing.get("instant_bookable"),
                    "min_nights": listing.get("min_nights"),
                    "max_nights": listing.get("max_nights")
                }
                listings.append(extracted)

            except json.JSONDecodeError as e:
                print(f"Skipping block due to JSON error: {e}")

        return listings

    def update_listing_file(self, file_path, fetch_image_url):
        print(f"Updating listing file: {file_path}")

        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File {file_path} does not exist.")
            return

        # Read the file
        try:
            with open(file_path, 'r') as file:
                try:
                    data = json.load(file)
                    # print(f"Loaded data with requestId: {data('requestId')}")
                except json.JSONDecodeError as e:
                    print(f"Error loading JSON data from {file_path}: {e}")
                    return
        except Exception as e:
            print(f"Error opening file {file_path}: {e}")
            return
        
        images_added = 0
        # Iterate over each listing in "results"
        for listing in data:
            item = listing['results']

            if "image" in item[0] and item[0]["image"] != "":
                print("abort: listing has an image")
                continue

            city = item[0]['city'] or item[0]['market'] or ""
            propertyType = item[0]['propertyType'] or item[0]['roomType'] or ""
            listing_title = item[0]['listingTitle'] + city + propertyType
            airbnb_id = item[0]["airbnb_id"]

            if listing_title:
                print(f"fetching unsplash image for {listing_title}")

                if "image" not in listing['results'] or listing['results']["image"] == "":
                    image_url = fetch_image_url(listing_title)

                    if image_url:
                      listing['results'][0]["image"] = image_url
                      images_added += 1
                      print(f"Added image URL: {image_url}")
                    else:
                      print("No image URL found.")    
                else:
                  print("Image already exists, skipping.")
                    
            else:
                print("No listing title found.")

        # Write back to the file
        try:
            with open(file_path, 'w') as file:
                json.dump(data, file, indent=2)
                print(f"Finished updating {images_added} image URLs.")
        except Exception as e:
            print(f"Error writing to file {file_path}: {e}")



    # --- Reviews ---
    def create_review(self, review_data):
        review = Review(**review_data)
        self.review_repository.add(review)
        return review

    def get_review(self, review_id):
        return self.review_repository.get(review_id)

    def get_all_reviews(self):
        return self.review_repository.get_all()

    def get_reviews_by_place(self, place_id):
        return self.review_repository.get_by_attribute('place_id', place_id)

    def get_reviews_by_rating(self, rating):
        return self.review_repository.get_reviews_by_rating(rating)

    def update_review(self, review_id, review_data):
        self.review_repository.update(review_id, review_data)

    def delete_review(self, review_id):
        self.review_repository.delete(review_id)

    # --- Place and Amenity ---
    def add_amenity_to_place(self, place_id, amenity_id):
        place = self.get_place(place_id)
        amenity = self.amenity_repository.get(amenity_id)
        if not place:
            raise ValueError("Place not found")
        if not amenity:
            raise ValueError("Amenity not found")
        
        place.add_amenity(amenity)


    # # --- Place and Review ---
    # def get_review_by_place(self, place_id):
    #     place = self.get_place(place_id)
    #     if not place:
    #         raise ValueError("Place not found")
    #     return place.reviews_r



    # Airbnb api requests

    def get_airbnb_api_data(self, location='australia', checkin='2025-09-12', checkout='2025-10-13', adults=1, children=0, infants=0):
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
    

    def extract_property_data_from_file(self, input_file, length=10):
        try:
            with open(input_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Check if 'results' key exists and is a list
            if 'results' in data and isinstance(data['results'], list):
                properties = data['results']
                print(f"Found {len(properties)} property items.")
                return properties
            else:
                print("No property items found in 'results' key.")
                return []

        except Exception as e:
            print(f"Error reading or parsing the file: {e}")
            return []
        

    def get_property_data_by_id_from_file(self, input_file, id):
        try:
            with open(input_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Check if 'results' key exists and is a list
            if 'results' in data and isinstance(data['results'], list):
                properties = data['results']
                print(f"Found {len(properties)} property items.")

                return [place for place in properties if place['id'] == id]
            else:
                print("No property items found in 'results' key.")
                return []

        except Exception as e:
            print(f"Error reading or parsing the file: {e}")
            return []
        

    def uploadImage(self, file, public_id):
        # Upload the image and get its URL
        # ==============================
        # Upload the image.
        # Set the asset's public ID and allow overwriting the asset with new versions
        cloudinary.uploader.upload(file, public_id=f"{public_id}", unique_filename = False, overwrite=True)

        # Build the URL for the image and save it in the variable 'srcURL'
        srcURL = CloudinaryImage(f"{public_id}").build_url()

        # Log the image URL to the console. 
        # Copy this URL in a browser tab to generate the image on the fly.
        print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")

        return srcURL
