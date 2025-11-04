import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import Career from './pages/Career';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import BlogAdmin from './pages/BlogAdmin';
import Analytics from './pages/admin/Analytics';
import CareerApplications from './pages/admin/CareerApplications';

// ==========================================================
// START: CORRECTED IMPORT PATHS
// All imports now correctly point to the './data' folder
// ==========================================================
// Import Project Detail Pages from ./data
import Hrm from './data/Hrm';
import Crm from './data/Crm';
import Shipping from './data/Shipping';
import Inventory from './data/Inventory';
import HomeAutomation from './data/HomeAutomation';
import AiModels from './data/AiModels';
import Lms from './data/Lms';

// Import Service Detail Pages
import ItConsultancy from './pages/services/servicedetails/ItConsultancy';
import CyberSecurity from './pages/services/servicedetails/CyberSecurity';
import MobileAppDevelopment from './pages/services/servicedetails/MobileAppDevelopment';
import WebDevelopment from './pages/services/servicedetails/WebDevelopment';
import ErpApplications from './pages/services/servicedetails/ErpApplications';
import DigitalMarketing from './pages/services/servicedetails/DigitalMarketing';
import Bpo from './pages/services/servicedetails/Bpo';
import AiDevelopment from './pages/services/servicedetails/AiDevelopment';
import CloudServices from './pages/services/servicedetails/CloudServices';
import InternshipTraining from './pages/services/servicedetails/InternshipTraining';
// ==========================================================
// END: CORRECTED IMPORT PATHS
// ==========================================================

// Import Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import SearchPopup from './components/common/SearchPopup';
import CustomCursor from './components/common/CustomCursor';

// Helper component to scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const handleScroll = () => setIsHeaderSticky(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />

      {loading && <Loader />}

      <Header
        onSearchClick={() => setIsSearchOpen(true)}
        isSticky={isHeaderSticky}
      />
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <main>
        <Routes>
          {/* Main Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/team" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/admin/blogs" element={<BlogAdmin />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/careers" element={<CareerApplications />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Project Detail Routes */}
          <Route path="/project/human-resource-management" element={<Hrm />} />
          <Route path="/project/customer-relationship-management" element={<Crm />} />
          <Route path="/project/shipping-company-models" element={<Shipping />} />
          <Route path="/project/inventory-models" element={<Inventory />} />
          <Route path="/project/home-automation" element={<HomeAutomation />} />
          <Route path="/project/ai-based-models" element={<AiModels />} />
          <Route path="/project/learning-management-system" element={<Lms />} />

          {/* Service Detail Routes (mirroring Projects module structure) */}
          <Route path="/service/ai-development" element={<AiDevelopment />} />
          <Route path="/service/it-consultancy" element={<ItConsultancy />} />
          <Route path="/service/cyber-security" element={<CyberSecurity />} />
          <Route path="/service/mobile-app-development" element={<MobileAppDevelopment />} />
          <Route path="/service/web-development" element={<WebDevelopment />} />
          <Route path="/service/erp-applications" element={<ErpApplications />} />
          <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/service/bpo" element={<Bpo />} />
          <Route path="/service/cloud-services" element={<CloudServices />} />
          <Route path="/service/internship-training" element={<InternshipTraining />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;