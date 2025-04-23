-- name: CreateReview :one
INSERT INTO reviews (
    toilet_id, content, rating_water_pressure, rating_cleanliness,
    rating_poopability, has_bidet, is_approved, upvotes, downvotes, photos
)
VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
       )
RETURNING *;

-- name: ListReviews :many
SELECT *
FROM reviews;

-- name: ListToiletReviews :many
SELECT *
FROM reviews
WHERE toilet_id = $1;

-- name: GetReview :one
SELECT *
FROM reviews
WHERE id = $1;

-- name: UpdateReview :one
UPDATE reviews
SET toilet_id             = COALESCE(sqlc.narg('toilet_id'), toilet_id),
    content               = COALESCE(sqlc.narg('content'), content),
    rating_water_pressure = COALESCE(sqlc.narg('rating_water_pressure'), rating_water_pressure),
    rating_cleanliness    = COALESCE(sqlc.narg('rating_cleanliness'), rating_cleanliness),
    rating_poopability    = COALESCE(sqlc.narg('rating_poopability'), rating_poopability),
    has_bidet             = COALESCE(sqlc.narg('has_bidet'), has_bidet),
    is_approved           = COALESCE(sqlc.narg('is_approved'), is_approved),
    upvotes               = COALESCE(sqlc.narg('upvotes'), upvotes),
    downvotes             = COALESCE(sqlc.narg('downvotes'), downvotes),
    photos                = COALESCE(sqlc.narg('photos'), photos)
WHERE id = @id
RETURNING *;

-- name: DeleteReview :one
DELETE
FROM reviews
WHERE id = $1
RETURNING id;
