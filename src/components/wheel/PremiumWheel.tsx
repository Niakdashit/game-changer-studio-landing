
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumWheelProps {
  brandName?: string;
  gameTitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  logoUrl?: string;
  backgroundUrl?: string;
  fallbackBackground?: string;
  prizes?: string[];
  onSpin?: (result: string) => void;
}

export const PremiumWheel = ({
  brandName = "HARIBO",
  gameTitle = "Roue des Bonbons",
  primaryColor = "#e52529",
  secondaryColor = "#ffd600",
  accentColor = "#009de0",
  logoUrl,
  backgroundUrl,
  fallbackBackground,
  prizes = [
    "🍓 Fraise Tagada",
    "🐻 Ourson d'Or", 
    "🌈 Dragibus",
    "🐊 Croco",
    "🧿 Schtroumpf",
    "🍑 Cerise",
    "🍯 Miel Pops",
    "⭐ Bonus"
  ],
  onSpin
}: PremiumWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentColors = [
    primaryColor,
    secondaryColor,
    accentColor,
    "#3ab54a",
    "#ffffff",
    primaryColor,
    secondaryColor,
    accentColor
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    const randomSpin = Math.random() * 360 + 1800; // 5+ tours
    const finalRotation = rotation + randomSpin;
    setRotation(finalRotation);
    
    setTimeout(() => {
      const segmentAngle = 360 / prizes.length;
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const winnerIndex = Math.floor(normalizedRotation / segmentAngle);
      const selectedPrize = prizes[winnerIndex];
      
      setWinner(selectedPrize);
      setShowConfetti(true);
      setIsSpinning(false);
      onSpin?.(selectedPrize);
      
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3000);
  };

  const getBackgroundStyle = () => {
    if (backgroundUrl) {
      return {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    if (fallbackBackground) {
      return { background: fallbackBackground };
    }

    return {
      background: `radial-gradient(ellipse at center, ${secondaryColor}22, ${primaryColor}88, ${primaryColor})`
    };
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={getBackgroundStyle()}
    >
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400/10 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300/20 via-transparent to-transparent"></div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Brand header */}
      <div className="text-center mb-8 z-10">
        {logoUrl && (
          <div className="mb-4">
            <img src={logoUrl} alt={brandName} className="h-16 mx-auto drop-shadow-2xl" />
          </div>
        )}
        <h1 
          className="text-5xl md:text-7xl font-black tracking-wider mb-2"
          style={{
            color: primaryColor,
            textShadow: `0 6px 0 ${secondaryColor}, 0 12px 40px ${primaryColor}40`,
            fontFamily: "'Fredoka One', 'Comic Sans MS', cursive"
          }}
        >
          {brandName}
        </h1>
        <h2 
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{
            color: accentColor,
            textShadow: `0 3px 8px ${secondaryColor}60`
          }}
        >
          {gameTitle}
        </h2>
      </div>

      {/* Wheel container */}
      <div className="relative mb-12">
        {/* Glow background */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl scale-110"
          style={{
            background: `radial-gradient(circle, ${secondaryColor}40, transparent 70%)`
          }}
        ></div>
        
        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="relative w-80 h-80 md:w-96 md:h-96 rounded-full shadow-2xl"
          style={{
            background: `conic-gradient(from 0deg, ${segmentColors.map((color, i) => 
              `${color} ${(i * 360 / segmentColors.length)}deg ${((i + 1) * 360 / segmentColors.length)}deg`
            ).join(', ')})`,
            boxShadow: `0 0 60px ${primaryColor}60, inset 0 0 20px rgba(255,255,255,0.2)`
          }}
          animate={{ rotate: rotation }}
          transition={{ 
            duration: isSpinning ? 3 : 0.2, 
            ease: isSpinning ? [0.23, 1, 0.32, 1] : "easeOut"
          }}
        >
          {/* Wheel segments with prizes */}
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            const textAngle = angle + (360 / prizes.length) / 2;
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm md:text-base pointer-events-none"
                style={{
                  transform: `rotate(${textAngle}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div 
                  className="absolute bg-black/20 rounded-lg px-2 py-1 backdrop-blur-sm"
                  style={{ transform: 'translateY(-120px) rotate(-90deg)' }}
                >
                  {prize}
                </div>
              </div>
            );
          })}
          
          {/* Center hub */}
          <div 
            className="absolute inset-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 flex items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, white, ${secondaryColor}20)`,
              borderColor: primaryColor,
              boxShadow: `0 0 20px ${secondaryColor}80, inset 0 0 10px rgba(255,255,255,0.5)`
            }}
          >
            ⭐
          </div>
        </motion.div>

        {/* Pointer */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10"
        >
          <div 
            className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent drop-shadow-xl"
            style={{
              borderBottomColor: secondaryColor,
              filter: `drop-shadow(0 4px 12px ${secondaryColor}80)`
            }}
          ></div>
        </div>
      </div>

      {/* Spin button */}
      <motion.button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-12 py-6 text-2xl font-black rounded-full text-white border-4 shadow-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
          borderColor: secondaryColor,
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          fontFamily: "'Fredoka One', 'Comic Sans MS', cursive"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isSpinning ? { 
          background: [
            `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
            `linear-gradient(135deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
            `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`
          ]
        } : {}}
        transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.8 }}
      >
        <span className="relative z-10">
          {isSpinning ? "✨ C'EST PARTI !" : "🎯 LANCER LA ROUE"}
        </span>
        
        {/* Button glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-lg -z-10"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}60, ${secondaryColor}60)`
          }}
        ></div>
      </motion.button>

      {/* Winner modal */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setWinner(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -50 }}
              className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md mx-4"
              style={{
                background: `linear-gradient(135deg, white, ${secondaryColor}20)`,
                border: `4px solid ${primaryColor}`
              }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 
                className="text-3xl font-black mb-4"
                style={{ color: primaryColor }}
              >
                FÉLICITATIONS !
              </h3>
              <p className="text-xl mb-6" style={{ color: accentColor }}>
                Vous avez gagné :
              </p>
              <div 
                className="text-2xl font-bold p-4 rounded-xl mb-6"
                style={{ 
                  background: `${secondaryColor}20`,
                  color: primaryColor,
                  border: `2px solid ${secondaryColor}`
                }}
              >
                {winner}
              </div>
              <button
                onClick={() => setWinner(null)}
                className="px-8 py-3 rounded-full text-white font-bold"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 4px 12px ${primaryColor}40`
                }}
              >
                Continuer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: segmentColors[i % segmentColors.length],
                  left: `${Math.random() * 100}%`,
                  top: '-10px'
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 50, 
                  opacity: 0,
                  rotate: 360 * 3
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
