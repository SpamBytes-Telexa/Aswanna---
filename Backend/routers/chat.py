from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi import UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
import base64

router = APIRouter()

@router.get("/chat_messages")
def get_chat_messages(username: str, farmer_name: str, db: Session = Depends(get_db)):
    try:
        initial_query = text("""
            CREATE TABLE IF NOT EXISTS messages (
                sender VARCHAR(255),
                receiver VARCHAR(255),
                text TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        db.execute(initial_query)
        db.commit()

        query = text("""
            SELECT * FROM messages 
            WHERE (sender = :username AND receiver = :farmer_name) OR (sender = :farmer_name AND receiver = :username)
            ORDER BY timestamp
        """)
        result = db.execute(query, {
            "username": username,
            "farmer_name": farmer_name
        })
        messages = result.fetchall()
        return {"messages": [dict(row._mapping) for row in messages]}
    except Exception as e:
        print(f"Error retrieving chat messages: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to retrieve chat messages: {str(e)}")