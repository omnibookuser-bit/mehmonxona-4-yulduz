import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  PieChart,
  Percent,
  Layers,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { Currency, FinancialParameters, FinancialResults, Language } from '../types/hotel';
import { formatMoney, formatMoneyExact } from '../utils/calculations';

interface FinancialDashboardProps {
  language: Language;
  currency: Currency;
  results: FinancialResults;
  params: FinancialParameters;
  onUpdateParams: (newParams: Partial<FinancialParameters>) => void;
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  language,
  currency,
  results,
  params,
  onUpdateParams,
}) => {
  const isCyrl = language === 'uz_cyrl';
  const [showAdvancedInputs, setShowAdvancedInputs] = useState(false);
  const [activeTab, setActiveTab] = useState<'capex' | 'opex' | 'cashflow'>('capex');

  // Breakdown items for CAPEX
  const capexItems = [
    {
      title: isCyrl ? '1. Асосий қурилиш (Бино каркаси ва томи)' : '1. Asosiy qurilish (Bino karkasi va tomi)',
      amount: results.capexBuildingUSD,
      percent: (results.capexBuildingUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? `2,950 м² • ${formatMoney(params.constructionCostPerSqM, currency)} / м² (монолит каркас, ғишт, фасад, том, ойналар)`
        : `2,950 m² • ${formatMoney(params.constructionCostPerSqM, currency)} / m² (monolit karkas, g'isht, fasad, tom, oynalar)`,
      color: 'bg-blue-500',
    },
    {
      title: isCyrl ? '2. Ички пардозлаш (4★ юқори сифатли)' : '2. Ichki pardozlash (4★ yuqori sifatli)',
      amount: results.capexFinishingUSD,
      percent: (results.capexFinishingUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? `2,950 м² • ${formatMoney(params.finishingCostPerSqM, currency)} / м² (акустик гипрок, 42dB овоз изоляцияси, премиум кафель, ковролан)`
        : `2,950 m² • ${formatMoney(params.finishingCostPerSqM, currency)} / m² (akustik giprok, 42dB ovoz izolyatsiyasi, premium kafel, kovrolan)`,
      color: 'bg-indigo-500',
    },
    {
      title: isCyrl ? '3. Муҳандислик тармоқлари (MEP & Лифтлар)' : '3. Muhandislik tarmoqlari (MEP & Liftlar)',
      amount: results.capexEngineeringMepUSD,
      percent: (results.capexEngineeringMepUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? '3 та тезюрар лифт ($135k), марказий чиллер-фанкойл, 250 кВА генератор, подстанция, ёнғин спринклер'
        : '3 ta tezyurar lift ($135k), markaziy chiller-fankoyl, 250 kVA generator, podstansiya, yong\'in sprinkler',
      color: 'bg-emerald-500',
    },
    {
      title: isCyrl ? '4. Мебел ва жиҳозлар (FF&E - 48 хона + Ресторан)' : '4. Mebel va jihozlar (FF&E - 48 xona + Restoran)',
      amount: results.capexFFEUSD,
      percent: (results.capexFFEUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? `48 та хона жиҳозлари (${formatMoney(params.ffeCostPerRoom, currency)}/хона) + 70 ўринли ресторан, ошхона, зал`
        : `48 ta xona jihozlari (${formatMoney(params.ffeCostPerRoom, currency)}/xona) + 70 o'rinli restoran, oshxona, zal`,
      color: 'bg-amber-500',
    },
    {
      title: isCyrl ? '5. Инвентар ва тўқимачилик (OS&E)' : '5. Inventar va to\'qimachilik (OS&E)',
      amount: results.capexOSEUSD,
      percent: (results.capexOSEUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? '100 койка учун 3 комплектли премиум чойшаб, сочиқлар, халатлар, идиш-товоқ, тозалаш ускуналари'
        : '100 koyka uchun 3 komplektli premium choyshab, sochiqlar, xalatlar, idish-tovoq, tozalash uskunalari',
      color: 'bg-orange-500',
    },
    {
      title: isCyrl ? '6. Ер, коммуникация ва ҳудудни ободонлаштириш' : '6. Yer, kommunikatsiya va hududni obodonlashtirish',
      amount: results.capexLandAndInfraUSD,
      percent: (results.capexLandAndInfraUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? '16 сотих ер инфратузилмаси, газ/сув/канализация тармоқларига уланиш, асфальт автотураргоҳ'
        : '16 sotix yer infratuzilmasi, gaz/suv/kanalizatsiya tarmoqlariga ulanish, asfalt avtoturargoh',
      color: 'bg-cyan-500',
    },
    {
      title: isCyrl ? '7. Лойиҳалаш, экспертиза ва 4★ сертификатлаш' : '7. Loyihalash, ekspertiza va 4★ sertifikatlash',
      amount: results.capexSoftCostsUSD,
      percent: (results.capexSoftCostsUSD / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? 'Архитектура ва муҳандислик лойиҳаси, давлат экспертизаси, муаллифлик назорати, 4 юлдуз сертификацияси'
        : 'Arxitektura va muhandislik loyihasi, davlat ekspertizasi, mualliflik nazorati, 4 yulduz sertifikatsiyasi',
      color: 'bg-purple-500',
    },
    {
      title: isCyrl ? '8. Кутилмаган харажатлар ва айланма маблағ' : '8. Kutilmagan xarajatlar va aylanma mablag\'',
      amount: results.capexContingencyUSD + results.capexWorkingCapitalUSD,
      percent: ((results.capexContingencyUSD + results.capexWorkingCapitalUSD) / results.capexTotalUSD) * 100,
      detail: isCyrl
        ? `7% кутилмаган захира (${formatMoney(results.capexContingencyUSD, currency)}) + 3 ойлик айланма захира`
        : `7% kutilmagan zaxira (${formatMoney(results.capexContingencyUSD, currency)}) + 3 oylik aylanma zaxira`,
      color: 'bg-rose-500',
    },
  ];

  // OPEX Items breakdown
  const opexItems = [
    {
      title: isCyrl ? 'Иш ҳақи фонди (24 нафар штат)' : 'Ish haqi fondi (24 nafar shtat)',
      annual: results.annualPayrollUSD,
      monthly: results.annualPayrollUSD / 12,
      percent: (results.annualPayrollUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? '24 ходим маоши ва ягона ижтимоий тўловлар' : '24 xodim maoshi va yagona ijtimoiy to\'lovlar',
    },
    {
      title: isCyrl ? 'Коммунал тўловлар (электр, газ, сув)' : 'Kommunal to\'lovlar (elektr, gaz, suv)',
      annual: results.annualUtilitiesUSD,
      monthly: results.annualUtilitiesUSD / 12,
      percent: (results.annualUtilitiesUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? 'Ойига ўртача $2,400 (HVAC совитиш/иситиш, ёритиш)' : 'Oyiga o\'rtacha $2,400 (HVAC sovitish/isitish, yoritish)',
    },
    {
      title: isCyrl ? 'Ресторан озиқ-овқат таннархи (F&B)' : 'Restoran oziq-ovqat tannarxi (F&B)',
      annual: results.annualFbCostUSD,
      monthly: results.annualFbCostUSD / 12,
      percent: (results.annualFbCostUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? 'Нонушта ва ресторан маҳсулотлари таннархи (35%)' : 'Nonushta va restoran mahsulotlari tannarxi (35%)',
    },
    {
      title: isCyrl ? 'Маркетинг ва Booking.com 15%' : 'Marketing va Booking.com 15%',
      annual: results.annualMarketingOtaUSD,
      monthly: results.annualMarketingOtaUSD / 12,
      percent: (results.annualMarketingOtaUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? 'ОТА комиссияси ва онлайн рекламалар' : 'OTA komissiyasi va onlayn reklamalar',
    },
    {
      title: isCyrl ? 'Гигиена воситалари ва кимёвий тозалаш' : 'Gigiyena vositalari va kimyoviy tozalash',
      annual: results.annualSuppliesUSD,
      monthly: results.annualSuppliesUSD / 12,
      percent: (results.annualSuppliesUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? 'Банд хоналар гигиенаси, шампун, прачка' : 'Band xonalar gigiyenasi, shampun, prachka',
    },
    {
      title: isCyrl ? 'Жорий таъмир ва янгилаш захираси (4%)' : 'Joriy ta\'mir va yangilash zaxirasi (4%)',
      annual: results.annualMaintenanceUSD,
      monthly: results.annualMaintenanceUSD / 12,
      percent: (results.annualMaintenanceUSD / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? '4-юлдуз сифатини сақлаб туриш фонди' : '4-yulduz sifatini saqlab turish fondi',
    },
    {
      title: isCyrl ? 'Маъмурий, дастурлар ва солиқлар' : 'Ma\'muriy, dasturlar va soliqlar',
      annual: results.annualInsuranceAdminUSD + results.annualTaxesUSD,
      monthly: (results.annualInsuranceAdminUSD + results.annualTaxesUSD) / 12,
      percent: ((results.annualInsuranceAdminUSD + results.annualTaxesUSD) / results.annualTotalOpexUSD) * 100,
      desc: isCyrl ? 'PMS Opera/Bnovo, суғурта ва 4% айланма солиқ' : 'PMS Opera/Bnovo, sug\'urta va 4% aylanma soliq',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Investment (CAPEX) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isCyrl ? 'Жами Инвестиция (CAPEX)' : 'Jami Investitsiya (CAPEX)'}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {formatMoney(results.capexTotalUSD, currency)}
          </div>
          <p className="text-[11px] sm:text-xs text-amber-400/90 mt-1 font-medium">
            {currency === 'UZS'
              ? `${formatMoneyExact(results.capexTotalUSD, 'USD')} (тўлиқ тайёр ҳолатда)`
              : `${formatMoneyExact(results.capexTotalUSD, 'UZS')} га тенг`}
          </p>
          <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{isCyrl ? '1 м² бино:' : '1 m² bino:'}</span>
            <span className="font-semibold text-slate-200">
              {formatMoney(results.capexTotalUSD / params.totalBuildingAreaSqM, currency)}/м²
            </span>
          </div>
        </div>

        {/* Annual Net Profit */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isCyrl ? 'Йиллик Соф Фойда' : 'Yillik Sof Foyda'}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
            {formatMoney(results.netAnnualProfitUSD, currency)}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
            {isCyrl ? 'Рентабеллик: ' : 'Rentabellik: '}
            <span className="text-emerald-400 font-bold">{results.netProfitMargin.toFixed(1)}% маржа</span>
          </p>
          <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{isCyrl ? 'Ойига ўртача:' : 'Oyiga o\'rtacha:'}</span>
            <span className="font-semibold text-emerald-300">
              {formatMoney(results.netAnnualProfitUSD / 12, currency)}/ой
            </span>
          </div>
        </div>

        {/* Payback Period & ROI */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isCyrl ? 'Ўзини Қоплаш' : 'O\'zini Qoplash'}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight flex items-baseline gap-1.5">
            {results.simplePaybackYears.toFixed(1)}
            <span className="text-sm font-semibold text-slate-400">{isCyrl ? 'йил' : 'yil'}</span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
            {isCyrl ? 'ROI: ' : 'ROI: '}
            <span className="text-blue-300 font-bold">{results.roiPercent.toFixed(1)}%</span>
            <span className="text-slate-400 text-[10px]"> • IRR: {results.irrPercent.toFixed(1)}%</span>
          </p>
          <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{isCyrl ? 'Дисконтланган:' : 'Diskontlangan:'}</span>
            <span className="font-semibold text-slate-200">
              {results.discountedPaybackYears.toFixed(1)} {isCyrl ? 'йил' : 'yil'}
            </span>
          </div>
        </div>

        {/* Break-even & Occupancy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isCyrl ? 'Бандлик ва Чизги' : 'Bandlik va Chizgi'}
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 tracking-tight">
            {(params.averageOccupancyRate * 100).toFixed(0)}%
            <span className="text-xs text-slate-400 ml-1 font-normal font-sans">
              ({formatMoney(params.averageDailyRateUSD, currency)})
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
            {isCyrl ? 'Зарарсизлик чегараси: ' : 'Zararsizlik chegarasi: '}
            <span className="text-amber-400 font-bold">{results.breakEvenOccupancyPercent.toFixed(0)}%</span>
          </p>
          <div className="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>RevPAR:</span>
            <span className="font-semibold text-purple-300">{formatMoney(results.revParUSD, currency)} / кеча</span>
          </div>
        </div>
      </div>

      {/* Interactive Parameter Tuner (Control Panel) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                {isCyrl ? 'Интерактив Калькулятор' : 'Interaktiv Kalkulyator'}
              </h3>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isCyrl
                  ? 'Слайдерларни ўзгартиринг — инвестиция ва фойда шу заҳоти қайта ҳисобланади'
                  : 'Slayderlarni o\'zgartiring — investitsiya va foyda shu zahoti qayta hisoblanadi'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 transition cursor-pointer"
          >
            <span>{showAdvancedInputs ? (isCyrl ? 'Ёпиш' : 'Yopish') : (isCyrl ? 'Қўшимча' : 'Qo\'shimcha')}</span>
            {showAdvancedInputs ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          {/* Slider 1: Average Daily Rate (ADR) */}
          <div className="bg-slate-800/60 p-3 sm:p-3.5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-medium">
                {isCyrl ? 'Кунлик нарх (ADR):' : 'Kunlik narx (ADR):'}
              </span>
              <span className="text-amber-400 font-bold text-sm">
                {formatMoney(params.averageDailyRateUSD, currency)}
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={params.averageDailyRateUSD}
              onChange={(e) => onUpdateParams({ averageDailyRateUSD: Number(e.target.value) })}
              className="w-full accent-amber-500 cursor-pointer h-3 sm:h-2 bg-slate-700 rounded-lg touch-manipulation"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>$40</span>
              <span>$65 (4★ Стандарт)</span>
              <span>$120</span>
            </div>
          </div>

          {/* Slider 2: Average Occupancy */}
          <div className="bg-slate-800/60 p-3 sm:p-3.5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-medium">
                {isCyrl ? 'Ўртача бандлик:' : 'O\'rtacha bandlik:'}
              </span>
              <span className="text-emerald-400 font-bold text-sm">
                {(params.averageOccupancyRate * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.40"
              max="0.90"
              step="0.02"
              value={params.averageOccupancyRate}
              onChange={(e) => onUpdateParams({ averageOccupancyRate: Number(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer h-3 sm:h-2 bg-slate-700 rounded-lg touch-manipulation"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>40%</span>
              <span>68% (Реал)</span>
              <span>90%</span>
            </div>
          </div>

          {/* Slider 3: Construction Cost per sq.m */}
          <div className="bg-slate-800/60 p-3 sm:p-3.5 rounded-xl border border-slate-700/60">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-medium">
                {isCyrl ? 'Қурилиш (1 м²):' : 'Qurilish (1 m²):'}
              </span>
              <span className="text-blue-400 font-bold text-sm">
                {formatMoney(params.constructionCostPerSqM, currency)}/м²
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="900"
              step="20"
              value={params.constructionCostPerSqM}
              onChange={(e) => onUpdateParams({ constructionCostPerSqM: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer h-3 sm:h-2 bg-slate-700 rounded-lg touch-manipulation"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>$400/м²</span>
              <span>$520/м²</span>
              <span>$900/м²</span>
            </div>
          </div>
        </div>

        {/* Advanced Parameter Controls */}
        {showAdvancedInputs && (
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              <label className="text-[10px] text-slate-300 block mb-1">
                {isCyrl ? 'Пардозлаш (1 м²):' : 'Pardozlash (1 m²):'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={params.finishingCostPerSqM}
                  onChange={(e) => onUpdateParams({ finishingCostPerSqM: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-semibold"
                />
                <span className="text-[10px] text-slate-400">$/м²</span>
              </div>
            </div>

            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              <label className="text-[10px] text-slate-300 block mb-1">
                {isCyrl ? '1 хона мебел (FF&E):' : '1 xona mebel (FF&E):'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={params.ffeCostPerRoom}
                  onChange={(e) => onUpdateParams({ ffeCostPerRoom: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-semibold"
                />
                <span className="text-[10px] text-slate-400">$</span>
              </div>
            </div>

            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              <label className="text-[10px] text-slate-300 block mb-1">
                {isCyrl ? 'Штат (ходимлар):' : 'Shtat (xodimlar):'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={params.staffCount}
                  onChange={(e) => onUpdateParams({ staffCount: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-semibold"
                />
                <span className="text-[10px] text-slate-400">{isCyrl ? 'киши' : 'kishi'}</span>
              </div>
            </div>

            <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              <label className="text-[10px] text-slate-300 block mb-1">
                {isCyrl ? 'Ўртача маош:' : 'O\'rtacha maosh:'}
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={params.avgMonthlySalaryUSD}
                  onChange={(e) => onUpdateParams({ avgMonthlySalaryUSD: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-semibold"
                />
                <span className="text-[10px] text-slate-400">$/oy</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs: CAPEX Breakdown / OPEX Breakdown / 10-Year Projections */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Tab Controls (Horizontally scrollable on mobile) */}
        <div className="border-b border-slate-800 flex overflow-x-auto no-scrollbar bg-slate-950/50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('capex')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'capex'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>CAPEX (Қурилиш)</span>
          </button>

          <button
            onClick={() => setActiveTab('opex')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'opex'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>OPEX (Харажатлар)</span>
          </button>

          <button
            onClick={() => setActiveTab('cashflow')}
            className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
              activeTab === 'cashflow'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>10-Йиллик Оқим</span>
          </button>
        </div>

        <div className="p-3.5 sm:p-6">
          {/* TAB 1: CAPEX Smetasi */}
          {activeTab === 'capex' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {isCyrl
                      ? '4★ Меҳмонхона Қурилиши учун Тўлиқ Инвестиция Сметаси'
                      : '4★ Mehmonxona Qurilishi uchun To\'liq Investitsiya Smetasi'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {isCyrl
                      ? '4 қават • 2,950 м² майдон • 100 койка (48 хона) • Ресторан ва СПА'
                      : '4 qavat • 2,950 m² maydon • 100 koyka (48 xona) • Restoran va SPA'}
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] sm:text-xs text-slate-400 block">{isCyrl ? 'Жами CAPEX:' : 'Jami CAPEX:'}</span>
                  <span className="text-lg sm:text-2xl font-black text-amber-400">
                    {formatMoney(results.capexTotalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Progress Bar of CAPEX Distribution */}
              <div className="w-full h-2.5 rounded-full bg-slate-800 flex overflow-hidden">
                {capexItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percent}%` }}
                    className={`${item.color} h-full transition-all duration-300`}
                  />
                ))}
              </div>

              {/* Mobile Card List View for Smartphones (Easy vertical scrolling) */}
              <div className="block sm:hidden space-y-2.5">
                {capexItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        {item.percent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-slate-400 line-clamp-1">{item.detail}</span>
                      <span className="font-mono font-bold text-amber-300 shrink-0 ml-2">
                        {formatMoney(item.amount, currency)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between font-bold text-xs text-white">
                  <span>ЖАМИ КАПИТАЛ (CAPEX)</span>
                  <span className="font-mono text-amber-400 text-sm">{formatMoney(results.capexTotalUSD, currency)}</span>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3">{isCyrl ? 'Харажат Босқичи' : 'Xarajat Bosqichi'}</th>
                      <th className="py-3 px-3">{isCyrl ? 'Тафсилот ва Стандарт' : 'Tafsilot va Standart'}</th>
                      <th className="py-3 px-3 text-right">{isCyrl ? 'Улуш %' : 'Ulush %'}</th>
                      <th className="py-3 px-3 text-right">{isCyrl ? 'Сумма' : 'Summa'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {capexItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                            {item.title}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-300 text-[11px]">{item.detail}</td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-400">
                          {item.percent.toFixed(1)}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-amber-300 whitespace-nowrap">
                          {formatMoney(item.amount, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-700 bg-slate-800/40 font-bold text-white">
                      <td className="py-3.5 px-3" colSpan={2}>
                        {isCyrl ? 'ЖАМИ ИНВЕСТИЦИЯ МИҚДОРИ (CAPEX TOTAL)' : 'JAMI INVESTITSIYA MIQDORI (CAPEX TOTAL)'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono">100.0%</td>
                      <td className="py-3.5 px-3 text-right font-mono text-base text-amber-400 whitespace-nowrap">
                        {formatMoney(results.capexTotalUSD, currency)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: OPEX & REVENUE */}
          {activeTab === 'opex' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-800">
                <div className="bg-slate-800/40 p-3 sm:p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] sm:text-xs text-slate-400 block mb-1">
                    {isCyrl ? 'Йиллик Ялпи Тушум:' : 'Yillik Yalpi Tushum:'}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-400">
                    {formatMoney(results.annualGrossRevenueUSD, currency)}
                  </span>
                </div>

                <div className="bg-slate-800/40 p-3 sm:p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] sm:text-xs text-slate-400 block mb-1">
                    {isCyrl ? 'Йиллик Харажат (OPEX):' : 'Yillik Xarajat (OPEX):'}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-rose-400">
                    {formatMoney(results.annualTotalOpexUSD, currency)}
                  </span>
                </div>

                <div className="bg-slate-800/40 p-3 sm:p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] sm:text-xs text-slate-400 block mb-1">
                    {isCyrl ? 'Йиллик Соф Фойда:' : 'Yillik Sof Foyda:'}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-amber-400">
                    {formatMoney(results.netAnnualProfitUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Mobile Card List for OPEX */}
              <div className="block sm:hidden space-y-2.5">
                {opexItems.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{item.title}</span>
                      <span className="font-mono text-[11px] text-slate-400">{item.percent.toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 text-xs">
                      <span className="text-slate-400 font-mono">{formatMoney(item.monthly, currency)}/ой</span>
                      <span className="font-bold text-slate-100 font-mono">{formatMoney(item.annual, currency)}/йил</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-3">{isCyrl ? 'Харажат Моддаси' : 'Xarajat Moddasi'}</th>
                      <th className="py-3 px-3">{isCyrl ? 'Тавсифи' : 'Tavsifi'}</th>
                      <th className="py-3 px-3 text-right">{isCyrl ? 'Ойига' : 'Oyiga'}</th>
                      <th className="py-3 px-3 text-right">{isCyrl ? 'Йилига' : 'Yiliga'}</th>
                      <th className="py-3 px-3 text-right">{isCyrl ? 'Улуш' : 'Ulush'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {opexItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3 font-semibold text-white">{item.title}</td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">{item.desc}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300 whitespace-nowrap">
                          {formatMoney(item.monthly, currency)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-100 whitespace-nowrap">
                          {formatMoney(item.annual, currency)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-400">
                          {item.percent.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-700 bg-slate-800/40 font-bold text-white">
                      <td className="py-3.5 px-3" colSpan={2}>
                        {isCyrl ? 'ЖАМИ ЭКСПЛУАТАЦИЯ ХАРАЖАТИ (ЙИЛИГА)' : 'JAMI EKSPLUATATSIYA XARAJATI (YILIGA)'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300 whitespace-nowrap">
                        {formatMoney(results.annualTotalOpexUSD / 12, currency)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-base text-rose-400 whitespace-nowrap">
                        {formatMoney(results.annualTotalOpexUSD, currency)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono">100.0%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: 10-YEAR CASH FLOW FORECAST */}
          {activeTab === 'cashflow' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {isCyrl ? '10 Йиллик Пул Оқими (Cash Flow)' : '10 Yillik Pul Oqimi (Cash Flow)'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {isCyrl ? `Тўлиқ қоплаш: ${results.simplePaybackYears.toFixed(1)} йилда` : `To'liq qoplash: ${results.simplePaybackYears.toFixed(1)} yilda`}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                  <span>{isCyrl ? 'Капитални қайтариш графиги:' : 'Kapitalni qaytarish grafigi:'}</span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    -{formatMoney(results.capexTotalUSD, currency)}
                  </span>
                </div>

                <div className="h-36 sm:h-44 flex items-end gap-1.5 sm:gap-2 pt-4 pb-2 border-b border-slate-700">
                  {results.cashFlowYears.map((yr) => {
                    const isPositive = yr.cumulativeCashFlow >= 0;
                    const maxVal = Math.max(results.capexTotalUSD, results.cashFlowYears[9].cumulativeCashFlow, 1);
                    const heightPercent = Math.min(100, (Math.abs(yr.cumulativeCashFlow) / maxVal) * 90);

                    return (
                      <div key={yr.year} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          style={{ height: `${Math.max(10, heightPercent)}%` }}
                          className={`w-full rounded-t-sm transition-all ${
                            isPositive ? 'bg-emerald-500' : 'bg-rose-500/80'
                          }`}
                        />
                        <span className="text-[9px] sm:text-[10px] text-slate-400 mt-1 font-semibold">{yr.year}-й</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-2 px-2">{isCyrl ? 'Йил' : 'Yil'}</th>
                      <th className="py-2 px-2 text-right">ADR</th>
                      <th className="py-2 px-2 text-right">{isCyrl ? 'Тушум' : 'Tushum'}</th>
                      <th className="py-2 px-2 text-right text-emerald-400">{isCyrl ? 'Соф Фойда' : 'Sof Foyda'}</th>
                      <th className="py-2 px-2 text-right">{isCyrl ? 'Баланс' : 'Balans'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {results.cashFlowYears.map((yr) => (
                      <tr key={yr.year} className="hover:bg-slate-800/40 transition">
                        <td className="py-2 px-2 font-bold text-white font-sans">{yr.year}-йил</td>
                        <td className="py-2 px-2 text-right text-slate-300">{formatMoney(yr.adr, currency)}</td>
                        <td className="py-2 px-2 text-right text-slate-200">{formatMoney(yr.grossRevenue, currency)}</td>
                        <td className="py-2 px-2 text-right font-bold text-emerald-400">
                          {formatMoney(yr.netProfit, currency)}
                        </td>
                        <td
                          className={`py-2 px-2 text-right font-bold ${
                            yr.cumulativeCashFlow >= 0 ? 'text-emerald-300' : 'text-rose-400'
                          }`}
                        >
                          {formatMoney(yr.cumulativeCashFlow, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
