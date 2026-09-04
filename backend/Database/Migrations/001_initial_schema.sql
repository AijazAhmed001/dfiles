CREATE TABLE AssetMakes (
    Id RAW(16) NOT NULL,
    Name NVARCHAR2(200) NOT NULL,
    Status NVARCHAR2(200) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL,
    UpdatedAt TIMESTAMP NOT NULL,
    DeletedAt TIMESTAMP NULL,
    IsDeleted NUMBER(1) NOT NULL,
    CONSTRAINT PK_AssetMakes PRIMARY KEY (Id)
);
GO


CREATE TABLE [AssetTypes] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Prefix] nvarchar(100) NOT NULL,
    [Description] nvarchar(2000) NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_AssetTypes] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Departments] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Departments] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Memories] (
    [Id] uniqueidentifier NOT NULL,
    [Size] nvarchar(200) NOT NULL,
    [Type] nvarchar(200) NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Memories] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Motherboards] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Generation] nvarchar(200) NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Motherboards] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [OperatingSystems] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Version] nvarchar(200) NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_OperatingSystems] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Permissions] (
    [Id] uniqueidentifier NOT NULL,
    [Code] nvarchar(200) NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Description] nvarchar(2000) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Permissions] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Provinces] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Provinces] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Roles] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Description] nvarchar(2000) NULL,
    [IsSystemRole] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [Storages] (
    [Id] uniqueidentifier NOT NULL,
    [Type] nvarchar(200) NOT NULL,
    [Capacity] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Storages] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [SystemSettings] (
    [Key] nvarchar(200) NOT NULL,
    [Value] nvarchar(4000) NOT NULL,
    [Category] nvarchar(200) NOT NULL,
    [IsSensitive] bit NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [UpdatedByUserId] uniqueidentifier NULL,
    CONSTRAINT [PK_SystemSettings] PRIMARY KEY ([Key])
);
GO


