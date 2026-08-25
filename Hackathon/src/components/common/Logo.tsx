import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-[12px]',
  };

  // Modern SVG Logo: Lime green roof & house accent + Charcoal structural lines
  const LogoIcon = (
    <div className={`relative flex items-center justify-center ${iconSizes[size]} bg-charcoal rounded-xl shadow-sm p-1.5 flex-shrink-0 group-hover:scale-105 transition-transform`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* House roof accent - Primary Lime Green #A6CE39 */}
        <path d="M20 6L4 20H9V34H17V25H23V34H31V20H36L20 6Z" fill="#A6CE39" />
        {/* Roof inner ridge glow / structure detail */}
        <path d="M20 10.5L30 19.5H27V31H21V22H19V31H13V19.5H10L20 10.5Z" fill="#FFFFFF" fillOpacity="0.25" />
        {/* Foundation line */}
        <rect x="7" y="33" width="26" height="3" rx="1.5" fill="#A6CE39" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  if (variant === 'compact') {
    return (
      <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
        {LogoIcon}
        <span className={`font-extrabold tracking-tight text-charcoal ${titleSizes[size]}`}>
          MERO<span className="text-lime-400">GHAR</span>
        </span>
      </Link>
    );
  }

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {LogoIcon}
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-charcoal leading-none ${titleSizes[size]}`}>
          MERO<span className="text-[#A6CE39]">GHAR</span>
        </span>
        <span className={`font-bold tracking-widest text-secgray ${subtitleSizes[size]} mt-1`}>
          KNOW YOUR PROPERTY VALUE
        </span>
      </div>
    </Link>
  );
};
