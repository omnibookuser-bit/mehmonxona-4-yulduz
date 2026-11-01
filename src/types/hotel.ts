/**
 * Types for 4-Star Hotel Project & Financial Model
 */

export type Language = 'uz_cyrl' | 'uz_latn';
export type Currency = 'USD' | 'UZS';

export interface RoomConfig {
  id: string;
  name: string;
  nameLatn: string;
  count: number;
  bedsPerRoom: number;
  totalBeds: number;
  areaSqM: number;
  basePriceUSD: number;
  floor: number;
  description: string;
  descriptionLatn: string;
  features: string[];
}

export interface FloorData {
  floorNumber: number;
  name: string;
  nameLatn: string;
  totalAreaSqM: number;
  roomsCount: number;
  bedsCount: number;
  purpose: string;
  purposeLatn: string;
  highlights: string[];
  zones: {
    id: string;
    name: string;
    nameLatn: string;
    areaSqM: number;
    type: 'room' | 'lobby' | 'dining' | 'conference' | 'service' | 'spa' | 'admin';
    beds?: number;
    roomNumbers?: string;
  }[];
}

export interface CapexCategory {
  id: string;
  name: string;
  nameLatn: string;
  costUSD: number;
  percent: number;
  description: string;
  descriptionLatn: string;
  breakdown: {
    item: string;
    itemLatn: string;
    costUSD: number;
    note: string;
    noteLatn: string;
  }[];
}

export interface OpexCategory {
  id: string;
  name: string;
  nameLatn: string;
  monthlyCostUSD: number;
  annualCostUSD: number;
  percent: number;
  description: string;
  descriptionLatn: string;
}

export interface StaffPosition {
  title: string;
  titleLatn: string;
  count: number;
  monthlySalaryUSD: number;
  department: string;
}

export interface FinancialParameters {
  totalRooms: number;
  totalBeds: number;
  totalBuildingAreaSqM: number; // e.g. 2,800 m2
  landAreaSotix: number; // e.g. 18 sotix
  
  // Construction costs per m2
  constructionCostPerSqM: number; // e.g. $650 / m2
  finishingCostPerSqM: number; // e.g. $280 / m2
  ffeCostPerRoom: number; // e.g. $8,500 / room for 4-star FF&E
  
  // Operational inputs
  averageDailyRateUSD: number; // ADR e.g. $65
  averageOccupancyRate: number; // 0.70 (70%)
  fbRevenuePercentOfRooms: number; // e.g. 25% of room revenue
  otherRevenuePercentOfRooms: number; // e.g. 10% (conference, spa, laundry)
  
  // OPEX inputs
  staffCount: number;
  avgMonthlySalaryUSD: number;
  monthlyUtilitiesUSD: number;
  marketingAndOtaPercent: number; // e.g. 14% of rooms revenue
  maintenanceReservePercent: number; // e.g. 4% of revenue
  taxRatePercent: number; // e.g. 4% turnover tax or simplified tax
  
  // Investment
  contingencyPercent: number; // 7%
  workingCapitalMonths: number; // 3 months
  discountRate: number; // 12% for NPV
}

export interface FinancialResults {
  // CAPEX
  capexTotalUSD: number;
  capexBuildingUSD: number;
  capexFinishingUSD: number;
  capexEngineeringMepUSD: number;
  capexFFEUSD: number;
  capexOSEUSD: number;
  capexLandAndInfraUSD: number;
  capexSoftCostsUSD: number;
  capexContingencyUSD: number;
  capexWorkingCapitalUSD: number;
  
  // Revenue (Annual)
  annualRoomsRevenueUSD: number;
  annualFbRevenueUSD: number;
  annualOtherRevenueUSD: number;
  annualGrossRevenueUSD: number;
  revParUSD: number; // Revenue Per Available Room
  
  // OPEX (Annual)
  annualPayrollUSD: number;
  annualUtilitiesUSD: number;
  annualFbCostUSD: number;
  annualMarketingOtaUSD: number;
  annualMaintenanceUSD: number;
  annualSuppliesUSD: number;
  annualInsuranceAdminUSD: number;
  annualTaxesUSD: number;
  annualTotalOpexUSD: number;
  
  // Profitability
  gopUSD: number; // Gross Operating Profit
  gopMargin: number;
  ebitdaUSD: number;
  ebitdaMargin: number;
  netAnnualProfitUSD: number;
  netProfitMargin: number;
  
  // Investment metrics
  simplePaybackYears: number;
  discountedPaybackYears: number;
  roiPercent: number;
  irrPercent: number;
  npv10YearsUSD: number;
  breakEvenOccupancyPercent: number;
  
  // 10-year cash flow projections
  cashFlowYears: {
    year: number;
    occupancy: number;
    adr: number;
    grossRevenue: number;
    opex: number;
    netProfit: number;
    cumulativeCashFlow: number;
  }[];
}
