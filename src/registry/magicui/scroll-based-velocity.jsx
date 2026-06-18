import React from 'react'

export function ScrollVelocityContainer({ children, className = '' }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </div>
  )
}

export function ScrollVelocityRow({ children, baseVelocity = 20, direction = 1, className = '' }) {
  const duration = Math.round(200 / Math.max(1, baseVelocity))
  const animName = direction >= 0 ? 'marqueeLeft' : 'marqueeRight'

  // Duplicate logos 4x to guarantee seamless looping on all screen sizes
  const repeated = [0, 1, 2, 3]

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          animation: `${animName} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {repeated.map((i) => (
          <div
            key={i}
            aria-hidden={i > 0 ? 'true' : undefined}
            style={{
              display: 'flex',
              flexShrink: 0,
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollVelocityContainer
