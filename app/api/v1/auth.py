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

@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    @api.response(200, 'User successfully authenticated')
    @api.response(400, 'Email already registered')
    def post(self):
        """Authenticate user and return a JWT token"""
        credentials = api.payload
        
        # Step 1: Retrieve the user based on the provided email
        user = facade.get_user_by_email(credentials['email'])

        # if not existing_user:
        #   return {'error': 'User not found'}, 404
        
        # Step 2: Check if the user exists and the password is correct
        if not user or not user.verify_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401
        
        # Step 3: Create a JWT token with the user's id and is_admin flag
        # access_token = create_access_token(identity={'id': str(user.id), 'is_admin': user.is_admin})

        access_token = create_access_token(identity=str(user.id), additional_claims={"is_admin": user.is_admin})

        # Step 4: Return the JWT token to the client
        return {'access_token': access_token}, 200
    
        # return {'id': str(existing_user.id), 'first_name': existing_user.first_name, 'last_name': existing_user.last_name, 'email': existing_user.email}, 200

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
