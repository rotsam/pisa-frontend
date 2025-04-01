from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    id: str
    email: EmailStr
    username: str
    role: str
    created_at: datetime

class UserProfileUpdate(BaseModel):
    preferences: Optional[dict]
    onboarding_data: Optional[dict]