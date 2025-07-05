import uuid
from sqlalchemy import Column, String, Float, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    wallet_address = Column(String, unique=True, nullable=False)
    name = Column(String)
    email = Column(String)
    role = Column(String)
    rating = Column(Float)

class CropOffer(Base):
    __tablename__ = "crop_offers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    product = Column(String)
    quantity = Column(Float)
    price = Column(Float)
    deadline = Column(Date)
    delivery_method = Column(String)
    location = Column(String)
    photo = Column(String)
    farmer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String)
    contract_address = Column(String)
