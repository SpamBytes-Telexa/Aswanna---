# Aswanna

Aswanna is an agriculture-focused platform that connects farmers, enabling communication, collaboration, and access to agricultural services. The system includes a FastAPI backend with PostgreSQL and a React frontend, supporting features such as farmer profiles, real-time chat, connection management, blockchain contract handling, and machine learning-based predictions.

---

## Features

- User authentication (login and registration)
- Farmer community with profile details and crop information
- Real-time chat between farmers using WebSockets
- Connect and manage farmer relationships
- Blockchain contract management
- Machine learning prediction endpoints for agriculture

---

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** React, Framer Motion, React Router
- **Communication:** WebSocket for real-time chat
- **Blockchain smart contracts:** Solidity
- **Database:** PostgreSQL
- **Other:** Docker (optional), CORS middleware

---

## Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL database

### Backend Setup

1. Clone the repo

   ```bash
   git clone https://github.com/SpamBytes-Telexa/Aswanna---.git
   cd Aswanna---
2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows

3. Install dependencies
   ```bash
   pip install -r requirements.txt
4. Setup your database connection in environment variables or config file
5. Run migrations or initialize the database (if applicable)
6. Start the backend server
   ```bash
   uvicorn main:app --reload

### Frontend Setup
1. Navigate to the frontend directory

```bash
  cd frontend
```

2. Install dependencies

```bash
npm install
```
3. Start the frontend development server

```bash
npm run dev
```

### API Endpoints Overview
- /auth/login - User login

- /farmers/get_all_farmers - Get all farmers

- /farmers/connect_farmer - Connect with a farmer

- /ws - WebSocket endpoint for chat

- /blockchain/* - Blockchain contract management routes

- /ml/* - Machine learning prediction routes

### Usage
- Login or register a user

- Browse the farmer community

- Connect with other farmers

- Use the chat feature to communicate in real-time

- Access ML-powered predictions for farming assistance

- Manage contracts securely on blockchain (if integrated)


   
