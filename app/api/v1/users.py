from flask_restx import Namespace, Resource, fields
# from app.services.facade import HBnBFacade
from app.services import facade
from flask import Flask, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import get_jwt
from flask_jwt_extended import create_access_token

api = Namespace('users', description='User operations')

# Define the user model for input validation and documentation
user_model = api.model('User', {
    'first_name': fields.String(required=True, description='First name of the user'),
    'last_name': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user')
})


@api.route('/')
class UserList(Resource):
    @api.expect(user_model)
    @api.response(201, 'User successfully created')
    @api.response(400, 'Email already registered')
    @api.response(400, 'Invalid input data')
    @api.response(400, 'Setter validation failure')
    def post(self):
        """Register a new user"""
        user_data = api.payload

        # Simulate email uniqueness check (to be replaced by real validation with persistence)
        existing_user = facade.get_user_by_email(user_data['email'])
        if existing_user:
            return {'error': 'Email already registered'}, 400

        print(f"{user_data}")

        # Validate input data
        if not all([user_data.get('first_name'), user_data.get('last_name'), user_data.get('password'), user_data.get('email')]):
            return {'error': 'Invalid input data'}, 400

        try:
            new_user = facade.create_user(user_data)

            # Step 3: Create a JWT token with the user's id and is_admin flag
            access_token = create_access_token(identity=str(new_user.id), additional_claims={"is_admin": new_user.is_admin})

            # Step 4: Return the JWT token to the client
            return {'access_token': access_token}, 200
        
        except ValueError as error:
            return { 'error': "Setter validation failure: {}".format(error) }, 400

        # return {'id': str(new_user.id), 'message': 'User created successfully'}, 201

    @api.response(200, 'Users list successfully retrieved')
    def get(self):
        """ Get list of all users """
        all_users = facade.get_all_users()
        output = []
        for user in all_users:
            # print(user)
            output.append({
                'id': str(user.id),
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            })

        return output, 200
        # user_data = {'name': 'John Doe', 'email': 'john.doe@example.com', 'role': 'Admin'}

# @api.route('/sign-in')
# class UserList(Resource):
#     @api.expect(user_model)
#     @api.response(200, 'User details retrieved successfully')
#     @api.response(400, 'Email already registered')
#     def post(self):
#         """Get user by email"""
#         user_data = api.payload
#         existing_user = facade.get_user_by_email(user_data['email'])

#         if not existing_user:
#           return {'error': 'User not found'}, 404

#         return {'id': str(existing_user.id), 'first_name': existing_user.first_name, 'last_name': existing_user.last_name, 'email': existing_user.email}, 200

@api.route('/current_user')
class UserResource(Resource):
    @api.response(200, 'User details retrieved successfully')
    @api.response(404, 'User not found')
    @jwt_required(locations=["cookies"])
    def get(self):
        user_id = get_jwt_identity()
        claims = get_jwt()
        is_admin = claims.get("is_admin")

        user = facade.get_user(user_id)

        return {
            "id": str(user.id),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
                

@api.route('/<user_id>')
class UserResource(Resource):
    @api.response(200, 'User details retrieved successfully')
    @api.response(404, 'User not found')
    @jwt_required(locations=["cookies"])
    def get(self, user_id):
        """A protected endpoint that requires a valid JWT token"""
        current_user = get_jwt_identity()  # Retrieve the user's identity from the token
        # return {'message': f'Hello, user {current_user["id"]}'}, 200
    
        # """Get user details by ID"""
        # user = facade.get_user(user_id)
        if not current_user:
            return {'error': 'User not found'}, 404

        # return {'id': str(user.id), 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email}, 200
    
        return {'message': f'Hello, user {current_user["id"]}'}, 200

    @api.expect(user_model)
    @api.response(200, 'User details updated successfully')
    @api.response(400, 'Invalid input data')
    @api.response(400, 'Setter validation failure')
    @api.response(404, 'User not found')
    def put(self, user_id):
        """ Update user specified by id """
        user_data = api.payload
        wanted_keys_list = ['first_name', 'last_name', 'email']

        if len(user_data) != len(wanted_keys_list) or not all(key in wanted_keys_list for key in user_data):
            return {'error': 'Invalid input data - required attributes missing'}, 400

        # Check that user exists first before updating them
        user = facade.get_user(user_id)
        if user:
            try:
                facade.update_user(user_id, user_data)
            except ValueError as error:
                return { 'error': "Setter validation failure: {}".format(error) }, 400

            return {'message': 'User updated successfully'}, 200

        return {'error': 'User not found'}, 404

    @api.response(200, 'User deleted successfully')
    @api.response(404, 'User not found')
    def delete(self, user_id):
        """Delete user by ID (and related reviews)"""
        user = facade.get_user(user_id)
        if not user:
            return {'error': 'User not found'}, 404

        facade.delete_user(user_id)
        return {'message': 'User deleted successfully'}, 200