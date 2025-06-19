
import { useEffect, useState } from 'react';

interface BrandData {
  brandName: string;
  gameTitle: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo?: File | null;
  logoUrl?: string | null;
  backgroundDesktopUrl?: string | null;
  backgroundMobileUrl?: string | null;
  brandTone?: string;
  prizes: string[];
}

interface GamePreviewProps {
  brandData: BrandData;
}

export const GamePreview = ({ brandData }: GamePreviewProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [fallbackBackground, setFallbackBackground] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Générer un arrière-plan fallback basé sur la marque
  useEffect(() => {
    if (!brandData.backgroundDesktopUrl && !brandData.backgroundMobileUrl) {
      // Créer un gradient basé sur les couleurs de la marque
      const gradient = `linear-gradient(135deg, ${brandData.primaryColor}20, ${brandData.secondaryColor}40, ${brandData.accentColor}20)`;
      setFallbackBackground(gradient);
    }
  }, [brandData.primaryColor, brandData.secondaryColor, brandData.accentColor, brandData.backgroundDesktopUrl, brandData.backgroundMobileUrl]);

  const getBackgroundStyle = () => {
    if (isMobile && brandData.backgroundMobileUrl) {
      return { backgroundImage: `url(${brandData.backgroundMobileUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (brandData.backgroundDesktopUrl) {
      return { backgroundImage: `url(${brandData.backgroundDesktopUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    if (fallbackBackground) {
      return { background: fallbackBackground };
    }
    return { background: `linear-gradient(135deg, ${brandData.primaryColor}20, ${brandData.secondaryColor}40)` };
  };

  const getToneIcon = () => {
    switch (brandData.brandTone) {
      case 'Fun & engageant': return '🎉';
      case 'Sérieux': return '💼';
      case 'Élégant & raffiné': return '✨';
      case 'Familial': return '👨‍👩‍👧‍👦';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="text-center mb-4">
        <h3 className="text-lg font-sora font-semibold text-gray-900 mb-2">Aperçu en temps réel</h3>
        <p className="text-sm text-gray-600">Votre jeu avec votre identité visuelle</p>
      </div>

      <div 
        className="relative w-full aspect-square max-w-[400px] mx-auto rounded-xl overflow-hidden border-2 border-gray-200"
        style={getBackgroundStyle()}
      >
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Logo */}
        {brandData.logoUrl && (
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm">
            <img 
              src={brandData.logoUrl} 
              alt="Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
        )}

        {/* Titre et marque */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
          <h4 
            className="text-2xl font-bold mb-1 drop-shadow-lg"
            style={{ color: brandData.primaryColor }}
          >
            {brandData.brandName || 'Votre Marque'}
          </h4>
          <p 
            className="text-lg font-semibold drop-shadow-md"
            style={{ color: brandData.accentColor }}
          >
            {brandData.gameTitle || 'Titre du Jeu'}
          </p>
        </div>

        {/* Roue simplifiée */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <svg width="200" height="200" className="drop-shadow-lg">
              {/* Segments de la roue */}
              {Array.from({ length: Math.max(brandData.prizes.length, 6) }).map((_, i) => {
                const total = Math.max(brandData.prizes.length, 6);
                const angle = (360 / total) * i;
                const nextAngle = (360 / total) * (i + 1);
                const largeArc = nextAngle - angle > 180 ? 1 : 0;
                
                const startX = 100 + 80 * Math.cos((angle - 90) * Math.PI / 180);
                const startY = 100 + 80 * Math.sin((angle - 90) * Math.PI / 180);
                const endX = 100 + 80 * Math.cos((nextAngle - 90) * Math.PI / 180);
                const endY = 100 + 80 * Math.sin((nextAngle - 90) * Math.PI / 180);
                
                const colors = [brandData.primaryColor, brandData.secondaryColor, brandData.accentColor];
                const color = colors[i % colors.length];
                
                return (
                  <path
                    key={i}
                    d={`M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`}
                    fill={color}
                    stroke="white"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                );
              })}
              
              {/* Centre de la roue */}
              <circle
                cx="100"
                cy="100"
                r="25"
                fill="white"
                stroke={brandData.primaryColor}
                strokeWidth="3"
                className="drop-shadow-md"
              />
              
              {/* Flèche */}
              <polygon
                points="100,15 90,35 110,35"
                fill={brandData.secondaryColor}
                stroke={brandData.primaryColor}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Indicateur de ton */}
        {brandData.brandTone && (
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-lg">{getToneIcon()}</span>
          </div>
        )}

        {/* Lots preview */}
        {brandData.prizes.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow-sm">
            <p className="text-xs font-medium text-gray-700">
              {brandData.prizes.length} lot{brandData.prizes.length > 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Informations sur l'aperçu */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Couleurs :</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: brandData.primaryColor }}></div>
            <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: brandData.secondaryColor }}></div>
            <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: brandData.accentColor }}></div>
          </div>
        </div>
        {brandData.prizes.length > 0 && (
          <div className="mt-2 text-sm">
            <span className="text-gray-600">Lots : </span>
            <span className="text-gray-800">
              {brandData.prizes.slice(0, 2).join(', ')}
              {brandData.prizes.length > 2 && ` et ${brandData.prizes.length - 2} autre${brandData.prizes.length > 3 ? 's' : ''}...`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