CREATE TABLE [Vendors] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Contact] nvarchar(200) NULL,
    [Phone] nvarchar(30) NULL,
    [Email] nvarchar(254) NULL,
    [Address] nvarchar(2000) NULL,
    [Ntn] nvarchar(100) NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Vendors] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [LifecyclePolicies] (
    [Id] uniqueidentifier NOT NULL,
    [AssetTypeId] uniqueidentifier NOT NULL,
    [ExpectedLifespanYears] int NOT NULL,
    [WarrantyPeriodYears] int NOT NULL,
    [DepreciationMethod] nvarchar(200) NOT NULL,
    [SalvageValuePercent] decimal(5,2) NOT NULL,
    [EndOfLifeAction] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_LifecyclePolicies] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_LifecyclePolicies_AssetTypes_AssetTypeId] FOREIGN KEY ([AssetTypeId]) REFERENCES [AssetTypes] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [Cities] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [ProvinceId] uniqueidentifier NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Cities] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Cities_Provinces_ProvinceId] FOREIGN KEY ([ProvinceId]) REFERENCES [Provinces] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [RolePermissions] (
    [RoleId] uniqueidentifier NOT NULL,
    [PermissionId] uniqueidentifier NOT NULL,
    [GrantedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_RolePermissions] PRIMARY KEY ([RoleId], [PermissionId]),
    CONSTRAINT [FK_RolePermissions_Permissions_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [Permissions] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_RolePermissions_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Locations] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [ProvinceId] uniqueidentifier NULL,
    [CityId] uniqueidentifier NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Locations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Locations_Cities_CityId] FOREIGN KEY ([CityId]) REFERENCES [Cities] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Locations_Provinces_ProvinceId] FOREIGN KEY ([ProvinceId]) REFERENCES [Provinces] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [Assets] (
    [Id] uniqueidentifier NOT NULL,
    [AssetCode] nvarchar(100) NOT NULL,
    [SerialNumber] nvarchar(100) NOT NULL,
    [Model] nvarchar(200) NOT NULL,
    [AssetTag] nvarchar(100) NULL,
    [Condition] nvarchar(200) NULL,
    [Accessories] nvarchar(2000) NULL,
    [AdditionalNotes] nvarchar(2000) NULL,
    [PurchaseOrderNumber] nvarchar(100) NULL,
    [InvoiceNumber] nvarchar(100) NULL,
    [MacAddress] nvarchar(100) NULL,
    [IpAddress] nvarchar(100) NULL,
    [Hostname] nvarchar(100) NULL,
    [Domain] nvarchar(200) NULL,
    [BiosVersion] nvarchar(100) NULL,
    [GpuModel] nvarchar(200) NULL,
    [PurchaseDate] datetime2 NOT NULL,
    [PurchaseCost] decimal(18,2) NOT NULL,
    [AddingDate] datetime2 NOT NULL,
    [WarrantyExpiryDate] datetime2 NULL,
    [ExpectedExpiryDate] datetime2 NULL,
    [Status] nvarchar(200) NOT NULL,
    [AssetTypeId] uniqueidentifier NOT NULL,
    [AssetMakeId] uniqueidentifier NULL,
    [MotherboardId] uniqueidentifier NULL,
    [MemoryId] uniqueidentifier NULL,
    [StorageId] uniqueidentifier NULL,
    [OperatingSystemId] uniqueidentifier NULL,
    [VendorId] uniqueidentifier NULL,
    [LocationId] uniqueidentifier NULL,
    [PurchaseOrderId] uniqueidentifier NULL,
    [PurchaseOrderItemId] uniqueidentifier NULL,
    [GoodsReceiptId] uniqueidentifier NULL,
    [GoodsReceiptItemId] uniqueidentifier NULL,
    [GoodsReceiptUnitId] uniqueidentifier NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Assets] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Assets_AssetMakes_AssetMakeId] FOREIGN KEY ([AssetMakeId]) REFERENCES [AssetMakes] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_AssetTypes_AssetTypeId] FOREIGN KEY ([AssetTypeId]) REFERENCES [AssetTypes] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Assets_Locations_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [Locations] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_Memories_MemoryId] FOREIGN KEY ([MemoryId]) REFERENCES [Memories] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_Motherboards_MotherboardId] FOREIGN KEY ([MotherboardId]) REFERENCES [Motherboards] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_OperatingSystems_OperatingSystemId] FOREIGN KEY ([OperatingSystemId]) REFERENCES [OperatingSystems] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_Storages_StorageId] FOREIGN KEY ([StorageId]) REFERENCES [Storages] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Assets_Vendors_VendorId] FOREIGN KEY ([VendorId]) REFERENCES [Vendors] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Offices] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [LocationId] uniqueidentifier NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Offices] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Offices_Locations_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [Locations] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Users] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [Email] nvarchar(254) NOT NULL,
    [PasswordHash] nvarchar(500) NOT NULL,
    [EmployeeCode] nvarchar(100) NULL,
    [Phone] nvarchar(30) NULL,
    [Role] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [DepartmentId] uniqueidentifier NULL,
    [LocationId] uniqueidentifier NULL,
    [AvatarPath] nvarchar(200) NULL,
    [LastLoginAt] datetime2 NULL,
    [PasswordChangedAt] datetime2 NULL,
    [EmailVerified] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Users_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Users_Locations_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [Locations] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Retirements] (
    [Id] uniqueidentifier NOT NULL,
    [AssetId] uniqueidentifier NOT NULL,
    [CurrentOwner] nvarchar(200) NULL,
    [Reason] nvarchar(2000) NOT NULL,
    [Condition] nvarchar(200) NULL,
    [EndOfLifeAction] nvarchar(200) NOT NULL,
    [SalvageValue] decimal(18,2) NULL,
    [DisposalVendorId] uniqueidentifier NULL,
    [DisposalLocation] nvarchar(200) NULL,
    [Remarks] nvarchar(2000) NULL,
    [ExpirationDate] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Retirements] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Retirements_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Retirements_Vendors_DisposalVendorId] FOREIGN KEY ([DisposalVendorId]) REFERENCES [Vendors] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Employees] (
    [Id] uniqueidentifier NOT NULL,
    [Name] nvarchar(200) NOT NULL,
    [EmployeeId] nvarchar(100) NOT NULL,
    [Email] nvarchar(254) NOT NULL,
    [Phone] nvarchar(30) NULL,
    [DepartmentId] uniqueidentifier NULL,
    [LocationId] uniqueidentifier NULL,
    [OfficeId] uniqueidentifier NULL,
    [Status] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Employees_Departments_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Departments] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Employees_Locations_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [Locations] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_Employees_Offices_OfficeId] FOREIGN KEY ([OfficeId]) REFERENCES [Offices] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [ActivityLogs] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NULL,
    [Action] nvarchar(200) NOT NULL,
    [Entity] nvarchar(200) NOT NULL,
    [EntityId] uniqueidentifier NULL,
    [Metadata] nvarchar(4000) NULL,
    [IpAddress] nvarchar(100) NULL,
    [UserAgent] nvarchar(200) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_ActivityLogs] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ActivityLogs_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [AssetStatusHistories] (
    [Id] uniqueidentifier NOT NULL,
    [AssetId] uniqueidentifier NOT NULL,
    [FromStatus] nvarchar(200) NOT NULL,
    [ToStatus] nvarchar(200) NOT NULL,
    [EventType] nvarchar(200) NOT NULL,
    [PerformedByUserId] uniqueidentifier NULL,
    [Remarks] nvarchar(2000) NULL,
    [EffectiveAt] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_AssetStatusHistories] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AssetStatusHistories_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_AssetStatusHistories_Users_PerformedByUserId] FOREIGN KEY ([PerformedByUserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [BackupRuns] (
    [Id] uniqueidentifier NOT NULL,
    [RequestedByUserId] uniqueidentifier NULL,
    [Type] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [StartedAt] datetime2 NULL,
    [CompletedAt] datetime2 NULL,
    [SizeBytes] bigint NULL,
    [StoragePath] nvarchar(1000) NULL,
    [ErrorMessage] nvarchar(4000) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_BackupRuns] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_BackupRuns_Users_RequestedByUserId] FOREIGN KEY ([RequestedByUserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [EmailVerificationTokens] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [TokenHash] nvarchar(500) NOT NULL,
    [ExpiresAt] datetime2 NOT NULL,
    [UsedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_EmailVerificationTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_EmailVerificationTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [LoginActivities] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NULL,
    [EmailAttempted] nvarchar(254) NOT NULL,
    [Succeeded] bit NOT NULL,
    [IpAddress] nvarchar(100) NULL,
    [UserAgent] nvarchar(200) NULL,
    [FailureReason] nvarchar(200) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_LoginActivities] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_LoginActivities_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Notifications] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NULL,
    [Title] nvarchar(200) NOT NULL,
    [Message] nvarchar(2000) NOT NULL,
    [Type] nvarchar(200) NOT NULL,
    [ActionUrl] nvarchar(200) NULL,
    [RelatedEntityId] uniqueidentifier NULL,
    [RelatedEntityType] nvarchar(200) NULL,
    [ReadAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Notifications] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Notifications_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [PasswordResetTokens] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [TokenHash] nvarchar(500) NOT NULL,
    [ExpiresAt] datetime2 NOT NULL,
    [UsedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_PasswordResetTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PasswordResetTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [PermissionHistory] (
    [Id] bigint NOT NULL IDENTITY,
    [UserId] uniqueidentifier NOT NULL,
    [PermissionId] uniqueidentifier NOT NULL,
    [PreviousValue] bit NOT NULL,
    [NewValue] bit NOT NULL,
    [ChangedByUserId] uniqueidentifier NOT NULL,
    [ChangedAt] datetime2 NOT NULL,
    [CorrelationId] nvarchar(200) NOT NULL,
    CONSTRAINT [PK_PermissionHistory] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PermissionHistory_Permissions_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [Permissions] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PermissionHistory_Users_ChangedByUserId] FOREIGN KEY ([ChangedByUserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PermissionHistory_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [PurchaseOrders] (
    [Id] uniqueidentifier NOT NULL,
    [PoNumber] nvarchar(200) NOT NULL,
    [Commodity] nvarchar(200) NOT NULL,
    [PoDate] datetime2 NOT NULL,
    [PoYear] int NOT NULL,
    [EfuReference] nvarchar(200) NULL,
    [PoFor] nvarchar(200) NOT NULL,
    [CurrencyCode] nvarchar(200) NOT NULL,
    [IsCommercial] bit NOT NULL,
    [VendorId] uniqueidentifier NOT NULL,
    [VendorEmailSnapshot] nvarchar(200) NULL,
    [QuotationId] nvarchar(200) NULL,
    [QuotationDate] datetime2 NULL,
    [TermsAndConditions] nvarchar(200) NULL,
    [PaymentTerms] nvarchar(200) NULL,
    [ShipmentTime] nvarchar(200) NULL,
    [ShipmentTag] nvarchar(200) NULL,
    [ShipmentDate] datetime2 NULL,
    [ShipmentWithin] nvarchar(200) NULL,
    [ExpectedDeliveryDate] datetime2 NULL,
    [DeliveryLocationId] uniqueidentifier NULL,
    [DeliveryAddress] nvarchar(200) NULL,
    [ContactPerson] nvarchar(200) NULL,
    [ContactNumber] nvarchar(200) NULL,
    [DeliveryInstructions] nvarchar(200) NULL,
    [InternalNotes] nvarchar(200) NULL,
    [VendorNotes] nvarchar(200) NULL,
    [Remarks] nvarchar(2000) NULL,
    [Subtotal] decimal(18,2) NOT NULL,
    [DiscountTotal] decimal(18,2) NOT NULL,
    [TaxTotal] decimal(18,2) NOT NULL,
    [OtherCharges] decimal(18,2) NOT NULL,
    [GrandTotal] decimal(18,2) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [IsLocked] bit NOT NULL,
    [Source] nvarchar(200) NOT NULL,
    [ExternalReference] nvarchar(200) NULL,
    [LastSyncedAt] datetime2 NULL,
    [LastSyncResult] nvarchar(200) NULL,
    [CreatedByUserId] uniqueidentifier NOT NULL,
    [ApprovedByUserId] uniqueidentifier NULL,
    [ApprovedAt] datetime2 NULL,
    [RejectedByUserId] uniqueidentifier NULL,
    [RejectedAt] datetime2 NULL,
    [RejectionReason] nvarchar(200) NULL,
    [CancelledByUserId] uniqueidentifier NULL,
    [CancelledAt] datetime2 NULL,
    [CancellationReason] nvarchar(200) NULL,
    [ClosedAt] datetime2 NULL,
    [RowVersion] rowversion NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_PurchaseOrders] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PurchaseOrders_Locations_DeliveryLocationId] FOREIGN KEY ([DeliveryLocationId]) REFERENCES [Locations] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrders_Users_CreatedByUserId] FOREIGN KEY ([CreatedByUserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrders_Vendors_VendorId] FOREIGN KEY ([VendorId]) REFERENCES [Vendors] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [RefreshTokens] (
    [Id] uniqueidentifier NOT NULL,
    [TokenHash] nvarchar(500) NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [ExpiresAt] datetime2 NOT NULL,
    [RevokedAt] datetime2 NULL,
    [ReplacedByTokenHash] nvarchar(500) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_RefreshTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_RefreshTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [ReportRuns] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NULL,
    [ReportType] nvarchar(200) NOT NULL,
    [Format] nvarchar(200) NOT NULL,
    [FiltersJson] nvarchar(4000) NULL,
    [ResultCount] int NULL,
    [Status] nvarchar(200) NOT NULL,
    [OutputPath] nvarchar(1000) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_ReportRuns] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ReportRuns_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [StoredFiles] (
    [Id] uniqueidentifier NOT NULL,
    [UploadedByUserId] uniqueidentifier NULL,
    [OriginalFileName] nvarchar(255) NOT NULL,
    [StoredFileName] nvarchar(255) NOT NULL,
    [ContentType] nvarchar(200) NOT NULL,
    [SizeBytes] bigint NOT NULL,
    [StoragePath] nvarchar(1000) NOT NULL,
    [EntityType] nvarchar(200) NULL,
    [EntityId] uniqueidentifier NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_StoredFiles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_StoredFiles_Users_UploadedByUserId] FOREIGN KEY ([UploadedByUserId]) REFERENCES [Users] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [UserNotificationPreferences] (
    [Id] uniqueidentifier NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [WarrantyExpiryAlerts] bit NOT NULL,
    [AssetExpiryAlerts] bit NOT NULL,
    [AllocationNotifications] bit NOT NULL,
    [ReturnNotifications] bit NOT NULL,
    [DailyEmailDigest] bit NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_UserNotificationPreferences] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserNotificationPreferences_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserPermissions] (
    [UserId] uniqueidentifier NOT NULL,
    [PermissionId] uniqueidentifier NOT NULL,
    [IsGranted] bit NOT NULL,
    [GrantedByUserId] uniqueidentifier NOT NULL,
    [GrantedAt] datetime2 NOT NULL,
    [RevokedByUserId] uniqueidentifier NULL,
    [RevokedAt] datetime2 NULL,
    CONSTRAINT [PK_UserPermissions] PRIMARY KEY ([UserId], [PermissionId]),
    CONSTRAINT [FK_UserPermissions_Permissions_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [Permissions] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserPermissions_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [UserRoles] (
    [UserId] uniqueidentifier NOT NULL,
    [RoleId] uniqueidentifier NOT NULL,
    [AssignedAt] datetime2 NOT NULL,
    CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
);
GO


CREATE TABLE [Allocations] (
    [Id] uniqueidentifier NOT NULL,
    [AssetId] uniqueidentifier NOT NULL,
    [EmployeeId] uniqueidentifier NOT NULL,
    [AllocationDate] datetime2 NOT NULL,
    [LocationId] uniqueidentifier NULL,
    [Remarks] nvarchar(2000) NULL,
    [ReturnedAt] datetime2 NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Allocations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Allocations_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Allocations_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Allocations_Locations_LocationId] FOREIGN KEY ([LocationId]) REFERENCES [Locations] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [Revocations] (
    [Id] uniqueidentifier NOT NULL,
    [AssetId] uniqueidentifier NOT NULL,
    [EmployeeId] uniqueidentifier NULL,
    [Reason] nvarchar(2000) NOT NULL,
    [Condition] nvarchar(200) NULL,
    [Remarks] nvarchar(2000) NULL,
    [RevocationDate] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Revocations] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Revocations_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Revocations_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [GoodsReceipts] (
    [Id] uniqueidentifier NOT NULL,
    [ReceiptNumber] nvarchar(200) NOT NULL,
    [PurchaseOrderId] uniqueidentifier NOT NULL,
    [ReceivedDate] datetime2 NOT NULL,
    [DeliveryChallanNumber] nvarchar(200) NULL,
    [InvoiceNumber] nvarchar(100) NULL,
    [ReceivedByUserId] uniqueidentifier NOT NULL,
    [LocationId] uniqueidentifier NOT NULL,
    [Notes] nvarchar(200) NULL,
    [AttachmentStorageKey] nvarchar(200) NULL,
    [RowVersion] rowversion NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_GoodsReceipts] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_GoodsReceipts_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [PurchaseOrderAttachments] (
    [Id] uniqueidentifier NOT NULL,
    [PurchaseOrderId] uniqueidentifier NOT NULL,
    [Category] nvarchar(200) NOT NULL,
    [OriginalFileName] nvarchar(255) NOT NULL,
    [StorageKey] nvarchar(200) NOT NULL,
    [MimeType] nvarchar(200) NOT NULL,
    [FileSize] bigint NOT NULL,
    [UploadedByUserId] uniqueidentifier NOT NULL,
    [UploadedAt] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_PurchaseOrderAttachments] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PurchaseOrderAttachments_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [PurchaseOrderItems] (
    [Id] uniqueidentifier NOT NULL,
    [PurchaseOrderId] uniqueidentifier NOT NULL,
    [LineNumber] int NOT NULL,
    [ItemCode] nvarchar(200) NULL,
    [ItemName] nvarchar(200) NOT NULL,
    [AssetTypeId] uniqueidentifier NULL,
    [AssetMakeId] uniqueidentifier NULL,
    [Model] nvarchar(200) NULL,
    [QualityType] nvarchar(200) NULL,
    [PrinterType] nvarchar(200) NULL,
    [ProductName] nvarchar(200) NULL,
    [Description] nvarchar(2000) NULL,
    [UnitPrice] decimal(18,2) NOT NULL,
    [Quantity] decimal(18,2) NOT NULL,
    [ReceivedQuantity] decimal(18,2) NOT NULL,
    [TaxRate] decimal(5,2) NOT NULL,
    [DiscountType] nvarchar(200) NOT NULL,
    [DiscountValue] decimal(18,2) NOT NULL,
    [DiscountAmount] decimal(18,2) NOT NULL,
    [TaxAmount] decimal(18,2) NOT NULL,
    [LineTotal] decimal(18,2) NOT NULL,
    [BranchUnitId] uniqueidentifier NULL,
    [IntendedUserId] uniqueidentifier NULL,
    [Remarks] nvarchar(2000) NULL,
    [RowVersion] rowversion NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_PurchaseOrderItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PurchaseOrderItems_AssetMakes_AssetMakeId] FOREIGN KEY ([AssetMakeId]) REFERENCES [AssetMakes] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrderItems_AssetTypes_AssetTypeId] FOREIGN KEY ([AssetTypeId]) REFERENCES [AssetTypes] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrderItems_Locations_BranchUnitId] FOREIGN KEY ([BranchUnitId]) REFERENCES [Locations] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrderItems_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrderItems_Users_IntendedUserId] FOREIGN KEY ([IntendedUserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [PurchaseOrderStatusHistory] (
    [Id] uniqueidentifier NOT NULL,
    [PurchaseOrderId] uniqueidentifier NOT NULL,
    [FromStatus] nvarchar(200) NULL,
    [ToStatus] nvarchar(200) NOT NULL,
    [Action] nvarchar(200) NOT NULL,
    [Comment] nvarchar(200) NULL,
    [PerformedByUserId] uniqueidentifier NOT NULL,
    [PerformedAt] datetime2 NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_PurchaseOrderStatusHistory] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_PurchaseOrderStatusHistory_PurchaseOrders_PurchaseOrderId] FOREIGN KEY ([PurchaseOrderId]) REFERENCES [PurchaseOrders] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_PurchaseOrderStatusHistory_Users_PerformedByUserId] FOREIGN KEY ([PerformedByUserId]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [AssetExpiryReminderLogs] (
    [Id] uniqueidentifier NOT NULL,
    [AssetId] uniqueidentifier NOT NULL,
    [AllocationId] uniqueidentifier NULL,
    [EmployeeId] uniqueidentifier NULL,
    [RecipientName] nvarchar(200) NOT NULL,
    [RecipientEmail] nvarchar(200) NOT NULL,
    [RecipientKey] nvarchar(200) NOT NULL,
    [ExpiryType] nvarchar(200) NOT NULL,
    [ExpiryDate] datetime2 NOT NULL,
    [ReminderDate] datetime2 NOT NULL,
    [DaysRemaining] int NOT NULL,
    [Subject] nvarchar(200) NOT NULL,
    [Status] nvarchar(200) NOT NULL,
    [AttemptCount] int NOT NULL,
    [ProviderMessageId] nvarchar(200) NULL,
    [ErrorMessage] nvarchar(4000) NULL,
    [SentAtUtc] datetime2 NULL,
    [CorrelationId] nvarchar(200) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_AssetExpiryReminderLogs] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AssetExpiryReminderLogs_Allocations_AllocationId] FOREIGN KEY ([AllocationId]) REFERENCES [Allocations] ([Id]) ON DELETE SET NULL,
    CONSTRAINT [FK_AssetExpiryReminderLogs_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_AssetExpiryReminderLogs_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id]) ON DELETE SET NULL
);
GO


