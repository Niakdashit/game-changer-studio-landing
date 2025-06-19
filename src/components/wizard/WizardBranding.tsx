import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Upload, Palette, Target, Users, Sparkles, Check } from 'lucide-react';
import { MiniGameMockup } from './MiniGameMockup';
import type { WizardFormData } from '@/lib/types';

interface WizardBrandingProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  currentStep: number;
}

export const WizardBranding = ({ formData, updateFormData, onNext }: WizardBrandingProps) => {
  const [brandTone, setBrandTone] = useState(formData.brandTone || '');
  const [objectives, setObjectives] = useState<string[]>(formData.objectives || []);
  const [audience, setAudience] = useState<string[]>(formData.audience || []);
  const [productName, setProductName] = useState(formData.productName || '');
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const brandTones = [
    { value: "Sérieux", icon: "💼", desc: "Professionnel et fiable" },
    { value: "Fun & engageant", icon: "🎉", desc: "Dynamique et accessible" },
    { value: "Élégant & raffiné", icon: "✨", desc: "Sophistiqué et premium" },
    { value: "Familial", icon: "👨‍👩‍👧‍👦", desc: "Chaleureux et inclusif" }
  ];

  const campaignObjectives = [
    "Collecte d'emails",
    "Trafic en point de vente", 
    "Valorisation de marque",
    "Fidélisation"
  ];

  const audiences = ["Jeunes actifs", "Seniors", "Parents", "Professionnels", "Fans de la marque"];
  const colorSuggestions = ["#FFD700", "#7E5BEC", "#4ECCA3", "#FF686B", "#FF9500", "#34D399"];

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
      
      // Sample pixels to extract dominant colors
      for (let i = 0; i < data.length; i += 4 * 10) { // Sample every 10th pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Skip transparent or very light/dark pixels
        if (a < 128 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) continue;
        
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      
      // Get the two most frequent colors
      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);
      
      if (sortedColors.length > 0) {
        const primaryColor = sortedColors[0][0];
        const secondaryColor = sortedColors[1]?.[0] || primaryColor;
        
        updateFormData({
          primaryColor,
          secondaryColor
        });
      }
    };
    
    img.src = URL.createObjectURL(file);
  }, [updateFormData]);

  const handleObjectiveToggle = (objective: string) => {
    const newObjectives = objectives.includes(objective) 
      ? objectives.filter(o => o !== objective)
      : [...objectives, objective];
    setObjectives(newObjectives);
    updateFormData({ objectives: newObjectives });
  };

  const handleAudienceToggle = (aud: string) => {
    const newAudience = audience.includes(aud) 
      ? audience.filter(a => a !== aud)
      : [...audience, aud];
    setAudience(newAudience);
    updateFormData({ audience: newAudience });
  };

  const handleBrandToneChange = (value: string) => {
    setBrandTone(value);
    updateFormData({ brandTone: value });
  };

  const handleProductNameChange = (value: string) => {
    setProductName(value);
    updateFormData({ productName: value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ logo: file });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreviewUrl(previewUrl);
      
      // Extract colors from the uploaded logo
      extractColorsFromImage(file);
    }
  };

  const isValid = formData.logo && brandTone && objectives.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      {/* Mobile Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-sora font-bold text-gray-900">Identité de marque</h2>
            <p className="text-sm text-gray-500">Étape 1 sur 4</p>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div className="w-3 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Étape 1 sur 4
          </div>
          <h1 className="text-3xl md:text-4xl font-sora font-bold text-gray-900 mb-4">
            Votre identité de marque
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Définissons ensemble les bases créatives qui rendront votre jeu unique et mémorable.
          </p>
        </div>

        <div className="space-y-8 pb-32 md:pb-8">
          {/* Upload Logo */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-3 flex items-center">
              <Upload className="mr-3 h-5 w-5 text-primary" />
              Logo de votre marque *
            </Label>
            <div className="relative">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleFileUpload}
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
                    <p className="text-xs mt-2 text-primary">Les couleurs seront extraites automatiquement</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Couleurs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="mr-3 h-5 w-5 text-primary" />
              Couleurs principales
              {formData.logo && (
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Extraites du logo
                </span>
              )}
            </Label>
            
            {/* Color suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Suggestions populaires :</p>
              <div className="flex flex-wrap gap-2">
                {colorSuggestions.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateFormData({ primaryColor: color })}
                    className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Couleur primaire</Label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                    className="w-14 h-14 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  />
                  <Input 
                    value={formData.primaryColor} 
                    onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                    className="font-mono flex-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Couleur secondaire</Label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                    className="w-14 h-14 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  />
                  <Input 
                    value={formData.secondaryColor} 
                    onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                    className="font-mono flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ton de marque */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-4">
              Quel est le ton de votre marque ? *
            </Label>
            <RadioGroup value={brandTone} onValueChange={handleBrandToneChange}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {brandTones.map((tone) => (
                  <div
                    key={tone.value}
                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 motion-safe:hover:[transform:rotateX(3deg)_rotateY(-3deg)] motion-safe:hover:animate-fade-scale ${
                      brandTone === tone.value
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                    }`}
                    tabIndex={0}
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

          {/* Objectifs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="mr-3 h-5 w-5 text-primary" />
              Objectifs de votre campagne *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {campaignObjectives.map((objective) => (
                <button
                  key={objective}
                  onClick={() => handleObjectiveToggle(objective)}
                  className={`p-4 rounded-xl border-2 text-left transition-all relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 motion-safe:hover:[transform:rotateX(3deg)_rotateY(-3deg)] motion-safe:hover:animate-fade-scale ${
                    objectives.includes(objective)
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                  }`}
                  tabIndex={0}
                >
                  <span className="font-medium">{objective}</span>
                  {objectives.includes(objective) && (
                    <Check className="absolute top-3 right-3 h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="mr-3 h-5 w-5 text-primary" />
              Votre audience principale
            </Label>
            <div className="flex flex-wrap gap-2">
              {audiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => handleAudienceToggle(aud)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    audience.includes(aud)
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Label className="text-lg font-sora font-semibold text-gray-900 mb-3">
              Nom ou produit à mettre en avant
            </Label>
            <Input
              value={productName}
              onChange={(e) => handleProductNameChange(e.target.value)}
              placeholder="Ex : Tablette Facilotab Nomad 4G"
              className="text-base p-4 rounded-xl border-gray-200"
            />
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex justify-end pt-8">
            <Button
              onClick={onNext}
              disabled={!isValid}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light text-white font-semibold px-8 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              Continuer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Preview */}
      <MiniGameMockup formData={{ ...formData, brandTone, objectives, audience, productName }} />

      <div className="fixed bottom-20 left-4 right-4 md:hidden">
        <Button
          onClick={onNext}
          disabled={!isValid}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold py-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
        >
          Continuer
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
