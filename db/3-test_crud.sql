-- CRUD for User Table --
SELECT * FROM Users;

INSERT INTO Users (id, first_name, last_name, email, password, is_admin)
VALUES ('aaaa1111-2222-33aa-aaaa-aaaaaaaaaaaa', 'Meryl', 'Streep', 'godtieractress@example.com', '$2A4plGDBkpVNu', FALSE);

UPDATE Users
SET first_name = 'Dick', last_name = 'Jones'
WHERE id = 'aaaa1111-2222-33aa-aaaa-aaaaaaaaaaaa';

DELETE FROM Users
WHERE id = 'aaaa1111-2222-33aa-aaaa-aaaaaaaaaaaa';


-- CRUD for Place Table --

SELECT * FROM Places;

INSERT INTO Places (id, title, description, price, latitude, longitude, owner_id)
VALUES ('11111111-1111-1111-1111-111111111111', 'Nice House', 'Your one-stop-shop. No Rats!', 150.00, 58.019, -12.60, 'aaaa1111-2222-33aa-aaaa-aaaaaaaaaaaa');

UPDATE Places
SET price = 150.00
WHERE id = '11111111-1111-1111-1111-111111111111';

DELETE FROM Places
WHERE id = '11111111-1111-1111-1111-111111111111';


-- CRUD for Review Table --

SELECT * FROM Reviews;

INSERT INTO Reviews (id, text, rating, user_id, place_id)
VALUES ('22222222-2222-2222-2222-222222222222', 'Omg there were rats.', 5, 'aaaa1111-2222-33aa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111');

UPDATE Reviews
SET rating = 4, text = 'I saw a snake, but otherwise a very clean place'
WHERE id = '22222222-2222-2222-2222-222222222222';

DELETE FROM Reviews
WHERE id = '22222222-2222-2222-2222-222222222222';


-- CRUD for Amenity Table --

SELECT * FROM Amenities;

INSERT INTO Amenities (id, name)
VALUES ('33333333-3333-3333-3333-333333333333', 'WiFi');

UPDATE Amenities
SET name = 'Fast WiFi'
WHERE id = '33333333-3333-3333-3333-333333333333';

DELETE FROM Amenities
WHERE id = '33333333-3333-3333-3333-333333333333';


-- CRUD for Place_Amenity Table --

SELECT * FROM Place_Amenity;

INSERT INTO Place_Amenity (place_id, amenity_id)
VALUES ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333');

UPDATE Place_Amenity
SET amenity_id = '44444444-4444-4444-4444-444444444444'
WHERE place_id = '11111111-1111-1111-1111-111111111111' AND amenity_id = '33333333-3333-3333-3333-333333333333';

DELETE FROM Place_Amenity
WHERE place_id = '11111111-1111-1111-1111-111111111111' AND amenity_id = '33333333-3333-3333-3333-333333333333';

