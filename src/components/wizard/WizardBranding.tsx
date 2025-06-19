
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Upload, Palette, Target, Users, Sparkles } from 'lucide-react';
import type { WizardFormData } from '@/lib/types';

interface WizardBrandingProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
  onNext: () => void;
  currentStep: number;
}

export const WizardBranding = ({ formData, updateFormData, onNext }: WizardBrandingProps) => {
  const [brandTone, setBrandTone] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);
  const [audience, setAudience] = useState<string[]>([]);
  const [productName, setProductName] = useState('');

  const brandTones = ["Sérieux", "Fun & engageant", "Élégant & raffiné", "Familial"];
  const campaignObjectives = [
    "Collecte d'emails",
    "Trafic en point de vente", 
    "Valorisation de marque",
    "Fidélisation"
  ];
  const audiences = ["Jeunes actifs", "Seniors", "Parents", "Professionnels", "Fans de la marque"];

  const handleObjectiveToggle = (objective: string) => {
    setObjectives(prev => 
      prev.includes(objective) 
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  const handleAudienceToggle = (aud: string) => {
    setAudience(prev => 
      prev.includes(aud) 
        ? prev.filter(a => a !== aud)
        : [...prev, aud]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateFormData({ logo: file });
    }
  };

  const isValid = formData.logo && brandTone && objectives.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/85 backdrop-blur-16 rounded-3xl shadow-2xl border border-gray-200/30 overflow-hidden">
        {/* Header avec animation */}
        <div className="relative px-8 py-8 bg-gradient-to-br from-primary/5 via-primary-light/10 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mr-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-sm font-inter font-medium text-primary mb-1 block">Étape 1 sur 4</span>
                <h2 className="text-3xl font-sora font-bold text-gray-warm">
                  Votre identité de marque
                </h2>
              </div>
            </div>
            <p className="text-lg font-inter text-gray-600 max-w-2xl">
              Définissons ensemble les bases créatives qui rendront votre jeu unique et mémorable.
            </p>
          </div>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Upload Logo Premium */}
          <div className="space-y-3">
            <Label className="text-base font-inter font-semibold text-gray-700 flex items-center">
              <Upload className="mr-2 h-5 w-5 text-primary" />
              Logo de votre marque *
            </Label>
            <div className="relative">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 ${
                formData.logo ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}>
                {formData.logo ? (
                  <div className="text-primary">
                    <Upload className="mx-auto h-8 w-8 mb-3" />
                    <p className="font-inter font-medium">{formData.logo.name}</p>
                    <p className="text-sm text-gray-600 mt-1">Fichier uploadé avec succès</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <Upload className="mx-auto h-8 w-8 mb-3" />
                    <p className="font-inter font-medium">Glissez votre logo ici</p>
                    <p className="text-sm mt-1">PNG, JPG, SVG jusqu'à 10MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Couleurs avec preview */}
          <div className="space-y-4">
            <Label className="text-base font-inter font-semibold text-gray-700 flex items-center">
              <Palette className="mr-2 h-5 w-5 text-primary" />
              Couleurs principales
            </Label>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-inter text-gray-600 mb-2 block">Couleur primaire</Label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  />
                  <div className="flex-1">
                    <Input 
                      value={formData.primaryColor} 
                      onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-inter text-gray-600 mb-2 block">Couleur secondaire</Label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.secondaryColor}
                    onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer hover:scale-105 transition-transform"
                  />
                  <div className="flex-1">
                    <Input 
                      value={formData.secondaryColor} 
                      onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ton de marque */}
          <div className="space-y-4">
            <Label className="text-base font-inter font-semibold text-gray-700">
              Quel est le ton de votre marque ? *
            </Label>
            <RadioGroup value={brandTone} onValueChange={setBrandTone}>
              <div className="grid md:grid-cols-2 gap-3">
                {brandTones.map((tone) => (
                  <div key={tone} className="flex items-center space-x-3 p-4 rounded-xl border-2 transition-all hover:border-primary/30 hover:bg-primary/5">
                    <RadioGroupItem value={tone} id={tone} />
                    <Label htmlFor={tone} className="font-inter cursor-pointer flex-1">{tone}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Objectifs campagne */}
          <div className="space-y-4">
            <Label className="text-base font-inter font-semibold text-gray-700 flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Objectifs de votre campagne *
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {campaignObjectives.map((objective) => (
                <button
                  key={objective}
                  onClick={() => handleObjectiveToggle(objective)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-102 ${
                    objectives.includes(objective)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                  }`}
                >
                  <span className="font-inter font-medium">{objective}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div className="space-y-4">
            <Label className="text-base font-inter font-semibold text-gray-700 flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Votre audience principale
            </Label>
            <div className="flex flex-wrap gap-2">
              {audiences.map((aud) => (
                <button
                  key={aud}
                  onClick={() => handleAudienceToggle(aud)}
                  className={`px-4 py-2 rounded-full text-sm font-inter font-medium transition-all hover:scale-105 ${
                    audience.includes(aud)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>

          {/* Produit à mettre en avant */}
          <div className="space-y-3">
            <Label className="text-base font-inter font-semibold text-gray-700">
              Nom ou produit à mettre en avant
            </Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ex : Tablette Facilotab Nomad 4G"
              className="text-base p-4 rounded-xl"
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-200/50">
          <div className="flex justify-end">
            <Button
              onClick={onNext}
              disabled={!isValid}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250 disabled:opacity-50"
            >
              Continuer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          {!isValid && (
            <p className="text-sm text-gray-500 mt-3 text-right">
              Veuillez remplir les champs obligatoires (*)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
