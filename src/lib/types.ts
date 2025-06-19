
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
