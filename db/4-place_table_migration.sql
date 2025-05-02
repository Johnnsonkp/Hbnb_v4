ALTER TABLE places
    ADD COLUMN url TEXT,
    ADD COLUMN address VARCHAR(255),
    ADD COLUMN city VARCHAR(255),
    ADD COLUMN images JSON,
    ADD COLUMN bathrooms FLOAT,
    ADD COLUMN bedrooms INT,
    ADD COLUMN beds INT,
    ADD COLUMN property_type VARCHAR(255),
    ADD COLUMN host_thumbnail TEXT,
    ADD COLUMN deeplink TEXT,
    ADD COLUMN super_host BOOLEAN,
    ADD COLUMN rating FLOAT;