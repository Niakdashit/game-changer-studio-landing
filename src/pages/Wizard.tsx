import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WizardBranding } from '@/components/wizard/WizardBranding';
import { WizardMecanique } from '@/components/wizard/WizardMecanique';
import { WizardGeneration } from '@/components/wizard/WizardGeneration';
import { WizardEditor } from '@/components/wizard/WizardEditor';
import type { WizardFormData } from '@/lib/types';

const Wizard = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<WizardFormData>({
    logo: null,
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
    brief: '',
    mechanic: '',
    generatedGame: null,
    brandTone: '',
    objectives: [],
    audience: [],
    productName: ''
  });

  const updateFormData = (data: Partial<WizardFormData>) =>
    setFormData(prev => ({ ...prev, ...data }));

  const next = () => setStep(s => Math.min(s + 1, 3));
  const previous = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gray-light">
      <Navigation />
      {step === 0 && (
        <WizardBranding
          formData={formData}
          updateFormData={updateFormData}
          onNext={next}
          currentStep={step}
        />
      )}
      {step === 1 && (
        <WizardMecanique
          formData={formData}
          updateFormData={updateFormData}
          onNext={next}
          onPrevious={previous}
          currentStep={step}
        />
      )}
      {step === 2 && (
        <WizardGeneration
          formData={formData}
          updateFormData={updateFormData}
          onNext={next}
          onPrevious={previous}
          currentStep={step}
        />
      )}
      {step === 3 && (
        <WizardEditor
          formData={formData}
          updateFormData={updateFormData}
          onPrevious={previous}
          currentStep={step}
          isLastStep
        />
      )}
      <Footer />
    </div>
  );
};

export default Wizard;
