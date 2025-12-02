import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Admin from './components/admin/Admin'
import AdminRoute from './components/admin/AdminRoute'
import Login from './components/user/Login'
import MainLayout from './components/layouts/MainLayout'
import Register from './components/user/Register'
import Forbidden from './components/common/Forbidden'
import Profile from './components/user/Profile'
import NotFound from './components/common/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path='/forbidden' element={<Forbidden />} />
    </Routes>
  )
}

export default App
