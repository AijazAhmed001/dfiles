-- Oracle 19c+ baseline schema generated from ../Migrations/001_initial_schema.sql.
-- FOR A NEW, EMPTY ORACLE SCHEMA ONLY. Do not run against the existing EFU schema.
-- Existing data must be mapped and migrated through separately reviewed, additive scripts.
-- GUIDs are stored as RAW(16); EF Core Oracle maps Guid values to RAW(16).
CREATE TABLE "AssetMakes" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_AssetMakes" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "AssetTypes" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Prefix" NVARCHAR2(100) NOT NULL,
    "Description" NVARCHAR2(2000) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_AssetTypes" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Departments" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Departments" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Memories" (
    "Id" RAW(16) NOT NULL,
    "Size" NVARCHAR2(200) NOT NULL,
    "Type" NVARCHAR2(200) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Memories" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Motherboards" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Generation" NVARCHAR2(200) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Motherboards" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "OperatingSystems" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Version" NVARCHAR2(200) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_OperatingSystems" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Permissions" (
    "Id" RAW(16) NOT NULL,
    "Code" NVARCHAR2(200) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Description" NVARCHAR2(2000) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Permissions" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Provinces" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Provinces" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Roles" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Description" NVARCHAR2(2000) NULL,
    "IsSystemRole" NUMBER(1) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Roles" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "Storages" (
    "Id" RAW(16) NOT NULL,
    "Type" NVARCHAR2(200) NOT NULL,
    "Capacity" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Storages" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "SystemSettings" (
    "Key" NVARCHAR2(200) NOT NULL,
    "Value" NVARCHAR2(4000) NOT NULL,
    "Category" NVARCHAR2(200) NOT NULL,
    "IsSensitive" NUMBER(1) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedByUserId" RAW(16) NULL,
    CONSTRAINT "PK_SystemSettings" PRIMARY KEY ("Key")
);
GO


CREATE TABLE "Vendors" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Contact" NVARCHAR2(200) NULL,
    "Phone" NVARCHAR2(30) NULL,
    "Email" NVARCHAR2(254) NULL,
    "Address" NVARCHAR2(2000) NULL,
    "Ntn" NVARCHAR2(100) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Vendors" PRIMARY KEY ("Id")
);
GO


