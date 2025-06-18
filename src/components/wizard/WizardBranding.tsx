
import { useState, useRef } from 'react';
import { Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface WizardBrandingProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  currentStep: number;
}

export const WizardBranding = ({ formData, updateFormData, onNext }: WizardBrandingProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      updateFormData({ logo: files[0] });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ logo: file });
    }
  };

  const isValid = formData.brief.length >= 20;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/75 backdrop-blur-12 rounded-2xl p-8 shadow-lg border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-sora font-bold text-gray-warm mb-4">
            Brief & Branding
          </h2>
          <p className="text-lg font-inter text-gray-600 max-w-2xl mx-auto">
            Définissez l'identité visuelle et le brief de votre jeu interactif
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo Upload */}
          <div className="space-y-4">
            <Label className="text-lg font-inter font-semibold text-gray-warm">
              Logo de votre marque
            </Label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-250 cursor-pointer hover:border-primary/50 ${
                isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="font-inter text-gray-600 mb-2">
                Glissez votre logo ici ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG jusqu'à 5MB
              </p>
              {formData.logo && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    ✓ {formData.logo.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Color Pickers */}
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-inter font-semibold text-gray-warm mb-4 block">
                Couleurs de marque
              </Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label className="font-inter text-gray-600 w-24">Primaire</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <span className="font-inter text-sm text-gray-600 font-mono">
                      {formData.primaryColor}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Label className="font-inter text-gray-600 w-24">Secondaire</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <span className="font-inter text-sm text-gray-600 font-mono">
                      {formData.secondaryColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-r"
                 style={{ 
                   backgroundImage: `linear-gradient(45deg, ${formData.primaryColor}, ${formData.secondaryColor})` 
                 }}>
              <div className="bg-white/90 backdrop-blur-12 rounded-lg p-4 text-center">
                <Palette className="mx-auto h-8 w-8 mb-2" style={{ color: formData.primaryColor }} />
                <p className="font-inter font-semibold" style={{ color: formData.primaryColor }}>
                  Aperçu live
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brief IA */}
        <div className="mt-8 space-y-4">
          <Label className="text-lg font-inter font-semibold text-gray-warm">
            Brief IA (minimum 20 caractères)
          </Label>
          <Textarea
            placeholder="Ex: Jeu concours pour le lancement de notre nouvelle collection automne. Cible : femmes 25-45 ans passionnées de mode. Objectif : collecter 1000 emails qualifiés. Ton décontracté et premium."
            value={formData.brief}
            onChange={(e) => updateFormData({ brief: e.target.value })}
            className="min-h-[120px] font-inter resize-none"
            maxLength={300}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formData.brief.length}/300 caractères</span>
            <span className={formData.brief.length >= 20 ? 'text-green-600' : 'text-red-500'}>
              {formData.brief.length >= 20 ? '✓ Brief suffisant' : 'Brief trop court'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={onNext}
            disabled={!isValid}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-light text-white font-inter font-semibold px-8 hover:scale-104 transition-all duration-250"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};
