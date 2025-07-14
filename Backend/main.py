from fastapi import FastAPI, Depends, WebSocket, WebSocketDisconnect
#from sqlalchemy.orm import Session
#from uuid import UUID
#from database import engine, get_db
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


class ConnectionManager:
    def __init__(self):
        self.activate_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.activate_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.activate_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.activate_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

#app.include_router(chat.router, prefix='/chatbot', tags=['Chatbot'])
#app.include_router(weather.router, prefix='/weather', tags=['Weather'])
#app.include_router(location.router, prefix='/location', tags=['Weather'])
#app.include_router(weather16.router, prefix='/weatherfor16days', tags=['Weather'])

app.include_router(contracts.router, prefix="/blockchain", tags=["contracts"])
app.include_router(login.router, prefix="/auth", tags=["login"])
app.include_router(predict.router, prefix="/ml", tags=["predict"])
#app.include_router(predict.router)
#app.include_router(predict.router, prefix="/ml")

