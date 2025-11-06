import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll to hash after navigation
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  // Handle smooth scroll to hash links
  const handleHashClick = (e, hash) => {
    e.preventDefault();

    // Close mobile menu
    setIsMobileMenuOpen(false);

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      // We're already on home, just scroll
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', hash);
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-scrolled' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="site-title">
            <Link to="/">IBRAHIM ELECTRIC</Link>
          </h1>

          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#intro" onClick={(e) => handleHashClick(e, '#intro')} className="hover:text-gray-300 hover:scale-110 inline-block transition-all">Home</a>
            <a href="#band" onClick={(e) => handleHashClick(e, '#band')} className="hover:text-gray-300 hover:scale-110 inline-block transition-all">Band</a>
            <a href="#music" onClick={(e) => handleHashClick(e, '#music')} className="hover:text-gray-300 hover:scale-110 inline-block transition-all">Music</a>
            <Link to="/tour" className="hover:text-gray-300 hover:scale-110 inline-block transition-all">Live</Link>
            <Link to="/contact" className="hover:text-gray-300 hover:scale-110 inline-block transition-all">Contact</Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 animate-fade-in text-center">
            <a href="#intro" onClick={(e) => handleHashClick(e, '#intro')} className="block hover:text-gray-300 transition-transform">Home</a>
            <a href="#band" onClick={(e) => handleHashClick(e, '#band')} className="block hover:text-gray-300 transition-transform">Band</a>
            <a href="#music" onClick={(e) => handleHashClick(e, '#music')} className="block hover:text-gray-300 transition-transform">Music</a>
            <Link to="/tour" className="block hover:text-gray-300 transition-transform">Live</Link>
            <Link to="/contact" className="block hover:text-gray-300 transition-transform">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
