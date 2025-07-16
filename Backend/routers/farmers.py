from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi import UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
import base64
from pydantic import BaseModel

router = APIRouter()


class ConnectFarmerRequest(BaseModel):
    username: str
    farmer_username: str


@router.post("/add_farmer_details")
def add_farmer_details(
    username: str = Form(...),
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
            INSERT INTO farmer_details (username, name, village, crops, about, connectedFarmers, image)
            VALUES (:username, :name, :village, :crops, :about, :connectedFarmers, :image)
        """)
        db.execute(query, {
            "username": username,
            "name": name,
            "village": village,
            "crops": crops,
            "about": about,
            "image": image_data,
            "connectedFarmers": []
        })
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error adding farmer details: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to add farmer details: {str(e)}")
    
    return {"message": "Farmer details added successfully"}


@router.get("/get_farmer_details")
def get_farmer_details(name: str, db: Session = Depends(get_db)):
    try:
        query = text("SELECT * FROM farmer_details WHERE name = :name")
        result = db.execute(query, {
            "name": name
        })
        farmer_details = result.fetchall()
        if not farmer_details:
            raise HTTPException(status_code=404, detail="Farmer details not found")
        return {"farmer_details": [dict(row) for row in farmer_details]}
    except Exception as e:
        print(f"Error retrieving farmer details: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to retrieve farmer details: {str(e)}") 
    

@router.get("/get_all_farmers")
def get_all_farmers(db: Session = Depends(get_db)):
    try:
        query = text("SELECT * FROM farmer_details")
        result = db.execute(query)
        farmers = []
        for row in result.mappings().all():
            farmer = dict(row)
            if farmer.get('image'):
                farmer['image'] = base64.b64encode(farmer['image']).decode('utf-8')
            farmers.append(farmer)

        return {"farmers": farmers}
    except Exception as e:
        print(f"Error retrieving all farmers: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to retrieve farmers: {str(e)}")
    

@router.post("/connect_farmer")
def connect_farmer(
    request: ConnectFarmerRequest, 
    db: Session = Depends(get_db)
):
    try:
        query = text("""
            UPDATE farmer_details 
            SET connectedFarmers = array_append(connectedFarmers, :farmer_username) 
            WHERE username = :username;
            UPDATE farmer_details 
            SET connectedFarmers = array_append(connectedFarmers, :username)
            WHERE username = :farmer_username;
        """)
        db.execute(query, {
            "username": request.username,
            "farmer_username": request.farmer_username
        })
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error connecting farmer: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to connect farmer: {str(e)}")
    
    return {"message": "Farmer connected successfully"}
