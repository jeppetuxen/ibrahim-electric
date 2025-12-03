import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { trackAudioPlayer } from '../utils/analytics';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

const tracks = [
  {
    title: 'FAST FIRE',
    album: 'Fast Fire',
    year: '2025',
    src: '/music/fast-fire/fast-fire.mp3',
    coverArt: '/images/fast-fire-cover.jpg',
    releaseDate: new Date('2025-11-28'),
    isSingle: true
  },
  {
    title: 'SHUFFLE CORN',
    album: 'Fast Fire',
    year: '2025',
    src: '/music/fast-fire/shuffle-corn.mp3',
    coverArt: '/images/fast-fire-cover.jpg',
    releaseDate: new Date('2025-11-28'),
    isSingle: true
  },
  {
    title: 'CHEYENNE',
    album: 'Fast Fire',
    year: '2025',
    src: '/music/fast-fire/cheyenne.mp3',
    coverArt: '/images/fast-fire-cover.jpg',
    releaseDate: new Date('2025-12-04'),
    isSingle: true
  },
  {
    title: 'FLAMBINO',
    album: 'Fast Fire',
    year: '2025',
    src: '/music/fast-fire/flambino.mp3',
    coverArt: '/images/fast-fire-cover.jpg',
    releaseDate: new Date('2025-12-10'),
    isSingle: true
  },
  {
    title: 'ATTACK FROM ABOVE',
    album: 'Rumours From Outer Space',
    year: '2014',
    src: '/audio/01+ATTACK+FROM+ABOVE.mp3',
    coverArt: '/images/albums/rumours-from-outer-space.jpg'
  },
  {
    title: 'BIG BOSS',
    album: 'Rumours From Outer Space',
    year: '2014',
    src: '/audio/02+BIG+BOSS.mp3',
    coverArt: '/images/albums/rumours-from-outer-space.jpg'
  },
  {
    title: 'PARTYMAN',
    album: 'Isle of Men',
    year: '2012',
    src: '/audio/10+Partyman.mp3',
    coverArt: '/images/albums/isle-of-men.jpg'
  },
  {
    title: 'DER ALTE DAS BOOT',
    album: 'Royal Air Maroc',
    year: '2010',
    src: '/audio/02+DER+ALTE+DAS+BOOT.mp3',
    coverArt: '/images/albums/royal-air-maroc.jpg'
  },
  {
    title: 'BELZEBUP',
    album: 'Brothers of Utopia',
    year: '2008',
    src: '/audio/02+BELZEBUP.mp3',
    coverArt: '/images/albums/brothers-of-utopia.jpg'
  },
  {
    title: 'BORAT',
    album: 'Brothers of Utopia',
    year: '2008',
    src: '/audio/10+BORAT.mp3',
    coverArt: '/images/albums/brothers-of-utopia.jpg'
  },
  {
    title: 'FUNKORIFIC',
    album: 'Ibrahim Electric Meets Ray Anderson - Again',
    year: '2007',
    src: '/audio/01+Funkorific+1.mp3',
    coverArt: '/images/albums/meets-ray-anderson-again.jpg'
  },
  {
    title: 'ABSINTHE',
    album: 'Absinthe',
    year: '2006',
    src: '/audio/07+ABSINTHE.mp3',
    coverArt: '/images/albums/absinthe.jpg'
  },
  {
    title: 'YAMSHALA',
    album: 'Absinthe',
    year: '2006',
    src: '/audio/02+YAMSHALA.mp3',
    coverArt: '/images/albums/absinthe.jpg'
  },
  {
    title: 'FELA',
    album: 'Ibrahim Electric Meets Ray Anderson',
    year: '2004',
    src: '/audio/07+FELA.mp3',
    coverArt: '/images/albums/meets-ray-anderson.jpg'
  },
  {
    title: 'ENDANGERED BEAT',
    album: 'Ibrahim Electric',
    year: '2004',
    src: '/audio/01+ENDANGERED+BEAT.mp3',
    coverArt: '/images/albums/ibrahim-electric.jpg'
  },
];

