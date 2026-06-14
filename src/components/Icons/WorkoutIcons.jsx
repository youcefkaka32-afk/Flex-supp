import React from 'react'

export default function Icon({ name, className = '', size = 28 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (name) {
    case 'dumbbell':
      return (
        <svg {...common} className={className}>
          <path d="M3 10h2v4H3zM19 10h2v4h-2z" fill="#111" />
          <rect x="6" y="9.5" width="12" height="5" rx="1" fill="#111" />
        </svg>
      )
    case 'fire':
      return (
        <svg {...common} className={className}>
          <path d="M12 2s3 3 3 6c0 3-1 4-3 6-2-2-3-3-3-6 0-3 3-6 3-6z" fill="#ff6b35" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...common} className={className}>
          <path d="M13 2L3 14h7l-1 8L21 10h-7l-1-8z" fill="#f5c542" />
        </svg>
      )
    case 'run':
      return (
        <svg {...common} className={className}>
          <path d="M6 21l4-4 2 2 4-8 2 1-6 11-6-2zM13 5a2 2 0 11-4 0 2 2 0 014 0z" fill="#0b1220" />
        </svg>
      )
    case 'seedling':
      return (
        <svg {...common} className={className}>
          <path d="M12 2C7 7 4 10 4 14c0 4 4 6 8 6s8-2 8-6c0-4-3-7-8-12z" fill="#5bb36b" />
        </svg>
      )
    case 'target':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="12" r="4" fill="#111" />
        </svg>
      )
    case 'num-3':
      return (
        <svg {...common} className={className}>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#111">3</text>
        </svg>
      )
    case 'num-4':
      return (
        <svg {...common} className={className}>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#111">4</text>
        </svg>
      )
    case 'num-5':
      return (
        <svg {...common} className={className}>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#111">5</text>
        </svg>
      )
    case 'home':
      return (
        <svg {...common} className={className}>
          <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z" fill="#111" />
        </svg>
      )
    case 'minimal':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="4" fill="#111" />
        </svg>
      )
    case 'leg':
      return (
        <svg {...common} className={className}>
          <path d="M8 3v6l3 3v7" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'peach':
      return (
        <svg {...common} className={className}>
          <path d="M12 3c2 0 4 1 5 3 1 2 1 4-1 6s-4 4-6 4-4-2-5-4c-1-2 0-4 1-6s2-3 6-3z" fill="#ff9aa2" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common} className={className}>
          <path d="M20 6L9 17l-5-5" stroke="#0b8f4a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'knee':
      return (
        <svg {...common} className={className}>
          <path d="M6 6c2 2 4 2 6 0s4 0 6 2" stroke="#111" strokeWidth="1.5" fill="none" />
        </svg>
      )
    case 'back':
      return (
        <svg {...common} className={className}>
          <path d="M4 6c4-2 8-2 16 0v8c-8 2-12 2-16 0V6z" fill="#c47" />
        </svg>
      )
    default:
      return (
        <svg {...common} className={className}><circle cx="12" cy="12" r="4" fill="#111" /></svg>
      )
  }
}
