
import { Hero } from '@/components/Hero';
import { SocialProof } from '@/components/SocialProof';
import { HowItWorks } from '@/components/HowItWorks';
import { FeatureGrid } from '@/components/FeatureGrid';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-light">
      <Navigation />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FeatureGrid />
      <TestimonialSlider />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
