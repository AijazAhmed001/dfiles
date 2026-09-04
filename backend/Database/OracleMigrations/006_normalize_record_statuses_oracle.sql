-- Oracle equivalent of 006_normalize_record_statuses.sql.
UPDATE "Employees"
SET "Status" = UPPER(TRIM("Status"))
WHERE "Status" <> UPPER(TRIM("Status")) OR "Status" <> TRIM("Status");

UPDATE "Locations"
SET "Status" = UPPER(TRIM("Status"))
WHERE "Status" <> UPPER(TRIM("Status")) OR "Status" <> TRIM("Status");
