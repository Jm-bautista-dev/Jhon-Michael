import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AllCertificationsPage } from './pages/AllCertificationsPage'
import { AllProjectsPage } from './pages/AllProjectsPage'
import { AllTechStackPage } from './pages/AllTechStackPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/tech-stack" element={<AllTechStackPage />} />
        <Route path="/certifications" element={<AllCertificationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
