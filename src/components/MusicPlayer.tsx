'use client';
import { motion, Variants } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TrackInfo } from './TrackInfo';
import { PlayerState, Track } from '@/components/types';
import ProgressBar from './ProgressBar';
import { Controls } from './Controls';
import { VolumeSlider } from './VolumeSlider';
import AlbumArt from './AlbumArt';


// DATA

const musicTrack: Track[] = [
  {
    title: 'Awesome Song Title',
    artist: 'Amazing Artist',
    src: '/music/background-music.mp3',
  },
  {
    title: 'Chill-out Acid Squeeze Mix',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    title: 'Beat Heat',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    title: 'Bass Bounce',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
  {
    title: 'Light Space',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
  },
  {
    title: 'Club Star',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  },
  {
    title: 'Violence Nights',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
  },
];

// ANIMATION VARIANTS

const containerVariants: Variants = {
  playing: {
    backgroundColor: 'var(--color-card)',
    boxShadow:
      '0 25px 60px color-mix(in srgb, var(--color-primary-300) 45%, transparent)',
  },
  paused: {
    backgroundColor: 'var(--color-card)',
    boxShadow:
      '0 20px 50px color-mix(in srgb, var(--color-black) 55%, transparent)',
  },
  loading: {
    backgroundColor: 'var(--color-card)',
    boxShadow:
      '0 16px 40px color-mix(in srgb, var(--color-black) 50%, transparent)',
  },
};

// UTILITY
const getRandomIndex = (current: number, total: number): number => {
  if (total <= 1) return current;
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * total);
  }
  return next;
};

// MAIN COMPONENT
export default function MusicPlayer() {
  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const toggleTimeoutRef = useRef<number | null>(null);
  const trackHistoryRef = useRef<number[]>([]);
  const playerStateRef = useRef<PlayerState>('paused');

  // STATE
  const [playerState, setPlayerState] = useState<PlayerState>('paused');
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // DERIVED STATE
  const currentTrack = musicTrack[trackIndex] ?? musicTrack[0];
  const isPlaying = playerState === 'playing';
  const isLoading = playerState === 'loading';

  // Keep ref in sync with state for async operations
  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  //   HANDLERS
  /**
   * Navigate to next track
   */
  const handleNextTrack = useCallback(() => {
    setTrackIndex((prevIndex) => {
      const nextIndex = isShuffle
        ? getRandomIndex(prevIndex, musicTrack.length)
        : (prevIndex + 1) % musicTrack.length;
      if (isShuffle) {
        trackHistoryRef.current.push(prevIndex);
      }
      return nextIndex;
    });
  }, [isShuffle]);

  /**
   * Navigate to previous track
   * Uses shuffle history if available
   */
  const handlePrevTrack = useCallback(() => {
    if (isShuffle && trackHistoryRef.current.length > 0) {
      const previousIndex = trackHistoryRef.current.pop();
      if (previousIndex !== undefined) {
        setTrackIndex(previousIndex);
        return;
      }
    }
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + musicTrack.length) % musicTrack.length,
    );
  }, [isShuffle]);

  /**
   * Toggle play/pause with loading animation
   */
  const handlePlayToggle = () => {
    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current);
    }
    if (isLoading) return;
    const nextState: PlayerState = isPlaying ? 'paused' : 'playing';
    setPlayerState('loading');
    toggleTimeoutRef.current = window.setTimeout(() => {
      setPlayerState(nextState);
      toggleTimeoutRef.current = null; // Reset ref after completion
    }, 500);
  };

  /**
   * Toggle shuffle mode
   */
  const handleShuffleToggle = () => {
    setIsShuffle((prev) => {
      const next = !prev;
      if (next) {
        trackHistoryRef.current;
      }
      return next;
    });
  };

  /**
   * Seek to a specific position
   */
  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const nextTime = Math.min((value / 100) * duration, duration);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  /**
   * Update volume
   */
  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  // AUDIO EFFECTS

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => setCurrentTime(audio.currentTime);
    const handleMetadata = () => setDuration(audio.duration || 0);
    const handleError = () => handleNextTrack();
    const handleEnded = () => {
      if (isRepeat) return;
      audio.currentTime = 0;
      setCurrentTime(0);
      handleNextTrack();
    };
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isRepeat, handleNextTrack]);

  // Sync loop mode
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = isRepeat;
  }, [isRepeat]);

  // Sync volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Sync playback state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playerState === 'playing') {
      audio.play().catch(() => {});
    }
    if (playerState === 'paused') {
      audio.pause();
    }
  }, [playerState]);

  // Load new track on index change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    audio.currentTime = 0;
    queueMicrotask(() => {
      setCurrentTime(0);
      setDuration(0);
    });
    if (playerStateRef.current === 'playing') {
      audio.play().catch(() => {});
    }
  }, [trackIndex]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toggleTimeoutRef.current) {
        window.clearTimeout(toggleTimeoutRef.current);
      }
    };
  }, []);

  // RENDER
  return (
    <div className='w-full max-w-[500px]'>
      <motion.div
        className='relative overflow-hidden rounded-[28px] border border-[var(--color-neutral-800)] p-[28px]'
        variants={containerVariants}
        animate={playerState}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Header: Album Art + Track Info */}
        <div className='flex items-start gap-[20px]'>
          <AlbumArt state={playerState} />
          <TrackInfo track={currentTrack} state={playerState} />
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          state={playerState}
          onSeek={handleSeek}
        />

        {/* Playback Controls */}
        <Controls
          state={playerState}
          isPlaying={isPlaying}
          isLoading={isLoading}
          isShuffle={isShuffle}
          isRepeat={isRepeat}
          onPlay={handlePlayToggle}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onShuffleToggle={handleShuffleToggle}
          onRepeatToggle={() => setIsRepeat((prev) => !prev)}
        />

        {/* Volume Slider */}
        <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange} />

        {/* Audio Element */}
        <audio ref={audioRef} src={currentTrack.src} preload='metadata' />
      </motion.div>
    </div>
  );
}
