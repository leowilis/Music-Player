'use client';

import { PlayerState, Track } from '@/components/types';
import { Equalizer } from './Equalizer';

type TrackInfoProps = {
  track: Track;
  state: PlayerState;
};

export function TrackInfo({ track, state }: TrackInfoProps) {
  return (
    <div className='flex flex-1 flex-col gap-[6px]'>
      <div className='space-y-1'>
        <h3 className='text-[18px] leading-snug font-semibold text-[var(--color-neutral-25)]'>
          {track.title}
        </h3>
        <p className='text-[14px] text-[var(--color-neutral-400)]'>
          {track.artist}
        </p>
      </div>
      <Equalizer state={state} />
    </div>
  );
}
