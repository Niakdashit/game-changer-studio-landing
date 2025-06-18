
import { Hero } from '@/components/Hero';
import { WhyChoose } from '@/components/WhyChoose';
import { HowItWorks } from '@/components/HowItWorks';
import { InteractivePreview } from '@/components/InteractivePreview';
import { SocialProof } from '@/components/SocialProof';
import { WhatMakesDifferent } from '@/components/WhatMakesDifferent';
import { GameMechanics } from '@/components/GameMechanics';
import { ShareIntegration } from '@/components/ShareIntegration';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-light">
      <Navigation />
      <Hero />
      <WhyChoose />
      <HowItWorks />
      <InteractivePreview />
      <SocialProof />
      <WhatMakesDifferent />
      <GameMechanics />
      <ShareIntegration />
      <TestimonialSlider />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
