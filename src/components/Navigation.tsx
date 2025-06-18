
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-12 bg-white/75 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-sora font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              GameCraft
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#produit" className="font-inter font-medium text-gray-warm hover:text-primary transition-colors duration-250">
                Produit
              </a>
              <a href="#tarifs" className="font-inter font-medium text-gray-warm hover:text-primary transition-colors duration-250">
                Tarifs
              </a>
              <a href="#blog" className="font-inter font-medium text-gray-warm hover:text-primary transition-colors duration-250">
                Blog
              </a>
              <Button variant="outline" className="font-inter font-medium">
                Se connecter
              </Button>
              <Button className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-medium hover:scale-105 transition-transform duration-250">
                Commencer
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-warm hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-12 rounded-lg mt-2">
              <a href="#produit" className="block px-3 py-2 font-inter font-medium text-gray-warm hover:text-primary">
                Produit
              </a>
              <a href="#tarifs" className="block px-3 py-2 font-inter font-medium text-gray-warm hover:text-primary">
                Tarifs
              </a>
              <a href="#blog" className="block px-3 py-2 font-inter font-medium text-gray-warm hover:text-primary">
                Blog
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full font-inter font-medium">
                  Se connecter
                </Button>
                <Button className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-inter font-medium">
                  Commencer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
