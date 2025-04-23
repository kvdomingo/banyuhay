CREATE INDEX toilets_id_ix ON toilets (id);
CREATE INDEX toilets_establishment_name_ix ON toilets (establishment_name);
CREATE INDEX toilets_geometry_ix ON toilets USING gist (geometry);
CREATE INDEX toilets_has_bidet_ix ON toilets (has_bidet);

CREATE INDEX reviews_id_ix ON reviews (id);
CREATE INDEX reviews_toilet_id_ix ON reviews (toilet_id);

CREATE TABLE users (
    id         TEXT      NOT NULL,
    created    TIMESTAMP NOT NULL DEFAULT NOW(),
    modified   TIMESTAMP NOT NULL DEFAULT NOW(),
    first_name TEXT,
    last_name  TEXT,
    full_name  TEXT GENERATED ALWAYS AS (
        CASE
            WHEN first_name IS NOT NULL AND last_name IS NOT NULL
                THEN first_name || ' ' || last_name
            WHEN first_name IS NOT NULL
                THEN first_name
            WHEN last_name IS NOT NULL
                THEN last_name
        END
        ) STORED,
    avatar     TEXT,

    CONSTRAINT users_pk PRIMARY KEY (id),
    CONSTRAINT nonempty_first_name CHECK (
        CASE
            WHEN first_name IS NOT NULL
                THEN LENGTH(first_name) > 1
            ELSE TRUE
        END
        ),
    CONSTRAINT nonempty_last_name CHECK (
        CASE
            WHEN last_name IS NOT NULL
                THEN LENGTH(last_name) > 1
            ELSE TRUE
        END
        ),
    CONSTRAINT nonempty_avatar CHECK (
        CASE
            WHEN avatar IS NOT NULL
                THEN LENGTH(avatar) > 1
            ELSE TRUE
        END
        )
);
CREATE INDEX users_id_ix ON users (id);
CREATE TRIGGER update_users_modified
    BEFORE UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE trigger_update_modified_column();
