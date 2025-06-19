
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Monitor,
  DeviceTablet as Tablet,
  DeviceMobile as Smartphone,
  FloppyDisk as Save,
  Download,
  ShareNetwork,
  QrCode
} from '@phosphor-icons/react';
import type { WizardFormData } from '@/lib/types';

interface WizardEditorProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onPrevious: () => void;
  currentStep: number;
  isLastStep: boolean;
}

export const WizardEditor = ({
  formData,
  updateFormData,
  onPrevious,
  currentStep,
  isLastStep
}: WizardEditorProps) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');
  const [gameTitle, setGameTitle] = useState('Tentez votre chance !');
  const [gameDescription, setGameDescription] = useState('Participez à notre jeu concours...');

  const deviceSizes = {
    desktop: {
      width: '100%',
      maxWidth: 'clamp(600px, 80vw, 800px)',
      height: 'clamp(450px, 70vh, 600px)'
    },
    tablet: {
      width: '100%',
      maxWidth: 'clamp(400px, 80vw, 600px)',
      height: 'clamp(400px, 65vh, 600px)'
    },
    mobile: {
      width: '100%',
      maxWidth: 'clamp(300px, 90vw, 375px)',
      height: 'clamp(350px, 60vh, 600px)'
    }
  };

  const exportOptions = [
    { id: 'iframe', label: 'Code iframe', icon: Monitor, desc: 'Intégrez sur votre site web' },
    { id: 'link', label: 'Lien direct', icon: ShareNetwork, desc: 'Partagez sur vos réseaux' },
    { id: 'qr', label: 'QR code', icon: QrCode, desc: 'Pour vos supports print' }
  ];

  useEffect(() => {
    const updatePreview = async () => {
      try {
        const res = await fetch('/api/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            gameTitle,
            gameDescription
          })
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.html) {
          updateFormData({ generatedGameHtml: data.html });
        }
      } catch (err) {
        console.error('Preview update failed', err);
      }
    };

    updatePreview();
  }, [formData.primaryColor, formData.secondaryColor, formData.mechanic, gameTitle, gameDescription]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sora font-bold text-gray-900">Éditeur final</h2>
            <p className="text-sm text-gray-500">Étape 4 sur 4</p>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div className="w-full h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-8">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Save className="mr-2 h-4 w-4" />
            Étape 4 sur 4
          </div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Personnalisation finale
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Modifiez le style, les textes ou les visuels selon vos préférences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Mobile/Desktop */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
              <Tabs defaultValue="branding" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-1 lg:h-auto mb-4">
                  <TabsTrigger value="branding" className="lg:w-full lg:justify-start lg:mb-2">
                    Style
                  </TabsTrigger>
                  <TabsTrigger value="contenu" className="lg:w-full lg:justify-start lg:mb-2">
                    Contenu
                  </TabsTrigger>
                  <TabsTrigger value="export" className="lg:w-full lg:justify-start hidden lg:block">
                    Export
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="branding" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Couleur Primaire
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm font-mono flex-1">{formData.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Couleur Secondaire
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm font-mono flex-1">{formData.secondaryColor}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contenu" className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Titre du jeu
                    </label>
                    <input
                      type="text"
                      value={gameTitle}
                      onChange={(e) => setGameTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Tentez votre chance !"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={gameDescription}
                      onChange={(e) => setGameDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 text-sm resize-none"
                      placeholder="Participez à notre jeu concours..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="space-y-3">
                    {exportOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.id}
                          className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all"
                        >
                          <div className="flex items-start space-x-3">
                            <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">{option.label}</p>
                              <p className="text-xs text-gray-600">{option.desc}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Main Preview */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Device Switcher */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-sora font-semibold text-gray-900">Aperçu en temps réel</h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-2 rounded-md transition-all duration-250 ${
                      devicePreview === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('tablet')}
                    className={`p-2 rounded-md transition-all duration-250 ${
                      devicePreview === 'tablet' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('desktop')}
                    className={`p-2 rounded-md transition-all duration-250 ${
                      devicePreview === 'desktop' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Preview Canvas */}
              <div className="flex justify-center">
                <div 
                  className="transition-all duration-500 border border-gray-200 rounded-xl overflow-hidden shadow-lg relative"
                  style={{
                    width: deviceSizes[devicePreview].width,
                    height: deviceSizes[devicePreview].height,
                    maxWidth: deviceSizes[devicePreview].maxWidth
                  }}
                >
                  {/* Game Preview */}
                  {formData.generatedGameHtml ? (
                    <div
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: formData.generatedGameHtml }}
                    />
                  ) : (
                    <div
                      className="w-full h-full p-8 flex flex-col items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})`
                      }}
                    >
                      {/* Logo */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-md">
                        <div className="w-8 h-8 bg-gray-400 rounded"></div>
                      </div>

                      {/* Main Game Container */}
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-sm mx-auto text-center shadow-xl">
                        {/* Game Title */}
                        <h3 className="font-sora font-bold text-xl text-gray-900 mb-3">
                          {gameTitle}
                        </h3>
                        <p className="font-inter text-gray-600 mb-6 text-sm leading-relaxed">
                          {gameDescription}
                        </p>

                        {/* Game Mechanic Preview */}
                        <div className="mb-6">
                          {formData.mechanic === 'wheel' && (
                            <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200 flex items-center justify-center" style={{ borderColor: formData.primaryColor }}>
                              <div className="w-16 h-16 rounded-full" style={{ backgroundColor: formData.primaryColor }}></div>
                            </div>
                          )}
                          {formData.mechanic === 'quiz' && (
                            <div className="space-y-2">
                              <div className="h-8 bg-gray-100 rounded"></div>
                              <div className="h-6 bg-gray-100 rounded"></div>
                              <div className="h-6 bg-gray-100 rounded"></div>
                            </div>
                          )}
                          {formData.mechanic === 'scratch' && (
                            <div className="w-32 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">Grattez !</span>
                            </div>
                          )}
                          {formData.mechanic === 'jackpot' && (
                            <div className="flex justify-center space-x-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-12 bg-gray-800 rounded flex items-center justify-center">
                                  <span className="text-yellow-400 text-sm font-bold">7</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <button
                          className="w-full px-6 py-3 rounded-xl text-white font-semibold transition-all duration-250 hover:scale-105 shadow-lg"
                          style={{ backgroundColor: formData.primaryColor }}
                        >
                          Jouer maintenant
                        </button>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Desktop */}
        <div className="hidden md:flex justify-between items-center mt-8">
          <Button
            onClick={onPrevious}
            variant="outline"
            size="lg"
            className="font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          {isLastStep && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold px-8 hover:scale-105 transition-all duration-300"
              onClick={() => console.log('Saved', formData)}
            >
              <Download className="mr-2 h-4 w-4" />
              Publier le jeu
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-4 left-4 right-4 flex space-x-3 md:hidden">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="flex-1 font-semibold py-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        {isLastStep && (
          <Button
            size="lg"
            className="flex-2 bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 hover:scale-105 transition-all duration-300"
            onClick={() => console.log('Saved', formData)}
          >
            <Download className="mr-2 h-4 w-4" />
            Publier
          </Button>
        )}
      </div>
    </div>
  );
};
