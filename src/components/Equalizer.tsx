'use client';

import { PlayerState } from '@/components/types';
import { motion, Variants } from 'motion/react';

// Equalizer bar variants with linear easing (more natural per mentor feedback)
const equalizerVariants: Variants = {
  playing: (index: number) => ({
    height: ['20%', '100%'],
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'mirror' as const,
      ease: 'linear', // Changed from easeInOut to linear (mentor feedback)
      delay: index * 0.1,
    },
  }),
  paused: {
    height: '20%',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  loading: {
    height: '50%',
    opacity: 0.5,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const BAR_COUNT = 5;

type EqualizerProps = {
  state: PlayerState;
};

export function Equalizer({ state }: EqualizerProps) {
  return (
    <div className='mt-2 flex h-7 items-end gap-[6px]'>
      {Array.from({ length: BAR_COUNT }).map((_, index) => (
        <motion.span
          key={`bar-${index}`}
          className={`w-[6px] bg-[var(--color-primary-200)] ${
            state === 'playing' ? 'rounded-full' : 'rounded-[2px]'
          }`}
          variants={equalizerVariants}
          animate={state}
          custom={index}
          initial={false}
        />
      ))}
    </div>
  );
}
