'use client';

import { PlayerState } from '@/hooks/Types';
import { motion, Variants } from 'motion/react';
import Image from 'next/image';

// Album art animation variants (moved from inline to variants)
const albumVariants: Variants = {
  playing: {
    rotate: 360,
    scale: 1,
    transition: {
      rotate: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      },
      scale: {
        type: 'spring',
        stiffness: 200,
        damping: 18,
      },
    },
  },
  paused: {
    rotate: 0,
    scale: 0.95,
    transition: {
      rotate: {
        duration: 0.3,
        ease: 'easeOut',
      },
      scale: {
        type: 'spring',
        stiffness: 200,
        damping: 18,
      },
    },
  },
  loading: {
    rotate: 0,
    scale: 0.9,
    transition: {
      rotate: {
        duration: 0.3,
        ease: 'easeOut',
      },
      scale: {
        type: 'sping',
        stiffness: 200,
        damping: 18,
      },
    },
  },
};

// TYPE
type AlbumArtProps = {
  state: PlayerState;
};

export default function Albumart({ state }: AlbumArtProps) {
  return (
    <motion.div
      className='flex h-22 w-22 flex-shrink-0 items-center justify-center rounded-16 bg-[linear-gradient(135deg,var(--color-primary-200),var(--color-pink-600))] shadow-[0_12px_24px_color-mix(in_srgb,var(--color-black)_40%,transparent)]'
      variants={albumVariants}
      animate={state}
      initial={false}
    >
      <Image
        src='/icon/album-art.png'
        alt='Music icon'
        width={40}
        height={40}
        className='opacity-80'
      />
    </motion.div>
  );
}
