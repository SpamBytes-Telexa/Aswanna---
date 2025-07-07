from fastapi import FastAPI, Depends
#from sqlalchemy.orm import Session
#from uuid import UUID
#from database import engine, get_db
#from models import Base, CropOffer
from fastapi.middleware.cors import CORSMiddleware
#from routers import predict

#from maduni.routes import chat
from routers import contracts
from routers import login

#from routers import contracts;    
app = FastAPI()

#Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173",  # React dev server origin
    # You can add other origins you want to allow here
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Backend running ✅"}


#app.include_router(chat.router, prefix='/chatbot', tags=['Chatbot'])
app.include_router(contracts.router, prefix="/blockchain", tags=["contracts"])
app.include_router(login.router, prefix="/auth", tags=["login"])
#app.include_router(predict.router, prefix="/ml", tags=["predict"])

