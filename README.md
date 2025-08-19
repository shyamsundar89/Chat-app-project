# 💬 MERN Chat App

A real-time chat application built with **MERN stack** and **Socket.IO**.  
This project includes authentication, dashboard, and multiple pages like Home, About, Contact, Login, Register, and Chat.

---

## 🚀 Features

- 🏠 **Home, About, Contact** pages
- 🔐 **Authentication** (Login & Register)
- 💬 **Real-time chat** with Socket.IO
- 📊 **User Dashboard**
- 👥 **One-to-one & group chat support** (extendable)
- 🎨 Responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Real-time:** Socket.IO  
- **Authentication:** JWT / bcrypt (if used)  

---

## 📂 Project Structure

/chat-app-project
├── /frontend # React frontend
├── /backend # Express + Node backend
└── README.md



---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat-app-project.git
cd chat-app-project
```

## Install dependencies

- Backend
```bash
cd backend
npm install
```
- Frontend
```bash
cd frontend
npm install
```

## Setup environment variables

Create a .env file inside backend folder:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Run the application
- Backend
```bash
cd backend
node index.js
```

- Frontend
```bash
cd frontend
npm run dev
```

Now open http://localhost:5173 in your browser🎉

## 🖼️ Screenshots
### 🔐 Authentication
<img width="1918" height="1069" alt="Screenshot 2025-08-19 065323" src="https://github.com/user-attachments/assets/f5297276-f01f-4e80-9b13-86833c189b9d" />
<img width="1919" height="1076" alt="Screenshot 2025-08-19 065332" src="https://github.com/user-attachments/assets/09527a0b-f12e-482d-88cc-9387d47182ea" />
<img width="1919" height="1076" alt="Screenshot 2025-08-19 065313" src="https://github.com/user-attachments/assets/b7e0dd33-2421-4891-ad20-4d117417bf5c" />

<img width="1919" height="1076" alt="Screenshot 2025-08-19 065519" src="https://github.com/user-attachments/assets/38f48c37-cd80-4933-b9a1-608943191d38" />
<img width="1" height="1" alt="Screenshot 2025-08-19 065502" src="https://github.com/user-attachments/assets/668298a9-89b5-44cb-a049-18251d8e1e8c" />
<img width="1919" height="1079" alt="Screenshot 2025-08-19 065454" src="https://github.com/user-attachments/assets/e1b3abf6-7ec8-46ea-99b0-4fc2c0cab16d" />
<img width="1919" height="1078" alt="Screenshot 2025-08-19 065439" src="https://github.com/user-attachments/assets/5f14961d-9fab-4595-a365-d6ad41b9f706" />
<img width="1919" height="1077" alt="Screenshot 2025-08-19 065426" src="https://github.com/user-attachments/assets/c37ff836-e7cc-487e-b765-824f466ff04d" />
<img width="1919" height="1079" alt="Screenshot 2025-08-19 065411" src="https://github.com/user-attachments/assets/f4fcd730-8692-4037-94cf-5ab762fbcd38" />
<img width="1918" height="1079" alt="Screenshot 2025-08-19 065400" src="https://github.com/user-attachments/assets/488610e0-0f8b-4607-a811-0c284fbc5c31" />
<img width="1919" height="1076" alt="Screenshot 2025-08-19 065332" src="https://github.com/user-attachments/assets/821c25cd-d216-43c1-9a87-3d820b6ff62a" />
<img width="1918" height="1069" alt="Screenshot 2025-08-19 065323" src="https://github.com/user-attachments/assets/b70a8923-ca18-4d7d-b285-ad31641a1f81" />
<img width="1919" height="1076" alt="Screenshot 2025-08-19 065313" src="https://github.com/user-attachments/assets/8ca65087-1cb2-4db7-9b73-c829c9b10fb4" />
<img width="1911" height="1066" alt="Screenshot 2025-08-19 065300" src="https://github.com/user-attachments/assets/4f189290-02df-40e4-9a4b-dbc30a004528" />
<img width="1909" height="924" alt="Screenshot 2025-08-19 065232" src="https://github.com/user-attachments/assets/83e5f164-6423-4beb-a7ea-31c27581a9dd" />
<img width="1919" height="1076" alt="Screenshot 2025-08-19 070024" src="https://github.com/user-attachments/assets/f7d0242d-2cc5-41af-86cc-49d5b58525cb" />

## 💬 Chat

## 📊 Dashboard

---
### 📡 Socket.IO

The app uses Socket.IO for real-time communication between clients and server.
It ensures instant message delivery without refreshing the page.
---

## 📜 License

This project is licensed under the MIT License.





