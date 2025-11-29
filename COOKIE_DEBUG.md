# Cookie Debugging Guide

## Problem
After login, user gets redirected back to login page with "Error in GetAllUser" in console.

## Root Cause
The `GetAllUser` hook makes a GET request immediately after login. If the cookie isn't sent properly (due to CORS/timing issues), the backend returns 401, causing a redirect.

## Fixes Applied

### 1. GetAllUser Hook (`frontend/src/context/GetAllUser.jsx`)
- ✅ Added check to only fetch if `authUser` exists
- ✅ Added 500ms delay before making request (allows cookie to be set)
- ✅ Improved error handling - doesn't redirect immediately on 401
- ✅ Checks localStorage before redirecting
- ✅ Better error logging for debugging

### 2. Axios Instance (`frontend/src/utils/axiosInstance.js`)
- ✅ Added request/response interceptors for debugging
- ✅ `withCredentials: true` is set (required for cookies)

### 3. Backend Cookie Settings (`backend/jwt/generatedToken.js`)
- ✅ Environment-aware cookie settings
- ✅ Production: `SameSite=None; Secure=true` (for cross-origin)

## How to Debug

### 1. Check Browser Console
Look for:
- "Error in GetAllUser - Status: 401"
- "Error in GetAllUser - Data: ..."
- "401 error but user is still in localStorage. Possible cookie issue."

### 2. Check Network Tab
1. Open DevTools → Network tab
2. Filter by "getUserProfile"
3. Check the request:
   - **Request Headers**: Should include `Cookie: jwt=...`
   - **Response Headers**: Should have `Set-Cookie` on login
   - **Status**: If 401, check why cookie wasn't sent

### 3. Check Application Tab → Cookies
1. Open DevTools → Application → Cookies
2. Check if `jwt` cookie exists
3. Cookie should have:
   - **Domain**: Should match backend domain (e.g., `.onrender.com`)
   - **HttpOnly**: ✅ true
   - **Secure**: ✅ true (in production)
   - **SameSite**: None (in production)

### 4. Verify CORS Settings
**Backend (Render):**
- `ORIGIN` should be exactly: `https://your-frontend.vercel.app`
- No trailing slash
- Include `https://`

**Frontend (Vercel):**
- `VITE_BACKEND_URL` should be: `https://your-backend.onrender.com`
- No trailing slash

## Common Issues

### Issue 1: Cookie Not Being Sent
**Symptoms:**
- 401 error on all authenticated requests
- Cookie exists in browser but not in request headers

**Solutions:**
1. Verify `withCredentials: true` in axios config ✅ (already set)
2. Check CORS `credentials: true` on backend ✅ (already set)
3. Verify `ORIGIN` matches frontend URL exactly
4. Check if both frontend and backend are on HTTPS

### Issue 2: Cookie Set But Not Persisting
**Symptoms:**
- Login works but cookie disappears on refresh

**Solutions:**
1. Check cookie `maxAge` (should be 5 days) ✅
2. Verify `SameSite=None` requires `Secure=true` ✅
3. Check browser settings (some browsers block third-party cookies)

### Issue 3: Timing Issue
**Symptoms:**
- Works sometimes, fails other times
- Error happens immediately after login

**Solutions:**
1. Added 500ms delay before API call ✅
2. Check if delay needs to be increased

## Testing Steps

1. **Login Test:**
   - Login successfully
   - Check console for errors
   - Should NOT redirect to login
   - Should see users list

2. **Cookie Test:**
   - After login, check Application → Cookies
   - Cookie should exist
   - Make a manual API call in console:
     ```javascript
     fetch('https://your-backend.onrender.com/api/user/getUserProfile', {
       credentials: 'include'
     })
     ```
   - Should return 200, not 401

3. **Refresh Test:**
   - Login and stay on home page
   - Refresh the page
   - Should still be logged in
   - Should NOT redirect to login

## If Still Not Working

1. **Check Backend Logs (Render):**
   - Look for CORS errors
   - Check if cookie is being received: `req.cookies.jwt`
   - Verify JWT token is valid

2. **Test Cookie Manually:**
   ```javascript
   // In browser console after login
   document.cookie // Should show jwt cookie
   ```

3. **Verify Environment Variables:**
   - Backend: `ORIGIN=https://your-frontend.vercel.app`
   - Frontend: `VITE_BACKEND_URL=https://your-backend.onrender.com`

4. **Check Browser Compatibility:**
   - Some browsers (Safari) have stricter cookie policies
   - Try in Chrome/Firefox first
   - Check if third-party cookies are blocked

## Expected Behavior After Fix

1. User logs in → Success toast
2. Navigates to home page → No redirect
3. `GetAllUser` makes request → 200 OK (not 401)
4. Users list loads → No errors
5. Page refresh → Still logged in

If you still see "Error in GetAllUser" but no redirect, that's progress! The error handling now prevents immediate redirect and logs the issue for debugging.

