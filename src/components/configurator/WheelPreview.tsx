import { WheelWrapper } from '@/components/wheel/WheelWrapper';
import type { WizardFormData } from '@/lib/types';

interface WheelPreviewProps {
  formData: WizardFormData;
}

export const WheelPreview = ({ formData }: WheelPreviewProps) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Wheel of Fortune Preview</h2>
    <div className="rounded-lg border bg-white p-4">
      <WheelWrapper formData={formData} />
    </div>
  </div>
);
