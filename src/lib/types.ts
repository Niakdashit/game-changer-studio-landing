
export interface WizardFormData {
  logo: File | null;
  primaryColor: string;
  secondaryColor: string;
  brief: string;
  mechanic: string;
  generatedGame: boolean | null;
  brandTone?: string;
  objectives?: string[];
  audience?: string[];
  productName?: string;
}

export interface WizardInput {
  type: 'file-upload' | 'color-picker' | 'select' | 'checkbox' | 'chips' | 'text';
  label: string;
  required?: boolean;
  accept?: string[];
  allowMultiple?: boolean;
  max?: number;
  options?: string[];
  placeholder?: string;
  preview?: boolean;
  feedbackText?: string;
  showPreviewBlock?: boolean;
  suggestions?: string[];
}

export interface WizardStep {
  title: string;
  description: string;
  inputs?: WizardInput[];
  type?: string;
  options?: any;
  mobilePreviewSticky?: boolean;
  previewComponent?: string;
}
