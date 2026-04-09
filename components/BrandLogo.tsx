
import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon: Shield + W + Crown */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0"
      >
        {/* Shield Background (Silver/Deep Blue) */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
          <path 
            d="M50 5 L90 20 L90 50 C90 75 50 95 50 95 C50 95 10 75 10 50 L10 20 L50 5 Z" 
            fill="#1e3a8a" // Deep Blue
            stroke="#94a3b8" // Silver
            strokeWidth="3"
          />
          {/* The 'W' */}
          <text 
            x="50" 
            y="65" 
            textAnchor="middle" 
            fill="white" 
            fontSize="45" 
            fontWeight="900" 
            fontFamily="sans-serif"
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))' }}
          >
            W
          </text>
          {/* Crown on top of W */}
          <path 
            d="M35 30 L40 20 L50 25 L60 20 L65 30 Z" 
            fill="#fbbf24" // Matte Gold
            stroke="#b45309"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">W-</span>
          <span className="text-3xl md:text-4xl font-black italic tracking-tighter text-[#fbbf24] drop-shadow-sm">LORD</span>
        </div>
        {showTagline && (
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#94a3b8] uppercase mt-1">
            MARKET
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