CREATE TABLE [GoodsReceiptItems] (
    [Id] uniqueidentifier NOT NULL,
    [GoodsReceiptId] uniqueidentifier NOT NULL,
    [PurchaseOrderItemId] uniqueidentifier NOT NULL,
    [QuantityReceived] decimal(18,2) NOT NULL,
    [Condition] nvarchar(200) NOT NULL,
    [Notes] nvarchar(200) NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_GoodsReceiptItems] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_GoodsReceiptItems_GoodsReceipts_GoodsReceiptId] FOREIGN KEY ([GoodsReceiptId]) REFERENCES [GoodsReceipts] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_GoodsReceiptItems_PurchaseOrderItems_PurchaseOrderItemId] FOREIGN KEY ([PurchaseOrderItemId]) REFERENCES [PurchaseOrderItems] ([Id]) ON DELETE NO ACTION
);
GO


CREATE TABLE [GoodsReceiptUnits] (
    [Id] uniqueidentifier NOT NULL,
    [GoodsReceiptItemId] uniqueidentifier NOT NULL,
    [SerialNumber] nvarchar(100) NULL,
    [ManufacturerSerialNumber] nvarchar(200) NULL,
    [WarrantyStartDate] datetime2 NULL,
    [WarrantyExpiryDate] datetime2 NULL,
    [AssetId] uniqueidentifier NULL,
    [CreatedAt] datetime2 NOT NULL,
    [UpdatedAt] datetime2 NOT NULL,
    [DeletedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_GoodsReceiptUnits] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_GoodsReceiptUnits_Assets_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [Assets] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_GoodsReceiptUnits_GoodsReceiptItems_GoodsReceiptItemId] FOREIGN KEY ([GoodsReceiptItemId]) REFERENCES [GoodsReceiptItems] ([Id]) ON DELETE NO ACTION
);
GO


