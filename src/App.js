import { Route, Routes } from 'react-router'
import NotFound from './404'
import Index from './pages'
import Login from './pages/login'
import Members from './pages/members'

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/members" element={<Members />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
