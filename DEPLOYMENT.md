# 🚀 Deployment Guide

This guide will help you deploy the Chat Application to production:
- **Frontend**: Vercel
- **Backend**: Render

---

## 📋 Prerequisites

1. **GitHub Account** (for connecting repositories)
2. **Vercel Account** (for frontend deployment)
3. **Render Account** (for backend deployment)
4. **MongoDB Atlas Account** (or your MongoDB instance)
5. **Cloudinary Account** (for image uploads)
6. **Gmail Account** (for email sending - or use another email service)

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend

1. Ensure your backend code is pushed to GitHub
2. Make sure `package.json` has the production start script:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository and branch
5. Configure the service:
   - **Name**: `chat-app-backend` (or your preferred name)
   - **Root Directory**: `Chat_application/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose Free or Paid plan

### Step 3: Set Environment Variables in Render

Go to **Environment** section and add these variables:

```env
NODE_ENV=production
PORT=5001
MONGO_URI=your_mongodb_connection_string
ORIGIN=https://your-frontend-app.vercel.app
JWT_TOKEN=your_secure_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

**Important Notes:**
- Replace `ORIGIN` with your Vercel frontend URL (you'll get this after deploying frontend)
- Generate a strong `JWT_TOKEN` (use a random string generator)
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) for `EMAIL_PASS`

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your backend
3. Wait for deployment to complete
4. Copy your backend URL (e.g., `https://chat-app-backend.onrender.com`)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure your frontend code is pushed to GitHub
2. The `vercel.json` file is already configured

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `Chat_application/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables in Vercel

Go to **Settings** → **Environment Variables** and add:

```env
VITE_BACKEND_URL=https://your-backend-app.onrender.com
```

**Important:** Replace with your actual Render backend URL from Step 4 above.

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. Wait for deployment to complete
4. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Update the `ORIGIN` environment variable with your Vercel frontend URL
3. Redeploy the backend service (or it will auto-redeploy)

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible at `https://your-backend.onrender.com/health`
- [ ] Frontend is accessible at `https://your-app.vercel.app`
- [ ] Frontend can communicate with backend (check browser console)
- [ ] Socket.io connection is working (check for real-time features)
- [ ] User registration/login works
- [ ] Image uploads work (Cloudinary)
- [ ] Password reset emails are sent (check email service)

---

## 🔍 Troubleshooting

### Backend Issues

**Problem**: Backend won't start
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

**Problem**: CORS errors
- Verify `ORIGIN` environment variable matches your Vercel URL exactly
- Check for trailing slashes (should not have one)
- Ensure credentials are enabled in CORS config

**Problem**: Socket.io not connecting
- Verify `ORIGIN` includes your frontend URL
- Check that WebSocket is enabled in Render (should be by default)
- Check browser console for connection errors

### Frontend Issues

**Problem**: API calls failing
- Verify `VITE_BACKEND_URL` is set correctly in Vercel
- Check that backend URL is accessible
- Ensure backend CORS allows your Vercel domain

**Problem**: Build fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Issues

**Problem**: MongoDB connection fails
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Render)
- Ensure database user has proper permissions

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use strong JWT secrets** (at least 32 characters)
3. **Enable HTTPS** (Vercel and Render provide this automatically)
4. **Keep dependencies updated** regularly
5. **Use environment variables** for all sensitive data
6. **Restrict MongoDB access** to specific IPs when possible
7. **Use App Passwords** for Gmail instead of regular passwords

---

## 📝 Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5001
ORIGIN=https://your-frontend.vercel.app
JWT_TOKEN=your_secure_random_string_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env)
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🎯 Quick Deploy Commands

### Local Testing (Before Deployment)

**Backend:**
```bash
cd Chat_application/backend
npm install
npm run dev
```

**Frontend:**
```bash
cd Chat_application/frontend
npm install
npm run dev
```

---

## 📞 Support

If you encounter issues:
1. Check the logs in Render/Vercel dashboards
2. Verify all environment variables are set correctly
3. Test the health endpoint: `https://your-backend.onrender.com/health`
4. Check browser console for frontend errors

---

**Happy Deploying! 🚀**