export const AudioProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio());

  const currentTrack = tracks[currentTrackIndex];

  const playNext = () => {
    const now = new Date();
    let nextIndex = (currentTrackIndex + 1) % tracks.length;
    let attempts = 0;

    // Find next released track, skip unreleased ones
    while (attempts < tracks.length) {
      const track = tracks[nextIndex];
      if (!track.releaseDate || track.releaseDate <= now) {
        playTrack(nextIndex);
        return;
      }
      nextIndex = (nextIndex + 1) % tracks.length;
      attempts++;
    }

    // All tracks unreleased or back to same track, play first released track
    playTrack(currentTrackIndex);
  };

  const playPrevious = () => {
    const now = new Date();
    let prevIndex = currentTrackIndex - 1 >= 0 ? currentTrackIndex - 1 : tracks.length - 1;
    let attempts = 0;

    // Find previous released track, skip unreleased ones
    while (attempts < tracks.length) {
      const track = tracks[prevIndex];
      if (!track.releaseDate || track.releaseDate <= now) {
        playTrack(prevIndex);
        return;
      }
      prevIndex = prevIndex - 1 >= 0 ? prevIndex - 1 : tracks.length - 1;
      attempts++;
    }

    // All tracks unreleased or back to same track, stay on current
    playTrack(currentTrackIndex);
  };

  const playTrack = (index) => {
    if (index < 0 || index >= tracks.length) return;

    const track = tracks[index];

    // Check if track is released
    if (track.releaseDate && track.releaseDate > new Date()) {
      console.log('Track not yet released');
      return;
    }

    const audio = audioRef.current;
    audio.pause();

    setCurrentTrackIndex(index);
    setIsLoading(true);
    audio.src = track.src;

    // Wait for the audio to be ready before playing
    const handleCanPlay = () => {
      setIsLoading(false);
      audio.play().then(() => {
        setIsPlayerVisible(true);
        setIsPlayerExpanded(true);
        setIsPlaying(true);
        // Track play in Google Analytics
        trackAudioPlayer('play', track.title);
      }).catch(error => {
        console.error('Error playing audio:', error);
        setIsLoading(false);
      });
      audio.removeEventListener('canplay', handleCanPlay);
    };

    const handleError = () => {
      setIsLoading(false);
      audio.removeEventListener('error', handleError);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.load();
  };

  useEffect(() => {
    const audio = audioRef.current;

    // iOS compatibility settings
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');

    // Load the first track by default
    audio.src = currentTrack.src;
    audio.preload = 'metadata';
    audio.volume = volume;

    const handleEnded = () => {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(nextIndex);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTrackIndex, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      // iOS unlock: Try to play a silent sound first to unlock audio context
      if (!isAudioUnlocked) {
        audio.volume = 0;
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = volume;
          setIsAudioUnlocked(true);
          // Now try playing for real
          playAudio();
        }).catch(() => {
          // Still locked, try loading and playing normally
          playAudio();
        });
      } else {
        playAudio();
      }
    } else {
      audio.pause();
      // Track pause in Google Analytics
      trackAudioPlayer('pause', currentTrack.title);
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    setIsLoading(true);

    // iOS requires loading the audio before playing
    if (audio.readyState < 2) {
      audio.load();
    }

    const handleCanPlayForToggle = () => {
      setIsLoading(false);
      audio.removeEventListener('canplay', handleCanPlayForToggle);
    };

    audio.addEventListener('canplay', handleCanPlayForToggle);

    audio.play()
      .then(() => {
        setIsPlayerVisible(true);
        setIsAudioUnlocked(true);
        setIsLoading(false);
        // Track play in Google Analytics
        trackAudioPlayer('play', currentTrack.title);
      })
      .catch(error => {
        console.error('Error playing audio:', error);
        setIsLoading(false);
        // On iOS, we might need to wait for user interaction
        if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
          console.log('Audio playback requires user interaction on iOS - please tap the vinyl again');
        }
      });
  };

  const toggleExpanded = () => {
    setIsPlayerExpanded(!isPlayerExpanded);
  };

  const seek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (newVolume) => {
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const value = {
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isPlayerVisible,
    isPlayerExpanded,
    currentTime,
    duration,
    volume,
    isLoading,
    audioRef,
    playTrack,
    togglePlay,
    playNext,
    playPrevious,
    toggleExpanded,
    seek,
    changeVolume,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