CREATE INDEX [IX_ActivityLogs_Entity_EntityId_CreatedAt] ON [ActivityLogs] ([Entity], [EntityId], [CreatedAt]);
GO


CREATE INDEX [IX_ActivityLogs_UserId_CreatedAt] ON [ActivityLogs] ([UserId], [CreatedAt]);
GO


CREATE INDEX [IX_Allocations_AssetId_ReturnedAt] ON [Allocations] ([AssetId], [ReturnedAt]);
GO


CREATE INDEX [IX_Allocations_EmployeeId_ReturnedAt] ON [Allocations] ([EmployeeId], [ReturnedAt]);
GO


CREATE INDEX [IX_Allocations_LocationId] ON [Allocations] ([LocationId]);
GO


CREATE INDEX [IX_AssetExpiryReminderLogs_AllocationId] ON [AssetExpiryReminderLogs] ([AllocationId]);
GO


CREATE UNIQUE INDEX [IX_AssetExpiryReminderLogs_AssetId_ExpiryType_ExpiryDate_RecipientKey_DaysRemaining] ON [AssetExpiryReminderLogs] ([AssetId], [ExpiryType], [ExpiryDate], [RecipientKey], [DaysRemaining]);
GO


CREATE INDEX [IX_AssetExpiryReminderLogs_EmployeeId] ON [AssetExpiryReminderLogs] ([EmployeeId]);
GO


