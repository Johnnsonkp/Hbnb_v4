import os
from flask import Flask

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    DEBUG = False

     # Cloudinary-specific variables
    CLOUDINARY_URL = os.getenv('CLOUDINARY_URL')
    CLOUD_NAME = os.getenv('CLOUD_NAME')
    CLOUD_API_KEY = os.getenv('CLOUD_API_KEY')
    CLOUD_API_SECRET = os.getenv('CLOUD_API_SECRET')
    RAPID_API_KEY = os.getenv('RAPID_API_KEY')

class DevelopmentConfig(Config):
    DEBUG = True
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://hbnb:hbnb_password@localhost/hbnb_db'
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = False
    JWT_ACCESS_COOKIE_NAME = 'access_token'
    JWT_COOKIE_CSRF_PROTECT = False 

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}