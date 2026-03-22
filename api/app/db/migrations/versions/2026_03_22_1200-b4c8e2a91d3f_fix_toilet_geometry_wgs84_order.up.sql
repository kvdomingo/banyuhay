-- Legacy rows stored latitude as X and longitude as Y (WKT POINT(lat lng)). EPSG:4326
-- expects X = longitude, Y = latitude, so bbox queries returned no rows.
-- Only swap rows that still look like that pattern (idempotent if already corrected).
UPDATE toilets
SET geometry = ST_SetSRID(ST_MakePoint(ST_Y(geometry), ST_X(geometry)), 4326)
WHERE ST_X(geometry) < 50
  AND ABS(ST_Y(geometry)) > 70
  AND ST_X(geometry) BETWEEN -90 AND 90
  AND ST_Y(geometry) BETWEEN -180 AND 180;
