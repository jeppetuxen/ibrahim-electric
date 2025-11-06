import { useAudio } from '../context/AudioContext';

const StickyAudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    isPlayerVisible,
    isPlayerExpanded,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    toggleExpanded,
    seek,
  } = useAudio();

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVinylClick = () => {
    if (!isPlayerExpanded) {
      // If collapsed, expand and play
      toggleExpanded();
      if (!isPlaying) {
        togglePlay();
      }
    } else {
      // If expanded, just toggle expanded state
      toggleExpanded();
    }
  };

  if (!isPlayerVisible) return null;

  return (
    <div className={`sticky-player ${isPlayerExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Vinyl record (always visible, click to toggle) */}
      <div
        className="vinyl-container"
        onClick={handleVinylClick}
      >
        <div className={`vinyl-record ${isPlaying ? 'playing' : 'paused'}`}>
          {currentTrack.coverArt && (
            <img
              src={currentTrack.coverArt}
              alt={`${currentTrack.album} cover`}
              className="vinyl-cover-art"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>

      {/* Player controls (hidden when collapsed) */}
      <div className="player-controls">
        {/* Track Title and Album */}
        <div className="player-track-info">
          <h4 className="font-heading text-accent-orange">{currentTrack.title}</h4>
          {currentTrack.album && (
            <p className="text-xs text-gray-400 mt-0.5">
              {currentTrack.album} {currentTrack.year && `(${currentTrack.year})`}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="progress-bar flex-1"
            aria-label="Track progress"
          />
          <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>

        {/* Custom Control Buttons */}
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button onClick={playPrevious} className="control-btn" aria-label="Previous track">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/>
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button onClick={togglePlay} className="control-btn-large" aria-label="Play/Pause">
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 3.5A1.5 1.5 0 017 2h1.5a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5H7a1.5 1.5 0 01-1.5-1.5v-13zm7.5 0A1.5 1.5 0 0114.5 2H16a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-13z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button onClick={playNext} className="control-btn" aria-label="Next track">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAudioPlayer;
