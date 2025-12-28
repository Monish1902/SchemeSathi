export interface Scheme {
  scheme_id: string;
  scheme_name: string;
  scheme_description: string;
  scheme_category: string;
  department_name: string;
  total_benefit_amount: number;
  eligibility_criteria: Record<string, any>;
  required_documents: string[];
  application_deadline: string | null;
  how_to_apply: string;
  official_website: string;
}

export interface UserProfile {
  fullName?: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  casteCategory?: 'SC' | 'ST' | 'OBC' | 'General' | 'Minority';
  annualIncome?: number;
  isFarmer?: 'Yes' | 'No';
  occupation?: 'Student' | 'Employed' | 'Self-employed' | 'Unemployed';
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  hasDisability?: 'Yes' | 'No';
  educationLevel?: string;
  state?: string;
  district?: string;
  profilePictureUrl?: string;
}
