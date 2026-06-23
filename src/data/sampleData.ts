import { VehicleData } from '../types';

export const sampleVehicles: VehicleData[] = [
  {
    id: 'VH001', vehicleType: 'Sedan', vehicleAge: 3, fuelType: 'Petrol', engineCapacity: 1.6,
    mileage: 45000, speed: 80, roadCondition: 'Highway', driverAge: 35, trafficDensity: 'Medium',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 15000, serviceFrequency: 2,
    fuelConsumption: 8.5, condition: 'Good', riskLevel: 'Low', maintenanceRequirement: 'Routine'
  },
  {
    id: 'VH002', vehicleType: 'SUV', vehicleAge: 5, fuelType: 'Diesel', engineCapacity: 2.0,
    mileage: 85000, speed: 60, roadCondition: 'City', driverAge: 42, trafficDensity: 'High',
    weatherCondition: 'Rainy', accidentHistory: 1, maintenanceCost: 28000, serviceFrequency: 3,
    fuelConsumption: 12.0, condition: 'Average', riskLevel: 'Medium', maintenanceRequirement: 'Service Due'
  },
  {
    id: 'VH003', vehicleType: 'Hatchback', vehicleAge: 1, fuelType: 'Petrol', engineCapacity: 1.2,
    mileage: 12000, speed: 90, roadCondition: 'Highway', driverAge: 28, trafficDensity: 'Low',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 8000, serviceFrequency: 1,
    fuelConsumption: 6.2, condition: 'Excellent', riskLevel: 'Low', maintenanceRequirement: 'None'
  },
  {
    id: 'VH004', vehicleType: 'Truck', vehicleAge: 8, fuelType: 'Diesel', engineCapacity: 3.5,
    mileage: 180000, speed: 50, roadCondition: 'Rural', driverAge: 45, trafficDensity: 'Low',
    weatherCondition: 'Foggy', accidentHistory: 2, maintenanceCost: 45000, serviceFrequency: 4,
    fuelConsumption: 18.5, condition: 'Poor', riskLevel: 'High', maintenanceRequirement: 'Immediate Service'
  },
  {
    id: 'VH005', vehicleType: 'Sedan', vehicleAge: 2, fuelType: 'Electric', engineCapacity: 0,
    mileage: 25000, speed: 85, roadCondition: 'Highway', driverAge: 30, trafficDensity: 'Medium',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 5000, serviceFrequency: 1,
    fuelConsumption: 0, condition: 'Excellent', riskLevel: 'Low', maintenanceRequirement: 'None'
  },
  {
    id: 'VH006', vehicleType: 'SUV', vehicleAge: 7, fuelType: 'Petrol', engineCapacity: 2.5,
    mileage: 120000, speed: 55, roadCondition: 'City', driverAge: 50, trafficDensity: 'High',
    weatherCondition: 'Rainy', accidentHistory: 1, maintenanceCost: 35000, serviceFrequency: 3,
    fuelConsumption: 14.2, condition: 'Average', riskLevel: 'Medium', maintenanceRequirement: 'Service Due'
  },
  {
    id: 'VH007', vehicleType: 'Motorcycle', vehicleAge: 4, fuelType: 'Petrol', engineCapacity: 0.5,
    mileage: 35000, speed: 100, roadCondition: 'Highway', driverAge: 25, trafficDensity: 'Medium',
    weatherCondition: 'Clear', accidentHistory: 1, maintenanceCost: 12000, serviceFrequency: 2,
    fuelConsumption: 4.5, condition: 'Good', riskLevel: 'Medium', maintenanceRequirement: 'Routine'
  },
  {
    id: 'VH008', vehicleType: 'Bus', vehicleAge: 10, fuelType: 'Diesel', engineCapacity: 4.0,
    mileage: 250000, speed: 45, roadCondition: 'City', driverAge: 55, trafficDensity: 'Very High',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 55000, serviceFrequency: 5,
    fuelConsumption: 22.0, condition: 'Poor', riskLevel: 'Medium', maintenanceRequirement: 'Service Due'
  },
  {
    id: 'VH009', vehicleType: 'Sedan', vehicleAge: 6, fuelType: 'Diesel', engineCapacity: 1.8,
    mileage: 95000, speed: 70, roadCondition: 'Highway', driverAge: 38, trafficDensity: 'Medium',
    weatherCondition: 'Rainy', accidentHistory: 0, maintenanceCost: 22000, serviceFrequency: 3,
    fuelConsumption: 9.8, condition: 'Good', riskLevel: 'Low', maintenanceRequirement: 'Routine'
  },
  {
    id: 'VH010', vehicleType: 'Hatchback', vehicleAge: 9, fuelType: 'Petrol', engineCapacity: 1.0,
    mileage: 150000, speed: 65, roadCondition: 'City', driverAge: 60, trafficDensity: 'High',
    weatherCondition: 'Clear', accidentHistory: 2, maintenanceCost: 32000, serviceFrequency: 4,
    fuelConsumption: 7.8, condition: 'Poor', riskLevel: 'High', maintenanceRequirement: 'Immediate Service'
  },
  {
    id: 'VH011', vehicleType: 'SUV', vehicleAge: 4, fuelType: 'Hybrid', engineCapacity: 2.0,
    mileage: 55000, speed: 75, roadCondition: 'Highway', driverAge: 33, trafficDensity: 'Medium',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 18000, serviceFrequency: 2,
    fuelConsumption: 6.5, condition: 'Excellent', riskLevel: 'Low', maintenanceRequirement: 'None'
  },
  {
    id: 'VH012', vehicleType: 'Truck', vehicleAge: 12, fuelType: 'Diesel', engineCapacity: 4.5,
    mileage: 320000, speed: 40, roadCondition: 'Rural', driverAge: 48, trafficDensity: 'Low',
    weatherCondition: 'Foggy', accidentHistory: 3, maintenanceCost: 65000, serviceFrequency: 6,
    fuelConsumption: 20.5, condition: 'Critical', riskLevel: 'Very High', maintenanceRequirement: 'Immediate Service'
  },
  {
    id: 'VH013', vehicleType: 'Sedan', vehicleAge: 0, fuelType: 'Electric', engineCapacity: 0,
    mileage: 5000, speed: 95, roadCondition: 'Highway', driverAge: 29, trafficDensity: 'Low',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 2000, serviceFrequency: 0,
    fuelConsumption: 0, condition: 'Excellent', riskLevel: 'Low', maintenanceRequirement: 'None'
  },
  {
    id: 'VH014', vehicleType: 'Motorcycle', vehicleAge: 2, fuelType: 'Petrol', engineCapacity: 0.6,
    mileage: 18000, speed: 110, roadCondition: 'Highway', driverAge: 24, trafficDensity: 'Medium',
    weatherCondition: 'Clear', accidentHistory: 0, maintenanceCost: 6000, serviceFrequency: 1,
    fuelConsumption: 3.8, condition: 'Excellent', riskLevel: 'Low', maintenanceRequirement: 'None'
  },
  {
    id: 'VH015', vehicleType: 'SUV', vehicleAge: 11, fuelType: 'Diesel', engineCapacity: 3.0,
    mileage: 200000, speed: 55, roadCondition: 'City', driverAge: 52, trafficDensity: 'Very High',
    weatherCondition: 'Rainy', accidentHistory: 2, maintenanceCost: 48000, serviceFrequency: 5,
    fuelConsumption: 16.0, condition: 'Poor', riskLevel: 'High', maintenanceRequirement: 'Immediate Service'
  },
];

