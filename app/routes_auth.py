from fastapi import APIRouter, HTTPException, Depends
from pydantic import EmailStr
from datetime import timedelta
from schemas_user import UserCreate, UserLogin
from utils_auth import hash_password, verify_password, create_access_token
from db_users import get_user_by_email, create_user
from dependencies import get_db

router = APIRouter()

@router.post("/auth/signup")
async def signup(data: UserCreate, db=Depends(get_db)):
    existing = await get_user_by_email(db, data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = await create_user(db, {
        "email": data.email,
        "username": data.username,
        "hashed_password": hash_password(data.password),
        "role": "user",
    })
    return {"message": "User created", "user_id": str(user.inserted_id)}

@router.post("/auth/login")
async def login(data: UserLogin, db=Depends(get_db)):
    user = await get_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user["_id"]), "role": user["role"]}, timedelta(minutes=60))
    return {"access_token": token, "token_type": "bearer"}