from flask_restx import Namespace, Resource, fields
from app.services import facade
from flask import Flask, render_template, make_response, redirect, request
from flask_jwt_extended import create_access_token
import jwt

api = Namespace('auth', description='User authentication')

# Model for input validation
login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})

jwt_model = api.model('JWTToken', {
    'token': fields.String(required=True, description='JWT access token')
})

# Define the user model for input validation and documentation
user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user')
})

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    @api.response(200, 'User successfully authenticated')
    @api.response(400, 'Email already registered')
    def post(self):
        """Authenticate user and return a JWT token"""
        credentials = api.payload
        
        user = facade.get_user_by_email(credentials['email'])
        
        if not user or not user.verify_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401
        
        access_token = create_access_token(identity=str(user.id), additional_claims={"is_admin": user.is_admin})

        return {'access_token': access_token}, 200



@api.route('/sign-up')
class UserList(Resource):
    @api.expect(user_model)
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    @api.response(400, 'Setter validation failure')
    def post(self):
        """Register a new user"""
        user_data = api.payload

        existing_user = facade.get_user_by_email(user_data['email'])
        if existing_user:
            return {'error': 'Email already registered'}, 400

        # Validate input data
        if not all([user_data.get('first_name'), user_data.get('last_name'), user_data.get('password'), user_data.get('email')]):
            return {'error': 'Invalid input data'}, 400

        try:
            new_user = facade.create_user(user_data)
            
            if(new_user):
              access_token = create_access_token(identity=str(new_user.id), additional_claims={"is_admin": new_user.is_admin})
              return {'access_token': access_token}, 200
        
        except ValueError as error:
            return { 'error': "Setter validation failure: {}".format(error) }, 400



@api.route('/callback')
class Callback(Resource):
    @api.expect(jwt_model)
    @api.response(200, 'User successfully authenticated')
    @api.response(400, 'Token missing or invalid')
    def post(self):
        """Retrieve jwt_token from request and set it in cookie"""
        data = request.get_json()
        # token = data.get("token") if data else None

        token = data.get("token") or data['token']

        print(f"data {data}")
        print(f"token: {token}")

        if not token:
            return {"error": "Missing token"}, 400

        resp = make_response({"message": "Token received", "redirect": "/listings"})
        resp.set_cookie(
            "access_token",
            token,
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=60 * 60 * 24
        )

        return resp
