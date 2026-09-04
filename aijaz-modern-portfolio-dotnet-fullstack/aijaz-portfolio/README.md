# Aijaz Ahmed — Modern Full-Stack Portfolio

A complete animated portfolio using React + TypeScript and ASP.NET Core Web API.

## Stack

- Frontend: React, TypeScript, Vite, Framer Motion, Lucide React
- Backend: C#, ASP.NET Core 8 Web API, Entity Framework Core
- Database: SQLite for instant local use; SQL Server ready through configuration
- Security: JWT authentication, role-protected admin endpoints, validation, CORS, rate limiting
- Features: responsive portfolio, case studies, contact form, admin inbox, project CRUD API, analytics endpoint, portfolio chatbot, Swagger, Docker

## Run backend

```powershell
cd backend\Portfolio.Api
dotnet restore
dotnet run
```

Backend: `http://localhost:5000`  
Swagger: `http://localhost:5000/swagger`

Default local admin:

```text
Username: admin
Password: admin123
```

Change these before deployment in `appsettings.json` or environment variables.

## Run frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5174`  
Admin: `http://localhost:5174/admin`

## SQL Server mode

Change `DatabaseProvider` to `SqlServer` and set:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AijazPortfolio;Trusted_Connection=True;TrustServerCertificate=True"
}
```

For production, configure values through environment variables instead of committing secrets.

## Main API endpoints

- `POST /api/contact`
- `POST /api/chat`
- `GET /api/projects`
- `GET /api/projects/{slug}`
- `POST /api/analytics`
- `POST /api/admin/login`
- `GET /api/admin/messages`
- `PATCH /api/admin/messages/{id}/read`
- `DELETE /api/admin/messages/{id}`
- `POST/PUT/DELETE /api/admin/projects`
- `GET /api/admin/stats`

## Before publishing

Replace placeholder email and LinkedIn links, update project screenshots and URLs, replace the resume, set a strong JWT secret and admin password, and configure the production frontend origin.
