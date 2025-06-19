
import type { WizardFormData } from '@/lib/types';

interface MiniGameMockupProps {
  formData: WizardFormData;
}

export const MiniGameMockup = ({ formData }: MiniGameMockupProps) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 p-4 md:hidden">
      <div className="text-center mb-2">
        <span className="text-xs font-inter text-gray-500">Aperçu en temps réel</span>
      </div>
      <div
        className="w-full h-32 max-h-[25vh] rounded-xl p-4 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}20)`,
          border: `2px solid ${formData.primaryColor}30`
        }}
      >
        {/* Logo placeholder */}
        {formData.logo ? (
          <div className="absolute top-2 left-2 w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
        ) : (
          <div className="absolute top-2 left-2 w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
        )}

        {/* Brand tone indicator */}
        <div className="text-center">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center"
            style={{ backgroundColor: formData.primaryColor }}
          >
            {formData.brandTone === 'Fun & engageant' && (
              <span className="text-white text-lg">🎉</span>
            )}
            {formData.brandTone === 'Sérieux' && (
              <span className="text-white text-lg">💼</span>
            )}
            {formData.brandTone === 'Élégant & raffiné' && (
              <span className="text-white text-lg">✨</span>
            )}
            {formData.brandTone === 'Familial' && (
              <span className="text-white text-lg">👨‍👩‍👧‍👦</span>
            )}
            {!formData.brandTone && (
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            )}
          </div>
          <p className="text-xs font-inter text-gray-600">
            {formData.productName || 'Votre jeu'}
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};
