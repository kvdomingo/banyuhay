CREATE EXTENSION pg_idkit;
CREATE EXTENSION postgis;

CREATE USER dagster WITH PASSWORD 'dagster';
CREATE DATABASE dagster OWNER dagster;

\connect dagster;
CREATE EXTENSION pg_idkit;
CREATE EXTENSION postgis;
