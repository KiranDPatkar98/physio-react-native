export interface OnboardingData {
  // Step 1 – Basic Info
  name: string;
  age: string;
  profession: string;
  // Step 2 – Work Lifestyle
  workMode: string;
  sittingHours: string;
  // Step 3 – Pain Areas (multi-select)
  painAreas: string[];
  // Step 4 – Frequency & Time
  frequency: string;
  timeOfDiscomfort: string[];
}

export const INITIAL_DATA: OnboardingData = {
  name: "",
  age: "",
  profession: "",
  workMode: "",
  sittingHours: "",
  painAreas: [],
  frequency: "",
  timeOfDiscomfort: [],
};
