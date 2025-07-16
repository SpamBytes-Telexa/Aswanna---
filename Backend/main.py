from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.orm import Session
#from uuid import UUID
from database import engine, get_db
#from models import Base, CropOffer
from fastapi.middleware.cors import CORSMiddleware
from routers import predict



#from maduni.routes import chat
#from maduni.routes import weather
#from maduni.routes import location
#from maduni.routes import weather16


#from maduni.routes import chat
from routers import contracts
from routers import login
from routers import farmers
from routers import chat

#from routers import contracts;    
app = FastAPI()

#Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173", 
     'http://localhost:5174' # React dev server origin
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
#app.include_router(weather.router, prefix='/weather', tags=['Weather'])
#app.include_router(location.router, prefix='/location', tags=['Weather'])
#app.include_router(weather16.router, prefix='/weatherfor16days', tags=['Weather'])

app.include_router(contracts.router, prefix="/blockchain", tags=["contracts"])
app.include_router(login.router, prefix="/auth", tags=["login"])
app.include_router(predict.router, prefix="/ml", tags=["predict"])
app.include_router(farmers.router, prefix="/farmers", tags=["farmers"])
app.include_router(chat.router, prefix="/farmers", tags=["chat"])
#app.include_router(predict.router)
#app.include_router(predict.router, prefix="/ml")



from fastapi import WebSocket, WebSocketDisconnect
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    def normalize_username(self, username: str) -> str:
        return username.lower().strip().replace(" ", "")

    async def connect(self, websocket: WebSocket, username: str):
        normalized_username = self.normalize_username(username)
        await websocket.accept()
        self.active_connections[normalized_username] = websocket
        print(f"{normalized_username} connected.")

    def disconnect(self, username: str):
        normalized_username = self.normalize_username(username)
        self.active_connections.pop(normalized_username, None)
        print(f"{normalized_username} disconnected.")

    async def send_personal_message(self, message: str, receiver: str):
        normalized_receiver = self.normalize_username(receiver)
        print(f"Attempting to send message to: '{normalized_receiver}'")
        print(f"Active connections: {list(self.active_connections.keys())}")

        websocket = self.active_connections.get(normalized_receiver)

        if websocket:
            await websocket.send_text(message)
        else:
            print(f"User '{normalized_receiver}' not connected. Message not delivered.")


    async def send_ack(self, sender: str, message: str):
        normalized_sender = self.normalize_username(sender)
        websocket = self.active_connections.get(normalized_sender)
        if websocket:
            await websocket.send_text(message)

manager = ConnectionManager()


from database import SessionLocal  # assuming SessionLocal is your sessionmaker()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    username = websocket.query_params.get("user")
    if not username:
        await websocket.close()
        return

    username = manager.normalize_username(username)
    await manager.connect(websocket, username)

    db = SessionLocal()  # manually create DB session here

    try:
        while True:
            data = await websocket.receive_text()
            message_obj = json.loads(data)

            sender = manager.normalize_username(message_obj.get("sender"))
            receiver = manager.normalize_username(message_obj.get("receiver"))

            message_to_send = json.dumps({
                "sender": sender,
                "receiver": receiver,
                "text": message_obj.get("text"),
                "timestamp": message_obj.get("timestamp")
            })

            await save_message_to_db(sender, receiver, message_obj.get("text"), message_obj.get("timestamp"), db)

            await manager.send_personal_message(message_to_send, receiver)
            await manager.send_ack(sender, message_to_send)

    except WebSocketDisconnect:
        manager.disconnect(username)
    finally:
        db.close()  # close db connection when WebSocket closes


from sqlalchemy import text as sql_text  # safer import

async def save_message_to_db(sender: str, receiver: str, message_text: str, timestamp: str, db: Session):
    try:
        query = sql_text("""
            INSERT INTO messages (sender, receiver, text, timestamp)
            VALUES (:sender, :receiver, :text, :timestamp)
        """)
        db.execute(query, {
            "sender": sender,
            "receiver": receiver,
            "text": message_text,
            "timestamp": timestamp
        })
        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error saving message to DB: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save message to database")

