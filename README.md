# 💬 Real-Time Chat Application  

A real-time chat application built with **React.js, Node.js, Express, and Socket.io**. It allows users to **register, log in, and chat instantly** in a clean and responsive interface.  

---

## 🚀 Features  
- 🔐 User Authentication (Login/Signup)  
- 💬 Real-time one-to-one messaging  
- 📱 Responsive and modern UI with Tailwind CSS  
- ⚡ Fast backend powered by Node.js & Express  
- 🔗 WebSocket communication using Socket.io  
- 📧 Password reset functionality  
- 🖼️ Image upload support (Cloudinary)  

---

## 🛠️ Tech Stack  
**Frontend:** React.js, Vite, Tailwind CSS, Socket.io Client  
**Backend:** Node.js, Express.js, Socket.io  
**Real-time:** Socket.io  
**Database:** MongoDB  
**Storage:** Cloudinary (for images)  
**Email:** Nodemailer  

---

## 📂 Project Structure  

```
Chat_application/
├── frontend/          # React + Vite + Tailwind (UI)
├── backend/           # Node.js + Express + Socket.io (API & WebSocket server)
├── DEPLOYMENT.md      # Detailed deployment guide
└── README.md
```

---

## ⚙️ Local Development Setup  

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd Chat_application/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
ORIGIN=http://localhost:4001
JWT_TOKEN=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd Chat_application/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_BACKEND_URL=http://localhost:5001
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:4001`

---

## 🚀 Production Deployment

This application is configured for deployment on:
- **Frontend**: Vercel
- **Backend**: Render

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Deployment Steps:

1. **Backend (Render)**:
   - Connect your GitHub repository
   - Set root directory to `Chat_application/backend`
   - Configure environment variables
   - Deploy

2. **Frontend (Vercel)**:
   - Connect your GitHub repository
   - Set root directory to `Chat_application/frontend`
   - Set `VITE_BACKEND_URL` environment variable to your Render backend URL
   - Deploy

3. **Update Backend CORS**:
   - Update `ORIGIN` environment variable in Render with your Vercel frontend URL

---

## 📝 Environment Variables

### Backend Required Variables:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5001)
- `ORIGIN` - Frontend URL for CORS
- `JWT_TOKEN` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `EMAIL_USER` - Email address for sending emails
- `EMAIL_PASS` - App-specific password for email

### Frontend Required Variables:
- `VITE_BACKEND_URL` - Backend API URL

---

## 🔒 Security Features

- JWT-based authentication
- Secure password hashing with bcrypt
- CORS protection
- Environment variable protection
- Secure cookie handling

---

## 📄 License

ISC

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For deployment issues, refer to [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.

