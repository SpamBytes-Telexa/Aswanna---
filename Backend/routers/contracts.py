from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from uuid import UUID
from datetime import date
import shutil
from database import engine, get_db
from models import Base, CropOffer,User,Contract,ContractCreate
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

router = APIRouter()
@router.get("/my-contracts/{user_id}")  # ✅ Add slash before {user_id}
def get_my_contracts(user_id: str, db: Session = Depends(get_db)):  # ✅ Add type hint
    offers = db.query(CropOffer).filter(CropOffer.farmer_id == user_id).all()

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
def get_offer_details(offer_id ,db: Session = Depends(get_db)):
    # Fetch the offer
    offer = db.query(CropOffer).filter(CropOffer.id == offer_id).first()
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
    buyer = db.query(User).filter(
        func.lower(User.wallet_address) == wallet_address.lower()
    ).first()

    if not buyer:
        raise HTTPException(status_code=404, detail="Buyer not found or not registered.")

    return {"id": buyer.id}

@router.get("/get_wallet_address/{user_id}")
def get_wallet_address(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"wallet_address": user.wallet_address}


@router.post("/post_offer")
async def register_offer(
    product: str = Form(...),
    quantity: float = Form(...),
    price: float = Form(...),
    deadline: date = Form(...),
    photo: Optional[UploadFile] = File(None),
    delivery_method: str = Form(...),
    location: str = Form(...),
    farmer_id: UUID = Form(...),
    db: Session = Depends(get_db),
):
    try:
        # Handle optional photo
        photo_path = None
        if photo:
            photo_path = f"static/images/{photo.filename}"
            with open(photo_path, "wb") as buffer:
                shutil.copyfileobj(photo.file, buffer)

        # Log for debugging
        print({
            "product": product,
            "quantity": quantity,
            "price": price,
            "deadline": deadline,
            "photo": photo_path,
            "delivery_method": delivery_method,
            "location": location,
            "farmer_id": str(farmer_id)
        })

        query = text("""
            CALL db_create_offer(
                :product, :quantity, :price, :deadline, :photo,
                :delivery_method, :location, :farmer_id
            )
        """)

        db.execute(query, {
            "product": product,
            "quantity": quantity,
            "price": price,
            "deadline": deadline,
            "photo": photo_path,
            "delivery_method": delivery_method,
            "location": location,
            "farmer_id": str(farmer_id),
        })

        db.commit()
        return {"message": "Crop offer posted successfully."}

    except Exception as e:
        db.rollback()
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Failed to post offer: {str(e)}")
