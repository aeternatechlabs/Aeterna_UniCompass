export type Currency = "INR" | "EUR" | "GBP" | "AUD" | "USD";
export type ThemeMode = "light" | "dark";

export interface PathwayFilter {
  education: string;
  field: string;
  budget: string;
  destination: string;
}

export interface DestinationCardData {
  id: string;
  country: string;
  tags: string;
  image: string;
  tuitionOverview: string;
  visaHighlights: string;
  topUniversities: string[];
}

export interface PathwayAmbitionData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  linkText: string;
}

export interface CountryCostData {
  country: string;
  flag: string;
  tuitionModel: {
    INR: string;
    EUR: string;
    GBP: string;
    AUD: string;
    USD: string;
  };
  language: string;
  typicalPlanning: {
    INR: string;
    EUR: string;
    GBP: string;
    AUD: string;
    USD: string;
  };
  planningLabels: string;
  intake: string;
  verificationNotice: string;
}

// Backend cost API types

export interface CostRange {
  min: number;
  max: number;
}

export interface BackendCountryCost {
  _id: string;
  country: {
    _id: string;
    country: string;
    slug: string;
    flag: string;
    languages?: string[];
    availableIntakes?: string[];
  };
  currency: Currency;
  tuition: CostRange;
  livingCost: CostRange;
  insurance: CostRange;
  otherCosts: CostRange;
  planningLabels: string;
  intake: string[];
  sourceUrl: string;
  verifiedAt?: string;
  notes: string;
}

export interface CountryCostApiResponse {
  success: boolean;
  count: number;
  data: BackendCountryCost[];
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export interface ProfileEvaluationInput {
  undergraduateCourse: string;
  targetDestination: string;
  fieldOfSpecialisation: string;
  targetBudget: string;
}

export interface ProfileEvaluationResult {
  matchedUniversity: string;
  fitLevel: string;
  fitAssessment: string;
  academicCheck: string;
  englishReq: string;
  visaRoute: string;
}
