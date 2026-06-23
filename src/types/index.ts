export interface VehicleData {
  id: string;
  vehicleType: string;
  vehicleAge: number;
  fuelType: string;
  engineCapacity: number;
  mileage: number;
  speed: number;
  roadCondition: string;
  driverAge: number;
  trafficDensity: string;
  weatherCondition: string;
  accidentHistory: number;
  maintenanceCost: number;
  serviceFrequency: number;
  fuelConsumption: number;
  condition: string;
  riskLevel: string;
  maintenanceRequirement: string;
}

export interface KPI {
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface MLModelResult {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  bestModel: boolean;
}

export interface Prediction {
  type: string;
  value: string | number;
  confidence: number;
  recommendation: string;
}

export interface HealthScore {
  score: number;
  category: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Critical';
  parameters: {
    label: string;
    value: number;
    max: number;
    status: 'good' | 'warning' | 'danger';
  }[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  icon: string;
}

export type PageType = 
  | 'dashboard'
  | 'data-management'
  | 'eda'
  | 'ml-models'
  | 'prediction-center'
  | 'vehicle-health'
  | 'recommendations'
  | 'reports'
  | 'model-comparison'
  | 'settings';
