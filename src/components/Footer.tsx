
import { Linkedin, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-warm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-sora font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              GameCraft
            </h3>
            <p className="font-inter text-gray-300 mb-6 max-w-md">
              La plateforme de référence pour créer des expériences de marque interactives et mémorables.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-all duration-250"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-all duration-250"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary transition-all duration-250"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="font-sora font-bold text-white mb-4">Produit</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  Intégrations
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sora font-bold text-white mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-gray-300 hover:text-white transition-colors duration-250">
                  RGPD
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="font-inter text-gray-400 text-sm">
            © 2024 GameCraft. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