CREATE INDEX [IX_AssetExpiryReminderLogs_RecipientEmail_CreatedAt] ON [AssetExpiryReminderLogs] ([RecipientEmail], [CreatedAt]);
GO


CREATE INDEX [IX_AssetExpiryReminderLogs_ReminderDate_Status] ON [AssetExpiryReminderLogs] ([ReminderDate], [Status]);
GO


CREATE UNIQUE INDEX [IX_AssetMakes_Name] ON [AssetMakes] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Assets_AssetCode] ON [Assets] ([AssetCode]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_Assets_AssetMakeId] ON [Assets] ([AssetMakeId]);
GO


CREATE UNIQUE INDEX [IX_Assets_AssetTag] ON [Assets] ([AssetTag]) WHERE [AssetTag] IS NOT NULL AND [IsDeleted] = 0;
GO


CREATE INDEX [IX_Assets_AssetTypeId_Status] ON [Assets] ([AssetTypeId], [Status]);
GO


CREATE INDEX [IX_Assets_ExpectedExpiryDate] ON [Assets] ([ExpectedExpiryDate]);
GO


CREATE INDEX [IX_Assets_LocationId_Status] ON [Assets] ([LocationId], [Status]);
GO


CREATE INDEX [IX_Assets_MemoryId] ON [Assets] ([MemoryId]);
GO


