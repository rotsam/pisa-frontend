from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from utils_auth import SECRET_KEY, ALGORITHM
from db_users import get_user_by_id
from db import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Token decode error")

async def require_admin(user=Depends(get_current_user)):
    if user["role"] not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user