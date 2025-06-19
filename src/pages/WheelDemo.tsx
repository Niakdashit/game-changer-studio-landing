
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WheelWrapper } from '@/components/wheel/WheelWrapper';
import type { WizardFormData } from '@/lib/types';

const WheelDemo = () => {
  const [formData] = useState<WizardFormData>({
    logo: null,
    primaryColor: '#e52529',
    secondaryColor: '#ffd600',
    accentColor: '#009de0',
    brief: '',
    mechanic: 'wheel',
    generatedGame: null,
    productName: 'HARIBO',
    gameTitle: 'Roue des Bonbons',
    prizes: [
      '🍓 Fraise Tagada',
      '🐻 Ourson d\'Or', 
      '🌈 Dragibus',
      '🐊 Croco',
      '🧿 Schtroumpf',
      '🍑 Cerise',
      '🍯 Miel Pops',
      '⭐ Bonus'
    ]
  });

  const handleResult = (result: string) => {
    console.log('Wheel result:', result);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <WheelWrapper formData={formData} onResult={handleResult} />
      <Footer />
    </div>
  );
};

export default WheelDemo;
