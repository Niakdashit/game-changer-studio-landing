
import { useState, useEffect } from 'react';

export const TestimonialSlider = () => {
  const testimonials = [
    {
      quote: "GameCraft a révolutionné notre approche de l'engagement client. Les résultats dépassent nos attentes.",
      name: "Sarah Chen",
      role: "Directrice Marketing",
      company: "TechCorp",
      avatar: "👩‍💼"
    },
    {
      quote: "Un outil professionnel qui nous fait gagner des semaines de développement. L'interface est remarquable.",
      name: "Marc Dubois",
      role: "Creative Director",
      company: "Studio Alpha",
      avatar: "👨‍🎨"
    },
    {
      quote: "Nos campagnes interactives génèrent maintenant 3x plus d'engagement qu'avant. Impressionnant !",
      name: "Lisa Wang",
      role: "Head of Digital",
      company: "Fashion Brand",
      avatar: "👩‍💻"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sora font-bold text-gray-warm mb-4">
            Ils transforment leur engagement
          </h2>
          <p className="text-lg font-inter text-gray-600">
            Découvrez comment nos clients créent des expériences mémorables.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-gray-light to-white p-8 md:p-12 rounded-2xl border border-gray-200/50 shadow-lg">
                    <blockquote className="text-xl md:text-2xl font-inter text-gray-warm leading-relaxed mb-8 text-center">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div className="text-center">
                        <div className="font-sora font-bold text-gray-warm">
                          {testimonial.name}
                        </div>
                        <div className="font-inter text-gray-600 text-sm">
                          {testimonial.role} • {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-250 ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
