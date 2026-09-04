# Aijaz Ahmed — Full-Stack Animated Portfolio

A complete portfolio starter with:

- React + TypeScript + Vite
- Framer Motion animations
- Responsive dark/light design
- Hero, about, services, skills, projects, case studies, experience, education and contact sections
- FastAPI + SQLite backend
- Working contact-message storage
- JWT-protected admin message dashboard
- Portfolio chatbot API

## 1. Run the backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend documentation: `http://localhost:8000/docs`

Default admin login:

```text
Username: admin
Password: admin123
```

Change the credentials and JWT secret in `backend/app/main.py` before deployment.

## 2. Run the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Admin page: `http://localhost:5173/admin`

## 3. Customize before publishing

1. Replace `your-email@example.com` in `frontend/src/pages/Home.tsx`.
2. Add your real LinkedIn URL.
3. Put your real `resume.pdf` inside `frontend/public/`.
4. Replace project text and add real screenshots.
5. Change admin credentials and `SECRET` in the backend.
6. For production, set `VITE_API_URL` to your deployed backend URL.
7. Update FastAPI CORS origins with your deployed frontend domain.

## Suggested deployment

- Frontend: Vercel
- Backend: Render or Railway
- Database: PostgreSQL for production

## Production notes

This package uses SQLite and a simple built-in admin account for easy local use. For production, move credentials to environment variables, use PostgreSQL, hash passwords, add refresh tokens, rate limiting, email notifications, image storage and stronger validation.
