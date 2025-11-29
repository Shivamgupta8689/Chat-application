import Left from './left/Left'
import Right from './right/Right'
import Logout from './left1/Logout'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './context/Authprovider'
import { Routes, Route, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword'

function App() {
  const {authUser} = useAuth();

  return (
    <>
      <Routes>
      <Route
        path="/"
        element={
          authUser?.user ? (
            <div className="flex h-screen">
              <Logout />
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={authUser?.user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={authUser?.user ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="/forgotPassword" element={authUser?.user ? <Navigate to="/" replace /> : <ForgotPassword/>} />
    </Routes>
    <Toaster />

    </>
    
  )
}

export default App
