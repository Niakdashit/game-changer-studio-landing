
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, Wand2, RefreshCw, Eye } from 'lucide-react';
import type { WizardFormData } from '@/lib/types';

interface WizardGenerationProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
}

export const WizardGeneration = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrevious 
}: WizardGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const generationSteps = [
    "Analyse de votre identité de marque...",
    "Création du design personnalisé...", 
    "Integration de votre mécanique...",
    "Optimisation finale..."
  ];

  useEffect(() => {
    if (!formData.generatedGame) {
      handleGenerate();
    } else {
      setIsComplete(true);
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    
    // Simulation du processus de génération
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsGenerating(false);
    setIsComplete(true);
    updateFormData({ generatedGame: true });
  };

  const handleRegenerate = () => {
    setIsComplete(false);
    handleGenerate();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/85 backdrop-blur-16 rounded-3xl shadow-2xl border border-gray-200/30 overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-8 bg-gradient-to-br from-primary/5 via-primary-light/10 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mr-4">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-sm font-inter font-medium text-primary mb-1 block">Étape 3 sur 4</span>
                <h2 className="text-3xl font-sora font-bold text-gray-warm">
                  Votre jeu est prêt !
                </h2>
              </div>
            </div>
            <p className="text-lg font-inter text-gray-600 max-w-2xl">
              Découvrez le rendu personnalisé créé spécialement pour votre marque.
            </p>
          </div>
        </div>

        <div className="px-8 py-8">
          {isGenerating ? (
            /* Generation Process */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-sora font-bold text-gray-warm mb-4">
                Création en cours...
              </h3>
              
              <div className="max-w-md mx-auto space-y-4">
                {generationSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center p-3 rounded-lg transition-all duration-500 ${
                      index === generationStep 
                        ? 'bg-primary/10 text-primary' 
                        : index < generationStep 
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm font-bold ${
                      index === generationStep 
                        ? 'bg-primary text-white animate-pulse' 
                        : index < generationStep 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-white'
                    }`}>
                      {index < generationStep ? '✓' : index + 1}
                    </div>
                    <span className="font-inter">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Game Preview */
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Preview Canvas */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200/50">
                  <div 
                    className="w-full aspect-square rounded-xl p-8 flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})` 
                    }}
                  >
                    {/* Game Preview based on selected mechanic */}
                    {formData.mechanic === 'wheel' && (
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full border-8 border-white/20 relative animate-spin-slow">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-full h-full"
                              style={{ transform: `rotate(${i * 45}deg)` }}
                            >
                              <div className="w-2 h-16 bg-white/80 mx-auto"></div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white rounded-full shadow-lg"></div>
                        </div>
                      </div>
                    )}

                    {formData.mechanic === 'quiz' && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 max-w-sm w-full">
                        <h3 className="font-sora font-bold text-gray-800 mb-4">Question exemple</h3>
                        <div className="space-y-3">
                          {['Réponse A', 'Réponse B', 'Réponse C'].map((answer, i) => (
                            <button 
                              key={i}
                              className="w-full p-3 text-left rounded-lg bg-gray-100 hover:bg-primary/10 transition-colors"
                            >
                              {answer}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.mechanic === 'scratch' && (
                      <div className="relative w-64 h-40">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl"></div>
                        <div className="absolute inset-4 bg-white/20 rounded-lg backdrop-blur-sm"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-xl">Grattez ici!</span>
                        </div>
                      </div>
                    )}

                    {formData.mechanic === 'jackpot' && (
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                        <div className="flex space-x-4 mb-4">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-16 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                              <span className="text-yellow-400 text-2xl font-bold">7</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full bg-red-500 text-white py-2 rounded-lg font-bold">
                          SPIN
                        </button>
                      </div>
                    )}

                    {/* Floating brand logo simulation */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Panel */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-center text-green-600 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-inter font-semibold">Jeu généré avec succès !</span>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary-light/10 rounded-2xl p-6">
                  <h3 className="font-sora font-bold text-xl text-gray-warm mb-4">
                    Votre jeu personnalisé
                  </h3>
                  <div className="space-y-3 text-sm font-inter">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mécanique :</span>
                      <span className="font-semibold text-gray-800 capitalize">{formData.mechanic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Couleurs :</span>
                      <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: formData.primaryColor }}></div>
                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: formData.secondaryColor }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Logo :</span>
                      <span className="font-semibold text-gray-800">✓ Intégré</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    className="flex-1 font-inter font-semibold"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regénérer
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold hover:scale-104 transition-all duration-250"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Aperçu
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {isComplete && (
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-200/50">
            <div className="flex justify-between">
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
                onClick={onNext}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250"
              >
                Personnaliser
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
