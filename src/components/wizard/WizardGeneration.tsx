
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import type { WizardFormData } from '@/lib/types';

interface WizardGenerationProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
}

export const WizardGeneration = ({ formData, updateFormData, onNext, onPrevious }: WizardGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const startGeneration = useCallback(() => {
    setIsGenerating(true);
    setIsGenerated(false);
    
    // Simulate AI generation with a 3-second delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      updateFormData({ generatedGame: true });
    }, 3000);
  }, [updateFormData]);

  useEffect(() => {
    // Auto-start generation when component mounts
    startGeneration();
  }, [startGeneration]);

  const handleRegenerate = () => {
    startGeneration();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/75 backdrop-blur-12 rounded-2xl p-8 shadow-lg border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sora font-bold text-gray-warm mb-4">
            Génération AI
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            {isGenerating ? 'Notre IA crée votre jeu personnalisé...' : 'Votre jeu est prêt !'}
          </p>
        </div>

        {isGenerating ? (
          /* Loading State */
          <div className="text-center py-16">
            {/* Creative Loader */}
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
                style={{ 
                  background: `conic-gradient(from 0deg, ${formData.primaryColor}, ${formData.secondaryColor}, ${formData.primaryColor})`,
                  borderRadius: '50%',
                  mask: 'radial-gradient(circle at center, transparent 50%, black 52%)',
                  WebkitMask: 'radial-gradient(circle at center, transparent 50%, black 52%)'
                }}
              ></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse"></div>
              </div>
            </div>

            <h3 className="text-xl font-sora font-bold text-gray-warm mb-4">
              Création de votre jeu premium...
            </h3>
            <div className="space-y-2">
              <p className="font-inter text-gray-600">🎨 Application de votre branding</p>
              <p className="font-inter text-gray-600">🎮 Configuration de la mécanique</p>
              <p className="font-inter text-gray-600">🚀 Optimisation pour l'engagement</p>
            </div>
          </div>
        ) : (
          /* Generated State */
          <div className="space-y-8">
            {/* Game Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-sora font-bold text-gray-warm mb-2">
                  Aperçu de votre jeu
                </h3>
                <p className="font-inter text-gray-600">
                  {formData.mechanic === 'wheel' && 'Roue de la Fortune'}
                  {formData.mechanic === 'quiz' && 'Quiz Interactif'}
                  {formData.mechanic === 'scratch' && 'Carte à Gratter'}
                  {formData.mechanic === 'jackpot' && 'Machine à Sous'}
                </p>
              </div>

              {/* Mock Game Component */}
              <div className="max-w-md mx-auto">
                <div 
                  className="aspect-square rounded-2xl p-8 shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})` 
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-12 rounded-xl p-6 h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full mb-4"
                         style={{ backgroundColor: formData.primaryColor }}>
                    </div>
                    <h4 className="font-sora font-bold text-lg text-gray-warm mb-2">
                      Votre Jeu
                    </h4>
                    <p className="font-inter text-sm text-gray-600 text-center">
                      Branding appliqué avec succès
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-4">
                <Button
                  onClick={onPrevious}
                  variant="outline"
                  size="lg"
                  className="font-inter font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
                
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  size="lg"
                  className="font-inter font-semibold"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Regénérer
                </Button>
              </div>

              <Button
                onClick={onNext}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250"
              >
                Passer à l'éditeur
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
