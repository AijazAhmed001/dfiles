using EFU.Inventory.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider sp)
    {
        var db = sp.GetRequiredService<AppDbContext>();
        var environment = sp.GetRequiredService<IWebHostEnvironment>();
        var configuration = sp.GetRequiredService<IConfiguration>();

        // RBAC seed
        var roleDefinitions = new[]
        {
            new { Name = Roles.SuperAdmin, Description = "Full system administration and security management" },
            new { Name = Roles.ItAdmin, Description = "IT inventory operations, setup and reporting" },
            new { Name = Roles.Viewer, Description = "Read-only inventory and reporting access" }
        };
        foreach (var definition in roleDefinitions)
            if (!await db.Roles.AnyAsync(x => x.Name == definition.Name))
                db.Roles.Add(new AppRole { Name = definition.Name, Description = definition.Description });
        await db.SaveChangesAsync();

        var permissionDefinitions = new (string Code, string Name)[]
        {
            ("dashboard.view", "View dashboard"),
            ("assets.view", "View assets"), ("assets.create", "Create assets"), ("assets.update", "Update assets"), ("assets.delete", "Delete assets"),
            ("transactions.allocate", "Allocate assets"), ("transactions.revoke", "Revoke assets"), ("transactions.retire", "Retire assets"),
            ("master.view", "View master data"), ("master.manage", "Manage master data"),
            ("reports.view", "View reports"), ("reports.export", "Export reports"),
            ("users.manage", "Manage users and roles"), ("settings.manage", "Manage system settings"),
            ("audit.view", "View audit logs"), ("backup.manage", "Manage backups")
        };
        foreach (var (code, name) in permissionDefinitions)
            if (!await db.Permissions.AnyAsync(x => x.Code == code))
                db.Permissions.Add(new Permission { Code = code, Name = name });
        await db.SaveChangesAsync();

        var allPermissions = await db.Permissions.ToListAsync();
        var roles = await db.Roles.ToDictionaryAsync(x => x.Name);
        foreach (var permission in allPermissions)
        {
            if (!await db.RolePermissions.AnyAsync(x => x.RoleId == roles[Roles.SuperAdmin].Id && x.PermissionId == permission.Id))
                db.RolePermissions.Add(new RolePermission { RoleId = roles[Roles.SuperAdmin].Id, PermissionId = permission.Id });
        }
        var adminCodes = new HashSet<string> { "dashboard.view", "assets.view", "assets.create", "assets.update", "transactions.allocate", "transactions.revoke", "transactions.retire", "master.view", "master.manage", "reports.view", "reports.export", "audit.view", "settings.manage" };
        var viewerCodes = new HashSet<string> { "dashboard.view", "assets.view", "master.view", "reports.view" };
        foreach (var permission in allPermissions.Where(x => adminCodes.Contains(x.Code)))
            if (!await db.RolePermissions.AnyAsync(x => x.RoleId == roles[Roles.ItAdmin].Id && x.PermissionId == permission.Id))
                db.RolePermissions.Add(new RolePermission { RoleId = roles[Roles.ItAdmin].Id, PermissionId = permission.Id });
        foreach (var permission in allPermissions.Where(x => viewerCodes.Contains(x.Code)))
            if (!await db.RolePermissions.AnyAsync(x => x.RoleId == roles[Roles.Viewer].Id && x.PermissionId == permission.Id))
                db.RolePermissions.Add(new RolePermission { RoleId = roles[Roles.Viewer].Id, PermissionId = permission.Id });
        await db.SaveChangesAsync();

        // Geographic / organizational seed
        if (!await db.Provinces.AnyAsync())
            db.Provinces.AddRange(
                new Province { Name = "Sindh" }, new Province { Name = "Punjab" }, new Province { Name = "Khyber Pakhtunkhwa" },
                new Province { Name = "Balochistan" }, new Province { Name = "Gilgit-Baltistan" }, new Province { Name = "Azad Jammu & Kashmir" });
        if (!await db.Departments.AnyAsync())
            db.Departments.AddRange(new Department { Name = "Information Technology" }, new Department { Name = "Finance" }, new Department { Name = "Human Resources" }, new Department { Name = "Operations" }, new Department { Name = "Sales" }, new Department { Name = "Administration" });
        await db.SaveChangesAsync();

        var sindh = await db.Provinces.FirstAsync(x => x.Name == "Sindh");
        if (!await db.Cities.AnyAsync(x => x.Name == "Karachi" && x.ProvinceId == sindh.Id))
            db.Cities.Add(new City { Name = "Karachi", ProvinceId = sindh.Id });
        await db.SaveChangesAsync();
        var karachi = await db.Cities.FirstAsync(x => x.Name == "Karachi" && x.ProvinceId == sindh.Id);
        if (!await db.Locations.AnyAsync(x => x.Name == "EFU House, Clifton"))
            db.Locations.Add(new Location { Name = "EFU House, Clifton", ProvinceId = sindh.Id, CityId = karachi.Id });
        await db.SaveChangesAsync();
        var mainLocation = await db.Locations.FirstAsync(x => x.Name == "EFU House, Clifton");
        if (!await db.Offices.AnyAsync(x => x.Name == "Head Office"))
            db.Offices.Add(new Office { Name = "Head Office", LocationId = mainLocation.Id });

        // Hardware lookup seed
        if (!await db.AssetTypes.AnyAsync())
            db.AssetTypes.AddRange(
                new AssetType { Name = "Laptop", Prefix = "LAP", Description = "Portable computing device" },
                new AssetType { Name = "Desktop", Prefix = "DSK", Description = "Stationary computing device" },
                new AssetType { Name = "Monitor", Prefix = "MON", Description = "Display screen unit" },
                new AssetType { Name = "Printer", Prefix = "PRT", Description = "Document printing device" },
                new AssetType { Name = "Server", Prefix = "SVR", Description = "Server hardware" },
                new AssetType { Name = "UPS", Prefix = "UPS", Description = "Uninterruptible power supply" },
                new AssetType { Name = "Switch", Prefix = "SW", Description = "Network switch" });
        if (!await db.AssetMakes.AnyAsync())
            db.AssetMakes.AddRange(new AssetMake { Name = "Dell Technologies" }, new AssetMake { Name = "HP Inc." }, new AssetMake { Name = "Lenovo" }, new AssetMake { Name = "Apple" }, new AssetMake { Name = "Samsung" }, new AssetMake { Name = "Cisco Systems" });
        if (!await db.Motherboards.AnyAsync())
            db.Motherboards.AddRange(new Motherboard { Name = "Intel Core i5", Generation = "12th Gen" }, new Motherboard { Name = "Intel Core i7", Generation = "13th Gen" }, new Motherboard { Name = "AMD Ryzen 5", Generation = "7000 Series" });
        if (!await db.Memories.AnyAsync())
            db.Memories.AddRange(new Memory { Size = "8 GB", Type = "DDR4" }, new Memory { Size = "16 GB", Type = "DDR4" }, new Memory { Size = "32 GB", Type = "DDR5" });
        if (!await db.Storages.AnyAsync())
            db.Storages.AddRange(new Storage { Type = "SSD", Capacity = "256 GB" }, new Storage { Type = "NVMe SSD", Capacity = "512 GB" }, new Storage { Type = "HDD", Capacity = "1 TB" });
        if (!await db.OperatingSystems.AnyAsync())
            db.OperatingSystems.AddRange(new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Windows", Version = "11 Pro" }, new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Windows", Version = "10 Pro" }, new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Ubuntu", Version = "22.04 LTS" }, new EFU.Inventory.Backend.Models.OperatingSystem { Name = "macOS", Version = "Current" });
        if (!await db.Vendors.AnyAsync())
            db.Vendors.AddRange(new Vendor { Name = "Dell Pakistan", Contact = "Corporate Sales", Email = "sales@example.invalid", Status = "ACTIVE" }, new Vendor { Name = "HP Pakistan", Contact = "Corporate Sales", Email = "sales-hp@example.invalid", Status = "ACTIVE" });
        await db.SaveChangesAsync();

        foreach (var type in await db.AssetTypes.ToListAsync())
        {
            if (await db.LifecyclePolicies.AnyAsync(x => x.AssetTypeId == type.Id)) continue;
            var laptop = type.Name == "Laptop";
            db.LifecyclePolicies.Add(new LifecyclePolicy
            {
                AssetTypeId = type.Id,
                ExpectedLifespanYears = laptop ? 3 : 5,
                WarrantyPeriodYears = laptop ? 3 : 1,
                DepreciationMethod = "STRAIGHT_LINE",
                SalvageValuePercent = 10,
                EndOfLifeAction = "DISPOSE"
            });
        }
        await db.SaveChangesAsync();

        // Development has convenient local defaults. A new non-development database
        // must receive explicit bootstrap credentials through configuration.
        var bootstrapEmail = configuration["BootstrapAdmin:Email"];
        var bootstrapPassword = configuration["BootstrapAdmin:Password"];
        if (environment.IsDevelopment())
        {
            bootstrapEmail ??= "admin@efu.com.pk";
            bootstrapPassword ??= "Password@123";
        }

        var admin = !string.IsNullOrWhiteSpace(bootstrapEmail)
            ? await db.Users.FirstOrDefaultAsync(x => x.Email == bootstrapEmail)
            : await db.Users.FirstOrDefaultAsync(x => x.Role == Roles.SuperAdmin);
        if (admin is null)
        {
            if (string.IsNullOrWhiteSpace(bootstrapEmail) || string.IsNullOrWhiteSpace(bootstrapPassword))
                throw new InvalidOperationException(
                    "A new non-development database requires BootstrapAdmin:Email and BootstrapAdmin:Password.");

            var it = await db.Departments.FirstAsync(x => x.Name == "Information Technology");
            admin = new User
            {
                Name = "System Administrator",
                Email = bootstrapEmail.Trim().ToLowerInvariant(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(bootstrapPassword),
                Role = Roles.SuperAdmin,
                Status = "ACTIVE",
                EmployeeCode = "EFU-ADM-0001",
                DepartmentId = it.Id,
                LocationId = mainLocation.Id,
                EmailVerified = true,
                PasswordChangedAt = DateTime.UtcNow
            };
            db.Users.Add(admin);
            await db.SaveChangesAsync();
        }
        var superRole = roles[Roles.SuperAdmin];
        if (!await db.UserRoles.AnyAsync(x => x.UserId == admin.Id && x.RoleId == superRole.Id))
            db.UserRoles.Add(new UserRole { UserId = admin.Id, RoleId = superRole.Id });
        if (!await db.UserNotificationPreferences.AnyAsync(x => x.UserId == admin.Id))
            db.UserNotificationPreferences.Add(new UserNotificationPreference { UserId = admin.Id });

        // Settings represented by the frontend settings screen.
        var defaultSettings = new Dictionary<string, (object Value, string Category)>
        {
            ["companyName"] = ("EFU General Insurance", "GENERAL"),
            ["systemName"] = ("IT Hardware Inventory Management System", "GENERAL"),
            ["timezone"] = ("Asia/Karachi", "REGIONAL"),
            ["dateFormat"] = ("dd MMM yyyy", "REGIONAL"),
            ["currency"] = ("PKR", "REGIONAL"),
            ["twoFactorAuthentication"] = (false, "SECURITY"),
            ["sessionTimeoutMinutes"] = (30, "SECURITY"),
            ["passwordExpiryDays"] = (90, "SECURITY"),
            ["passwordRequireUppercase"] = (true, "SECURITY"),
            ["passwordRequireNumber"] = (true, "SECURITY"),
            ["passwordRequireSpecial"] = (true, "SECURITY"),
            ["automaticBackup"] = (true, "BACKUP")
        };
        foreach (var (key, item) in defaultSettings)
        {
            if (await db.SystemSettings.AnyAsync(x => x.Key == key)) continue;
            db.SystemSettings.Add(new SystemSetting
            {
                Key = key,
                Value = System.Text.Json.JsonSerializer.Serialize(item.Value),
                Category = item.Category,
                UpdatedByUserId = admin.Id
            });
        }


        // Additional enterprise demonstration data.
        // This block only inserts missing records and does not modify or remove existing data.
        var extraAssetTypes = new[]
        {
            new AssetType { Name = "Mouse", Prefix = "MOU", Description = "Computer pointing device" },
            new AssetType { Name = "Keyboard", Prefix = "KEY", Description = "Computer keyboard" },
            new AssetType { Name = "Router", Prefix = "RTR", Description = "Enterprise routing equipment" },
            new AssetType { Name = "Rack", Prefix = "RCK", Description = "Data-centre equipment rack" },
            new AssetType { Name = "Camera", Prefix = "CAM", Description = "CCTV and surveillance camera" },
            new AssetType { Name = "Access Point", Prefix = "AP", Description = "Wireless network access point" },
            new AssetType { Name = "Scanner", Prefix = "SCN", Description = "Document scanning device" },
            new AssetType { Name = "IP Phone", Prefix = "IPP", Description = "Enterprise IP telephone" }
        };
        foreach (var item in extraAssetTypes)
            if (!await db.AssetTypes.AnyAsync(x => x.Name == item.Name || x.Prefix == item.Prefix))
                db.AssetTypes.Add(item);

        var extraMakes = new[]
        {
            "Logitech", "Canon", "Epson", "APC", "Fortinet", "Juniper Networks",
            "Hikvision", "Zebra Technologies", "Microsoft", "LG Electronics"
        };
        foreach (var name in extraMakes)
            if (!await db.AssetMakes.AnyAsync(x => x.Name == name))
                db.AssetMakes.Add(new AssetMake { Name = name });

        var extraDepartments = new[]
        {
            "Claims", "Underwriting", "Compliance", "Internal Audit", "Legal",
            "Marketing", "Customer Services", "Risk Management", "Procurement"
        };
        foreach (var name in extraDepartments)
            if (!await db.Departments.AnyAsync(x => x.Name == name))
                db.Departments.Add(new Department { Name = name });

        var extraVendors = new[]
        {
            new Vendor { Name = "Premier Systems", Contact = "Corporate Sales", Phone = "+92-21-111-773-643", Email = "corporate@premiersystems.example", Address = "PECHS, Karachi", Ntn = "0712345-8" },
            new Vendor { Name = "Inbox Business Technologies", Contact = "Enterprise Sales", Phone = "+92-21-111-462-692", Email = "corporate@inbox.example", Address = "Shahrah-e-Faisal, Karachi", Ntn = "0712345-9" },
            new Vendor { Name = "TechAccess Pakistan", Contact = "Business Sales", Phone = "+92-21-3456-7890", Email = "sales@techaccess.example", Address = "Techno City, Karachi", Ntn = "0712346-0" },
            new Vendor { Name = "Galaxy Computers", Contact = "Corporate Desk", Phone = "+92-21-3529-0000", Email = "business@galaxy.example", Address = "Clifton, Karachi", Ntn = "0712346-1" },
            new Vendor { Name = "Computer Zone", Contact = "Corporate Desk", Phone = "+92-21-3586-0000", Email = "corporate@czone.example", Address = "Karachi", Ntn = "0712346-2" },
            new Vendor { Name = "Cisco Authorized Partner Pakistan", Contact = "Enterprise Networking", Phone = "+92-21-3432-1000", Email = "enterprise@cisco-partner.example", Address = "Korangi, Karachi", Ntn = "0712346-3" },
            new Vendor { Name = "APC Power Solutions", Contact = "Power Solutions", Phone = "+92-21-3432-3000", Email = "power@apcpartner.example", Address = "Korangi Industrial Area, Karachi", Ntn = "0712346-5" },
            new Vendor { Name = "Canon Business Solutions", Contact = "Corporate Printing", Phone = "+92-21-3432-4000", Email = "business@canonpartner.example", Address = "Saddar, Karachi", Ntn = "0712346-6" }
        };
        foreach (var item in extraVendors)
            if (!await db.Vendors.AnyAsync(x => x.Name == item.Name))
                db.Vendors.Add(item);

        var extraMemories = new[]
        {
            new Memory { Size = "4 GB", Type = "DDR4" },
            new Memory { Size = "8 GB", Type = "DDR5" },
            new Memory { Size = "16 GB", Type = "DDR5" },
            new Memory { Size = "64 GB", Type = "DDR5" },
            new Memory { Size = "128 GB", Type = "DDR4 ECC" }
        };
        foreach (var item in extraMemories)
            if (!await db.Memories.AnyAsync(x => x.Size == item.Size && x.Type == item.Type))
                db.Memories.Add(item);

        var extraStorages = new[]
        {
            new Storage { Type = "SSD", Capacity = "512 GB" },
            new Storage { Type = "SSD", Capacity = "1 TB" },
            new Storage { Type = "NVMe SSD", Capacity = "1 TB" },
            new Storage { Type = "NVMe SSD", Capacity = "2 TB" },
            new Storage { Type = "HDD", Capacity = "2 TB" },
            new Storage { Type = "HDD", Capacity = "4 TB" }
        };
        foreach (var item in extraStorages)
            if (!await db.Storages.AnyAsync(x => x.Type == item.Type && x.Capacity == item.Capacity))
                db.Storages.Add(item);

        var extraProcessors = new[]
        {
            new Motherboard { Name = "Intel Core i5", Generation = "10th Gen" },
            new Motherboard { Name = "Intel Core i5", Generation = "11th Gen" },
            new Motherboard { Name = "Intel Core i7", Generation = "11th Gen" },
            new Motherboard { Name = "Intel Xeon Silver", Generation = "4310" },
            new Motherboard { Name = "Apple M2", Generation = "2nd Generation" }
        };
        foreach (var item in extraProcessors)
            if (!await db.Motherboards.AnyAsync(x => x.Name == item.Name && x.Generation == item.Generation))
                db.Motherboards.Add(item);

        var extraOperatingSystems = new[]
        {
            new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Windows Server", Version = "2022 Standard" },
            new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Windows Server", Version = "2022 Datacenter" },
            new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Ubuntu Server", Version = "22.04 LTS" },
            new EFU.Inventory.Backend.Models.OperatingSystem { Name = "FortiOS", Version = "7.4" },
            new EFU.Inventory.Backend.Models.OperatingSystem { Name = "Cisco IOS XE", Version = "17.9" }
        };
        foreach (var item in extraOperatingSystems)
            if (!await db.OperatingSystems.AnyAsync(x => x.Name == item.Name && x.Version == item.Version))
                db.OperatingSystems.Add(item);

        await db.SaveChangesAsync();

        var provinceSeed = new[]
        {
            new { Province = "Sindh", City = "Hyderabad" },
            new { Province = "Sindh", City = "Sukkur" },
            new { Province = "Punjab", City = "Lahore" },
            new { Province = "Punjab", City = "Rawalpindi" },
            new { Province = "Punjab", City = "Faisalabad" },
            new { Province = "Punjab", City = "Multan" },
            new { Province = "Khyber Pakhtunkhwa", City = "Peshawar" },
            new { Province = "Balochistan", City = "Quetta" }
        };
        foreach (var item in provinceSeed)
        {
            var province = await db.Provinces.FirstAsync(x => x.Name == item.Province);
            if (!await db.Cities.AnyAsync(x => x.Name == item.City && x.ProvinceId == province.Id))
                db.Cities.Add(new City { Name = item.City, ProvinceId = province.Id });
        }
        await db.SaveChangesAsync();

        var locationSeed = new[]
        {
            new { Name = "EFU Shahrah-e-Faisal Office", Province = "Sindh", City = "Karachi" },
            new { Name = "EFU Korangi Data Centre", Province = "Sindh", City = "Karachi" },
            new { Name = "EFU Hyderabad Branch", Province = "Sindh", City = "Hyderabad" },
            new { Name = "EFU Sukkur Branch", Province = "Sindh", City = "Sukkur" },
            new { Name = "EFU Lahore Regional Office", Province = "Punjab", City = "Lahore" },
            new { Name = "EFU Rawalpindi Branch", Province = "Punjab", City = "Rawalpindi" },
            new { Name = "EFU Peshawar Branch", Province = "Khyber Pakhtunkhwa", City = "Peshawar" },
            new { Name = "EFU Quetta Branch", Province = "Balochistan", City = "Quetta" }
        };
        foreach (var item in locationSeed)
        {
            var province = await db.Provinces.FirstAsync(x => x.Name == item.Province);
            var city = await db.Cities.FirstAsync(x => x.Name == item.City && x.ProvinceId == province.Id);
            if (!await db.Locations.AnyAsync(x => x.Name == item.Name))
                db.Locations.Add(new Location { Name = item.Name, ProvinceId = province.Id, CityId = city.Id });
        }
        await db.SaveChangesAsync();

        var officeSeed = new[]
        {
            new { Name = "Primary Data Centre", Location = "EFU Korangi Data Centre" },
            new { Name = "Karachi Operations Office", Location = "EFU Shahrah-e-Faisal Office" },
            new { Name = "Hyderabad Branch Office", Location = "EFU Hyderabad Branch" },
            new { Name = "Sukkur Branch Office", Location = "EFU Sukkur Branch" },
            new { Name = "Lahore Regional Office", Location = "EFU Lahore Regional Office" },
            new { Name = "Rawalpindi Branch Office", Location = "EFU Rawalpindi Branch" },
            new { Name = "Peshawar Branch Office", Location = "EFU Peshawar Branch" },
            new { Name = "Quetta Branch Office", Location = "EFU Quetta Branch" }
        };
        foreach (var item in officeSeed)
        {
            var location = await db.Locations.FirstAsync(x => x.Name == item.Location);
            if (!await db.Offices.AnyAsync(x => x.Name == item.Name))
                db.Offices.Add(new Office { Name = item.Name, LocationId = location.Id });
        }
        await db.SaveChangesAsync();

        var employeeSeed = new[]
        {
            new { Name = "Ali Ahmed", Code = "EFU-EMP-0001", Email = "ali.ahmed@efu.example", Phone = "+92-300-1000001", Department = "Information Technology", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Sara Khan", Code = "EFU-EMP-0002", Email = "sara.khan@efu.example", Phone = "+92-300-1000002", Department = "Human Resources", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Ahmed Raza", Code = "EFU-EMP-0003", Email = "ahmed.raza@efu.example", Phone = "+92-300-1000003", Department = "Finance", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Fatima Noor", Code = "EFU-EMP-0004", Email = "fatima.noor@efu.example", Phone = "+92-300-1000004", Department = "Claims", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Muhammad Hamza", Code = "EFU-EMP-0005", Email = "muhammad.hamza@efu.example", Phone = "+92-300-1000005", Department = "Underwriting", Location = "EFU Shahrah-e-Faisal Office", Office = "Karachi Operations Office" },
            new { Name = "Ayesha Siddiqui", Code = "EFU-EMP-0006", Email = "ayesha.siddiqui@efu.example", Phone = "+92-300-1000006", Department = "Compliance", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Bilal Hussain", Code = "EFU-EMP-0007", Email = "bilal.hussain@efu.example", Phone = "+92-300-1000007", Department = "Operations", Location = "EFU Shahrah-e-Faisal Office", Office = "Karachi Operations Office" },
            new { Name = "Mariam Ali", Code = "EFU-EMP-0008", Email = "mariam.ali@efu.example", Phone = "+92-300-1000008", Department = "Internal Audit", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Usman Tariq", Code = "EFU-EMP-0009", Email = "usman.tariq@efu.example", Phone = "+92-300-1000009", Department = "Information Technology", Location = "EFU Korangi Data Centre", Office = "Primary Data Centre" },
            new { Name = "Hina Shah", Code = "EFU-EMP-0010", Email = "hina.shah@efu.example", Phone = "+92-300-1000010", Department = "Administration", Location = "EFU House, Clifton", Office = "Head Office" },
            new { Name = "Owais Ahmed", Code = "EFU-EMP-0011", Email = "owais.ahmed@efu.example", Phone = "+92-300-1000011", Department = "Customer Services", Location = "EFU Hyderabad Branch", Office = "Hyderabad Branch Office" },
            new { Name = "Nida Fatima", Code = "EFU-EMP-0012", Email = "nida.fatima@efu.example", Phone = "+92-300-1000012", Department = "Claims", Location = "EFU Hyderabad Branch", Office = "Hyderabad Branch Office" },
            new { Name = "Fahad Khan", Code = "EFU-EMP-0013", Email = "fahad.khan@efu.example", Phone = "+92-300-1000013", Department = "Operations", Location = "EFU Lahore Regional Office", Office = "Lahore Regional Office" },
            new { Name = "Meher Bano", Code = "EFU-EMP-0014", Email = "meher.bano@efu.example", Phone = "+92-300-1000014", Department = "Underwriting", Location = "EFU Lahore Regional Office", Office = "Lahore Regional Office" },
            new { Name = "Kamran Ali", Code = "EFU-EMP-0015", Email = "kamran.ali@efu.example", Phone = "+92-300-1000015", Department = "Information Technology", Location = "EFU Rawalpindi Branch", Office = "Rawalpindi Branch Office" },
            new { Name = "Sundus Ahmed", Code = "EFU-EMP-0016", Email = "sundus.ahmed@efu.example", Phone = "+92-300-1000016", Department = "Finance", Location = "EFU Peshawar Branch", Office = "Peshawar Branch Office" },
            new { Name = "Hassan Javed", Code = "EFU-EMP-0017", Email = "hassan.javed@efu.example", Phone = "+92-300-1000017", Department = "Operations", Location = "EFU Quetta Branch", Office = "Quetta Branch Office" },
            new { Name = "Rabia Noor", Code = "EFU-EMP-0018", Email = "rabia.noor@efu.example", Phone = "+92-300-1000018", Department = "Procurement", Location = "EFU House, Clifton", Office = "Head Office" }
        };
        foreach (var item in employeeSeed)
        {
            if (await db.Employees.AnyAsync(x => x.EmployeeId == item.Code || x.Email == item.Email))
                continue;

            var department = await db.Departments.FirstAsync(x => x.Name == item.Department);
            var location = await db.Locations.FirstAsync(x => x.Name == item.Location);
            var office = await db.Offices.FirstAsync(x => x.Name == item.Office);
            db.Employees.Add(new Employee
            {
                Name = item.Name,
                EmployeeId = item.Code,
                Email = item.Email,
                Phone = item.Phone,
                DepartmentId = department.Id,
                LocationId = location.Id,
                OfficeId = office.Id
            });
        }
        await db.SaveChangesAsync();

        var assetSeed = new[]
        {
            new { Code = "EFU-LAP-0001", Serial = "DELL-LAT-7440-0001", Model = "Latitude 7440", Type = "Laptop", Make = "Dell Technologies", Vendor = "Dell Pakistan", Location = "EFU House, Clifton", Cost = 285000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-LAP-0002", Serial = "HP-EB840-G10-0002", Model = "EliteBook 840 G10", Type = "Laptop", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU House, Clifton", Cost = 265000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-LAP-0003", Serial = "LEN-T14-G4-0003", Model = "ThinkPad T14 Gen 4", Type = "Laptop", Make = "Lenovo", Vendor = "Premier Systems", Location = "EFU Korangi Data Centre", Cost = 295000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-LAP-0004", Serial = "APPLE-MBA-M2-0004", Model = "MacBook Air M2", Type = "Laptop", Make = "Apple", Vendor = "Inbox Business Technologies", Location = "EFU House, Clifton", Cost = 345000m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-LAP-0005", Serial = "DELL-LAT-5430-0005", Model = "Latitude 5430", Type = "Laptop", Make = "Dell Technologies", Vendor = "Dell Pakistan", Location = "EFU Lahore Regional Office", Cost = 215000m, Status = AssetStatuses.Allocated, YearsAgo = 2 },
            new { Code = "EFU-LAP-0006", Serial = "HP-PB450-G9-0006", Model = "ProBook 450 G9", Type = "Laptop", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU Hyderabad Branch", Cost = 205000m, Status = AssetStatuses.Allocated, YearsAgo = 2 },
            new { Code = "EFU-LAP-0007", Serial = "LEN-E14-G5-0007", Model = "ThinkPad E14 Gen 5", Type = "Laptop", Make = "Lenovo", Vendor = "Premier Systems", Location = "EFU House, Clifton", Cost = 235000m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-DSK-0001", Serial = "DELL-OPT-7010-0001", Model = "OptiPlex 7010 SFF", Type = "Desktop", Make = "Dell Technologies", Vendor = "Dell Pakistan", Location = "EFU House, Clifton", Cost = 185000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-DSK-0002", Serial = "HP-PRO-400-G9-0002", Model = "Pro Tower 400 G9", Type = "Desktop", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU House, Clifton", Cost = 175000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-DSK-0003", Serial = "LEN-M70S-G4-0003", Model = "ThinkCentre M70s Gen 4", Type = "Desktop", Make = "Lenovo", Vendor = "Premier Systems", Location = "EFU House, Clifton", Cost = 195000m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-MON-0001", Serial = "DELL-P2422H-0001", Model = "P2422H 24-inch Monitor", Type = "Monitor", Make = "Dell Technologies", Vendor = "Dell Pakistan", Location = "EFU House, Clifton", Cost = 62000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-MON-0002", Serial = "HP-E24-G5-0002", Model = "E24 G5 24-inch Monitor", Type = "Monitor", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU House, Clifton", Cost = 58000m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-MOU-0001", Serial = "LOGI-MX3S-0001", Model = "MX Master 3S", Type = "Mouse", Make = "Logitech", Vendor = "Galaxy Computers", Location = "EFU House, Clifton", Cost = 32000m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-MOU-0002", Serial = "LOGI-M185-0002", Model = "M185 Wireless Mouse", Type = "Mouse", Make = "Logitech", Vendor = "Computer Zone", Location = "EFU House, Clifton", Cost = 4200m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-KEY-0001", Serial = "LOGI-K580-0001", Model = "K580 Wireless Keyboard", Type = "Keyboard", Make = "Logitech", Vendor = "Galaxy Computers", Location = "EFU House, Clifton", Cost = 14500m, Status = AssetStatuses.Allocated, YearsAgo = 1 },
            new { Code = "EFU-KEY-0002", Serial = "LOGI-K120-0002", Model = "K120 USB Keyboard", Type = "Keyboard", Make = "Logitech", Vendor = "Computer Zone", Location = "EFU House, Clifton", Cost = 3500m, Status = AssetStatuses.InStock, YearsAgo = 0 },
            new { Code = "EFU-PRT-0001", Serial = "HP-M404DN-0001", Model = "LaserJet Pro M404dn", Type = "Printer", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU House, Clifton", Cost = 118000m, Status = AssetStatuses.Allocated, YearsAgo = 2 },
            new { Code = "EFU-PRT-0002", Serial = "CANON-MF445DW-0002", Model = "imageCLASS MF445dw", Type = "Printer", Make = "Canon", Vendor = "Canon Business Solutions", Location = "EFU House, Clifton", Cost = 165000m, Status = AssetStatuses.InStock, YearsAgo = 1 },
            new { Code = "EFU-SVR-0001", Serial = "DELL-R750-0001", Model = "PowerEdge R750", Type = "Server", Make = "Dell Technologies", Vendor = "Dell Pakistan", Location = "EFU Korangi Data Centre", Cost = 4850000m, Status = AssetStatuses.Allocated, YearsAgo = 2 },
            new { Code = "EFU-SVR-0002", Serial = "HP-DL380-G10-0002", Model = "ProLiant DL380 Gen10", Type = "Server", Make = "HP Inc.", Vendor = "HP Pakistan", Location = "EFU Korangi Data Centre", Cost = 3750000m, Status = AssetStatuses.Allocated, YearsAgo = 3 },
            new { Code = "EFU-SW-0001", Serial = "CISCO-C9300-0001", Model = "Catalyst 9300-48P", Type = "Switch", Make = "Cisco Systems", Vendor = "Cisco Authorized Partner Pakistan", Location = "EFU Korangi Data Centre", Cost = 1850000m, Status = AssetStatuses.Allocated, YearsAgo = 2 },
            new { Code = "EFU-SW-0002", Serial = "CISCO-C9200-0002", Model = "Catalyst 9200L-24P", Type = "Switch", Make = "Cisco Systems", Vendor = "Cisco Authorized Partner Pakistan", Location = "EFU Lahore Regional Office", Cost = 850000m, Status = AssetStatuses.InStock, YearsAgo = 1 },
            new { Code = "EFU-RTR-0001", Serial = "CISCO-ISR4331-0001", Model = "ISR 4331", Type = "Router", Make = "Cisco Systems", Vendor = "Cisco Authorized Partner Pakistan", Location = "EFU Korangi Data Centre", Cost = 1450000m, Status = AssetStatuses.Allocated, YearsAgo = 3 },
            new { Code = "EFU-UPS-0001", Serial = "APC-SRT10KXLI-0001", Model = "Smart-UPS SRT 10kVA", Type = "UPS", Make = "APC", Vendor = "APC Power Solutions", Location = "EFU Korangi Data Centre", Cost = 2850000m, Status = AssetStatuses.Allocated, YearsAgo = 3 },
            new { Code = "EFU-RCK-0001", Serial = "RACK-42U-0001", Model = "42U Server Rack", Type = "Rack", Make = "Dell Technologies", Vendor = "TechAccess Pakistan", Location = "EFU Korangi Data Centre", Cost = 625000m, Status = AssetStatuses.Allocated, YearsAgo = 4 },
            new { Code = "EFU-CAM-0001", Serial = "HIK-DS2CD2143-0001", Model = "DS-2CD2143G2-I", Type = "Camera", Make = "Hikvision", Vendor = "TechAccess Pakistan", Location = "EFU House, Clifton", Cost = 42000m, Status = AssetStatuses.Allocated, YearsAgo = 1 }
        };
        foreach (var item in assetSeed)
        {
            if (await db.Assets.AnyAsync(x => x.AssetCode == item.Code || x.SerialNumber == item.Serial))
                continue;

            var type = await db.AssetTypes.FirstAsync(x => x.Name == item.Type);
            var make = await db.AssetMakes.FirstAsync(x => x.Name == item.Make);
            var vendor = await db.Vendors.FirstAsync(x => x.Name == item.Vendor);
            var location = await db.Locations.FirstAsync(x => x.Name == item.Location);
            var purchaseDate = DateTime.UtcNow.Date.AddYears(-item.YearsAgo).AddMonths(-2);

            db.Assets.Add(new Asset
            {
                AssetCode = item.Code,
                SerialNumber = item.Serial,
                Model = item.Model,
                AssetTag = item.Code.Replace("EFU-", "EFU-TAG-"),
                Condition = item.YearsAgo >= 3 ? "Good" : "Excellent",
                Accessories = item.Type == "Laptop" ? "Charger and laptop bag" : null,
                AdditionalNotes = "Enterprise demonstration inventory record",
                PurchaseOrderNumber = $"PO-{purchaseDate:yyyy}-{item.Code[^4..]}",
                InvoiceNumber = $"INV-{item.Code.Replace("-", "")}",
                PurchaseDate = purchaseDate,
                PurchaseCost = item.Cost,
                AddingDate = purchaseDate.AddDays(2),
                WarrantyExpiryDate = purchaseDate.AddYears(item.Type is "Server" or "Switch" ? 5 : 3),
                ExpectedExpiryDate = purchaseDate.AddYears(item.Type is "Server" or "Switch" or "Router" ? 7 : 5),
                Status = item.Status,
                AssetTypeId = type.Id,
                AssetMakeId = make.Id,
                VendorId = vendor.Id,
                LocationId = location.Id
            });
        }
        await db.SaveChangesAsync();

        var allocationSeed = new[]
        {
            new { Asset = "EFU-LAP-0001", Employee = "EFU-EMP-0001" },
            new { Asset = "EFU-LAP-0002", Employee = "EFU-EMP-0003" },
            new { Asset = "EFU-LAP-0003", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-LAP-0005", Employee = "EFU-EMP-0013" },
            new { Asset = "EFU-LAP-0006", Employee = "EFU-EMP-0012" },
            new { Asset = "EFU-DSK-0001", Employee = "EFU-EMP-0004" },
            new { Asset = "EFU-DSK-0002", Employee = "EFU-EMP-0008" },
            new { Asset = "EFU-MON-0001", Employee = "EFU-EMP-0001" },
            new { Asset = "EFU-MOU-0001", Employee = "EFU-EMP-0001" },
            new { Asset = "EFU-KEY-0001", Employee = "EFU-EMP-0003" },
            new { Asset = "EFU-PRT-0001", Employee = "EFU-EMP-0018" },
            new { Asset = "EFU-SVR-0001", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-SVR-0002", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-SW-0001", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-RTR-0001", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-UPS-0001", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-RCK-0001", Employee = "EFU-EMP-0009" },
            new { Asset = "EFU-CAM-0001", Employee = "EFU-EMP-0010" }
        };
        foreach (var item in allocationSeed)
        {
            var asset = await db.Assets.FirstAsync(x => x.AssetCode == item.Asset);
            var employee = await db.Employees.FirstAsync(x => x.EmployeeId == item.Employee);

            if (!await db.Allocations.AnyAsync(x => x.AssetId == asset.Id && x.ReturnedAt == null))
            {
                db.Allocations.Add(new Allocation
                {
                    AssetId = asset.Id,
                    EmployeeId = employee.Id,
                    LocationId = employee.LocationId,
                    AllocationDate = asset.PurchaseDate.AddDays(7),
                    Remarks = "Enterprise demonstration allocation"
                });
            }
        }
        await db.SaveChangesAsync();

        foreach (var asset in await db.Assets.Where(x => x.AssetCode.StartsWith("EFU-")).ToListAsync())
        {
            if (!await db.ActivityLogs.AnyAsync(x => x.Entity == "Asset" && x.EntityId == asset.Id && x.Action == "CREATE"))
            {
                db.ActivityLogs.Add(new ActivityLog
                {
                    UserId = admin.Id,
                    Action = "CREATE",
                    Entity = "Asset",
                    EntityId = asset.Id,
                    Metadata = "{\"source\":\"automatic-enterprise-seed\"}",
                    IpAddress = "127.0.0.1",
                    UserAgent = "EFU Inventory DbInitializer"
                });
            }
        }

        if (!await db.Notifications.AnyAsync(x => x.Title == "Enterprise demo data ready"))
        {
            db.Notifications.Add(new Notification
            {
                UserId = admin.Id,
                Title = "Enterprise demo data ready",
                Message = "Realistic master data, employees, assets, and allocations are available.",
                Type = "SUCCESS",
                ActionUrl = "/assets"
            });
        }

        await db.SaveChangesAsync();
    }
}
