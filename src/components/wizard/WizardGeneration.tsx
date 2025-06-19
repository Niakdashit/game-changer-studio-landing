
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, Wand2, RefreshCw, Eye, Check } from 'lucide-react';
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
    { text: "Analyse de votre identité de marque...", icon: "🎨" },
    { text: "Création du design personnalisé...", icon: "✨" },
    { text: "Intégration de votre mécanique...", icon: "⚙️" },
    { text: "Optimisation finale...", icon: "🚀" }
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
    
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sora font-bold text-gray-900">Votre jeu est prêt !</h2>
            <p className="text-sm text-gray-500">Étape 3 sur 4</p>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div className="w-9 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Wand2 className="mr-2 h-4 w-4" />
            Étape 3 sur 4
          </div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Votre jeu est prêt !
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez le rendu personnalisé créé spécialement pour votre marque.
          </p>
        </div>

        {isGenerating ? (
          /* Generation Process */
          <div className="text-center py-8 md:py-16">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-sora font-bold text-gray-900 mb-6">
              Création en cours...
            </h3>
            
            <div className="max-w-md mx-auto space-y-4">
              {generationSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                    index === generationStep 
                      ? 'bg-primary/10 text-primary border-2 border-primary/20' 
                      : index < generationStep 
                      ? 'bg-green-50 text-green-600 border-2 border-green-200'
                      : 'bg-gray-50 text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center text-lg ${
                    index === generationStep 
                      ? 'bg-primary text-white animate-pulse' 
                      : index < generationStep 
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-white'
                  }`}>
                    {index < generationStep ? <Check className="w-4 h-4" /> : step.icon}
                  </div>
                  <span className="font-medium">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Game Preview */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Preview Canvas */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div 
                  className="w-full aspect-square rounded-xl p-8 flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})` 
                  }}
                >
                  {/* Game Preview based on selected mechanic */}
                  {formData.mechanic === 'wheel' && (
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full border-8 border-white/20 relative">
                        <div className="absolute inset-4 rounded-full border-4 border-white/40"></div>
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-full h-full animate-spin"
                            style={{ 
                              transform: `rotate(${i * 45}deg)`,
                              animationDuration: '20s',
                              animationIterationCount: 'infinite'
                            }}
                          >
                            <div className="w-1 h-20 bg-white/80 mx-auto"></div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <div className="w-6 h-6 bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.mechanic === 'quiz' && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-sm w-full shadow-lg">
                      <h3 className="font-sora font-bold text-gray-800 mb-4">Quelle est votre préférence ?</h3>
                      <div className="space-y-3">
                        {['Option A', 'Option B', 'Option C'].map((answer, i) => (
                          <button 
                            key={i}
                            className="w-full p-3 text-left rounded-lg bg-gray-100 hover:bg-primary/10 transition-colors border border-gray-200"
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.mechanic === 'scratch' && (
                    <div className="relative w-64 h-40">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg"></div>
                      <div className="absolute inset-4 bg-white/30 rounded-lg backdrop-blur-sm"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Grattez ici !</span>
                      </div>
                    </div>
                  )}

                  {formData.mechanic === 'jackpot' && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                      <div className="flex space-x-4 mb-6">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-16 h-20 bg-gray-800 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-yellow-400 text-2xl font-bold animate-pulse">7</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">
                        JOUER
                      </button>
                    </div>
                  )}

                  {/* Brand elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-md">
                    <div className="w-8 h-8 bg-gray-400 rounded"></div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center text-green-600 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold">Jeu généré avec succès !</span>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-primary-light/10 rounded-2xl p-6 border border-primary/10">
                <h3 className="font-sora font-bold text-xl text-gray-900 mb-4">
                  Votre jeu personnalisé
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mécanique :</span>
                    <span className="font-semibold text-gray-900 capitalize">{formData.mechanic}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Couleurs :</span>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: formData.primaryColor }}></div>
                      <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: formData.secondaryColor }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logo :</span>
                    <span className="font-semibold text-gray-900">✓ Intégré</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ton :</span>
                    <span className="font-semibold text-gray-900">{formData.brandTone}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  size="lg"
                  className="flex-1 font-semibold hover:scale-105 transition-transform"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regénérer
                </Button>
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:scale-105 transition-transform"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Aperçu complet
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Desktop */}
        {isComplete && (
          <div className="hidden md:flex justify-between items-center mt-12">
            <Button
              onClick={onPrevious}
              variant="outline"
              size="lg"
              className="font-semibold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold px-8 hover:scale-105 transition-all duration-300"
            >
              Personnaliser
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isComplete && (
        <div className="fixed bottom-4 left-4 right-4 flex space-x-3 md:hidden">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="lg"
            className="flex-1 font-semibold py-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <Button
            onClick={onNext}
            size="lg"
            className="flex-2 bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 hover:scale-105 transition-all duration-300"
          >
            Personnaliser
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
