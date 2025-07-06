from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID
from datetime import date
from database import engine, get_db
from models import Base, CropOffer,User,Contract,ContractCreate
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
@router.get("/buyer_accepting/{offer_id}")
def get_offer_details(db: Session = Depends(get_db)):
    # Hardcoded Offer ID (just for now)
    hardcoded_offer_id = UUID("18588f52-9ddf-46d3-9789-6d2426ef2a9f")

    # Fetch the offer
    offer = db.query(CropOffer).filter(CropOffer.id == hardcoded_offer_id).first()
    if not offer:
        return {"error": "Offer not found"}

    # Fetch the farmer (related user)
    farmer = db.query(User).filter(User.id == offer.farmer_id).first()

    return {
        "product": offer.product,
        "price": offer.price,
        "delivery_method": offer.delivery_method,
        "location": offer.location,
        "quantity": offer.quantity,
        "deadline": offer.deadline.isoformat() if offer.deadline else None,
        "photo": offer.photo,
        "farmer_name": farmer.name if farmer else "Unknown",
        "farmer_wallet": farmer.wallet_address if farmer else None
    }
@router.post("/contracts")
def create_contract(data: ContractCreate, db: Session = Depends(get_db)):
    # Create the contract
    contract = Contract(
        offer_id=data.offer_id,
        buyer_id=data.buyer_id,
        tx_hash=data.tx_hash,
        contract_address=data.contract_address,
        status="active",  # <- use valid status
        delivery_marked=False,
        confirmed=False,
    )

    db.add(contract)

    # 🔄 Update the CropOffer status to 'accepted'
    crop_offer = db.query(CropOffer).filter(CropOffer.id == data.offer_id).first()
    if crop_offer:
        crop_offer.status = "accepted"
    else:
        raise HTTPException(status_code=404, detail="Crop offer not found")

    db.commit()
    db.refresh(contract)

    return {"message": "Contract created", "contract_id": contract.id}


@router.get("/by_wallet/{wallet_address}")
def get_buyer_by_wallet(wallet_address: str, db: Session = Depends(get_db)):
    buyer = db.query(User).filter(User.wallet_address == wallet_address).first()
    if not buyer:
        raise HTTPException(status_code=404, detail="Buyer not found")
    return {"id": buyer.id}

