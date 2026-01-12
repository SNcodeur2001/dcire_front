import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NewCourrierUpload from './pages/NewCourrierUpload'
import NewCourrierForm from './pages/NewCourrierForm'
import Header from './components/Header'
import Hero from './components/Hero'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing/Marketing Pages */}
        <Route 
          path="/" 
          element={
            <div className="h-full">
              <Header />
              <Hero />
            </div>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
        
        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nouveau-courrier" element={<NewCourrierUpload />} />
        <Route path="/nouveau-courrier/formulaire" element={<NewCourrierForm />} />
        <Route path="/tous-courriers" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App