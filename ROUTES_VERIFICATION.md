# Routes Verification - Frontend & Backend

## ✅ All Routes Match Correctly

### User Routes

| Frontend API Call | Backend Route | Method | Status |
|-------------------|---------------|--------|--------|
| `/api/user/signup` | `/api/user` + `/signup` | POST | ✅ Match |
| `/api/user/login` | `/api/user` + `/login` | POST | ✅ Match |
| `/api/user/logout` | `/api/user` + `/logout` | POST | ✅ Match |
| `/api/user/getUserProfile` | `/api/user` + `/getUserProfile` | GET | ✅ Match |
| `/api/user/forgot-password` | `/api/user` + `/forgot-password` | POST | ✅ Match |
| `/api/user/verify-otp` | `/api/user` + `/verify-otp` | POST | ✅ Match |
| `/api/user/reset-password` | `/api/user` + `/reset-password` | POST | ✅ Match |

### Message Routes

| Frontend API Call | Backend Route | Method | Status |
|-------------------|---------------|--------|--------|
| `/api/message/send/:id` | `/api/message` + `/send/:id` | POST | ✅ Match |
| `/api/message/get/:id` | `/api/message` + `/get/:id` | GET | ✅ Match |

## File Locations

### Frontend API Calls
- `frontend/src/components/Login.jsx` - `/api/user/login`
- `frontend/src/components/Signup.jsx` - `/api/user/signup`
- `frontend/src/left1/Logout.jsx` - `/api/user/logout`
- `frontend/src/context/GetAllUser.jsx` - `/api/user/getUserProfile`
- `frontend/src/components/ForgotPassword.jsx` - `/api/user/forgot-password`, `/api/user/verify-otp`, `/api/user/reset-password`
- `frontend/src/context/UseSendMessage.js` - `/api/message/send/:id`
- `frontend/src/context/UseGetMessage.js` - `/api/message/get/:id`

### Backend Routes
- `backend/routes/user.route.js` - All user routes
- `backend/routes/message.route.js` - All message routes
- `backend/index.js` - Route mounting (`/api/user`, `/api/message`)

## Configuration

### Frontend
- Base URL: Set via `VITE_BACKEND_URL` environment variable
- Axios instance: `frontend/src/utils/axiosInstance.js`
- `withCredentials: true` - Required for cookies

### Backend
- Routes mounted at: `/api/user` and `/api/message`
- CORS configured in: `backend/index.js`
- Cookie parser: Enabled
- Secure routes: Protected with `secureRoute` middleware

## Common Issues & Solutions

### 1. 404 Not Found
- **Check**: Backend URL in `VITE_BACKEND_URL`
- **Check**: Route paths match exactly (case-sensitive)
- **Check**: Backend server is running

### 2. 401 Unauthorized
- **Check**: Cookie is being set after login
- **Check**: `withCredentials: true` in axios
- **Check**: CORS allows credentials
- **Check**: Cookie settings (SameSite, Secure) match environment

### 3. CORS Error
- **Check**: `ORIGIN` environment variable in backend
- **Check**: Frontend URL is in allowed origins
- **Check**: `credentials: true` in CORS config

## Testing Checklist

- [ ] Login API call works
- [ ] Signup API call works
- [ ] GetUserProfile API call works (after login)
- [ ] Logout API call works
- [ ] Send message API call works
- [ ] Get message API call works
- [ ] Forgot password flow works
- [ ] All routes return expected responses

