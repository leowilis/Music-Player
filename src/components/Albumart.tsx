"use client";

import { motion } from "motion/react";
import Image from "next/image";

// TYPE
type AlbumArtProps = {
  state: PlayerState;
};


export default function Albumart({ state }: AlbumArtProps) {
  return (
    <motion.div 
    className="flex h-22 w-22 flex-shrink-0 items-center justify-center rounded-16 bg-[linear-gradient(135deg,var(--color-primary-200),var(--color-pink-600))] shadow-[0_12px_24px_color-mix(in_srgb,var(--color-black)_40%,transparent)]"
      variants={albumVariants}
      animate={state}
      initial={false}
    >
    <Image
        src="/icon/album-art.png"
        alt="Music icon"
        width={40}
        height={40}
        className="opacity-80"
      />
    </motion.div>
  )
}