CREATE INDEX [IX_Assets_MotherboardId] ON [Assets] ([MotherboardId]);
GO


CREATE INDEX [IX_Assets_OperatingSystemId] ON [Assets] ([OperatingSystemId]);
GO


CREATE INDEX [IX_Assets_PurchaseDate] ON [Assets] ([PurchaseDate]);
GO


CREATE UNIQUE INDEX [IX_Assets_SerialNumber] ON [Assets] ([SerialNumber]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_Assets_Status] ON [Assets] ([Status]);
GO


CREATE INDEX [IX_Assets_StorageId] ON [Assets] ([StorageId]);
GO


CREATE INDEX [IX_Assets_VendorId] ON [Assets] ([VendorId]);
GO


CREATE INDEX [IX_Assets_WarrantyExpiryDate] ON [Assets] ([WarrantyExpiryDate]);
GO


CREATE INDEX [IX_AssetStatusHistories_AssetId_EffectiveAt] ON [AssetStatusHistories] ([AssetId], [EffectiveAt]);
GO


CREATE INDEX [IX_AssetStatusHistories_PerformedByUserId] ON [AssetStatusHistories] ([PerformedByUserId]);
GO


CREATE UNIQUE INDEX [IX_AssetTypes_Name] ON [AssetTypes] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_AssetTypes_Prefix] ON [AssetTypes] ([Prefix]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_BackupRuns_RequestedByUserId] ON [BackupRuns] ([RequestedByUserId]);
GO


