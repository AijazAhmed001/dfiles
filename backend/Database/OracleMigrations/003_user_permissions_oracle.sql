-- Additive Oracle migration. Safe only after reviewing the existing schema.
DECLARE
  l_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO l_exists FROM user_tables WHERE table_name = 'UserPermissions';
  IF l_exists = 0 THEN
    EXECUTE IMMEDIATE q'~CREATE TABLE "UserPermissions" (
      "UserId" RAW(16) NOT NULL, "PermissionId" RAW(16) NOT NULL,
      "IsGranted" NUMBER(1) DEFAULT 1 NOT NULL, "GrantedByUserId" RAW(16) NOT NULL,
      "GrantedAt" TIMESTAMP(7) DEFAULT SYSTIMESTAMP NOT NULL, "RevokedByUserId" RAW(16) NULL,
      "RevokedAt" TIMESTAMP(7) NULL,
      CONSTRAINT "PK_UserPermissions" PRIMARY KEY ("UserId", "PermissionId"),
      CONSTRAINT "FK_UserPermissions_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE,
      CONSTRAINT "FK_UserPermissions_Permissions_PermissionId" FOREIGN KEY ("PermissionId") REFERENCES "Permissions" ("Id") ON DELETE CASCADE
    )~';
    EXECUTE IMMEDIATE 'CREATE INDEX "IX_UserPermissions_PermissionId" ON "UserPermissions" ("PermissionId")';
  END IF;
END;
/
