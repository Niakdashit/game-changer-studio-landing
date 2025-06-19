import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { WizardFormData } from '@/lib/types';

interface BrandSettingsFormProps {
  formData: WizardFormData;
  updateFormData: (data: Partial<WizardFormData>) => void;
}

export const BrandSettingsForm = ({ formData, updateFormData }: BrandSettingsFormProps) => {
  const segmentCount = formData.segmentCount || 6;

  useEffect(() => {
    if (!formData.prizes || formData.prizes.length !== segmentCount) {
      const prizes = Array.from({ length: segmentCount }, (_, i) => formData.prizes?.[i] || '');
      updateFormData({ prizes });
    }
    if (!formData.segmentColors || formData.segmentColors.length !== segmentCount) {
      const colors = Array.from({ length: segmentCount }, (_, i) => formData.segmentColors?.[i] || '#e52529');
      updateFormData({ segmentColors: colors });
    }
  }, [segmentCount]);

  // FUSION : handleFile gère l'URL pour preview image (logo, fond desktop, fond mobile)
  const handleFile = (
    field: 'logo' | 'backgroundDesktop' | 'backgroundMobile'
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const urlField = `${field}Url` as keyof WizardFormData;
    const url = file ? URL.createObjectURL(file) : null;
    updateFormData({ [field]: file, [urlField]: url } as Partial<WizardFormData>);
  };

  const handlePrizeChange = (index: number, value: string) => {
    const prizes = [...(formData.prizes || [])];
    prizes[index] = value;
    updateFormData({ prizes });
  };

  const handleColorChange = (index: number, value: string) => {
    const colors = [...(formData.segmentColors || [])];
    colors[index] = value;
    updateFormData({ segmentColors: colors });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Brand settings</h2>

      <div className="space-y-2">
        <Label>Brand name</Label>
        <Input value={formData.productName || ''} onChange={e => updateFormData({ productName: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label>Brand URL (optional)</Label>
        <Input value={formData.brandUrl || ''} onChange={e => updateFormData({ brandUrl: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label>Logo</Label>
        <Input type="file" accept="image/*" onChange={handleFile('logo')} />
        {formData.logoUrl && (
          <img src={formData.logoUrl} alt="Logo preview" className="h-16 mt-2" />
        )}
      </div>

      <div className="space-y-2">
        <Label>Game title</Label>
        <Input value={formData.gameTitle || ''} onChange={e => updateFormData({ gameTitle: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label>Number of segments: {segmentCount}</Label>
        <Slider min={2} max={12} step={1} value={[segmentCount]} onValueChange={v => updateFormData({ segmentCount: v[0] })} />
      </div>

      <div className="space-y-4">
        {Array.from({ length: segmentCount }).map((_, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Input type="color" value={formData.segmentColors?.[i] || '#e52529'} onChange={e => handleColorChange(i, e.target.value)} className="h-10 w-10 p-0" />
              <Input value={formData.prizes?.[i] || ''} placeholder={`Prize ${i + 1}`} onChange={e => handlePrizeChange(i, e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Desktop background</Label>
        <Input type="file" accept="image/*" onChange={handleFile('backgroundDesktop')} />
        {formData.backgroundDesktopUrl && (
          <img src={formData.backgroundDesktopUrl} alt="Desktop background preview" className="h-24 mt-2 rounded" />
        )}
      </div>

      <div className="space-y-2">
        <Label>Mobile background</Label>
        <Input type="file" accept="image/*" onChange={handleFile('backgroundMobile')} />
        {formData.backgroundMobileUrl && (
          <img src={formData.backgroundMobileUrl} alt="Mobile background preview" className="h-24 mt-2 rounded" />
        )}
      </div>

      <div className="space-y-2">
        <Label>Style</Label>
        <Select value={formData.style || 'Premium'} onValueChange={v => updateFormData({ style: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Fun">Fun</SelectItem>
            <SelectItem value="Minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
