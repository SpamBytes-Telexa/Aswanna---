from pydantic import BaseModel
from uuid import UUID, uuid4
from sqlalchemy import Column, String, Boolean, Float, Date, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID as SA_UUID
from database import Base
from datetime import datetime

# SQLAlchemy models

class User(Base):
    __tablename__ = "users"
    id = Column(SA_UUID(as_uuid=True), primary_key=True, default=uuid4)
    wallet_address = Column(String, unique=True, nullable=False)
    name = Column(String)
    email = Column(String)
    role = Column(String)
    rating = Column(Float)
    password_hash = Column(String)  # Store hashed password


class CropOffer(Base):
    __tablename__ = "crop_offers"
    id = Column(SA_UUID(as_uuid=True), primary_key=True, default=uuid4)
    product = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    deadline = Column(Date)
    delivery_method = Column(String)
    location = Column(String)
    photo = Column(String)
    farmer_id = Column(SA_UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String)
    contract_address = Column(String)

class Contract(Base):
    __tablename__ = "contracts"
    id = Column(SA_UUID(as_uuid=True), primary_key=True, default=uuid4)
    offer_id = Column(SA_UUID(as_uuid=True), ForeignKey("crop_offers.id"))
    buyer_id = Column(SA_UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String, default="accepted")
    delivery_marked = Column(Boolean, default=False)
    confirmed = Column(Boolean, default=False)
    contract_address = Column(String)
    tx_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Pydantic schema (should ideally go in schemas.py)

class ContractCreate(BaseModel):
    offer_id: UUID
    buyer_id: UUID
    tx_hash: str
    contract_address: str

class OfferResponse(BaseModel):
    id: int
    product: str
    farmer_wallet: str
    price: float
    quantity: int
    contract_address: str | None  # Optional
    # Add other fields you want to expose

    class Config:
        orm_mode = True
class UserBase(BaseModel):
    wallet_address: str
    user_name: str
    email: str
    password_hash: str
    role: str  # 'farmer' or 'buyer'

class UserLogin(BaseModel):
    email: str
    password: str    

    