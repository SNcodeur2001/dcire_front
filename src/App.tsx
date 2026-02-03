import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import Dashboard from './pages/Dashboard'
import NewCourrierUpload from './pages/NewCourrierUpload'
import NewCourrierForm from './pages/NewCourrierForm'
import Header from './components/Header'
import Hero from './components/Hero'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'

// Director Pages
import DirectorDashboard from './pages/director/DirectorDashboard'
import AllCouriers from './pages/director/AllCouriers'
import ImputedCouriers from './pages/director/ImputedCouriers'
import SettledCouriers from './pages/director/SettledCouriers'
import CourrierDetail from './pages/director/CourrierDetail'

// Department Pages
import DepartmentDashboard from './pages/department/DepartmentDashboard'
import DepartmentAllCouriers from './pages/department/AllCouriers'
import DepartmentImputedCouriers from './pages/department/ImputedCouriers'
import DepartmentSettledCouriers from './pages/department/SettledCouriers'
import DepartmentCourrierDetail from './pages/department/CourrierDetail'

// Porteur Pages
import PorteurDashboard from './pages/porteur/PorteurDashboard'
import CourriersASolder from './pages/porteur/CourriersASolder'
import CourriersSoldes from './pages/porteur/CourriersSoldes'
import CourriersArchives from './pages/porteur/CourriersArchives'
import PorteurCourrierDetail from './pages/porteur/CourrierDetail'
import PorteurCourrierDetailConsultatif from './pages/porteur/CourrierDetailConsultatif'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing/Marketing Pages - Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <div className="h-full">
                  <Header />
                  <Hero />
                </div>
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/mot-de-passe-oublie" 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } 
          />
          
          {/* Assistant Dashboard Pages - Protected */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRoles={['assistant']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nouveau-courrier" 
            element={
              <ProtectedRoute requiredRoles={['assistant']}>
                <NewCourrierUpload />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nouveau-courrier/formulaire" 
            element={
              <ProtectedRoute requiredRoles={['assistant']}>
                <NewCourrierForm />
              </ProtectedRoute>
            } 
          />
          <Route path="/tous-courriers" element={<Navigate to="/dashboard" replace />} />
          
          {/* Director Dashboard Pages - Protected */}
          <Route 
            path="/directeur/tableau-de-bord" 
            element={
              <ProtectedRoute requiredRoles={['director']}>
                <DirectorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/directeur/tous-les-courriers" 
            element={
              <ProtectedRoute requiredRoles={['director']}>
                <AllCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/directeur/courriers-imputes" 
            element={
              <ProtectedRoute requiredRoles={['director']}>
                <ImputedCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/directeur/courriers-soldes" 
            element={
              <ProtectedRoute requiredRoles={['director']}>
                <SettledCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/directeur/courrier/:id" 
            element={
              <ProtectedRoute requiredRoles={['director']}>
                <CourrierDetail />
              </ProtectedRoute>
            } 
          />

          {/* Department Dashboard Pages - Protected */}
          <Route 
            path="/departement/tableau-de-bord" 
            element={
              <ProtectedRoute requiredRoles={['department']}>
                <DepartmentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departement/tous-les-courriers" 
            element={
              <ProtectedRoute requiredRoles={['department']}>
                <DepartmentAllCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departement/courriers-imputes" 
            element={
              <ProtectedRoute requiredRoles={['department']}>
                <DepartmentImputedCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departement/courriers-soldes" 
            element={
              <ProtectedRoute requiredRoles={['department']}>
                <DepartmentSettledCouriers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departement/courrier/:id" 
            element={
              <ProtectedRoute requiredRoles={['department']}>
                <DepartmentCourrierDetail />
              </ProtectedRoute>
            } 
          />

          {/* Porteur Dashboard Pages - Protected */}
          <Route 
            path="/porteur/tableau-de-bord" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <PorteurDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/porteur/courriers-a-solder" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <CourriersASolder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/porteur/courriers-soldes" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <CourriersSoldes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/porteur/courriers-archives" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <CourriersArchives />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/porteur/courrier/:id" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <PorteurCourrierDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/porteur/courrier-consultatif/:id" 
            element={
              <ProtectedRoute requiredRoles={['porteur']}>
                <PorteurCourrierDetailConsultatif />
              </ProtectedRoute>
            } 
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App