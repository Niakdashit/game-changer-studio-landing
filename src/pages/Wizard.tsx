import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BrandSettingsForm } from '@/components/configurator/BrandSettingsForm';
import { WheelPreview } from '@/components/configurator/WheelPreview';
import type { WizardFormData } from '@/lib/types';

const Wizard = () => {
  const [formData, setFormData] = useState<WizardFormData>({
    logo: null,
    logoUrl: null,
    primaryColor: '#e52529',
    secondaryColor: '#ffd600',
    accentColor: '#009de0',
    brief: '',
    mechanic: 'wheel',
    generatedGame: null,
    productName: '',
    gameTitle: '',
    prizes: Array(6).fill(''),
    segmentColors: Array(6).fill('#e52529'),
    segmentCount: 6,
    style: 'Premium',
    brandUrl: '',
    backgroundDesktop: null,
    backgroundDesktopUrl: null,
    backgroundMobile: null,
    backgroundMobileUrl: null,
  });

  const updateFormData = (data: Partial<WizardFormData>) =>
    setFormData(prev => ({ ...prev, ...data }));

  return (
    <div className="min-h-screen bg-gray-light">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-2 gap-8">
        <BrandSettingsForm formData={formData} updateFormData={updateFormData} />
        <WheelPreview formData={formData} />
      </div>
      <Footer />
    </div>
  );
};

export default Wizard;
