/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Currency, FinancialParameters, Language } from './types/hotel';
import {
  calculateHotelFinancials,
  DEFAULT_PARAMETERS,
  PRESETS,
} from './utils/calculations';
import { Header } from './components/Header';
import { FinancialDashboard } from './components/FinancialDashboard';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { RoomInventory } from './components/RoomInventory';
import { FourStarStandards } from './components/FourStarStandards';
import { InvestorMemorandum } from './components/InvestorMemorandum';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [language, setLanguage] = useState<Language>('uz_cyrl');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [activeTab, setActiveTab] = useState<string>('financial');
  const [activePreset, setActivePreset] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');
  const [hotelName, setHotelName] = useState<string>('SILK ROAD PLAZA 4★ HOTEL');
  const [params, setParams] = useState<FinancialParameters>(DEFAULT_PARAMETERS);

  const isCyrl = language === 'uz_cyrl';

  // Compute live financial results whenever parameters change
  const results = useMemo(() => {
    return calculateHotelFinancials(params);
  }, [params]);

  const handleSelectPreset = (preset: 'conservative' | 'realistic' | 'optimistic') => {
    setActivePreset(preset);
    const presetData = PRESETS[preset];
    if (presetData) {
      setParams((prev) => ({
        ...prev,
        ...presetData,
      }));
    }
  };

  const handleUpdateParams = (newParams: Partial<FinancialParameters>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-amber-500 selection:text-slate-950 pb-20 md:pb-6">
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
        onPrint={handlePrint}
        hotelName={hotelName}
        setHotelName={setHotelName}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'financial' && (
          <FinancialDashboard
            language={language}
            currency={currency}
            results={results}
            params={params}
            onUpdateParams={handleUpdateParams}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureViewer language={language} currency={currency} />
        )}

        {activeTab === 'rooms' && (
          <RoomInventory language={language} currency={currency} />
        )}

        {activeTab === 'standards' && (
          <FourStarStandards language={language} />
        )}

        {activeTab === 'memorandum' && (
          <InvestorMemorandum
            language={language}
            currency={currency}
            results={results}
            params={params}
            onPrint={handlePrint}
            hotelName={hotelName}
          />
        )}
      </main>

      {/* Desktop Footer (Hidden on mobile to save space, bottom nav takes over) */}
      <footer className="hidden md:block border-t border-slate-800 bg-slate-900/60 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-slate-300">
              {isCyrl
                ? '4★ Меҳмонхона Инвестиция ва Меъморий Лойиҳаси (ТЭО)'
                : '4★ Mehmonxona Investitsiya va Me\'moriy Loyihasi (TEO)'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isCyrl
                ? '4 қават • 100 койка (48 хона) • 2,950 м² майдон • Тўлиқ CAPEX, OPEX ва ROI молиявий ҳисоб-китоби'
                : '4 qavat • 100 koyka (48 xona) • 2,950 m² maydon • To\'liq CAPEX, OPEX va ROI moliyaviy hisob-kitobi'}
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-400">
            <div>{isCyrl ? 'Валюта курси: 1 USD = 12,800 UZS' : 'Valyuta kursi: 1 USD = 12,800 UZS'}</div>
            <div className="text-amber-400 font-medium">
              {isCyrl ? 'Инвестиция қарори қабул қилиш учун тайёрланган' : 'Investitsiya qarori qabul qilish uchun tayyorlangan'}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Sticky at bottom for smartphone ergonomics) */}
      <MobileBottomNav
        language={language}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
