import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'red' | 'green';
  hoverEffect?: boolean;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = '',
  glowColor = 'blue',
  hoverEffect = true,
  style,
}: GlassCardProps) {
  const shadowColors = {
    blue: 'hover:shadow-[0_8px_32px_rgba(29,181,204,0.18)]',
    cyan: 'hover:shadow-[0_8px_32px_rgba(29,181,204,0.22)]',
    red: 'hover:shadow-[0_8px_32px_rgba(232,90,96,0.18)]',
    green: 'hover:shadow-[0_8px_32px_rgba(42,157,126,0.18)]',
  };

  const borderColors = {
    blue: 'border-[#DFF0EB] hover:border-[#1DB5CC]/40',
    cyan: 'border-[#DFF0EB] hover:border-[#1DB5CC]/50',
    red: 'border-[#DFF0EB] hover:border-[#E85A60]/30',
    green: 'border-[#DFF0EB] hover:border-[#2A9D7E]/40',
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border bg-white
        shadow-[0_2px_12px_rgba(42,157,126,0.08)]
        ${borderColors[glowColor]}
        transition-all duration-300
        ${hoverEffect ? shadowColors[glowColor] + ' hover:scale-[1.02] hover:-translate-y-0.5' : ''}
        ${className}
      `}
      style={style}
    >
      {children}
    </div>
  );
}
