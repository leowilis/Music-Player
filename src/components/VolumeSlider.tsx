"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type VolumeSliderProps = {
  volume: number;
  onVolumeChange: (value: number) => void;
};

export function VolumeSlider({ volume, onVolumeChange }: VolumeSliderProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="mt-[18px] flex items-center gap-3">
      <Image
        src="/icon/volume-icon.svg"
        alt="Volume"
        width={18}
        height={18}
        className="opacity-80"
      />
      <div
        className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-[var(--color-neutral-800)]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <motion.div
          className="absolute inset-0 origin-left rounded-full"
          animate={{
            scaleX: volume,
            backgroundColor: isHover
              ? "var(--color-primary-200)"
              : "var(--color-neutral-500)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Volume"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}