import { HashRouter, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { AllCertificationsPage } from './pages/AllCertificationsPage'
import { AllProjectsPage } from './pages/AllProjectsPage'
import { AllTechStackPage } from './pages/AllTechStackPage'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/tech-stack" element={<AllTechStackPage />} />
        <Route path="/certifications" element={<AllCertificationsPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
