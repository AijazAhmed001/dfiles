-- Oracle equivalent of 002_normalize_asset_codes.sql.
-- Review on a copy of production data before execution.
DECLARE
  l_tables NUMBER;
BEGIN
  SELECT COUNT(*) INTO l_tables
  FROM user_tables
  WHERE table_name IN ('Assets', 'AssetTypes');

  IF l_tables = 2 THEN
    UPDATE "Assets"
    SET "AssetCode" = 'MIG-' || RAWTOHEX("Id");

    MERGE INTO "Assets" asset
    USING (
      SELECT asset.ROWID AS rid,
             UPPER(REPLACE(REPLACE(REPLACE(TRIM(asset_type."Prefix"), 'EFU-', ''), ' ', ''), '-', '')) AS clean_prefix,
             ROW_NUMBER() OVER (PARTITION BY asset."AssetTypeId" ORDER BY asset."CreatedAt", asset."Id") AS sequence_number
      FROM "Assets" asset
      JOIN "AssetTypes" asset_type ON asset_type."Id" = asset."AssetTypeId"
    ) numbered ON (asset.ROWID = numbered.rid)
    WHEN MATCHED THEN UPDATE SET asset."AssetCode" =
      'EFU-' || numbered.clean_prefix || '-' ||
      CASE WHEN numbered.sequence_number < 10000 THEN LPAD(numbered.sequence_number, 4, '0')
           ELSE TO_CHAR(numbered.sequence_number) END;
  END IF;
END;
/
