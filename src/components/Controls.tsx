'use client';

import { PlayerState } from '@/components/types';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

// TYPE
type ControlsProps = {
  state: PlayerState;
  isPlaying: boolean;
  isLoading: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  onPlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShuffleToggle: () => void;
  onRepeatToggle: () => void;
};

export function Controls({
  state,
  isPlaying,
  isLoading,
  isShuffle,
  isRepeat,
  onPlay,
  onNext,
  onPrev,
  onShuffleToggle,
  onRepeatToggle,
}: ControlsProps) {
  const playButtonColor =
    state === 'loading'
      ? 'var(--color-neutral-600)'
      : 'var(--color-primary-300)';

  return (
    <div className='mt-[18px] flex items-center justify-center gap-[18px]'>
      {/* Shuffle */}
      <button
        type='button'
        aria-pressed={isShuffle}
        onClick={onShuffleToggle}
        className={`group flex h-14 w-14 cursor-pointer items-center justify-center transition duration-200 ease-out active:scale-95 ${
          isShuffle
            ? 'rounded-lg bg-[var(--color-neutral-800)]'
            : 'rounded-full'
        }`}
      >
        <Image
          src='/icon/shuffle-button.svg'
          alt='Shuffle'
          width={28}
          height={28}
          className={`transition duration-200 ${
            isShuffle ? 'brightness-200' : 'group-hover:brightness-200'
          }`}
        />
      </button>

      {/* Previous */}
      <button
        type='button'
        onClick={onPrev}
        className='group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition duration-200 ease-out active:scale-95'
      >
        <Image
          src='/icon/previous-button.svg'
          alt='Previous'
          width={28}
          height={28}
          className='transition duration-200 group-hover:brightness-200'
        />
      </button>

      {/* Play/Pause */}
      <motion.button
        type='button'
        aria-pressed={isPlaying}
        aria-busy={isLoading}
        onClick={onPlay}
        disabled={isLoading}
        className='flex h-17 w-17 cursor-pointer items-center justify-center rounded-full transition duration-200 ease-out disabled:cursor-not-allowed'
        animate={{ backgroundColor: playButtonColor }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={!isLoading ? { scale: 1.05 } : undefined}
        whileTap={!isLoading ? { scale: 0.95 } : undefined}
      >
        <AnimatePresence mode='wait' initial={false}>
          {isPlaying ? (
            <motion.span
              key='pause-icon'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src='/icon/pause-button.svg'
                alt='Pause'
                width={24}
                height={24}
                className={isLoading ? 'opacity-60' : 'opacity-100'}
              />
            </motion.span>
          ) : (
            <motion.span
              key='play-icon'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src='/icon/play-button.svg'
                alt='Play'
                width={24}
                height={24}
                className={isLoading ? 'opacity-60' : 'opacity-100'}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Next */}
      <button
        type='button'
        onClick={onNext}
        className='group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition duration-200 ease-out active:scale-95'
      >
        <Image
          src='/icon/next-button.svg'
          alt='Next'
          width={28}
          height={28}
          className='transition duration-200 group-hover:brightness-200'
        />
      </button>

      {/* Repeat */}
      <button
        type='button'
        aria-pressed={isRepeat}
        onClick={onRepeatToggle}
        className={`group flex h-14 w-14 cursor-pointer items-center justify-center transition duration-200 ease-out active:scale-95 ${
          isRepeat ? 'rounded-lg bg-[var(--color-neutral-800)]' : 'rounded-full'
        }`}
      >
        <Image
          src='/icon/repeat-button.svg'
          alt='Repeat'
          width={28}
          height={28}
          className={`transition duration-200 ${
            isRepeat ? 'brightness-200' : 'group-hover:brightness-200'
          }`}
        />
      </button>
    </div>
  );
}
