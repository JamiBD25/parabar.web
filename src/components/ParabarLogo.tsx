import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ParabarLogo: React.FC<LogoProps> = ({ 
  className = "w-12 h-12", 
  size, 
  showText = false 
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  
  const sources = [
    'https://i.postimg.cc/15zPjh2B/Logo-png.png', // Direct online hosted high-quality PNG
    '/logo.png',                                  // Local fallback
  ];
  
  const logoPath = sources[currentSourceIndex];

  const handleImageError = () => {
    if (currentSourceIndex < sources.length - 1) {
      setCurrentSourceIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  if (!imageError) {
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className}`}>
        <img 
          src={logoPath} 
          alt="Parabar Logo" 
          style={{ width: size || '100%', height: size || 'auto' }}
          className="object-contain"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />
        {showText && (
          <span className="text-[10px] font-black tracking-widest text-[#B22222] uppercase mt-1">
            PARABAR
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg 
        viewBox="0 0 300 330" 
        width={size || "100%"} 
        height={size ? (size * 1.1) : "100%"} 
        className="overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer green rectangle frame */}
        <rect 
          x="45" 
          y="15" 
          width="210" 
          height="250" 
          fill="#FFFFFF" 
          stroke="#00FF00" 
          strokeWidth="6" 
        />
        
        {/* Soft pink concentric arch lines representing dawn/sunset glow */}
        {/* Outer translucent light pink ring */}
        <path 
          d="M 75 210 A 75 75 0 0 1 225 210" 
          stroke="#FFE4E1" 
          strokeWidth="12" 
          fill="none" 
        />
        {/* Inner light-pink ring */}
        <path 
          d="M 85 210 A 65 65 0 0 1 215 210" 
          stroke="#FFC0CB" 
          strokeWidth="10" 
          fill="none" 
        />

        {/* Main Rising Sun (Semi-circle inside) */}
        <path 
          d="M 90 210 A 60 60 0 0 1 210 210 Z" 
          fill="#FF0000" 
        />

        {/* Green Sailboat */}
        {/* Left tall sail (triangular sail) */}
        <polygon 
          points="133,32 133,155 85,155" 
          fill="#32CD32" 
        />
        {/* Right smaller sail/accents */}
        <polygon 
          points="133,32 215,155 133,155" 
          fill="#00FF00" 
        />
        
        {/* Mast line */}
        <rect 
          x="131" 
          y="30" 
          width="4" 
          height="125" 
          fill="#008000" 
        />

        {/* Green Boat Hull (horizontal wedge) */}
        <polygon 
          points="80,160 220,150 133,190" 
          fill="#00FF00" 
        />

        {/* Lime Green Wave Overlays */}
        {/* Lower organic flowing waves */}
        <path 
          d="M 10 200 C 50 170, 90 240, 130 200 C 145 185, 125 170, 115 182 C 95 205, 55 160, 10 200 Z" 
          fill="#7FFF00" 
          opacity="0.95"
        />
        <path 
          d="M 290 230 C 250 200, 210 270, 170 230 C 155 215, 175 200, 185 212 C 205 235, 245 190, 290 230 Z" 
          fill="#7FFF00" 
          opacity="0.95"
        />
        
        {/* Base central rich green overlap wave */}
        <path 
          d="M 38 230 C 100 235, 140 175, 200 235 C 230 245, 262 225, 262 225 C 262 225, 215 265, 150 263 C 90 260, 38 230, 38 230 Z" 
          fill="#00FF00" 
        />

        {/* Stylized Red Bengali Typo under the box: "পারাবার" */}
        <text 
          x="150" 
          y="312" 
          fill="#FF0000" 
          fontSize="56" 
          fontWeight="900" 
          textAnchor="middle" 
          fontFamily="'Hind Siliguri', 'Kalpurush', 'Siyam Rupali', 'serif', 'sans-serif'"
          letterSpacing="1"
        >
          পারাবার
        </text>
      </svg>
      {showText && (
        <span className="text-[10px] font-black tracking-widest text-[#B22222] uppercase mt-1">
          PARABAR
        </span>
      )}
    </div>
  );
};