export const sampleMLResults = {
  classification: [
    { name: 'Logistic Regression', accuracy: 0.82, precision: 0.80, recall: 0.78, f1Score: 0.79, bestModel: false },
    { name: 'Decision Tree', accuracy: 0.85, precision: 0.84, recall: 0.83, f1Score: 0.83, bestModel: false },
    { name: 'Random Forest', accuracy: 0.91, precision: 0.90, recall: 0.89, f1Score: 0.89, bestModel: true },
    { name: 'KNN', accuracy: 0.79, precision: 0.77, recall: 0.75, f1Score: 0.76, bestModel: false },
    { name: 'Naive Bayes', accuracy: 0.76, precision: 0.75, recall: 0.73, f1Score: 0.74, bestModel: false },
    { name: 'SVM', accuracy: 0.87, precision: 0.86, recall: 0.85, f1Score: 0.85, bestModel: false },
    { name: 'XGBoost', accuracy: 0.93, precision: 0.92, recall: 0.91, f1Score: 0.92, bestModel: true },
  ],
  regression: [
    { name: 'Linear Regression', accuracy: 0.72, precision: 0.70, recall: 0.68, f1Score: 0.69, bestModel: false },
    { name: 'Random Forest Regressor', accuracy: 0.88, precision: 0.87, recall: 0.86, f1Score: 0.86, bestModel: false },
    { name: 'Decision Tree Regressor', accuracy: 0.84, precision: 0.83, recall: 0.82, f1Score: 0.82, bestModel: false },
    { name: 'XGBoost Regressor', accuracy: 0.91, precision: 0.90, recall: 0.89, f1Score: 0.90, bestModel: true },
  ]
};

