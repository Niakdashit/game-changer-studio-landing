
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    description: 'Expérience ludique classique',
    badge: 'Best for engagement',
    gif: '/placeholder.svg',
    bestFor: 'Engagement viral'
  },
  {
    id: 'quiz',
    title: 'Quiz Interactif',
    description: 'Questions personnalisées',
    badge: 'Best for leads',
    gif: '/placeholder.svg',
    bestFor: 'Génération de leads'
  },
  {
    id: 'scratch',
    title: 'Carte à Gratter',
    description: 'Révélation progressive',
    badge: 'Best for conversion',
    gif: '/placeholder.svg',
    bestFor: 'Taux de conversion'
  },
  {
    id: 'jackpot',
    title: 'Machine à Sous',
    description: 'Effet surprise maximal',
    badge: 'Best for retention',
    gif: '/placeholder.svg',
    bestFor: 'Rétention utilisateur'
  }
];

export const WizardMecanique = ({ formData, updateFormData, onNext, onPrevious }: WizardMecaniqueProps) => {
  const handleMechanicSelect = (mechanicId: string) => {
    updateFormData({ mechanic: mechanicId });
  };

  const isValid = formData.mechanic !== '';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/75 backdrop-blur-12 rounded-2xl p-8 shadow-lg border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sora font-bold text-gray-warm mb-4">
            Choix de la Mécanique
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Sélectionnez le type de jeu qui correspond le mieux à vos objectifs
          </p>
        </div>

        {/* Mechanics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mechanics.map((mechanic) => (
            <div
              key={mechanic.id}
              className={`relative bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-250 hover:scale-102 hover:shadow-lg ${
                formData.mechanic === mechanic.id
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
              onClick={() => handleMechanicSelect(mechanic.id)}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-4">
                <span className="bg-gradient-to-r from-primary to-primary-light text-white text-xs font-inter font-semibold px-3 py-1 rounded-full">
                  {mechanic.badge}
                </span>
              </div>

              {/* GIF Placeholder */}
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>

              <h3 className="text-lg font-sora font-bold text-gray-warm mb-2">
                {mechanic.title}
              </h3>
              <p className="text-sm font-inter text-gray-600 mb-3">
                {mechanic.description}
              </p>
              <div className="text-xs font-inter text-primary font-semibold">
                {mechanic.bestFor}
              </div>

              {/* Selection Indicator */}
              {formData.mechanic === mechanic.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
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
            disabled={!isValid}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250"
          >
            Sélectionner
          </Button>
        </div>
      </div>
    </div>
  );
};
