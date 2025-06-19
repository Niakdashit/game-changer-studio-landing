import { useEffect, useState } from 'react';
import { PremiumWheel } from './PremiumWheel';
import type { WizardFormData } from '@/lib/types';

interface WheelWrapperProps {
  formData: WizardFormData;
  onResult?: (result: string) => void;
}

export const WheelWrapper = ({ formData, onResult }: WheelWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const logoUrl =
    formData.logoUrl ||
    (formData.logo ? URL.createObjectURL(formData.logo) : undefined);
  const desktopUrl =
    formData.backgroundDesktopUrl ||
    (formData.backgroundDesktop
      ? URL.createObjectURL(formData.backgroundDesktop)
      : undefined);
  const mobileUrl =
    formData.backgroundMobileUrl ||
    (formData.backgroundMobile
      ? URL.createObjectURL(formData.backgroundMobile)
      : undefined);

  let backgroundUrl: string | undefined = undefined;
  if (desktopUrl && mobileUrl) {
    backgroundUrl = isMobile ? mobileUrl : desktopUrl;
  } else if (desktopUrl) {
    backgroundUrl = desktopUrl;
  } else if (mobileUrl) {
    backgroundUrl = mobileUrl;
  }

  const fallbackBackground = !backgroundUrl
    ? `linear-gradient(135deg, ${formData.primaryColor}20, ${formData.secondaryColor}40, ${(formData.accentColor || formData.primaryColor)}20)`
    : undefined;

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
      fallbackBackground={fallbackBackground}
      segmentColors={formData.segmentColors}
      prizes={
        validPrizes.length > 0
          ? validPrizes
          : [
              '🎁 Cadeau 1',
              '🎁 Cadeau 2',
              '🎁 Cadeau 3',
              '🎁 Cadeau 4',
              '🎁 Cadeau 5',
              '🎁 Cadeau 6',
            ]
      }
      onSpin={onResult}
    />
  );
};