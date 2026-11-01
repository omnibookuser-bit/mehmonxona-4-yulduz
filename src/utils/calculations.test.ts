import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHotelFinancials,
  DEFAULT_PARAMETERS,
  HOTEL_ROOMS,
  HOTEL_FLOORS,
  formatMoney,
  PRESETS,
} from './calculations';

test('Hotel room inventory strictly totals exactly 100 beds and 48 rooms', () => {
  const totalBeds = HOTEL_ROOMS.reduce((sum, r) => sum + r.totalBeds, 0);
  const totalRooms = HOTEL_ROOMS.reduce((sum, r) => sum + r.count, 0);
  
  assert.equal(totalBeds, 100, 'Hotel must have exactly 100 beds as requested by user');
  assert.equal(totalRooms, 48, 'Hotel has 48 guest rooms configured');
  
  // Verify floor distribution
  const floor2Beds = HOTEL_ROOMS.filter(r => r.floor === 2).reduce((s, r) => s + r.totalBeds, 0);
  const floor3Beds = HOTEL_ROOMS.filter(r => r.floor === 3).reduce((s, r) => s + r.totalBeds, 0);
  const floor4Beds = HOTEL_ROOMS.filter(r => r.floor === 4).reduce((s, r) => s + r.totalBeds, 0);
  
  assert.equal(floor2Beds + floor3Beds + floor4Beds, 100);
});

test('Hotel has exactly 4 floors in architectural data', () => {
  assert.equal(HOTEL_FLOORS.length, 4, 'Must have 4 floors');
  HOTEL_FLOORS.forEach((floor, idx) => {
    assert.equal(floor.floorNumber, idx + 1);
    assert.ok(floor.totalAreaSqM > 500, 'Each floor has realistic square meters');
    assert.ok(floor.zones.length > 3, 'Floor has well-defined functional zones');
  });
});

test('Financial engine calculates realistic CAPEX, OPEX, and positive ROI', () => {
  const result = calculateHotelFinancials(DEFAULT_PARAMETERS);
  
  // CAPEX must be in realistic 4-star range ($2M - $4M for 3000m2 / 100 beds)
  assert.ok(result.capexTotalUSD > 1_800_000, 'CAPEX should be above $1.8M');
  assert.ok(result.capexTotalUSD < 5_000_000, 'CAPEX should be below $5M');
  
  // Gross revenue must be positive and realistic
  assert.ok(result.annualGrossRevenueUSD > 600_000, 'Annual revenue > $600k');
  
  // OPEX must be lower than revenue (profitable operating business)
  assert.ok(result.annualTotalOpexUSD < result.annualGrossRevenueUSD, 'OPEX must be lower than gross revenue');
  assert.ok(result.netAnnualProfitUSD > 200_000, 'Annual Net Profit must be healthy');
  
  // ROI & Payback
  assert.ok(result.roiPercent > 8 && result.roiPercent < 35, `ROI should be realistic: got ${result.roiPercent}%`);
  assert.ok(result.simplePaybackYears >= 3.0 && result.simplePaybackYears <= 9.0, `Payback between 3 and 9 years: got ${result.simplePaybackYears}`);
  
  // 10 year cash flow table
  assert.equal(result.cashFlowYears.length, 10);
  assert.ok(result.cashFlowYears[9].cumulativeCashFlow > 0, 'Cumulative cash flow should become positive by year 10');
});

test('Presets change financial performance logically', () => {
  const conservative = calculateHotelFinancials({ ...DEFAULT_PARAMETERS, ...PRESETS.conservative });
  const realistic = calculateHotelFinancials({ ...DEFAULT_PARAMETERS, ...PRESETS.realistic });
  const optimistic = calculateHotelFinancials({ ...DEFAULT_PARAMETERS, ...PRESETS.optimistic });
  
  assert.ok(optimistic.netAnnualProfitUSD > realistic.netAnnualProfitUSD);
  assert.ok(realistic.netAnnualProfitUSD > conservative.netAnnualProfitUSD);
  assert.ok(optimistic.roiPercent > realistic.roiPercent);
  assert.ok(optimistic.simplePaybackYears < realistic.simplePaybackYears);
});

test('Currency formatter outputs expected strings', () => {
  const usdFmt = formatMoney(2500000, 'USD');
  assert.equal(usdFmt, '$2.50M');
  
  const uzsFmt = formatMoney(100000, 'UZS', 12800);
  assert.ok(uzsFmt.includes('млрд') || uzsFmt.includes('млн'));
});
