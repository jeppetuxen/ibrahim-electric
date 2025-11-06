import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Navigation from './components/Navigation';
import StickyAudioPlayer from './components/StickyAudioPlayer';
import Home from './pages/Home';
import TourDates from './pages/TourDates';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AudioProvider>
        <div className="min-h-screen">
          <Navigation />
          <StickyAudioPlayer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour" element={<TourDates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;
