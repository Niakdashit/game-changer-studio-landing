import { useState, useCallback } from 'react';
// ...imports identiques...

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

  // Version useCallback
  const updateFormData = useCallback(
    (data: Partial<WizardFormData>) =>
      setFormData(prev => ({ ...prev, ...data })),
    []
  );

  const next = () => setStep(s => Math.min(s + 1, 3));
  const previous = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-gray-light">
      <Navigation />
      {/* ...reste du code identique... */}
      <Footer />
    </div>
  );
};

export default Wizard;