
import { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WizardBranding } from '@/components/wizard/WizardBranding';
import { WizardMecanique } from '@/components/wizard/WizardMecanique';
import { WizardGeneration } from '@/components/wizard/WizardGeneration';
import { WizardEditor } from '@/components/wizard/WizardEditor';

const steps = [
  { id: 1, title: 'Brief & Branding', component: WizardBranding },
  { id: 2, title: 'Choix Mécanique', component: WizardMecanique },
  { id: 3, title: 'Génération AI', component: WizardGeneration },
  { id: 4, title: 'Éditeur Live', component: WizardEditor },
];

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    logo: null,
    primaryColor: '#7E5BEC',
    secondaryColor: '#C097F9',
    brief: '',
    mechanic: '',
    generatedGame: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    window.history.back();
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="fixed inset-0 z-50 bg-gray-light min-h-screen">
      {/* Header with Breadcrumb */}
      <header className="sticky top-0 z-10 backdrop-blur-12 bg-white/75 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-sora font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                GameCraft
              </h1>
              <div className="hidden md:flex items-center space-x-2 text-sm font-inter">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <span className={`px-3 py-1 rounded-full ${
                      currentStep === step.id 
                        ? 'bg-primary text-white' 
                        : currentStep > step.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}. {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="hover:bg-gray-200/50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Breadcrumb */}
      <div className="md:hidden px-4 py-3 bg-white/50 border-b border-gray-200/30">
        <div className="flex justify-between items-center text-sm font-inter">
          <span className="font-medium text-gray-600">
            Étape {currentStep} sur {steps.length}
          </span>
          <span className="font-semibold text-primary">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <CurrentStepComponent 
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentStep={currentStep}
          isLastStep={currentStep === steps.length}
        />
      </main>
    </div>
  );
};

export default Wizard;
