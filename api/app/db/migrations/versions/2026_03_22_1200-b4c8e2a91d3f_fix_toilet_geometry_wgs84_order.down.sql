-- Inverse of upgrade for rows that now have longitude as X (correct order).
UPDATE toilets
SET geometry = ST_SetSRID(ST_MakePoint(ST_Y(geometry), ST_X(geometry)), 4326)
WHERE ST_Y(geometry) < 55
  AND ABS(ST_X(geometry)) > 70
  AND ST_X(geometry) BETWEEN -180 AND 180
  AND ST_Y(geometry) BETWEEN -90 AND 90;
