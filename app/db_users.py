from bson import ObjectId
from datetime import datetime

async def get_user_by_email(db, email: str):
    return await db["users"].find_one({"email": email})

async def create_user(db, user_data: dict):
    user_data["created_at"] = user_data.get("created_at") or datetime.utcnow()
    return await db["users"].insert_one(user_data)

async def get_user_by_id(db, user_id: str):
    return await db["users"].find_one({"_id": ObjectId(user_id)})