CREATE INDEX [IX_BackupRuns_Status_CreatedAt] ON [BackupRuns] ([Status], [CreatedAt]);
GO


CREATE UNIQUE INDEX [IX_Cities_ProvinceId_Name] ON [Cities] ([ProvinceId], [Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Departments_Name] ON [Departments] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_EmailVerificationTokens_TokenHash] ON [EmailVerificationTokens] ([TokenHash]);
GO


CREATE INDEX [IX_EmailVerificationTokens_UserId] ON [EmailVerificationTokens] ([UserId]);
GO


CREATE INDEX [IX_Employees_DepartmentId_Status] ON [Employees] ([DepartmentId], [Status]);
GO


CREATE UNIQUE INDEX [IX_Employees_Email] ON [Employees] ([Email]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Employees_EmployeeId] ON [Employees] ([EmployeeId]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_Employees_LocationId] ON [Employees] ([LocationId]);
GO


CREATE INDEX [IX_Employees_OfficeId] ON [Employees] ([OfficeId]);
GO


CREATE UNIQUE INDEX [IX_GoodsReceiptItems_GoodsReceiptId_PurchaseOrderItemId] ON [GoodsReceiptItems] ([GoodsReceiptId], [PurchaseOrderItemId]);
GO


CREATE INDEX [IX_GoodsReceiptItems_PurchaseOrderItemId] ON [GoodsReceiptItems] ([PurchaseOrderItemId]);
GO


CREATE INDEX [IX_GoodsReceipts_PurchaseOrderId] ON [GoodsReceipts] ([PurchaseOrderId]);
GO


CREATE UNIQUE INDEX [IX_GoodsReceipts_ReceiptNumber] ON [GoodsReceipts] ([ReceiptNumber]);
GO


CREATE UNIQUE INDEX [IX_GoodsReceiptUnits_AssetId] ON [GoodsReceiptUnits] ([AssetId]) WHERE [AssetId] IS NOT NULL;
GO


CREATE INDEX [IX_GoodsReceiptUnits_GoodsReceiptItemId] ON [GoodsReceiptUnits] ([GoodsReceiptItemId]);
GO


CREATE UNIQUE INDEX [IX_GoodsReceiptUnits_SerialNumber] ON [GoodsReceiptUnits] ([SerialNumber]) WHERE [SerialNumber] IS NOT NULL;
GO


CREATE UNIQUE INDEX [IX_LifecyclePolicies_AssetTypeId] ON [LifecyclePolicies] ([AssetTypeId]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Locations_CityId_Name] ON [Locations] ([CityId], [Name]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_Locations_ProvinceId] ON [Locations] ([ProvinceId]);
GO


CREATE INDEX [IX_LoginActivities_EmailAttempted_CreatedAt] ON [LoginActivities] ([EmailAttempted], [CreatedAt]);
GO


CREATE INDEX [IX_LoginActivities_UserId] ON [LoginActivities] ([UserId]);
GO


CREATE UNIQUE INDEX [IX_Memories_Size_Type] ON [Memories] ([Size], [Type]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Motherboards_Name_Generation] ON [Motherboards] ([Name], [Generation]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_Notifications_UserId_ReadAt_CreatedAt] ON [Notifications] ([UserId], [ReadAt], [CreatedAt]);
GO


CREATE UNIQUE INDEX [IX_Offices_LocationId_Name] ON [Offices] ([LocationId], [Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_OperatingSystems_Name_Version] ON [OperatingSystems] ([Name], [Version]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_PasswordResetTokens_TokenHash] ON [PasswordResetTokens] ([TokenHash]);
GO


CREATE INDEX [IX_PasswordResetTokens_UserId] ON [PasswordResetTokens] ([UserId]);
GO


CREATE INDEX [IX_PermissionHistory_ChangedByUserId] ON [PermissionHistory] ([ChangedByUserId]);
GO


CREATE INDEX [IX_PermissionHistory_PermissionId] ON [PermissionHistory] ([PermissionId]);
GO


CREATE INDEX [IX_PermissionHistory_UserId_ChangedAt] ON [PermissionHistory] ([UserId], [ChangedAt]);
GO


CREATE UNIQUE INDEX [IX_Permissions_Code] ON [Permissions] ([Code]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Provinces_Name] ON [Provinces] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_PurchaseOrderAttachments_PurchaseOrderId] ON [PurchaseOrderAttachments] ([PurchaseOrderId]);
GO


