from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID
from datetime import date
from database import engine, get_db
from models import Base, CropOffer,User
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



@router.get("/marketplace-offers")
def get_marketplace_offers(db: Session = Depends(get_db)):
    offers = db.query(CropOffer).all()
    today = date.today()

    result = []
    for offer in offers:
        # Only show awaiting/disputed + not expired
        if offer.status in ("awaiting", "disputed") and offer.deadline and offer.deadline >= today:
            farmer = db.query(User).filter(User.id == offer.farmer_id).first()
            rating_avg = (
                db.query(func.avg(User.rating))
                .filter(User.id == offer.farmer_id)
                .scalar()
            )

            result.append({
                "id": str(offer.id),
                "product": offer.product,
                "price": offer.price,
                "status": offer.status,
                "delivery_method": offer.delivery_method,
                "location": offer.location,
                "quantity": offer.quantity,
                "deadline": offer.deadline.isoformat(),
                "photo": offer.photo,
                "farmer": farmer.name if farmer else "Unknown",
                "rating": round(rating_avg, 1) if rating_avg else None,
            })

    return result
