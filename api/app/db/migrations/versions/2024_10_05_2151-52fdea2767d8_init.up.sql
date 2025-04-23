CREATE EXTENSION IF NOT EXISTS plpgsql;
CREATE EXTENSION postgis;

CREATE FUNCTION trigger_update_modified_column()
    RETURNS TRIGGER AS
$$
BEGIN
    IF ROW (NEW.*) IS DISTINCT FROM ROW (OLD.*) THEN
        NEW.modified = NOW();
        RETURN NEW;
    ELSE
        RETURN OLD;
    END IF;
END
$$ LANGUAGE plpgsql;

CREATE TABLE toilets (
    id                        VARCHAR(36)     NOT NULL DEFAULT gen_random_uuid(),
    created                   TIMESTAMP       NOT NULL DEFAULT NOW(),
    modified                  TIMESTAMP       NOT NULL DEFAULT NOW(),
    establishment_name        VARCHAR(255)    NOT NULL,
    geometry                  GEOMETRY(POINT) NOT NULL,
    location_information      TEXT            NOT NULL,
    avg_rating_water_pressure FLOAT           NOT NULL DEFAULT 0,
    avg_rating_cleanliness    FLOAT           NOT NULL DEFAULT 0,
    avg_rating_poopability    FLOAT           NOT NULL DEFAULT 0,
    total_reviews             INTEGER         NOT NULL DEFAULT 0,
    has_bidet                 BOOLEAN         NOT NULL DEFAULT FALSE,
    upvotes                   INTEGER         NOT NULL DEFAULT 0,
    downvotes                 INTEGER         NOT NULL DEFAULT 0,
    photos                    VARCHAR(255)[],

    CONSTRAINT bidets_pk PRIMARY KEY (id),
    CONSTRAINT valid_range_total_reviews CHECK (total_reviews >= 0),
    CONSTRAINT valid_range_upvotes CHECK (upvotes >= 0),
    CONSTRAINT valid_range_downvotes CHECK (downvotes >= 0)
);

CREATE TRIGGER update_toilets_modified
    BEFORE UPDATE
    ON toilets
    FOR EACH ROW
EXECUTE PROCEDURE trigger_update_modified_column();

CREATE TABLE reviews (
    id                    VARCHAR(36) NOT NULL DEFAULT gen_random_uuid(),
    created               TIMESTAMP   NOT NULL DEFAULT NOW(),
    modified              TIMESTAMP   NOT NULL DEFAULT NOW(),
    toilet_id             VARCHAR(36) NOT NULL,
    content               TEXT,
    rating_water_pressure INTEGER     NOT NULL DEFAULT 0,
    rating_cleanliness    INTEGER     NOT NULL DEFAULT 0,
    rating_poopability    INTEGER     NOT NULL DEFAULT 0,
    has_bidet             BOOLEAN     NOT NULL DEFAULT FALSE,
    is_approved           BOOLEAN     NOT NULL DEFAULT FALSE,
    upvotes               INTEGER     NOT NULL DEFAULT 0,
    downvotes             INTEGER     NOT NULL DEFAULT 0,
    photos                VARCHAR(255)[],

    CONSTRAINT reviews_pk PRIMARY KEY (id),
    CONSTRAINT toilets_fk FOREIGN KEY (toilet_id) REFERENCES toilets ON DELETE CASCADE,
    CONSTRAINT valid_range_rating_water_pressure CHECK (
        rating_water_pressure >= 0 AND rating_water_pressure <= 5
        ),
    CONSTRAINT valid_range_rating_cleanliness CHECK (
        rating_cleanliness >= 0 AND rating_cleanliness <= 5
        ),
    CONSTRAINT valid_range_rating_poopability CHECK (
        rating_poopability >= 0 AND rating_poopability <= 5
        ),
    CONSTRAINT valid_range_upvotes CHECK (upvotes >= 0),
    CONSTRAINT valid_range_downvotes CHECK (downvotes >= 0)
);

CREATE TRIGGER update_reviews_modified
    BEFORE UPDATE
    ON reviews
    FOR EACH ROW
EXECUTE PROCEDURE trigger_update_modified_column();
