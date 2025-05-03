from flask import Flask, render_template, send_from_directory
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask import Flask
from flask_cors import CORS
import cloudinary

jwt = JWTManager()
db = SQLAlchemy()

def create_app(config_class="config.DevelopmentConfig"):
    """ method used to create an app instance """

    app = Flask(__name__, static_folder='base_files/static')
    # app = Flask(__name__, static_folder='static/react', static_url_path='/static')

    # CORS(app)
    # CORS(app, origins='http://localhost:5173/', supports_credentials=True)
    # CORS(app, supports_credentials=True)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Load configuration from the specified config class
    app.config.from_object(config_class)

    cloudinary.config(
      cloud_name=app.config['CLOUD_NAME'],
      api_key=app.config['CLOUD_API_KEY'],
      api_secret=app.config['CLOUD_API_SECRET']
    )

    # jwt token session based cookies config
    # app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    # app.config['JWT_COOKIE_SECURE'] = False
    # app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
    # app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
    # app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
    # app.config['JWT_COOKIE_CSRF_PROTECT'] = False 
    # app.config['JWT_SECRET_KEY'] = 'your-very-secret-jwt-key'

    api = Api(app, version='1.0', title='HBnB API', description='HBnB Application API')
    
    # Initialize the database with the app
    db.init_app(app)
    jwt.init_app(app)

    # Initialize Flask-Migrate for handling database migrations
    migrate = Migrate(app, db)

    from app.api.v1.users import api as users_ns
    from app.api.v1.amenities import api as amenities_ns
    from app.api.v1.places import api as places_ns
    from app.api.v1.reviews import api as reviews_ns
    from app.api.v1.auth import api as auth_ns

    # Register the namespaces
    api.add_namespace(users_ns, path='/api/v1/users')
    api.add_namespace(amenities_ns, path='/api/v1/amenities')
    api.add_namespace(places_ns, path='/api/v1/places')
    api.add_namespace(reviews_ns, path='/api/v1/reviews')
    api.add_namespace(auth_ns, path='/api/v1/auth')

    # Ensure database tables are created before the first request
    with app.app_context():
        db.create_all()


    # routes
    @app.route('/home')
    def home():
        # return render_template('/base_files/landing.html')
        return send_from_directory('base_files', 'landing.html')
        # return send_from_directory('base_files', 'login.html')
    
    @app.route('/auth/login')
    def login():
        # return render_template('login.html')
        return send_from_directory('base_files', 'login.html')
    
    @app.route('/auth/sign-up')
    def sign_up():
        # return render_template('signup.html')
        return send_from_directory('base_files', 'signup.html')
    
    @app.route('/auth/callback')
    def callback():
        return send_from_directory('base_files', 'login.html')
        # return render_template('login.html')
    
    # @app.route('/auth/login')
    # def sign_up():
    #     return render_template('signup.html')
    
    @app.route("/listings", defaults={"path": ""})
    @app.route("/listings/<path:path>")
    def react_app(path):
        # return send_from_directory('static/react', 'index.html')
        return send_from_directory('base_files/static/react', 'index.html')

    @app.route("/place", defaults={"path": "/place"})
    @app.route("/place/<path:path>")
    def react_app_place(path):
        # return send_from_directory('static/react', 'index.html')
        return send_from_directory('base_files/static/react', 'index.html')
    
    @app.route("/dashboard", defaults={"path": ""})
    @app.route("/dashboard/<path:path>")
    def react_app_dashboard(path):
        # return send_from_directory('static/react', 'index.html')
        return send_from_directory('base_files/static/react', 'index.html')
    

    @app.route("/hosting", defaults={"path": ""})
    @app.route("/hosting/<path:path>")
    def react_app_hosting(path):
        # return send_from_directory('static/react', 'index.html')
        return send_from_directory('base_files/static/react', 'index.html')
    
    @app.route("/trips", defaults={"path": ""})
    @app.route("/trips/<path:path>")
    def react_app_trips(path):
        # return send_from_directory('static/react', 'index.html')
        return send_from_directory('base_files/static/react', 'index.html')
        
    return app
