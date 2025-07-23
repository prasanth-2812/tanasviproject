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

// Import Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import SearchPopup from './components/common/SearchPopup';
import CustomCursor from './components/common/CustomCursor'; // Correctly imported

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // All hooks MUST be at the top level of the function
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

  // The main return statement with JSX
  return (
    <Router>
      {/* CustomCursor is now correctly placed here */}
      <CustomCursor /> 
      
      {loading && <Loader />}
      <ScrollToTop />
      <Header 
        onSearchClick={() => setIsSearchOpen(true)} 
        isSticky={isHeaderSticky} 
      />
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/service.html" element={<Services />} />
          <Route path="/project.html" element={<Projects />} />
          <Route path="/team.html" element={<Career />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;