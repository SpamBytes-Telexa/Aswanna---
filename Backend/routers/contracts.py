from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from database import engine, get_db
from models import Base, CropOffer
from fastapi.middleware.cors import CORSMiddleware


router=APIRouter();
@router.get("/my-contracts")
def get_my_contracts(db: Session = Depends(get_db)):
    # Hardcoded UUID string
    hardcoded_farmer_id = UUID("1cdfb24f-a902-4bac-825a-074973263a3d")
    
    offers = db.query(CropOffer).filter(CropOffer.farmer_id == hardcoded_farmer_id).all()

    contracts = []
    for offer in offers:
        contracts.append({
            "id": str(offer.id),
            "product": offer.product,
            "price": offer.price,
            "status": offer.status,
            "delivery_method": offer.delivery_method,
            "location": offer.location,
            "quantity": offer.quantity, 
            "deadline": offer.deadline.isoformat() if offer.deadline else None,
            "photo": offer.photo,   
            
        })
    return {"contracts": contracts}

