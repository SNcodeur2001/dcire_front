import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
        
        {/* Assistant Dashboard Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nouveau-courrier" element={<NewCourrierUpload />} />
        <Route path="/nouveau-courrier/formulaire" element={<NewCourrierForm />} />
        <Route path="/tous-courriers" element={<Navigate to="/dashboard" replace />} />
        
        {/* Director Dashboard Pages */}
        <Route path="/directeur/tableau-de-bord" element={<DirectorDashboard />} />
        <Route path="/directeur/tous-les-courriers" element={<AllCouriers />} />
        <Route path="/directeur/courriers-imputes" element={<ImputedCouriers />} />
        <Route path="/directeur/courriers-soldes" element={<SettledCouriers />} />
        <Route path="/directeur/courrier/:id" element={<CourrierDetail />} />

        {/* Department Dashboard Pages */}
        <Route path="/departement/tableau-de-bord" element={<DepartmentDashboard />} />
        <Route path="/departement/tous-les-courriers" element={<DepartmentAllCouriers />} />
        <Route path="/departement/courriers-imputes" element={<DepartmentImputedCouriers />} />
        <Route path="/departement/courriers-soldes" element={<DepartmentSettledCouriers />} />
        <Route path="/departement/courrier/:id" element={<DepartmentCourrierDetail />} />

        {/* Porteur Dashboard Pages */}
        <Route path="/porteur/tableau-de-bord" element={<PorteurDashboard />} />
        <Route path="/porteur/courriers-a-solder" element={<CourriersASolder />} />
        <Route path="/porteur/courriers-soldes" element={<CourriersSoldes />} />
        <Route path="/porteur/courriers-archives" element={<CourriersArchives />} />
        <Route path="/porteur/courrier/:id" element={<PorteurCourrierDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App