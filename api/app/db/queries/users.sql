-- name: CreateUser :one
INSERT INTO users (
    id, first_name, last_name, avatar
)
VALUES (
           $1, $2, $3, $4
       )
RETURNING *;

-- name: ListUsers :many
SELECT *
FROM users;

-- name: GetUser :one
SELECT *
FROM users
WHERE id = $1;

-- name: UpdateUser :one
UPDATE users
SET first_name = COALESCE(sqlc.narg('first_name'), first_name),
    last_name  = COALESCE(sqlc.narg('last_name'), last_name),
    avatar     = COALESCE(sqlc.narg('avatar'), avatar)
WHERE id = @id
RETURNING *;

-- name: DeleteUser :one
DELETE
FROM users
WHERE id = $1
RETURNING id;
