import React from 'react';
import { motion } from 'framer-motion';

export default function LoaderContent({ pct, style = {} }) {
  // Calculate the stroke dashoffset for the circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#05050f',
        color: '#f0f4ff',
        fontFamily: "'Space Grotesk', sans-serif",
        position: 'relative'
      }}
    >
      {/* Background ambient glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(7,9,26,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Circular Progress Indicator */}
        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Outer rotating dashed ring */}
          <motion.svg 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            viewBox="0 0 150 150"
          >
            <circle
              cx="75" cy="75" r="70"
              fill="none"
              stroke="rgba(167,139,250,0.2)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          </motion.svg>

          {/* Inner Progress Ring */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 150 150">
            {/* Track */}
            <circle
              cx="75" cy="75" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
            />
            {/* Fill */}
            <circle
              cx="75" cy="75" r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage Text */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(135deg, #f0f4ff 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1
            }}>
              {pct}
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#22d3ee', fontWeight: 600 }}>%</span>
          </div>
        </div>

        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            color: '#94a3c8',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            marginTop: '30px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500
          }}
        >
          AWAKENING
        </motion.p>
      </div>
    </div>
  );
}
