
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowRight,
  Upload,
  Palette,
  Image as ImageIcon,
  Gift,
  Sparkle as PhSparkle,
  Check,
  X
} from '@phosphor-icons/react';
import { GamePreview } from './GamePreview';
import type { WizardFormData } from '@/lib/types';

interface BrandConfiguratorProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  currentStep: number;
}

export const BrandConfigurator = ({ formData, updateFormData, onNext }: BrandConfiguratorProps) => {
  const [brandName, setBrandName] = useState(formData.productName || '');
  const [gameTitle, setGameTitle] = useState(formData.gameTitle || '');
  const [primaryColor, setPrimaryColor] = useState(formData.primaryColor || '#e52529');
  const [secondaryColor, setSecondaryColor] = useState(formData.secondaryColor || '#ffd600');
  const [accentColor, setAccentColor] = useState(formData.accentColor || '#009de0');
  const [backgroundDesktop, setBackgroundDesktop] = useState<File | null>(null);
  const [backgroundMobile, setBackgroundMobile] = useState<File | null>(null);
  const [backgroundDesktopUrl, setBackgroundDesktopUrl] = useState<string | null>(null);
  const [backgroundMobileUrl, setBackgroundMobileUrl] = useState<string | null>(null);
  const [prizes, setPrizes] = useState<string[]>(formData.prizes || ['', '', '', '']);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [brandTone, setBrandTone] = useState(formData.brandTone || '');
  const [description, setDescription] = useState(formData.brief || '');

  const brandTones = [
    { value: "Fun & engageant", icon: "🎉", desc: "Dynamique et accessible" },
    { value: "Sérieux", icon: "💼", desc: "Professionnel et fiable" },
    { value: "Élégant & raffiné", icon: "✨", desc: "Sophistiqué et premium" },
    { value: "Familial", icon: "👨‍👩‍👧‍👦", desc: "Chaleureux et inclusif" }
  ];

  const colorSuggestions = [
    { name: "Classique", colors: ["#e52529", "#ffd600", "#009de0"] },
    { name: "Moderne", colors: ["#7E5BEC", "#34D399", "#FF686B"] },
    { name: "Élégant", colors: ["#1F2937", "#F59E0B", "#EF4444"] },
    { name: "Nature", colors: ["#059669", "#84CC16", "#F59E0B"] }
  ];

  const extractColorsFromImage = useCallback((file: File) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;
      
      const data = imageData.data;
      const colorMap = new Map<string, number>();
      
      for (let i = 0; i < data.length; i += 4 * 10) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a < 128 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) continue;
        
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      
      if (sortedColors.length > 0) {
        setPrimaryColor(sortedColors[0][0]);
        if (sortedColors[1]) setSecondaryColor(sortedColors[1][0]);
        if (sortedColors[2]) setAccentColor(sortedColors[2][0]);
      }
    };
    
    img.src = URL.createObjectURL(file);
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ logo: file });
      
      const previewUrl = URL.createObjectURL(file);
      setLogoPreviewUrl(previewUrl);
      
      extractColorsFromImage(file);
    }
  };

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>, isMobile: boolean) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      
      if (isMobile) {
        setBackgroundMobile(file);
        setBackgroundMobileUrl(previewUrl);
      } else {
        setBackgroundDesktop(file);
        setBackgroundDesktopUrl(previewUrl);
      }
    }
  };

  const updatePrize = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index] = value;
    setPrizes(newPrizes);
  };

  const addPrize = () => {
    if (prizes.length < 8) {
      setPrizes([...prizes, '']);
    }
  };

  const removePrize = (index: number) => {
    if (prizes.length > 1) {
      const newPrizes = prizes.filter((_, i) => i !== index);
      setPrizes(newPrizes);
    }
  };

  const applyColorScheme = (scheme: { colors: string[] }) => {
    setPrimaryColor(scheme.colors[0]);
    setSecondaryColor(scheme.colors[1]);
    setAccentColor(scheme.colors[2]);
  };

  const handleNext = () => {
    // Mettre à jour toutes les données du formulaire
    updateFormData({
      productName: brandName,
      gameTitle,
      primaryColor,
      secondaryColor,
      accentColor,
      prizes,
      brandTone,
      brief: description,
      backgroundDesktop,
      backgroundMobile,
      backgroundDesktopUrl,
      backgroundMobileUrl
    });
    onNext();
  };

  const isValid = formData.logo && brandName && gameTitle && primaryColor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sora font-bold text-gray-900">Configuration de marque</h2>
            <p className="text-sm text-gray-500">Étape 1 sur 4</p>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div className="w-3 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <PhSparkle className="mr-2 h-4 w-4" />
            Étape 1 sur 4 - Studio de marque
          </div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Créez votre identité visuelle
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Définissez tous les éléments visuels de votre jeu : couleurs, logo, images de fond et lots à gagner. Votre design sera appliqué en temps réel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de configuration */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-3 flex items-center">
                <Upload className="mr-3 h-5 w-5 text-primary" />
                Logo de votre marque *
              </Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  formData.logo 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'border-gray-300 hover:border-primary/50 hover:bg-primary/5'
                }`}>
                  {formData.logo && logoPreviewUrl ? (
                    <div className="text-primary">
                      <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                        <img 
                          src={logoPreviewUrl} 
                          alt="Logo preview" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="font-semibold">{formData.logo.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Couleurs extraites automatiquement</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload className="mx-auto h-10 w-10 mb-3" />
                      <p className="font-medium">Glissez votre logo ici</p>
                      <p className="text-sm mt-1">PNG, JPG, SVG jusqu'à 10 Mo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Informations de base */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-4">
                Informations de base
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Nom de la marque *</Label>
                  <Input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Ex : HARIBO"
                    className="text-base p-3 rounded-xl border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Titre du jeu *</Label>
                  <Input
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    placeholder="Ex : Roue des Bonbons"
                    className="text-base p-3 rounded-xl border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Couleurs */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="mr-3 h-5 w-5 text-primary" />
                Palette de couleurs
              </Label>
              
              {/* Schémas suggérés */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Schémas suggérés :</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {colorSuggestions.map((scheme) => (
                    <button
                      key={scheme.name}
                      onClick={() => applyColorScheme(scheme)}
                      className="p-3 rounded-lg border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="flex space-x-1 mb-2">
                        {scheme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-medium">{scheme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Couleur primaire</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <Input 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="font-mono flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Couleur secondaire</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <Input 
                      value={secondaryColor} 
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="font-mono flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Couleur d'accent</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                    />
                    <Input 
                      value={accentColor} 
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="font-mono flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images de fond */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-4 flex items-center">
                <ImageIcon className="mr-3 h-5 w-5 text-primary" />
                Images de fond
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Desktop</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBackgroundUpload(e, false)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border-2 border-dashed rounded-xl p-4 text-center h-32 flex items-center justify-center ${
                      backgroundDesktopUrl ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                    }`}>
                      {backgroundDesktopUrl ? (
                        <img src={backgroundDesktopUrl} alt="Background preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-gray-500">
                          <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                          <p className="text-sm">Image desktop</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Mobile (optionnel)</Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBackgroundUpload(e, true)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border-2 border-dashed rounded-xl p-4 text-center h-32 flex items-center justify-center ${
                      backgroundMobileUrl ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                    }`}>
                      {backgroundMobileUrl ? (
                        <img src={backgroundMobileUrl} alt="Mobile background preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-gray-500">
                          <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                          <p className="text-sm">Image mobile</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Si aucune image mobile n'est fournie, l'image desktop sera utilisée. 
                Si aucune image n'est fournie, un arrière-plan sera généré automatiquement.
              </p>
            </div>

            {/* Prix/Lots */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-sora font-semibold text-gray-900 flex items-center">
                  <Gift className="mr-3 h-5 w-5 text-primary" />
                  Lots à gagner
                </Label>
                <Button
                  type="button"
                  onClick={addPrize}
                  disabled={prizes.length >= 8}
                  size="sm"
                  variant="outline"
                  className="text-primary border-primary"
                >
                  + Ajouter
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prizes.map((prize, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={prize}
                      onChange={(e) => updatePrize(index, e.target.value)}
                      placeholder={`Lot ${index + 1}`}
                      className="flex-1"
                    />
                    {prizes.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removePrize(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ton de marque */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-4">
                Ton de votre marque (optionnel)
              </Label>
              <RadioGroup value={brandTone} onValueChange={setBrandTone}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {brandTones.map((tone) => (
                    <div
                      key={tone.value}
                      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        brandTone === tone.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                      }`}
                    >
                      <RadioGroupItem value={tone.value} id={tone.value} className="sr-only" />
                      <Label htmlFor={tone.value} className="cursor-pointer block">
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{tone.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{tone.value}</p>
                            <p className="text-sm text-gray-600">{tone.desc}</p>
                          </div>
                        </div>
                      </Label>
                      {brandTone === tone.value && (
                        <Check className="absolute top-3 right-3 h-5 w-5 text-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <Label className="text-lg font-sora font-semibold text-gray-900 mb-3">
                Description courte (optionnel)
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez brièvement votre marque, vos valeurs ou l'objectif de ce jeu..."
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* CTA Desktop */}
            <div className="hidden md:flex justify-end pt-8">
              <Button
                onClick={handleNext}
                disabled={!isValid}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold px-8 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                Continuer vers la mécanique
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Prévisualisation */}
          <div className="lg:sticky lg:top-6 h-fit">
            <GamePreview 
              brandData={{
                brandName,
                gameTitle,
                primaryColor,
                secondaryColor,
                accentColor,
                logo: formData.logo,
                logoUrl: logoPreviewUrl,
                backgroundDesktopUrl,
                backgroundMobileUrl,
                brandTone,
                prizes: prizes.filter(p => p.trim() !== '')
              }}
            />
          </div>
        </div>
      </div>

      {/* CTA Mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-30">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
        >
          Continuer vers la mécanique
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
