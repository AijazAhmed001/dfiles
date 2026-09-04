# Aijaz Ahmed — Advanced Full-Stack Portfolio

A production-oriented portfolio built with React, TypeScript, Vite, ASP.NET Core, Entity Framework Core and SQLite/SQL Server support.

## Included improvements

- Responsive modern light/dark interface with saved theme
- Recruiter-focused view at `/recruiter`
- Keyboard command palette (`Ctrl/Cmd + K`)
- Searchable and filterable project experience
- Detailed project case studies with challenges, solutions, outcomes and architecture flow
- Accessible navigation, forms, keyboard support and reduced-motion support
- Portfolio assistant with suggestions, loading state, error state, focus management and rate limiting
- Secure admin login with message search, unread filters, read actions, delete confirmation and real API statistics
- Typed frontend API client and TypeScript models
- Contact validation and throttling
- Login/chat/contact/API rate limits
- JWT validation and startup secret checks
- Security response headers, global exception handling and health endpoints
- Public API output caching and project query filtering
- SEO metadata, robots.txt, sitemap template and custom 404 page
- Docker Compose development environment

## Important personalization

Before publishing, replace these placeholders:

- `aijaz@example.com` in `frontend/src/pages/Home.tsx` and `Recruiter.tsx`
- LinkedIn URL in `frontend/src/pages/Home.tsx`
- `your-domain.example` in `frontend/public/robots.txt` and `sitemap.xml`
- The placeholder `frontend/public/resume.pdf` with your real resume
- Add your real project screenshots and exact repository URLs

## Run manually

### Backend

```powershell
cd backend/Portfolio.Api
$env:Admin__Username="admin"
$env:Admin__Password="your-long-password"
$env:Jwt__Key="your-random-secret-with-at-least-32-characters"
dotnet restore
dotnet run
```

The API starts using the URL configured in `Properties/launchSettings.json`. Swagger is available in Development.

### Frontend

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run using Docker Compose

Copy `.env.example` to `.env`, set secure values, then run:

```powershell
docker compose up --build
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Main routes

- `/` — Full portfolio
- `/recruiter` — Focused hiring view
- `/projects/:id` — Project case study
- `/admin` — Secure contact dashboard
- `/health` and `/health/live` — Backend health checks

## API routes

- `POST /api/contact`
- `POST /api/chat`
- `GET /api/projects`
- `GET /api/projects/{slug}`
- `POST /api/analytics`
- `POST /api/admin/login`
- `GET /api/admin/messages`
- `PATCH /api/admin/messages/{id}/read`
- `DELETE /api/admin/messages/{id}`
- `GET /api/admin/stats`
- Admin project CRUD endpoints

## Production checklist

1. Configure secrets through environment variables or a secret manager.
2. Replace all personal placeholders and the resume.
3. Restrict CORS to the real frontend domain.
4. Use SQL Server or a persistent SQLite volume.
5. Add EF Core migrations before evolving the production schema.
6. Add real project images, Open Graph image and favicon.
7. Run `npm run build` and `dotnet build` in your own environment or CI.
8. Enable HTTPS at the hosting/reverse-proxy layer.