CREATE TABLE "LifecyclePolicies" (
    "Id" RAW(16) NOT NULL,
    "AssetTypeId" RAW(16) NOT NULL,
    "ExpectedLifespanYears" NUMBER(10) NOT NULL,
    "WarrantyPeriodYears" NUMBER(10) NOT NULL,
    "DepreciationMethod" NVARCHAR2(200) NOT NULL,
    "SalvageValuePercent" decimal(5,2) NOT NULL,
    "EndOfLifeAction" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_LifecyclePolicies" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_LifecyclePolicies_AssetTypes_AssetTypeId" FOREIGN KEY ("AssetTypeId") REFERENCES "AssetTypes" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "Cities" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "ProvinceId" RAW(16) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Cities" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Cities_Provinces_ProvinceId" FOREIGN KEY ("ProvinceId") REFERENCES "Provinces" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "RolePermissions" (
    "RoleId" RAW(16) NOT NULL,
    "PermissionId" RAW(16) NOT NULL,
    "GrantedAt" TIMESTAMP(7) NOT NULL,
    CONSTRAINT "PK_RolePermissions" PRIMARY KEY ("RoleId", "PermissionId"),
    CONSTRAINT "FK_RolePermissions_Permissions_PermissionId" FOREIGN KEY ("PermissionId") REFERENCES "Permissions" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_RolePermissions_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Roles" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "Locations" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "ProvinceId" RAW(16) NULL,
    "CityId" RAW(16) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Locations" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Locations_Cities_CityId" FOREIGN KEY ("CityId") REFERENCES "Cities" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Locations_Provinces_ProvinceId" FOREIGN KEY ("ProvinceId") REFERENCES "Provinces" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "Assets" (
    "Id" RAW(16) NOT NULL,
    "AssetCode" NVARCHAR2(100) NOT NULL,
    "SerialNumber" NVARCHAR2(100) NOT NULL,
    "Model" NVARCHAR2(200) NOT NULL,
    "AssetTag" NVARCHAR2(100) NULL,
    "Condition" NVARCHAR2(200) NULL,
    "Accessories" NVARCHAR2(2000) NULL,
    "AdditionalNotes" NVARCHAR2(2000) NULL,
    "PurchaseOrderNumber" NVARCHAR2(100) NULL,
    "InvoiceNumber" NVARCHAR2(100) NULL,
    "MacAddress" NVARCHAR2(100) NULL,
    "IpAddress" NVARCHAR2(100) NULL,
    "Hostname" NVARCHAR2(100) NULL,
    "Domain" NVARCHAR2(200) NULL,
    "BiosVersion" NVARCHAR2(100) NULL,
    "GpuModel" NVARCHAR2(200) NULL,
    "PurchaseDate" TIMESTAMP(7) NOT NULL,
    "PurchaseCost" decimal(18,2) NOT NULL,
    "AddingDate" TIMESTAMP(7) NOT NULL,
    "WarrantyExpiryDate" TIMESTAMP(7) NULL,
    "ExpectedExpiryDate" TIMESTAMP(7) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "AssetTypeId" RAW(16) NOT NULL,
    "AssetMakeId" RAW(16) NULL,
    "MotherboardId" RAW(16) NULL,
    "MemoryId" RAW(16) NULL,
    "StorageId" RAW(16) NULL,
    "OperatingSystemId" RAW(16) NULL,
    "VendorId" RAW(16) NULL,
    "LocationId" RAW(16) NULL,
    "PurchaseOrderId" RAW(16) NULL,
    "PurchaseOrderItemId" RAW(16) NULL,
    "GoodsReceiptId" RAW(16) NULL,
    "GoodsReceiptItemId" RAW(16) NULL,
    "GoodsReceiptUnitId" RAW(16) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Assets" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Assets_AssetMakes_AssetMakeId" FOREIGN KEY ("AssetMakeId") REFERENCES "AssetMakes" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_AssetTypes_AssetTypeId" FOREIGN KEY ("AssetTypeId") REFERENCES "AssetTypes" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Assets_Locations_LocationId" FOREIGN KEY ("LocationId") REFERENCES "Locations" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_Memories_MemoryId" FOREIGN KEY ("MemoryId") REFERENCES "Memories" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_Motherboards_MotherboardId" FOREIGN KEY ("MotherboardId") REFERENCES "Motherboards" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_OperatingSystems_OperatingSystemId" FOREIGN KEY ("OperatingSystemId") REFERENCES "OperatingSystems" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_Storages_StorageId" FOREIGN KEY ("StorageId") REFERENCES "Storages" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Assets_Vendors_VendorId" FOREIGN KEY ("VendorId") REFERENCES "Vendors" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Offices" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "LocationId" RAW(16) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Offices" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Offices_Locations_LocationId" FOREIGN KEY ("LocationId") REFERENCES "Locations" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Users" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "Email" NVARCHAR2(254) NOT NULL,
    "PasswordHash" NVARCHAR2(500) NOT NULL,
    "EmployeeCode" NVARCHAR2(100) NULL,
    "Phone" NVARCHAR2(30) NULL,
    "Role" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "DepartmentId" RAW(16) NULL,
    "LocationId" RAW(16) NULL,
    "AvatarPath" NVARCHAR2(200) NULL,
    "LastLoginAt" TIMESTAMP(7) NULL,
    "PasswordChangedAt" TIMESTAMP(7) NULL,
    "EmailVerified" NUMBER(1) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Users_Departments_DepartmentId" FOREIGN KEY ("DepartmentId") REFERENCES "Departments" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Users_Locations_LocationId" FOREIGN KEY ("LocationId") REFERENCES "Locations" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Retirements" (
    "Id" RAW(16) NOT NULL,
    "AssetId" RAW(16) NOT NULL,
    "CurrentOwner" NVARCHAR2(200) NULL,
    "Reason" NVARCHAR2(2000) NOT NULL,
    "Condition" NVARCHAR2(200) NULL,
    "EndOfLifeAction" NVARCHAR2(200) NOT NULL,
    "SalvageValue" decimal(18,2) NULL,
    "DisposalVendorId" RAW(16) NULL,
    "DisposalLocation" NVARCHAR2(200) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "ExpirationDate" TIMESTAMP(7) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Retirements" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Retirements_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Retirements_Vendors_DisposalVendorId" FOREIGN KEY ("DisposalVendorId") REFERENCES "Vendors" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Employees" (
    "Id" RAW(16) NOT NULL,
    "Name" NVARCHAR2(200) NOT NULL,
    "EmployeeId" NVARCHAR2(100) NOT NULL,
    "Email" NVARCHAR2(254) NOT NULL,
    "Phone" NVARCHAR2(30) NULL,
    "DepartmentId" RAW(16) NULL,
    "LocationId" RAW(16) NULL,
    "OfficeId" RAW(16) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Employees" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Employees_Departments_DepartmentId" FOREIGN KEY ("DepartmentId") REFERENCES "Departments" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Employees_Locations_LocationId" FOREIGN KEY ("LocationId") REFERENCES "Locations" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_Employees_Offices_OfficeId" FOREIGN KEY ("OfficeId") REFERENCES "Offices" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "ActivityLogs" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NULL,
    "Action" NVARCHAR2(200) NOT NULL,
    "Entity" NVARCHAR2(200) NOT NULL,
    "EntityId" RAW(16) NULL,
    "Metadata" NVARCHAR2(4000) NULL,
    "IpAddress" NVARCHAR2(100) NULL,
    "UserAgent" NVARCHAR2(200) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_ActivityLogs" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ActivityLogs_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "AssetStatusHistories" (
    "Id" RAW(16) NOT NULL,
    "AssetId" RAW(16) NOT NULL,
    "FromStatus" NVARCHAR2(200) NOT NULL,
    "ToStatus" NVARCHAR2(200) NOT NULL,
    "EventType" NVARCHAR2(200) NOT NULL,
    "PerformedByUserId" RAW(16) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "EffectiveAt" TIMESTAMP(7) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_AssetStatusHistories" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AssetStatusHistories_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_AssetStatusHistories_Users_PerformedByUserId" FOREIGN KEY ("PerformedByUserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "BackupRuns" (
    "Id" RAW(16) NOT NULL,
    "RequestedByUserId" RAW(16) NULL,
    "Type" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "StartedAt" TIMESTAMP(7) NULL,
    "CompletedAt" TIMESTAMP(7) NULL,
    "SizeBytes" NUMBER(19) NULL,
    "StoragePath" NVARCHAR2(1000) NULL,
    "ErrorMessage" NVARCHAR2(4000) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_BackupRuns" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_BackupRuns_Users_RequestedByUserId" FOREIGN KEY ("RequestedByUserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "EmailVerificationTokens" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NOT NULL,
    "TokenHash" NVARCHAR2(500) NOT NULL,
    "ExpiresAt" TIMESTAMP(7) NOT NULL,
    "UsedAt" TIMESTAMP(7) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_EmailVerificationTokens" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_EmailVerificationTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "LoginActivities" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NULL,
    "EmailAttempted" NVARCHAR2(254) NOT NULL,
    "Succeeded" NUMBER(1) NOT NULL,
    "IpAddress" NVARCHAR2(100) NULL,
    "UserAgent" NVARCHAR2(200) NULL,
    "FailureReason" NVARCHAR2(200) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_LoginActivities" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_LoginActivities_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Notifications" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NULL,
    "Title" NVARCHAR2(200) NOT NULL,
    "Message" NVARCHAR2(2000) NOT NULL,
    "Type" NVARCHAR2(200) NOT NULL,
    "ActionUrl" NVARCHAR2(200) NULL,
    "RelatedEntityId" RAW(16) NULL,
    "RelatedEntityType" NVARCHAR2(200) NULL,
    "ReadAt" TIMESTAMP(7) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Notifications" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Notifications_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "PasswordResetTokens" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NOT NULL,
    "TokenHash" NVARCHAR2(500) NOT NULL,
    "ExpiresAt" TIMESTAMP(7) NOT NULL,
    "UsedAt" TIMESTAMP(7) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_PasswordResetTokens" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PasswordResetTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "PermissionHistory" (
    "Id" NUMBER(19) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    "UserId" RAW(16) NOT NULL,
    "PermissionId" RAW(16) NOT NULL,
    "PreviousValue" NUMBER(1) NOT NULL,
    "NewValue" NUMBER(1) NOT NULL,
    "ChangedByUserId" RAW(16) NOT NULL,
    "ChangedAt" TIMESTAMP(7) NOT NULL,
    "CorrelationId" NVARCHAR2(200) NOT NULL,
    CONSTRAINT "PK_PermissionHistory" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PermissionHistory_Permissions_PermissionId" FOREIGN KEY ("PermissionId") REFERENCES "Permissions" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PermissionHistory_Users_ChangedByUserId" FOREIGN KEY ("ChangedByUserId") REFERENCES "Users" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PermissionHistory_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "PurchaseOrders" (
    "Id" RAW(16) NOT NULL,
    "PoNumber" NVARCHAR2(200) NOT NULL,
    "Commodity" NVARCHAR2(200) NOT NULL,
    "PoDate" TIMESTAMP(7) NOT NULL,
    "PoYear" NUMBER(10) NOT NULL,
    "EfuReference" NVARCHAR2(200) NULL,
    "PoFor" NVARCHAR2(200) NOT NULL,
    "CurrencyCode" NVARCHAR2(200) NOT NULL,
    "IsCommercial" NUMBER(1) NOT NULL,
    "VendorId" RAW(16) NOT NULL,
    "VendorEmailSnapshot" NVARCHAR2(200) NULL,
    "QuotationId" NVARCHAR2(200) NULL,
    "QuotationDate" TIMESTAMP(7) NULL,
    "TermsAndConditions" NVARCHAR2(200) NULL,
    "PaymentTerms" NVARCHAR2(200) NULL,
    "ShipmentTime" NVARCHAR2(200) NULL,
    "ShipmentTag" NVARCHAR2(200) NULL,
    "ShipmentDate" TIMESTAMP(7) NULL,
    "ShipmentWithin" NVARCHAR2(200) NULL,
    "ExpectedDeliveryDate" TIMESTAMP(7) NULL,
    "DeliveryLocationId" RAW(16) NULL,
    "DeliveryAddress" NVARCHAR2(200) NULL,
    "ContactPerson" NVARCHAR2(200) NULL,
    "ContactNumber" NVARCHAR2(200) NULL,
    "DeliveryInstructions" NVARCHAR2(200) NULL,
    "InternalNotes" NVARCHAR2(200) NULL,
    "VendorNotes" NVARCHAR2(200) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "Subtotal" decimal(18,2) NOT NULL,
    "DiscountTotal" decimal(18,2) NOT NULL,
    "TaxTotal" decimal(18,2) NOT NULL,
    "OtherCharges" decimal(18,2) NOT NULL,
    "GrandTotal" decimal(18,2) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "IsLocked" NUMBER(1) NOT NULL,
    "Source" NVARCHAR2(200) NOT NULL,
    "ExternalReference" NVARCHAR2(200) NULL,
    "LastSyncedAt" TIMESTAMP(7) NULL,
    "LastSyncResult" NVARCHAR2(200) NULL,
    "CreatedByUserId" RAW(16) NOT NULL,
    "ApprovedByUserId" RAW(16) NULL,
    "ApprovedAt" TIMESTAMP(7) NULL,
    "RejectedByUserId" RAW(16) NULL,
    "RejectedAt" TIMESTAMP(7) NULL,
    "RejectionReason" NVARCHAR2(200) NULL,
    "CancelledByUserId" RAW(16) NULL,
    "CancelledAt" TIMESTAMP(7) NULL,
    "CancellationReason" NVARCHAR2(200) NULL,
    "ClosedAt" TIMESTAMP(7) NULL,
    "RowVersion" RAW(16) DEFAULT SYS_GUID() NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_PurchaseOrders" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PurchaseOrders_Locations_DeliveryLocationId" FOREIGN KEY ("DeliveryLocationId") REFERENCES "Locations" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrders_Users_CreatedByUserId" FOREIGN KEY ("CreatedByUserId") REFERENCES "Users" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrders_Vendors_VendorId" FOREIGN KEY ("VendorId") REFERENCES "Vendors" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "RefreshTokens" (
    "Id" RAW(16) NOT NULL,
    "TokenHash" NVARCHAR2(500) NOT NULL,
    "UserId" RAW(16) NOT NULL,
    "ExpiresAt" TIMESTAMP(7) NOT NULL,
    "RevokedAt" TIMESTAMP(7) NULL,
    "ReplacedByTokenHash" NVARCHAR2(500) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_RefreshTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "ReportRuns" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NULL,
    "ReportType" NVARCHAR2(200) NOT NULL,
    "Format" NVARCHAR2(200) NOT NULL,
    "FiltersJson" NVARCHAR2(4000) NULL,
    "ResultCount" NUMBER(10) NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "OutputPath" NVARCHAR2(1000) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_ReportRuns" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_ReportRuns_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "StoredFiles" (
    "Id" RAW(16) NOT NULL,
    "UploadedByUserId" RAW(16) NULL,
    "OriginalFileName" NVARCHAR2(255) NOT NULL,
    "StoredFileName" NVARCHAR2(255) NOT NULL,
    "ContentType" NVARCHAR2(200) NOT NULL,
    "SizeBytes" NUMBER(19) NOT NULL,
    "StoragePath" NVARCHAR2(1000) NOT NULL,
    "EntityType" NVARCHAR2(200) NULL,
    "EntityId" RAW(16) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_StoredFiles" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_StoredFiles_Users_UploadedByUserId" FOREIGN KEY ("UploadedByUserId") REFERENCES "Users" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "UserNotificationPreferences" (
    "Id" RAW(16) NOT NULL,
    "UserId" RAW(16) NOT NULL,
    "WarrantyExpiryAlerts" NUMBER(1) NOT NULL,
    "AssetExpiryAlerts" NUMBER(1) NOT NULL,
    "AllocationNotifications" NUMBER(1) NOT NULL,
    "ReturnNotifications" NUMBER(1) NOT NULL,
    "DailyEmailDigest" NUMBER(1) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_UserNotificationPreferences" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_UserNotificationPreferences_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "UserPermissions" (
    "UserId" RAW(16) NOT NULL,
    "PermissionId" RAW(16) NOT NULL,
    "IsGranted" NUMBER(1) NOT NULL,
    "GrantedByUserId" RAW(16) NOT NULL,
    "GrantedAt" TIMESTAMP(7) NOT NULL,
    "RevokedByUserId" RAW(16) NULL,
    "RevokedAt" TIMESTAMP(7) NULL,
    CONSTRAINT "PK_UserPermissions" PRIMARY KEY ("UserId", "PermissionId"),
    CONSTRAINT "FK_UserPermissions_Permissions_PermissionId" FOREIGN KEY ("PermissionId") REFERENCES "Permissions" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserPermissions_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "UserRoles" (
    "UserId" RAW(16) NOT NULL,
    "RoleId" RAW(16) NOT NULL,
    "AssignedAt" TIMESTAMP(7) NOT NULL,
    CONSTRAINT "PK_UserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_UserRoles_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Roles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserRoles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);
GO


CREATE TABLE "Allocations" (
    "Id" RAW(16) NOT NULL,
    "AssetId" RAW(16) NOT NULL,
    "EmployeeId" RAW(16) NOT NULL,
    "AllocationDate" TIMESTAMP(7) NOT NULL,
    "LocationId" RAW(16) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "ReturnedAt" TIMESTAMP(7) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Allocations" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Allocations_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Allocations_Employees_EmployeeId" FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Allocations_Locations_LocationId" FOREIGN KEY ("LocationId") REFERENCES "Locations" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "Revocations" (
    "Id" RAW(16) NOT NULL,
    "AssetId" RAW(16) NOT NULL,
    "EmployeeId" RAW(16) NULL,
    "Reason" NVARCHAR2(2000) NOT NULL,
    "Condition" NVARCHAR2(200) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "RevocationDate" TIMESTAMP(7) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_Revocations" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Revocations_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Revocations_Employees_EmployeeId" FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "GoodsReceipts" (
    "Id" RAW(16) NOT NULL,
    "ReceiptNumber" NVARCHAR2(200) NOT NULL,
    "PurchaseOrderId" RAW(16) NOT NULL,
    "ReceivedDate" TIMESTAMP(7) NOT NULL,
    "DeliveryChallanNumber" NVARCHAR2(200) NULL,
    "InvoiceNumber" NVARCHAR2(100) NULL,
    "ReceivedByUserId" RAW(16) NOT NULL,
    "LocationId" RAW(16) NOT NULL,
    "Notes" NVARCHAR2(200) NULL,
    "AttachmentStorageKey" NVARCHAR2(200) NULL,
    "RowVersion" RAW(16) DEFAULT SYS_GUID() NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_GoodsReceipts" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GoodsReceipts_PurchaseOrders_PurchaseOrderId" FOREIGN KEY ("PurchaseOrderId") REFERENCES "PurchaseOrders" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "PurchaseOrderAttachments" (
    "Id" RAW(16) NOT NULL,
    "PurchaseOrderId" RAW(16) NOT NULL,
    "Category" NVARCHAR2(200) NOT NULL,
    "OriginalFileName" NVARCHAR2(255) NOT NULL,
    "StorageKey" NVARCHAR2(200) NOT NULL,
    "MimeType" NVARCHAR2(200) NOT NULL,
    "FileSize" NUMBER(19) NOT NULL,
    "UploadedByUserId" RAW(16) NOT NULL,
    "UploadedAt" TIMESTAMP(7) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_PurchaseOrderAttachments" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PurchaseOrderAttachments_PurchaseOrders_PurchaseOrderId" FOREIGN KEY ("PurchaseOrderId") REFERENCES "PurchaseOrders" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "PurchaseOrderItems" (
    "Id" RAW(16) NOT NULL,
    "PurchaseOrderId" RAW(16) NOT NULL,
    "LineNumber" NUMBER(10) NOT NULL,
    "ItemCode" NVARCHAR2(200) NULL,
    "ItemName" NVARCHAR2(200) NOT NULL,
    "AssetTypeId" RAW(16) NULL,
    "AssetMakeId" RAW(16) NULL,
    "Model" NVARCHAR2(200) NULL,
    "QualityType" NVARCHAR2(200) NULL,
    "PrinterType" NVARCHAR2(200) NULL,
    "ProductName" NVARCHAR2(200) NULL,
    "Description" NVARCHAR2(2000) NULL,
    "UnitPrice" decimal(18,2) NOT NULL,
    "Quantity" decimal(18,2) NOT NULL,
    "ReceivedQuantity" decimal(18,2) NOT NULL,
    "TaxRate" decimal(5,2) NOT NULL,
    "DiscountType" NVARCHAR2(200) NOT NULL,
    "DiscountValue" decimal(18,2) NOT NULL,
    "DiscountAmount" decimal(18,2) NOT NULL,
    "TaxAmount" decimal(18,2) NOT NULL,
    "LineTotal" decimal(18,2) NOT NULL,
    "BranchUnitId" RAW(16) NULL,
    "IntendedUserId" RAW(16) NULL,
    "Remarks" NVARCHAR2(2000) NULL,
    "RowVersion" RAW(16) DEFAULT SYS_GUID() NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_PurchaseOrderItems" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PurchaseOrderItems_AssetMakes_AssetMakeId" FOREIGN KEY ("AssetMakeId") REFERENCES "AssetMakes" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrderItems_AssetTypes_AssetTypeId" FOREIGN KEY ("AssetTypeId") REFERENCES "AssetTypes" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrderItems_Locations_BranchUnitId" FOREIGN KEY ("BranchUnitId") REFERENCES "Locations" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrderItems_PurchaseOrders_PurchaseOrderId" FOREIGN KEY ("PurchaseOrderId") REFERENCES "PurchaseOrders" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrderItems_Users_IntendedUserId" FOREIGN KEY ("IntendedUserId") REFERENCES "Users" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "PurchaseOrderStatusHistory" (
    "Id" RAW(16) NOT NULL,
    "PurchaseOrderId" RAW(16) NOT NULL,
    "FromStatus" NVARCHAR2(200) NULL,
    "ToStatus" NVARCHAR2(200) NOT NULL,
    "Action" NVARCHAR2(200) NOT NULL,
    "Comment" NVARCHAR2(200) NULL,
    "PerformedByUserId" RAW(16) NOT NULL,
    "PerformedAt" TIMESTAMP(7) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_PurchaseOrderStatusHistory" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_PurchaseOrderStatusHistory_PurchaseOrders_PurchaseOrderId" FOREIGN KEY ("PurchaseOrderId") REFERENCES "PurchaseOrders" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_PurchaseOrderStatusHistory_Users_PerformedByUserId" FOREIGN KEY ("PerformedByUserId") REFERENCES "Users" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "AssetExpiryReminderLogs" (
    "Id" RAW(16) NOT NULL,
    "AssetId" RAW(16) NOT NULL,
    "AllocationId" RAW(16) NULL,
    "EmployeeId" RAW(16) NULL,
    "RecipientName" NVARCHAR2(200) NOT NULL,
    "RecipientEmail" NVARCHAR2(200) NOT NULL,
    "RecipientKey" NVARCHAR2(200) NOT NULL,
    "ExpiryType" NVARCHAR2(200) NOT NULL,
    "ExpiryDate" TIMESTAMP(7) NOT NULL,
    "ReminderDate" TIMESTAMP(7) NOT NULL,
    "DaysRemaining" NUMBER(10) NOT NULL,
    "Subject" NVARCHAR2(200) NOT NULL,
    "Status" NVARCHAR2(200) NOT NULL,
    "AttemptCount" NUMBER(10) NOT NULL,
    "ProviderMessageId" NVARCHAR2(200) NULL,
    "ErrorMessage" NVARCHAR2(4000) NULL,
    "SentAtUtc" TIMESTAMP(7) NULL,
    "CorrelationId" NVARCHAR2(200) NOT NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_AssetExpiryReminderLogs" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_AssetExpiryReminderLogs_Allocations_AllocationId" FOREIGN KEY ("AllocationId") REFERENCES "Allocations" ("Id") ON DELETE SET NULL,
    CONSTRAINT "FK_AssetExpiryReminderLogs_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_AssetExpiryReminderLogs_Employees_EmployeeId" FOREIGN KEY ("EmployeeId") REFERENCES "Employees" ("Id") ON DELETE SET NULL
);
GO


CREATE TABLE "GoodsReceiptItems" (
    "Id" RAW(16) NOT NULL,
    "GoodsReceiptId" RAW(16) NOT NULL,
    "PurchaseOrderItemId" RAW(16) NOT NULL,
    "QuantityReceived" decimal(18,2) NOT NULL,
    "Condition" NVARCHAR2(200) NOT NULL,
    "Notes" NVARCHAR2(200) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_GoodsReceiptItems" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GoodsReceiptItems_GoodsReceipts_GoodsReceiptId" FOREIGN KEY ("GoodsReceiptId") REFERENCES "GoodsReceipts" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_GoodsReceiptItems_PurchaseOrderItems_PurchaseOrderItemId" FOREIGN KEY ("PurchaseOrderItemId") REFERENCES "PurchaseOrderItems" ("Id") ON DELETE NO ACTION
);
GO


CREATE TABLE "GoodsReceiptUnits" (
    "Id" RAW(16) NOT NULL,
    "GoodsReceiptItemId" RAW(16) NOT NULL,
    "SerialNumber" NVARCHAR2(100) NULL,
    "ManufacturerSerialNumber" NVARCHAR2(200) NULL,
    "WarrantyStartDate" TIMESTAMP(7) NULL,
    "WarrantyExpiryDate" TIMESTAMP(7) NULL,
    "AssetId" RAW(16) NULL,
    "CreatedAt" TIMESTAMP(7) NOT NULL,
    "UpdatedAt" TIMESTAMP(7) NOT NULL,
    "DeletedAt" TIMESTAMP(7) NULL,
    "IsDeleted" NUMBER(1) NOT NULL,
    CONSTRAINT "PK_GoodsReceiptUnits" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_GoodsReceiptUnits_Assets_AssetId" FOREIGN KEY ("AssetId") REFERENCES "Assets" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_GoodsReceiptUnits_GoodsReceiptItems_GoodsReceiptItemId" FOREIGN KEY ("GoodsReceiptItemId") REFERENCES "GoodsReceiptItems" ("Id") ON DELETE NO ACTION
);
GO


CREATE INDEX "IX_ActivityLogs_Entity_EntityId_CreatedAt" ON "ActivityLogs" ("Entity", "EntityId", "CreatedAt");
GO


CREATE INDEX "IX_ActivityLogs_UserId_CreatedAt" ON "ActivityLogs" ("UserId", "CreatedAt");
GO


CREATE INDEX "IX_Allocations_AssetId_ReturnedAt" ON "Allocations" ("AssetId", "ReturnedAt");
GO


CREATE INDEX "IX_Allocations_EmployeeId_ReturnedAt" ON "Allocations" ("EmployeeId", "ReturnedAt");
GO


CREATE INDEX "IX_Allocations_LocationId" ON "Allocations" ("LocationId");
GO


CREATE INDEX "IX_AssetExpiryReminderLogs_AllocationId" ON "AssetExpiryReminderLogs" ("AllocationId");
GO


CREATE UNIQUE INDEX "IX_AssetExpiryReminderLogs_AssetId_ExpiryType_ExpiryDate_RecipientKey_DaysRemaining" ON "AssetExpiryReminderLogs" ("AssetId", "ExpiryType", "ExpiryDate", "RecipientKey", "DaysRemaining");
GO


CREATE INDEX "IX_AssetExpiryReminderLogs_EmployeeId" ON "AssetExpiryReminderLogs" ("EmployeeId");
GO


CREATE INDEX "IX_AssetExpiryReminderLogs_RecipientEmail_CreatedAt" ON "AssetExpiryReminderLogs" ("RecipientEmail", "CreatedAt");
GO


CREATE INDEX "IX_AssetExpiryReminderLogs_ReminderDate_Status" ON "AssetExpiryReminderLogs" ("ReminderDate", "Status");
GO


CREATE UNIQUE INDEX "IX_AssetMakes_Name" ON "AssetMakes" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_Assets_AssetCode" ON "Assets" (CASE WHEN "IsDeleted" = 0 THEN "AssetCode" END);
GO


CREATE INDEX "IX_Assets_AssetMakeId" ON "Assets" ("AssetMakeId");
GO


CREATE UNIQUE INDEX "IX_Assets_AssetTag" ON "Assets" (CASE WHEN "AssetTag" IS NOT NULL AND "IsDeleted" = 0 THEN "AssetTag" END);
GO


CREATE INDEX "IX_Assets_AssetTypeId_Status" ON "Assets" ("AssetTypeId", "Status");
GO


CREATE INDEX "IX_Assets_ExpectedExpiryDate" ON "Assets" ("ExpectedExpiryDate");
GO


CREATE INDEX "IX_Assets_LocationId_Status" ON "Assets" ("LocationId", "Status");
GO


CREATE INDEX "IX_Assets_MemoryId" ON "Assets" ("MemoryId");
GO


CREATE INDEX "IX_Assets_MotherboardId" ON "Assets" ("MotherboardId");
GO


CREATE INDEX "IX_Assets_OperatingSystemId" ON "Assets" ("OperatingSystemId");
GO


CREATE INDEX "IX_Assets_PurchaseDate" ON "Assets" ("PurchaseDate");
GO


CREATE UNIQUE INDEX "IX_Assets_SerialNumber" ON "Assets" (CASE WHEN "IsDeleted" = 0 THEN "SerialNumber" END);
GO


CREATE INDEX "IX_Assets_Status" ON "Assets" ("Status");
GO


CREATE INDEX "IX_Assets_StorageId" ON "Assets" ("StorageId");
GO


CREATE INDEX "IX_Assets_VendorId" ON "Assets" ("VendorId");
GO


CREATE INDEX "IX_Assets_WarrantyExpiryDate" ON "Assets" ("WarrantyExpiryDate");
GO


CREATE INDEX "IX_AssetStatusHistories_AssetId_EffectiveAt" ON "AssetStatusHistories" ("AssetId", "EffectiveAt");
GO


CREATE INDEX "IX_AssetStatusHistories_PerformedByUserId" ON "AssetStatusHistories" ("PerformedByUserId");
GO


CREATE UNIQUE INDEX "IX_AssetTypes_Name" ON "AssetTypes" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_AssetTypes_Prefix" ON "AssetTypes" (CASE WHEN "IsDeleted" = 0 THEN "Prefix" END);
GO


CREATE INDEX "IX_BackupRuns_RequestedByUserId" ON "BackupRuns" ("RequestedByUserId");
GO


CREATE INDEX "IX_BackupRuns_Status_CreatedAt" ON "BackupRuns" ("Status", "CreatedAt");
GO


CREATE UNIQUE INDEX "IX_Cities_ProvinceId_Name" ON "Cities" (CASE WHEN "IsDeleted" = 0 THEN "ProvinceId" END, CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_Departments_Name" ON "Departments" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_EmailVerificationTokens_TokenHash" ON "EmailVerificationTokens" ("TokenHash");
GO


CREATE INDEX "IX_EmailVerificationTokens_UserId" ON "EmailVerificationTokens" ("UserId");
GO


CREATE INDEX "IX_Employees_DepartmentId_Status" ON "Employees" ("DepartmentId", "Status");
GO


CREATE UNIQUE INDEX "IX_Employees_Email" ON "Employees" (CASE WHEN "IsDeleted" = 0 THEN "Email" END);
GO


CREATE UNIQUE INDEX "IX_Employees_EmployeeId" ON "Employees" (CASE WHEN "IsDeleted" = 0 THEN "EmployeeId" END);
GO


CREATE INDEX "IX_Employees_LocationId" ON "Employees" ("LocationId");
GO


CREATE INDEX "IX_Employees_OfficeId" ON "Employees" ("OfficeId");
GO


CREATE UNIQUE INDEX "IX_GoodsReceiptItems_GoodsReceiptId_PurchaseOrderItemId" ON "GoodsReceiptItems" ("GoodsReceiptId", "PurchaseOrderItemId");
GO


CREATE INDEX "IX_GoodsReceiptItems_PurchaseOrderItemId" ON "GoodsReceiptItems" ("PurchaseOrderItemId");
GO


CREATE INDEX "IX_GoodsReceipts_PurchaseOrderId" ON "GoodsReceipts" ("PurchaseOrderId");
GO


CREATE UNIQUE INDEX "IX_GoodsReceipts_ReceiptNumber" ON "GoodsReceipts" ("ReceiptNumber");
GO


CREATE UNIQUE INDEX "IX_GoodsReceiptUnits_AssetId" ON "GoodsReceiptUnits" (CASE WHEN "AssetId" IS NOT NULL THEN "AssetId" END);
GO


CREATE INDEX "IX_GoodsReceiptUnits_GoodsReceiptItemId" ON "GoodsReceiptUnits" ("GoodsReceiptItemId");
GO


CREATE UNIQUE INDEX "IX_GoodsReceiptUnits_SerialNumber" ON "GoodsReceiptUnits" (CASE WHEN "SerialNumber" IS NOT NULL THEN "SerialNumber" END);
GO


CREATE UNIQUE INDEX "IX_LifecyclePolicies_AssetTypeId" ON "LifecyclePolicies" (CASE WHEN "IsDeleted" = 0 THEN "AssetTypeId" END);
GO


CREATE UNIQUE INDEX "IX_Locations_CityId_Name" ON "Locations" (CASE WHEN "IsDeleted" = 0 THEN "CityId" END, CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE INDEX "IX_Locations_ProvinceId" ON "Locations" ("ProvinceId");
GO


CREATE INDEX "IX_LoginActivities_EmailAttempted_CreatedAt" ON "LoginActivities" ("EmailAttempted", "CreatedAt");
GO


CREATE INDEX "IX_LoginActivities_UserId" ON "LoginActivities" ("UserId");
GO


CREATE UNIQUE INDEX "IX_Memories_Size_Type" ON "Memories" (CASE WHEN "IsDeleted" = 0 THEN "Size" END, CASE WHEN "IsDeleted" = 0 THEN "Type" END);
GO


CREATE UNIQUE INDEX "IX_Motherboards_Name_Generation" ON "Motherboards" (CASE WHEN "IsDeleted" = 0 THEN "Name" END, CASE WHEN "IsDeleted" = 0 THEN "Generation" END);
GO


CREATE INDEX "IX_Notifications_UserId_ReadAt_CreatedAt" ON "Notifications" ("UserId", "ReadAt", "CreatedAt");
GO


CREATE UNIQUE INDEX "IX_Offices_LocationId_Name" ON "Offices" (CASE WHEN "IsDeleted" = 0 THEN "LocationId" END, CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_OperatingSystems_Name_Version" ON "OperatingSystems" (CASE WHEN "IsDeleted" = 0 THEN "Name" END, CASE WHEN "IsDeleted" = 0 THEN "Version" END);
GO


CREATE UNIQUE INDEX "IX_PasswordResetTokens_TokenHash" ON "PasswordResetTokens" ("TokenHash");
GO


CREATE INDEX "IX_PasswordResetTokens_UserId" ON "PasswordResetTokens" ("UserId");
GO


CREATE INDEX "IX_PermissionHistory_ChangedByUserId" ON "PermissionHistory" ("ChangedByUserId");
GO


CREATE INDEX "IX_PermissionHistory_PermissionId" ON "PermissionHistory" ("PermissionId");
GO


CREATE INDEX "IX_PermissionHistory_UserId_ChangedAt" ON "PermissionHistory" ("UserId", "ChangedAt");
GO


CREATE UNIQUE INDEX "IX_Permissions_Code" ON "Permissions" (CASE WHEN "IsDeleted" = 0 THEN "Code" END);
GO


CREATE UNIQUE INDEX "IX_Provinces_Name" ON "Provinces" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE INDEX "IX_PurchaseOrderAttachments_PurchaseOrderId" ON "PurchaseOrderAttachments" ("PurchaseOrderId");
GO


CREATE INDEX "IX_PurchaseOrderItems_AssetMakeId" ON "PurchaseOrderItems" ("AssetMakeId");
GO


CREATE INDEX "IX_PurchaseOrderItems_AssetTypeId" ON "PurchaseOrderItems" ("AssetTypeId");
GO


CREATE INDEX "IX_PurchaseOrderItems_BranchUnitId" ON "PurchaseOrderItems" ("BranchUnitId");
GO


CREATE INDEX "IX_PurchaseOrderItems_IntendedUserId" ON "PurchaseOrderItems" ("IntendedUserId");
GO


CREATE UNIQUE INDEX "IX_PurchaseOrderItems_PurchaseOrderId_LineNumber" ON "PurchaseOrderItems" ("PurchaseOrderId", "LineNumber");
GO


CREATE INDEX "IX_PurchaseOrders_CreatedByUserId" ON "PurchaseOrders" ("CreatedByUserId");
GO


CREATE INDEX "IX_PurchaseOrders_DeliveryLocationId" ON "PurchaseOrders" ("DeliveryLocationId");
GO


CREATE UNIQUE INDEX "IX_PurchaseOrders_PoNumber" ON "PurchaseOrders" ("PoNumber");
GO


CREATE INDEX "IX_PurchaseOrders_PoYear_VendorId" ON "PurchaseOrders" ("PoYear", "VendorId");
GO


CREATE INDEX "IX_PurchaseOrders_Status_PoDate" ON "PurchaseOrders" ("Status", "PoDate");
GO


CREATE INDEX "IX_PurchaseOrders_VendorId" ON "PurchaseOrders" ("VendorId");
GO


CREATE INDEX "IX_PurchaseOrderStatusHistory_PerformedByUserId" ON "PurchaseOrderStatusHistory" ("PerformedByUserId");
GO


CREATE INDEX "IX_PurchaseOrderStatusHistory_PurchaseOrderId_PerformedAt" ON "PurchaseOrderStatusHistory" ("PurchaseOrderId", "PerformedAt");
GO


CREATE UNIQUE INDEX "IX_RefreshTokens_TokenHash" ON "RefreshTokens" ("TokenHash");
GO


CREATE INDEX "IX_RefreshTokens_UserId_ExpiresAt" ON "RefreshTokens" ("UserId", "ExpiresAt");
GO


CREATE INDEX "IX_ReportRuns_UserId_CreatedAt" ON "ReportRuns" ("UserId", "CreatedAt");
GO


CREATE INDEX "IX_Retirements_AssetId_ExpirationDate" ON "Retirements" ("AssetId", "ExpirationDate");
GO


CREATE INDEX "IX_Retirements_DisposalVendorId" ON "Retirements" ("DisposalVendorId");
GO


CREATE INDEX "IX_Revocations_AssetId_RevocationDate" ON "Revocations" ("AssetId", "RevocationDate");
GO


CREATE INDEX "IX_Revocations_EmployeeId" ON "Revocations" ("EmployeeId");
GO


CREATE INDEX "IX_RolePermissions_PermissionId" ON "RolePermissions" ("PermissionId");
GO


CREATE UNIQUE INDEX "IX_Roles_Name" ON "Roles" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_Storages_Type_Capacity" ON "Storages" (CASE WHEN "IsDeleted" = 0 THEN "Type" END, CASE WHEN "IsDeleted" = 0 THEN "Capacity" END);
GO


CREATE INDEX "IX_StoredFiles_EntityType_EntityId" ON "StoredFiles" ("EntityType", "EntityId");
GO


CREATE INDEX "IX_StoredFiles_UploadedByUserId" ON "StoredFiles" ("UploadedByUserId");
GO


CREATE UNIQUE INDEX "IX_UserNotificationPreferences_UserId" ON "UserNotificationPreferences" (CASE WHEN "IsDeleted" = 0 THEN "UserId" END);
GO


CREATE INDEX "IX_UserPermissions_PermissionId" ON "UserPermissions" ("PermissionId");
GO


CREATE INDEX "IX_UserRoles_RoleId" ON "UserRoles" ("RoleId");
GO


CREATE INDEX "IX_Users_DepartmentId" ON "Users" ("DepartmentId");
GO


CREATE UNIQUE INDEX "IX_Users_Email" ON "Users" (CASE WHEN "IsDeleted" = 0 THEN "Email" END);
GO


CREATE UNIQUE INDEX "IX_Users_EmployeeCode" ON "Users" (CASE WHEN "EmployeeCode" IS NOT NULL AND "IsDeleted" = 0 THEN "EmployeeCode" END);
GO


CREATE INDEX "IX_Users_LocationId" ON "Users" ("LocationId");
GO


CREATE INDEX "IX_Users_Status_Role" ON "Users" ("Status", "Role");
GO


CREATE UNIQUE INDEX "IX_Vendors_Name" ON "Vendors" (CASE WHEN "IsDeleted" = 0 THEN "Name" END);
GO


CREATE UNIQUE INDEX "IX_Vendors_Ntn" ON "Vendors" (CASE WHEN "Ntn" IS NOT NULL AND "IsDeleted" = 0 THEN "Ntn" END);
GO



-- Oracle has no SQL Server rowversion type. Maintain optimistic-concurrency values with triggers.
CREATE OR REPLACE TRIGGER "TRG_PurchaseOrders_RowVersion"
BEFORE INSERT OR UPDATE ON "PurchaseOrders"
FOR EACH ROW BEGIN
  :NEW."RowVersion" := SYS_GUID();
END;
/
CREATE OR REPLACE TRIGGER "TRG_PurchaseOrderItems_RowVersion"
BEFORE INSERT OR UPDATE ON "PurchaseOrderItems"
FOR EACH ROW BEGIN
  :NEW."RowVersion" := SYS_GUID();
END;
/
CREATE OR REPLACE TRIGGER "TRG_GoodsReceipts_RowVersion"
BEFORE INSERT OR UPDATE ON "GoodsReceipts"
FOR EACH ROW BEGIN
  :NEW."RowVersion" := SYS_GUID();
END;
/