import { createContext, useContext, useState, useRef, useEffect } from 'react';

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
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  const currentTrack = tracks[currentTrackIndex];

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = currentTrackIndex - 1 >= 0 ? currentTrackIndex - 1 : tracks.length - 1;
    playTrack(prevIndex);
  };

  const playTrack = (index) => {
    if (index < 0 || index >= tracks.length) return;

    const audio = audioRef.current;
    audio.pause();

    setCurrentTrackIndex(index);
    audio.src = tracks[index].src;

    // Wait for the audio to be ready before playing
    const handleCanPlay = () => {
      audio.play().then(() => {
        setIsPlayerVisible(true);
        setIsPlayerExpanded(true);
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
      audio.removeEventListener('canplay', handleCanPlay);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.load();
  };

  useEffect(() => {
    const audio = audioRef.current;

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
      audio.play().then(() => {
        setIsPlayerVisible(true);
      });
    } else {
      audio.pause();
    }
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