export const kpiData = [
  { label: 'Total Vehicles', value: '15,847', change: '+12.5%', changeType: 'positive' as const, icon: 'Truck' },
  { label: 'Active Vehicles', value: '12,423', change: '+8.3%', changeType: 'positive' as const, icon: 'Activity' },
  { label: 'Average Mileage', value: '98,432 km', change: '+5.2%', changeType: 'positive' as const, icon: 'MapPin' },
  { label: 'Avg Fuel Consumption', value: '9.8 L/100km', change: '-2.1%', changeType: 'positive' as const, icon: 'Fuel' },
  { label: 'Avg Maintenance Cost', value: '₹24,580', change: '+3.7%', changeType: 'negative' as const, icon: 'Wrench' },
  { label: 'High-Risk Vehicles', value: '847', change: '-1.2%', changeType: 'positive' as const, icon: 'AlertTriangle' },
];

export const monthlyTrends = [
  { month: 'Jan', vehicles: 1240, maintenance: 28000, fuel: 9.2, accidents: 12 },
  { month: 'Feb', vehicles: 1320, maintenance: 26500, fuel: 9.0, accidents: 10 },
  { month: 'Mar', vehicles: 1410, maintenance: 27200, fuel: 9.1, accidents: 15 },
  { month: 'Apr', vehicles: 1380, maintenance: 25800, fuel: 8.8, accidents: 8 },
  { month: 'May', vehicles: 1520, maintenance: 29000, fuel: 9.4, accidents: 14 },
  { month: 'Jun', vehicles: 1480, maintenance: 27500, fuel: 9.3, accidents: 11 },
  { month: 'Jul', vehicles: 1580, maintenance: 31000, fuel: 9.6, accidents: 16 },
  { month: 'Aug', vehicles: 1620, maintenance: 32500, fuel: 9.7, accidents: 13 },
  { month: 'Sep', vehicles: 1550, maintenance: 29500, fuel: 9.5, accidents: 9 },
  { month: 'Oct', vehicles: 1600, maintenance: 30500, fuel: 9.3, accidents: 11 },
  { month: 'Nov', vehicles: 1650, maintenance: 31500, fuel: 9.4, accidents: 10 },
  { month: 'Dec', vehicles: 1720, maintenance: 34000, fuel: 9.8, accidents: 18 },
];

export const vehicleTypeDistribution = [
  { name: 'Sedan', value: 35, color: '#6366f1' },
  { name: 'SUV', value: 25, color: '#8b5cf6' },
  { name: 'Hatchback', value: 18, color: '#a855f7' },
  { name: 'Truck', value: 10, color: '#d946ef' },
  { name: 'Motorcycle', value: 8, color: '#ec4899' },
  { name: 'Bus', value: 4, color: '#f43f5e' },
];

export const fuelTypeDistribution = [
  { name: 'Petrol', value: 45, color: '#3b82f6' },
  { name: 'Diesel', value: 30, color: '#6366f1' },
  { name: 'Electric', value: 12, color: '#10b981' },
  { name: 'Hybrid', value: 8, color: '#f59e0b' },
  { name: 'CNG', value: 5, color: '#ef4444' },
];

export const riskDistribution = [
  { name: 'Low Risk', value: 55, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 15, color: '#f97316' },
  { name: 'Very High Risk', value: 5, color: '#ef4444' },
];
