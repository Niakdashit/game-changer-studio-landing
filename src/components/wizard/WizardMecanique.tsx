
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Zap, Brain, Sparkles, Coins } from 'lucide-react';
import type { WizardFormData } from '@/lib/types';

interface WizardMecaniqueProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
}

const mechanics = [
  {
    id: 'wheel',
    title: 'Roue de la Fortune',
    description: 'Faites tourner la chance ! Une mécanique simple, visuelle et très engageante.',
    icon: Sparkles,
    badge: 'Plus populaire',
    color: 'from-yellow-400 to-orange-500',
    benefits: ['Engagement viral', 'Simple à comprendre', 'Visuel attractif']
  },
  {
    id: 'quiz',
    title: 'Quiz Interactif',
    description: 'Testez les connaissances ou guidez vers une recommandation personnalisée.',
    icon: Brain,
    badge: 'Meilleur pour leads',
    color: 'from-blue-400 to-purple-500',
    benefits: ['Collecte de données', 'Personnalisation', 'Éducatif']
  },
  {
    id: 'scratch',
    title: 'Carte à Gratter',
    description: 'Une mécanique tactile et rapide, idéale pour l\'instant gagnant.',
    icon: Zap,
    badge: 'Conversion rapide',
    color: 'from-green-400 to-teal-500',
    benefits: ['Instant gratifiant', 'Mobile-friendly', 'Taux de conversion élevé']
  },
  {
    id: 'jackpot',
    title: 'Machine à Sous',
    description: 'Inspiré des casinos. Suspense assuré.',
    icon: Coins,
    badge: 'Maximum suspense',
    color: 'from-red-400 to-pink-500',
    benefits: ['Effet suspense', 'Rétention élevée', 'Expérience premium']
  }
];

export const WizardMecanique = ({ formData, updateFormData, onNext, onPrevious }: WizardMecaniqueProps) => {
  const handleMechanicSelect = (mechanicId: string) => {
    updateFormData({ mechanic: mechanicId });
  };

  const isValid = formData.mechanic !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sora font-bold text-gray-900">Choix de la mécanique</h2>
            <p className="text-sm text-gray-500">Étape 2 sur 4</p>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div className="w-6 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Étape 2 sur 4
          </div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Choix de la mécanique
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Sélectionnez le type de jeu qui correspond le mieux à vos objectifs
          </p>
        </div>

        {/* Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mechanics.map((mechanic) => {
            const IconComponent = mechanic.icon;
            return (
              <div
                key={mechanic.id}
                className={`relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 motion-safe:hover:[transform:rotateX(3deg)_rotateY(-3deg)_scale(1.02)] motion-safe:hover:animate-fade-scale ${
                  formData.mechanic === mechanic.id
                    ? 'border-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => handleMechanicSelect(mechanic.id)}
                tabIndex={0}
              >
                {/* Badge */}
                <div className="absolute -top-3 left-4">
                  <span className={`bg-gradient-to-r ${mechanic.color} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
                    {mechanic.badge}
                  </span>
                </div>

                {/* Animated Preview */}
                <div className={`w-full h-40 bg-gradient-to-br ${mechanic.color} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <IconComponent className="w-16 h-16 text-white animate-pulse" />
                  </div>
                  {/* Floating particles */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
                </div>

                <h3 className="text-xl font-sora font-bold text-gray-900 mb-3">
                  {mechanic.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {mechanic.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {mechanic.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className={`w-2 h-2 bg-gradient-to-r ${mechanic.color} rounded-full mr-2`}></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {formData.mechanic === mechanic.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Desktop */}
        <div className="hidden md:flex justify-between items-center">
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
            disabled={!isValid}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold px-8 hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            Sélectionner
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
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
          disabled={!isValid}
          size="lg"
          className="flex-2 bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          Sélectionner
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
