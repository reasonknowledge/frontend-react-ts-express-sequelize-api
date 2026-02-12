// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navigation from './components/customs/Navigation'
import Admins from './pages/Admins'
import Students from './pages/Students'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import SignupStudent from './pages/SignupStudent'

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors closeButton />
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<SignupStudent />} />
        <Route element={<MainLayout />}>
          <Route path="/admins" element={<Admins />} />
          <Route path="/etudiants" element={<Students />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
