export function NeuralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Neural network pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural-grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0" cy="0" r="2" fill="#1E90FF" />
            <circle cx="50" cy="50" r="2" fill="#00D4FF" />
            <circle cx="100" cy="0" r="2" fill="#1E90FF" />
            <circle cx="0" cy="100" r="2" fill="#1E90FF" />
            <line
              x1="0"
              y1="0"
              x2="50"
              y2="50"
              stroke="#1E90FF"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="50"
              y1="50"
              x2="100"
              y2="0"
              stroke="#00D4FF"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="50"
              y1="50"
              x2="0"
              y2="100"
              stroke="#1E90FF"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <line
              x1="50"
              y1="50"
              x2="100"
              y2="100"
              stroke="#00D4FF"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
      </svg>

      {/* Circuit board patterns */}
      <div className="absolute top-10 left-10 w-64 h-64 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M20,20 L80,20 L80,60 M80,40 L140,40 L140,100 M140,70 L180,70"
            stroke="#00D4FF"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="20" cy="20" r="4" fill="#1E90FF" />
          <circle cx="80" cy="40" r="4" fill="#00D4FF" />
          <circle cx="140" cy="70" r="4" fill="#1E90FF" />
          <circle cx="180" cy="70" r="4" fill="#00D4FF" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-20 w-80 h-80 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M180,180 L120,180 L120,140 M120,160 L60,160 L60,100 M60,130 L20,130"
            stroke="#1E90FF"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="180" cy="180" r="4" fill="#00D4FF" />
          <circle cx="120" cy="160" r="4" fill="#1E90FF" />
          <circle cx="60" cy="130" r="4" fill="#00D4FF" />
          <circle cx="20" cy="130" r="4" fill="#1E90FF" />
        </svg>
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute top-0 left-0 w-full h-1/3"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(30, 144, 255, 0.15), transparent)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-full h-1/3"
        style={{
          background:
            'radial-gradient(ellipse at bottom right, rgba(0, 212, 255, 0.1), transparent)',
        }}
      />
    </div>
  );
}
