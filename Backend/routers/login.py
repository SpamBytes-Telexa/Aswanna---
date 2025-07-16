from fastapi import APIRouter, Depends, HTTPException,Response,status
from fastapi import Form, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import text
from uuid import UUID
from datetime import date
from database import engine, get_db
from models import Base, User, UserBase,UserLogin
from fastapi.middleware.cors import CORSMiddleware
from Security.utils import hash_password,verify_password
from Security.security import create_access_token

router=APIRouter();
@router.post("/register")
def register_user(user: UserBase, db: Session = Depends(get_db)):
    try:
        # Hash the password before storing
        hashed_password = hash_password(user.password_hash)

        # Prepare and execute the PostgreSQL stored procedure call
        query = text("CALL db_create_account(:wallet_address, :username, :email, :password_hash, :role)")
        db.execute(query, {
            "wallet_address": user.wallet_address,
            "username": user.user_name,
            "email": user.email,
            "password_hash": hashed_password,
            "role": user.role
        })
        db.commit()

        # Insert farmer details
        query_farmer = text("""
        CREATE TABLE IF NOT EXISTS farmer_details (
            name VARCHAR(255),
            village VARCHAR(255),
            crops VARCHAR(255),
            about TEXT,
            image BYTEA
        )
        """)
        db.execute(query_farmer)
        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

    return {"message": "User profile registered successfully"}

@router.post("/login")
def login_user(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password , db_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({
        "sub": db_user.name,
        "role": db_user.role,
        "user_id": str(db_user.id)
    })

    return {
        "message": "Login Success",
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "role": db_user.role,
        "user_name": db_user.name
    }


@router.post("/add_farmer_details")
def add_farmer_details(
    name: str = Form(...),
    village: str = Form(...),
    crops: str = Form(...),
    about: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        image_data = image.file.read()
        query = text("""
            INSERT INTO farmer_details (name, village, crops, about, image)
            VALUES (:name, :village, :crops, :about, :image)
        """)
        db.execute(query, {
            "name": name,
            "village": village,
            "crops": crops,
            "about": about,
            "image": image_data
        })
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error adding farmer details: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to add farmer details: {str(e)}")
    
    return {"message": "Farmer details added successfully"}
