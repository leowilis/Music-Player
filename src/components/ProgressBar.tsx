'use client';

import { PlayerState } from '@/components/Types';
import { motion } from 'motion/react';
import { useMemo } from 'react';

// TIME DURATION
const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// TYPE
type ProgressBarProps = {
  currentTime: number;
  duration: number;
  state: PlayerState;
  onSeek: (value: number) => void;
};

export default function ProgressBar({
  currentTime,
  duration,
  state,
  onSeek,
}: ProgressBarProps) {
  const progressScale = useMemo(() => {
    if (!duration) return 0;
    return Math.min(currentTime / duration, 1);
  }, [currentTime, duration]);

  const progressPercent = useMemo(() => {
    if (!duration) return 0;
    return Math.min((currentTime / duration) * 100, 100);
  }, [currentTime, duration]);

  const progressColor =
    state === 'playing'
      ? 'var(--color-neutral-500)'
      : 'var(--color-neutral-600)';

  return (
    <div className='mt-5 space-y-[10px]'>
      <div className='relative h-[6px] w-full rounded-full bg-[var(--color-neutral-800)] overflow-hidden'>
        <motion.div
          className='absolute inset-0 origin-left rounded-full'
          animate={{
            scaleX: progressScale,
            backgroundColor: progressColor,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        <input
          type='range'
          min={0}
          max={100}
          step={0.1}
          value={progressPercent}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-label='Seek'
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
        />
      </div>
      <div className='flex items-center justify-between text-[12px] text-[var(--color-neutral-500)]'>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
