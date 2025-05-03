import uuid
from datetime import datetime
from app.models.user import User
from app import db
from sqlalchemy.orm import validates
from app.models.associations import place_amenity

class Place(db.Model):
    __tablename__ = "places"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)

    url = db.Column(db.String(255))
    address = db.Column(db.String(255))
    city = db.Column(db.String(50))
    images = db.Column(db.JSON)
    bathrooms = db.Column(db.Float)
    bedrooms = db.Column(db.Integer)
    beds = db.Column(db.Integer)
    property_type = db.Column(db.String(100))
    host_thumbnail = db.Column(db.String(255))
    deeplink = db.Column(db.String(255))
    super_host = db.Column(db.Boolean)
    rating = db.Column(db.Float)

    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    owner_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now())
    owner_r = db.relationship("User", back_populates="properties_r")
    reviews_r = db.relationship("Review", back_populates="place_r", lazy=True, cascade="all, delete-orphan")
    amenities_r = db.relationship("Amenity", secondary=place_amenity, lazy='subquery', back_populates="place_r")

    def __init__(self, title, description, price, latitude, longitude, owner_id,
             url=None, address=None, city=None, images=None, bathrooms=None, bedrooms=None,
             beds=None, property_type=None, host_thumbnail=None, deeplink=None,
             super_host=None, rating=None):
    
        # Validate required fields
        if not all([title, description, price, latitude, longitude, owner_id]):
            raise ValueError("Missing one or more required attributes: title, description, price, latitude, longitude, owner_id")

        # Required fields
        self.title = title
        self.description = description
        self.price = price
        self.latitude = latitude
        self.longitude = longitude
        self.owner_id = owner_id

        # Optional fields
        self.url = url
        self.address = address
        self.city = city
        self.images = images
        self.bathrooms = bathrooms
        self.bedrooms = bedrooms
        self.beds = beds
        self.property_type = property_type
        self.host_thumbnail = host_thumbnail
        self.deeplink = deeplink
        self.super_host = super_host
        self.rating = rating

     # --- Validators ---
    @validates("title")
    def validate_title(self, key, value):
        value = value.strip()
        if not 1 <= len(value) <= 100:
            raise ValueError("Title must be a non-empty string with max length 100.")
        return value
    
    @validates("price")
    def validate_price(self, key, value):
        if not isinstance(value, (int, float)) or value <= 0:
            raise ValueError("Invalid value specified for price")
        return float(value)

    # @validates("latitude")
    # def validate_latitude(self, key, value):
    #     if not isinstance(value, (int, float)) or not -90 <= value <= 90:
    #         raise ValueError("Latitude must be between -90 and 90.")
    #     return float(value)
        
    # @validates("longitude")
    # def validate_longitude(self, key, value):
    #     if not isinstance (value, (int, float)) or not -180 <= value <= 180:
    #         raise ValueError("Longitude must be between -180 and 180.")
    #     return float(value)



    # --- Methods ---
    def save(self):
        """Update the updated_at timestamp whenever the object is modified"""
        self.updated_at = datetime.now()

    # def add_review(self, review):
    #     """Add a review to the place."""
    #     self.reviews.append(review)

    def add_amenity(self, amenity):
        """Add an amenity to the place."""
        if amenity not in self.amenities_r:
            self.amenities_r.append(amenity)
            db.session.commit()

    @staticmethod
    def place_exists(place_id):
        """ Search through all Places to ensure the specified place_id exists """
        # Unused - the facade get_place method will handle this
