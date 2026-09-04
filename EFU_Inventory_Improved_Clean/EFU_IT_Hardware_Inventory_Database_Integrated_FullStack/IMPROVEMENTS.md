# EFU Inventory Improvements

## Completed
- Login email and password fields now start empty and browser autofill is disabled.
- Dashboard Recent Allocations “View All” opens a complete allocation-history screen.
- Improved visibility of the Returns chart series.
- Removed the Add Asset button from the All Assets page.
- Inactive asset types are frozen: excluded from dashboard totals/charts/recent lists, excluded from Add Asset selections, and rejected by backend asset creation.
- Reactivating an asset type makes it available again automatically.
- Renamed the backend project from `EFU.Inventory.Api` to `EFU.Inventory.Backend`.
- Removed development/design/build-only folders including Figma, Git metadata, Visual Studio caches, frontend node_modules, backend bin/obj, temporary output, and agent files.

## Run
Backend:
`cd backend && dotnet restore EFU.Inventory.Backend.csproj && dotnet run --project EFU.Inventory.Backend.csproj`

Frontend:
`cd frontend && npm install && npm run dev`
