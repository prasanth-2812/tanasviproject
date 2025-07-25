import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Career from './pages/Career';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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

// Import Service Detail Pages from ./data
import AiDevelopment from './data/AiDevelopment';
import ItConsultancy from './data/ItConsultancy';
import CyberSecurity from './data/CyberSecurity';
import MobileAppDevelopment from './data/MobileAppDevelopment';
import WebDevelopment from './data/WebDevelopment';
import ErpApplications from './data/ErpApplications';
import DigitalMarketing from './data/DigitalMarketing';
import Bpo from './data/Bpo';
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
          <Route path="/project" element={<Projects />} />
          <Route path="/team" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Project Detail Routes */}
          <Route path="/project/human-resource-management" element={<Hrm />} />
          <Route path="/project/customer-relationship-management" element={<Crm />} />
          <Route path="/project/shipping-company-models" element={<Shipping />} />
          <Route path="/project/inventory-models" element={<Inventory />} />
          <Route path="/project/home-automation" element={<HomeAutomation />} />
          <Route path="/project/ai-based-models" element={<AiModels />} />
          <Route path="/project/learning-management-system" element={<Lms />} />

          {/* Service Detail Routes */}
          <Route path="/service/ai-development" element={<AiDevelopment />} />
          <Route path="/service/it-consultancy" element={<ItConsultancy />} />
          <Route path="/service/cyber-security" element={<CyberSecurity />} />
          <Route path="/service/mobile-app-development" element={<MobileAppDevelopment />} />
          <Route path="/service/web-development" element={<WebDevelopment />} />
          <Route path="/service/erp-applications" element={<ErpApplications />} />
          <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/service/bpo" element={<Bpo />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;