CREATE INDEX [IX_PurchaseOrderItems_AssetMakeId] ON [PurchaseOrderItems] ([AssetMakeId]);
GO


CREATE INDEX [IX_PurchaseOrderItems_AssetTypeId] ON [PurchaseOrderItems] ([AssetTypeId]);
GO


CREATE INDEX [IX_PurchaseOrderItems_BranchUnitId] ON [PurchaseOrderItems] ([BranchUnitId]);
GO


CREATE INDEX [IX_PurchaseOrderItems_IntendedUserId] ON [PurchaseOrderItems] ([IntendedUserId]);
GO


CREATE UNIQUE INDEX [IX_PurchaseOrderItems_PurchaseOrderId_LineNumber] ON [PurchaseOrderItems] ([PurchaseOrderId], [LineNumber]);
GO


CREATE INDEX [IX_PurchaseOrders_CreatedByUserId] ON [PurchaseOrders] ([CreatedByUserId]);
GO


CREATE INDEX [IX_PurchaseOrders_DeliveryLocationId] ON [PurchaseOrders] ([DeliveryLocationId]);
GO


CREATE UNIQUE INDEX [IX_PurchaseOrders_PoNumber] ON [PurchaseOrders] ([PoNumber]);
GO


CREATE INDEX [IX_PurchaseOrders_PoYear_VendorId] ON [PurchaseOrders] ([PoYear], [VendorId]);
GO


CREATE INDEX [IX_PurchaseOrders_Status_PoDate] ON [PurchaseOrders] ([Status], [PoDate]);
GO


CREATE INDEX [IX_PurchaseOrders_VendorId] ON [PurchaseOrders] ([VendorId]);
GO


CREATE INDEX [IX_PurchaseOrderStatusHistory_PerformedByUserId] ON [PurchaseOrderStatusHistory] ([PerformedByUserId]);
GO


CREATE INDEX [IX_PurchaseOrderStatusHistory_PurchaseOrderId_PerformedAt] ON [PurchaseOrderStatusHistory] ([PurchaseOrderId], [PerformedAt]);
GO


CREATE UNIQUE INDEX [IX_RefreshTokens_TokenHash] ON [RefreshTokens] ([TokenHash]);
GO


CREATE INDEX [IX_RefreshTokens_UserId_ExpiresAt] ON [RefreshTokens] ([UserId], [ExpiresAt]);
GO


CREATE INDEX [IX_ReportRuns_UserId_CreatedAt] ON [ReportRuns] ([UserId], [CreatedAt]);
GO


CREATE INDEX [IX_Retirements_AssetId_ExpirationDate] ON [Retirements] ([AssetId], [ExpirationDate]);
GO


CREATE INDEX [IX_Retirements_DisposalVendorId] ON [Retirements] ([DisposalVendorId]);
GO


CREATE INDEX [IX_Revocations_AssetId_RevocationDate] ON [Revocations] ([AssetId], [RevocationDate]);
GO


CREATE INDEX [IX_Revocations_EmployeeId] ON [Revocations] ([EmployeeId]);
GO


CREATE INDEX [IX_RolePermissions_PermissionId] ON [RolePermissions] ([PermissionId]);
GO


CREATE UNIQUE INDEX [IX_Roles_Name] ON [Roles] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Storages_Type_Capacity] ON [Storages] ([Type], [Capacity]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_StoredFiles_EntityType_EntityId] ON [StoredFiles] ([EntityType], [EntityId]);
GO


CREATE INDEX [IX_StoredFiles_UploadedByUserId] ON [StoredFiles] ([UploadedByUserId]);
GO


CREATE UNIQUE INDEX [IX_UserNotificationPreferences_UserId] ON [UserNotificationPreferences] ([UserId]) WHERE [IsDeleted] = 0;
GO


CREATE INDEX [IX_UserPermissions_PermissionId] ON [UserPermissions] ([PermissionId]);
GO


CREATE INDEX [IX_UserRoles_RoleId] ON [UserRoles] ([RoleId]);
GO


CREATE INDEX [IX_Users_DepartmentId] ON [Users] ([DepartmentId]);
GO


CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Users_EmployeeCode] ON [Users] ([EmployeeCode]) WHERE [EmployeeCode] IS NOT NULL AND [IsDeleted] = 0;
GO


CREATE INDEX [IX_Users_LocationId] ON [Users] ([LocationId]);
GO


CREATE INDEX [IX_Users_Status_Role] ON [Users] ([Status], [Role]);
GO


CREATE UNIQUE INDEX [IX_Vendors_Name] ON [Vendors] ([Name]) WHERE [IsDeleted] = 0;
GO


CREATE UNIQUE INDEX [IX_Vendors_Ntn] ON [Vendors] ([Ntn]) WHERE [Ntn] IS NOT NULL AND [IsDeleted] = 0;
GO


