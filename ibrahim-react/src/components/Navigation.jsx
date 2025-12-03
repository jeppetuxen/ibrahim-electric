import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '../data/navigation';
import { SITE, TIMING } from '../data/constants';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > TIMING.SCROLL_THRESHOLD);
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
            <Link to="/">{SITE.TITLE}</Link>
          </h1>

          <div className="hidden md:flex space-x-8 font-medium">
            {navigationItems.map(item => (
              item.type === 'hash' ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href)}
                  className="hover:text-gray-300 hover:scale-110 inline-block transition-all"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="hover:text-gray-300 hover:scale-110 inline-block transition-all"
                >
                  {item.label}
                </Link>
              )
            ))}
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
            {navigationItems.map(item => (
              item.type === 'hash' ? (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href)}
                  className="block hover:text-gray-300 transition-transform"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block hover:text-gray-300 transition-transform"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
