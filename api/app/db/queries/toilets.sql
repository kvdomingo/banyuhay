-- name: CreateToilet :one
INSERT INTO toilets (
    establishment_name, geometry, location_information, avg_rating_water_pressure, avg_rating_cleanliness,
    avg_rating_poopability, total_reviews, has_bidet, upvotes, downvotes, photos
)
VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
       )
RETURNING *;

-- name: ListToilets :many
SELECT
    id,
    created,
    modified,
    establishment_name,
    location_information,
    JSONB_BUILD_OBJECT(
            'lat', ST_X(geometry),
            'lng', ST_Y(geometry)
    ) AS geometry,
    avg_rating_cleanliness,
    avg_rating_poopability,
    avg_rating_water_pressure,
    total_reviews,
    has_bidet,
    upvotes,
    downvotes,
    photos
FROM toilets;

-- name: GetToilet :one
SELECT
    id,
    created,
    modified,
    establishment_name,
    location_information,
    JSONB_BUILD_OBJECT(
            'lat', ST_X(geometry),
            'lng', ST_Y(geometry)
    ) AS geometry,
    avg_rating_cleanliness,
    avg_rating_poopability,
    avg_rating_water_pressure,
    total_reviews,
    has_bidet,
    upvotes,
    downvotes,
    photos
FROM toilets
WHERE id = $1;

-- name: UpdateToilet :one
UPDATE toilets
SET establishment_name        = COALESCE(sqlc.narg('establishment_name'), establishment_name),
    geometry                  = COALESCE(sqlc.narg('geometry'), geometry),
    location_information      = COALESCE(sqlc.narg('location_information'), location_information),
    avg_rating_water_pressure = COALESCE(sqlc.narg('avg_rating_water_pressure'), avg_rating_water_pressure),
    avg_rating_cleanliness    = COALESCE(sqlc.narg('avg_rating_cleanliness'), avg_rating_cleanliness),
    avg_rating_poopability    = COALESCE(sqlc.narg('avg_rating_poopability'), avg_rating_poopability),
    total_reviews             = COALESCE(sqlc.narg('total_reviews'), total_reviews),
    has_bidet                 = COALESCE(sqlc.narg('has_bidet'), has_bidet),
    upvotes                   = COALESCE(sqlc.narg('upvotes'), upvotes),
    downvotes                 = COALESCE(sqlc.narg('downvotes'), downvotes),
    photos                    = COALESCE(sqlc.narg('photos'), photos)
WHERE id = @id
RETURNING *;

-- name: DeleteToilet :one
DELETE
FROM toilets
WHERE id = $1
RETURNING id;
