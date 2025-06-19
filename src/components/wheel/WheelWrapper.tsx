
import { PremiumWheel } from './PremiumWheel';
import type { WizardFormData } from '@/lib/types';

interface WheelWrapperProps {
  formData: WizardFormData;
  onResult?: (result: string) => void;
}

export const WheelWrapper = ({ formData, onResult }: WheelWrapperProps) => {
  const logoUrl = formData.logo ? URL.createObjectURL(formData.logo) : undefined;
  const backgroundUrl = formData.backgroundDesktop ? URL.createObjectURL(formData.backgroundDesktop) : formData.backgroundDesktopUrl || undefined;
  
  // Filter out empty prizes
  const validPrizes = formData.prizes?.filter(prize => prize.trim()) || [];
  
  return (
    <PremiumWheel
      brandName={formData.productName || 'Votre Marque'}
      gameTitle={formData.gameTitle || 'Roue de la Fortune'}
      primaryColor={formData.primaryColor}
      secondaryColor={formData.secondaryColor}
      accentColor={formData.accentColor}
      logoUrl={logoUrl}
      backgroundUrl={backgroundUrl}
      prizes={validPrizes.length > 0 ? validPrizes : [
        '🎁 Cadeau 1',
        '🎁 Cadeau 2', 
        '🎁 Cadeau 3',
        '🎁 Cadeau 4',
        '🎁 Cadeau 5',
        '🎁 Cadeau 6'
      ]}
      onSpin={onResult}
    />
  );
};
