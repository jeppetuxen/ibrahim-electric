import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import Navigation from './components/Navigation';
import StickyAudioPlayer from './components/StickyAudioPlayer';
import Home from './pages/Home';
import TourDates from './pages/TourDates';
import Press from './pages/Press';
import Singles from './pages/Singles';
import SinglePage from './pages/SinglePage';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { trackPageView } from './utils/analytics';

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <AudioProvider>
        <PageViewTracker />
        <div className="min-h-screen">
          <Navigation />
          <StickyAudioPlayer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour" element={<TourDates />} />
            <Route path="/singles" element={<Singles />} />
            <Route path="/singles/:singleId" element={<SinglePage />} />
            <Route path="/press/dk" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;
