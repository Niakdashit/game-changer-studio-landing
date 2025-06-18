
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Monitor, Tablet, Smartphone, Save } from 'lucide-react';

interface WizardEditorProps {
  formData: any;
  updateFormData: (data: any) => void;
  onPrevious: () => void;
  currentStep: number;
  isLastStep: boolean;
}

export const WizardEditor = ({ formData, onPrevious }: WizardEditorProps) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceSizes = {
    desktop: { width: '100%', height: '500px' },
    tablet: { width: '768px', height: '500px' },
    mobile: { width: '375px', height: '500px' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/75 backdrop-blur-12 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-sora font-bold text-gray-warm mb-2">
                Éditeur Live
              </h2>
              <p className="text-lg font-inter text-gray-600">
                Personnalisez votre jeu en temps réel
              </p>
            </div>

            {/* Device Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`p-2 rounded-md transition-all duration-250 ${
                  devicePreview === 'desktop' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="h-5 w-5" />
              </button>
              <button
                onClick={() => setDevicePreview('tablet')}
                className={`p-2 rounded-md transition-all duration-250 ${
                  devicePreview === 'tablet' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Tablet className="h-5 w-5" />
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-2 rounded-md transition-all duration-250 ${
                  devicePreview === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="lg:w-80 bg-gray-50/50 border-r border-gray-200/50 p-6">
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-1 lg:h-auto lg:flex-col mb-6">
                <TabsTrigger value="branding" className="lg:w-full lg:justify-start">
                  Branding
                </TabsTrigger>
                <TabsTrigger value="contenu" className="lg:w-full lg:justify-start">
                  Contenu
                </TabsTrigger>
                <TabsTrigger value="mecanique" className="lg:w-full lg:justify-start lg:hidden md:block">
                  Mécanique
                </TabsTrigger>
                <TabsTrigger value="partage" className="lg:w-full lg:justify-start lg:hidden md:block">
                  Partage
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="space-y-4">
                <div>
                  <label className="text-sm font-inter font-semibold text-gray-700 mb-2 block">
                    Couleur Primaire
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      className="w-10 h-10 rounded-lg border border-gray-300"
                    />
                    <span className="text-sm font-mono">{formData.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-inter font-semibold text-gray-700 mb-2 block">
                    Couleur Secondaire
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      className="w-10 h-10 rounded-lg border border-gray-300"
                    />
                    <span className="text-sm font-mono">{formData.secondaryColor}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contenu" className="space-y-4">
                <div>
                  <label className="text-sm font-inter font-semibold text-gray-700 mb-2 block">
                    Titre du jeu
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Tentez votre chance !"
                  />
                </div>
                <div>
                  <label className="text-sm font-inter font-semibold text-gray-700 mb-2 block">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20"
                    placeholder="Participez à notre jeu concours..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="mecanique" className="space-y-4">
                <p className="text-sm font-inter text-gray-600">
                  Mécanique sélectionnée : {formData.mechanic}
                </p>
              </TabsContent>

              <TabsContent value="partage" className="space-y-4">
                <div>
                  <label className="text-sm font-inter font-semibold text-gray-700 mb-2 block">
                    URL de partage
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="mon-jeu.gamecraft.fr"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Canvas Preview */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div 
              className="transition-all duration-500 border border-gray-300 rounded-xl overflow-hidden shadow-lg"
              style={{
                width: deviceSizes[devicePreview].width,
                height: deviceSizes[devicePreview].height,
                maxWidth: '100%'
              }}
            >
              <div 
                className="w-full h-full p-8 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})` 
                }}
              >
                <div className="bg-white/90 backdrop-blur-12 rounded-xl p-6 max-w-sm mx-auto text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full"
                       style={{ backgroundColor: formData.primaryColor }}>
                  </div>
                  <h3 className="font-sora font-bold text-xl text-gray-warm mb-2">
                    Tentez votre chance !
                  </h3>
                  <p className="font-inter text-gray-600 mb-4">
                    Participez à notre jeu concours et gagnez des prix exceptionnels
                  </p>
                  <button 
                    className="px-6 py-3 rounded-xl text-white font-inter font-semibold transition-all duration-250 hover:scale-105"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Jouer maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-12 border-t border-gray-200/50 px-8 py-4">
          <div className="flex justify-between items-center">
            <Button
              onClick={onPrevious}
              variant="outline"
              size="lg"
              className="font-inter font-semibold"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250"
            >
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder & Diffuser
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
