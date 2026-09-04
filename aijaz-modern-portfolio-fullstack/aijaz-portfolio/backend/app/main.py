from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr
from sqlalchemy import Boolean, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_URL = f"sqlite:///{BASE_DIR / 'portfolio.db'}"
SECRET = "change-this-secret-before-deployment"
ALGORITHM = "HS256"

class Base(DeclarativeBase):
    pass

class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(180))
    subject: Mapped[str] = mapped_column(String(180))
    message: Mapped[str] = mapped_column(Text)
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base.metadata.create_all(engine)

app = FastAPI(title="Aijaz Portfolio API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
security = HTTPBearer()

def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContactIn(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class LoginIn(BaseModel):
    username: str
    password: str

class ChatIn(BaseModel):
    message: str

class MessageOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    read: bool
    created_at: datetime
    class Config:
        from_attributes = True

def create_token() -> str:
    payload = {"sub": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=8)}
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET, algorithms=[ALGORITHM])
        if payload.get("sub") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc

@app.get("/")
def root():
    return {"name": "Aijaz Portfolio API", "status": "running"}

@app.post("/api/contact")
def contact(payload: ContactIn, db: Session = Depends(db_session)):
    clean = Message(name=payload.name.strip(), email=str(payload.email), subject=payload.subject.strip(), message=payload.message.strip())
    db.add(clean)
    db.commit()
    return {"success": True, "message": "Message received"}

@app.post("/api/admin/login")
def login(payload: LoginIn):
    if payload.username != "admin" or payload.password != "admin123":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": create_token()}

@app.get("/api/admin/messages", response_model=List[MessageOut])
def messages(_: None = Depends(require_admin), db: Session = Depends(db_session)):
    return db.query(Message).order_by(Message.created_at.desc()).all()

@app.post("/api/chat")
def chat(payload: ChatIn):
    q = payload.message.lower()
    if any(word in q for word in ["project", "work", "built"]):
        answer = "Aijaz’s featured work includes an Enterprise AI Assistant, EFU Inventory Management System, Smart Agriculture AI, a VS Code clone and a Gym Management SaaS concept."
    elif any(word in q for word in ["skill", "technology", "stack"]):
        answer = "His toolkit includes React, TypeScript, FastAPI, ASP.NET Core, SQL Server, PostgreSQL, Docker, GitHub, JWT, RAG concepts and modern UI/UX development."
    elif any(word in q for word in ["experience", "internship", "efu"]):
        answer = "Aijaz has internship experience at EFU General Insurance, where he focused on enterprise software, databases, APIs, authentication and full-stack integration."
    elif any(word in q for word in ["education", "university", "study"]):
        answer = "He is studying BS Computer Science at Air University Karachi Campus and is developing his skills through academic work, leadership and real projects."
    elif any(word in q for word in ["contact", "email", "hire"]):
        answer = "You can use the contact form on this portfolio. Remember to replace the placeholder email and LinkedIn link before deployment."
    else:
        answer = "Aijaz is a Computer Science student and aspiring full-stack and AI developer focused on secure, useful and modern digital products. Ask about his projects, skills, experience or education."
    return {"answer": answer}
