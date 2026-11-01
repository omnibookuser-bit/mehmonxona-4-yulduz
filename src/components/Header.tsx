import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  DollarSign,
  Building,
  Bed,
  Star,
  FileText,
  Printer,
  Sliders,
  Menu,
  X,
  Coins,
  Edit3,
  Check,
} from 'lucide-react';
import { Currency, Language } from '../types/hotel';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activePreset: string;
  onSelectPreset: (preset: 'conservative' | 'realistic' | 'optimistic') => void;
  onPrint: () => void;
  hotelName: string;
  setHotelName: (name: string) => void;
}

export const FOUR_STAR_BRAND_PRESETS = [
  'SILK ROAD PLAZA 4★ HOTEL',
  'ROYAL PALACE 4★ HOTEL',
  'ORIENT PLAZA 4★ HOTEL',
  'REGAL PALACE 4★ HOTEL',
  'SAMARKAND PLAZA 4★ HOTEL',
  'TASHKENT PALACE 4★ HOTEL',
];

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  activeTab,
  setActiveTab,
  activePreset,
  onSelectPreset,
  onPrint,
  hotelName,
  setHotelName,
}) => {
  const isCyrl = language === 'uz_cyrl';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(hotelName);

  const navItems = [
    {
      id: 'financial',
      label: isCyrl ? 'Молия (CAPEX)' : 'Moliya (CAPEX)',
      icon: DollarSign,
    },
    {
      id: 'architecture',
      label: isCyrl ? '4 Қават Лойиҳаси' : '4 Qavat Loyihasi',
      icon: Building,
    },
    {
      id: 'rooms',
      label: isCyrl ? '100 Ўринли Хоналар' : '100 O\'rinli Xonalar',
      badge: '100 койка',
      icon: Bed,
    },
    {
      id: 'standards',
      label: isCyrl ? '4★ Стандартлари' : '4★ Standartlari',
      icon: Star,
    },
    {
      id: 'memorandum',
      label: isCyrl ? 'Инвестор Хулосаси' : 'Investor Xulosasi',
      icon: FileText,
    },
  ];

  const handleSaveName = () => {
    if (tempName.trim()) {
      setHotelName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between px-3.5 py-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-sm shrink-0">
            <Building2 className="w-4 h-4 text-slate-950" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-xs sm:text-sm tracking-tight font-['Space_Grotesk'] text-white truncate max-w-[170px]">
                {hotelName}
              </span>
              <button
                onClick={() => {
                  setTempName(hotelName);
                  setIsEditingName(true);
                }}
                className="text-amber-400 p-0.5 hover:text-amber-300"
                title="Номни ўзгартириш"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400">4 қават • 100 койка</p>
          </div>
        </div>

        {/* Quick Mobile Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'UZS' : 'USD')}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-bold text-amber-300"
            title="Валютани алмаштириш"
          >
            <Coins className="w-3 h-3 text-amber-400" />
            <span>{currency}</span>
          </button>

          <button
            onClick={() => setLanguage(language === 'uz_cyrl' ? 'uz_latn' : 'uz_cyrl')}
            className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-300"
            title="Тилни алмаштириш"
          >
            {language === 'uz_cyrl' ? 'Ўзб' : 'O\'zb'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Опциялар менюси"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-4 animate-fadeIn">
          {/* Quick Brand Switcher */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              {isCyrl ? '4 Юлдузли Меҳмонхона Номлари:' : '4 Yulduzli Mehmonxona Nomlari:'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {FOUR_STAR_BRAND_PRESETS.slice(0, 4).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setHotelName(preset);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-[10px] font-semibold text-left border truncate ${
                    hotelName === preset
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              {isCyrl ? 'Ҳисоб-китоб Сценарийси:' : 'Hisob-kitob Ssenariysi:'}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  onSelectPreset('conservative');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 rounded-lg text-xs font-semibold text-center border ${
                  activePreset === 'conservative'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {isCyrl ? 'Консерватив' : 'Konservativ'}
              </button>
              <button
                onClick={() => {
                  onSelectPreset('realistic');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 rounded-lg text-xs font-semibold text-center border ${
                  activePreset === 'realistic'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {isCyrl ? 'Реал (База)' : 'Real (Baza)'}
              </button>
              <button
                onClick={() => {
                  onSelectPreset('optimistic');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-1 rounded-lg text-xs font-semibold text-center border ${
                  activePreset === 'optimistic'
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800'
                }`}
              >
                {isCyrl ? 'Оптимистик' : 'Optimistik'}
              </button>
            </div>
          </div>

          {/* Print PDF Button on Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onPrint();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>{isCyrl ? 'Инвестор Ҳисоботини Чоп этиш / PDF' : 'Investor Hisobotini Chop etish / PDF'}</span>
          </button>
        </div>
      )}

      {/* Desktop Utility Bar */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 items-center justify-between gap-3 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>4★ PREMIUM HOTEL PROJECT</span>
          </div>
          <span className="text-slate-400 font-medium">
            {isCyrl
              ? '4 Қаватли • 100 Койкали • 2,950 м² • Инвестиция Ҳисоб-китоби'
              : '4 Qavatli • 100 Koykali • 2,950 m² • Investitsiya Hisob-kitobi'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Preset Buttons */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="text-slate-400 px-2 py-1 font-medium hidden lg:inline">
              {isCyrl ? 'Сценарий:' : 'Ssenariy:'}
            </span>
            <button
              onClick={() => onSelectPreset('conservative')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activePreset === 'conservative'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isCyrl ? 'Консерватив' : 'Konservativ'}
            </button>
            <button
              onClick={() => onSelectPreset('realistic')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activePreset === 'realistic'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isCyrl ? 'Реал (База)' : 'Real (Baza)'}
            </button>
            <button
              onClick={() => onSelectPreset('optimistic')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                activePreset === 'optimistic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {isCyrl ? 'Оптимистик' : 'Optimistik'}
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                currency === 'USD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('UZS')}
              className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                currency === 'UZS' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              UZS (Сўм)
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setLanguage('uz_cyrl')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                language === 'uz_cyrl' ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ўзб
            </button>
            <button
              onClick={() => setLanguage('uz_latn')}
              className={`px-2 py-1 rounded text-xs font-semibold ${
                language === 'uz_latn' ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              O'zb
            </button>
          </div>

          {/* Print/Export Button */}
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded text-xs text-slate-200 transition font-medium cursor-pointer"
            title="Инвестор ҳисоботини чоп этиш ёки PDF сақлаш"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>{isCyrl ? 'Ҳисобот PDF' : 'Hisobot PDF'}</span>
          </button>
        </div>
      </div>

      {/* Desktop Branding & Navigation Tabs */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between py-2.5 gap-2.5">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-['Space_Grotesk']">
                  {hotelName}
                  <span className="text-amber-400 text-xs">★★★★</span>
                </h1>
                <button
                  onClick={() => {
                    setTempName(hotelName);
                    setIsEditingName(true);
                  }}
                  className="text-slate-400 hover:text-amber-300 p-1 rounded hover:bg-slate-800 transition cursor-pointer"
                  title="Меҳмонхона номини ўзгартириш"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {isCyrl ? '4★ Инвестиция ТЭО' : '4★ Investitsiya TEO'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isCyrl
                  ? '4 қават • 100 койка (48 хона) • 4★ халқаро стандартдаги меҳмонхона бизнес-модели'
                  : '4 qavat • 100 koyka (48 xona) • 4★ xalqaro standartdagi mehmonxona biznes-modeli'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 py-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Hotel Name Editor Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                {isCyrl ? '4 Юлдузли Меҳмонхона Номини Танлаш' : '4 Yulduzli Mehmonxona Nomini Tanlash'}
              </h3>
              <button
                onClick={() => setIsEditingName(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Custom Input */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {isCyrl ? 'Меҳмонхона номи:' : 'Mehmonxona nomi:'}
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:border-amber-500 focus:outline-none"
                placeholder="Номни киритинг..."
              />
            </div>

            {/* Preset 4-Star Brands */}
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                {isCyrl ? 'Тавсия этилган 4★ бренд номлари:' : 'Tavsiya etilgan 4★ brend nomlari:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {FOUR_STAR_BRAND_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setTempName(preset)}
                    className={`p-2.5 rounded-lg text-xs font-semibold text-left border transition ${
                      tempName === preset
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                {isCyrl ? 'Бекор қилиш' : 'Bekor qilish'}
              </button>
              <button
                onClick={handleSaveName}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isCyrl ? 'Сақлаш' : 'Saqlash'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
