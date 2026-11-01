import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Building,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Currency, FinancialParameters, FinancialResults, Language } from '../types/hotel';
import { formatMoney, formatMoneyExact } from '../utils/calculations';

interface InvestorMemorandumProps {
  language: Language;
  currency: Currency;
  results: FinancialResults;
  params: FinancialParameters;
  onPrint: () => void;
  hotelName: string;
}

export const InvestorMemorandum: React.FC<InvestorMemorandumProps> = ({
  language,
  currency,
  results,
  params,
  onPrint,
  hotelName,
}) => {
  const isCyrl = language === 'uz_cyrl';
  const [copied, setCopied] = useState(false);

  const handleCopyExcelData = () => {
    const lines = [
      `${hotelName} - INVESTITSIYA VA MOLIYAVIY HISOBOT`,
      'Parametr\tQiymat',
      `Qavatlar soni\t4 qavat`,
      `Koykalar soni\t100 ta`,
      `Xonalar soni\t48 ta`,
      `Bino umumiy maydoni\t${params.totalBuildingAreaSqM} m2`,
      `Yer maydoni\t${params.landAreaSotix} sotix`,
      `Jami CAPEX (Investitsiya)\t${results.capexTotalUSD.toFixed(0)} USD`,
      `Bino qurilish smetasi\t${results.capexBuildingUSD.toFixed(0)} USD`,
      `Pardozlash smetasi\t${results.capexFinishingUSD.toFixed(0)} USD`,
      `Injenerlik (MEP)\t${results.capexEngineeringMepUSD.toFixed(0)} USD`,
      `Mebel va jihozlar (FF&E)\t${results.capexFFEUSD.toFixed(0)} USD`,
      `Kutilmagan xarajatlar\t${results.capexContingencyUSD.toFixed(0)} USD`,
      `O'rtacha kunlik narx (ADR)\t${params.averageDailyRateUSD} USD`,
      `O'rtacha yillik bandlik\t${(params.averageOccupancyRate * 100).toFixed(0)}%`,
      `Yillik yalpi daromad\t${results.annualGrossRevenueUSD.toFixed(0)} USD`,
      `Yillik OPEX (xarajatlar)\t${results.annualTotalOpexUSD.toFixed(0)} USD`,
      `Yillik sof foyda (EBITDA)\t${results.netAnnualProfitUSD.toFixed(0)} USD`,
      `Oddiy o'zini qoplash muddati\t${results.simplePaybackYears.toFixed(1)} yil`,
      `Diskontlangan qoplash muddati\t${results.discountedPaybackYears.toFixed(1)} yil`,
      `ROI (Investitsiya rentabelligi)\t${results.roiPercent.toFixed(1)}%`,
      `IRR (Ichki daromadlilik)\t${results.irrPercent.toFixed(1)}%`,
    ];

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            {isCyrl ? 'РАСМИЙ ИНВЕСТИЦИОН МЕМОРАНДУМ' : 'RASMIY INVESTITSION MEMORANDUM'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            {isCyrl ? 'Инвестор ва Таъсисчилар учун Хулоса Ҳужжати' : 'Investor va Ta\'sischilar uchun Xulosa Hujjati'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isCyrl
              ? 'Лойиҳа паспорти, инвестиция ҳажми, рентабеллик кўрсаткичлари ва асосий хавфлар таҳлили'
              : 'Loyiha pasporti, investitsiya hajmi, rentabellik ko\'rsatkichlari va asosiy xavflar tahlili'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyExcelData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? (isCyrl ? 'Нусхаланди!' : 'Nusxalandi!') : (isCyrl ? 'Excel учун нусхалаш' : 'Excel uchun nusxalash')}</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isCyrl ? 'Чоп этиш / PDF Экспорт' : 'Chop etish / PDF Eksport'}</span>
          </button>
        </div>
      </div>

      {/* Official Executive Memorandum Document (Printable layout) */}
      <div id="print-area" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl text-slate-200">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-extrabold text-xl tracking-tight font-['Space_Grotesk']">
                {hotelName}
              </span>
              <span className="text-xs text-amber-400">★★★★</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-400 mt-1">
              {isCyrl
                ? 'Техник-иқтисодий асослаш ва инвестиция ажратиш хулосаси'
                : 'Texnik-iqtisodiy asoslash va investitsiya ajratish xulosasi'}
            </h3>
          </div>
          <div className="text-right text-xs text-slate-400 font-mono">
            <div>{isCyrl ? 'Ҳужжат санаси:' : 'Hujjat sanasi:'} 2026-йил</div>
            <div className="text-emerald-400 font-bold">{isCyrl ? 'Лойиҳа ҳолати: ТАЙЁР' : 'Loyiha holati: TAYYOR'}</div>
          </div>
        </div>

        {/* Section 1: Project Passport */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4" />
            {isCyrl ? '1. Лойиҳанинг Асосий Техник Паспорти' : '1. Loyihaning Asosiy Texnik Pasporti'}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">{isCyrl ? 'Қаватлар сони:' : 'Qavatlar soni:'}</span>
              <strong className="text-white text-sm">4 Қават (+ тех.ертўла)</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">{isCyrl ? 'Жами ўринлар (койка):' : 'Jami o\'rinlar (koyka):'}</span>
              <strong className="text-emerald-400 text-sm">100 та койка</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">{isCyrl ? 'Хоналар сони:' : 'Xonalar soni:'}</span>
              <strong className="text-blue-400 text-sm">48 та меҳмон хонаси</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[11px]">{isCyrl ? 'Бино умумий майдони:' : 'Bino umumiy maydoni:'}</span>
              <strong className="text-white text-sm">{params.totalBuildingAreaSqM} м² (GFA)</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Key Figures */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            {isCyrl ? '2. Инвестиция Ҳажми ва Молиявий Самарадорлик' : '2. Investitsiya Hajmi va Moliyaviy Samaradorlik'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-semibold">
                {isCyrl ? 'Керак бўлган инвестиция (CAPEX):' : 'Kerak bo\'lgan investitsiya (CAPEX):'}
              </span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {formatMoney(results.capexTotalUSD, currency)}
              </div>
              <p className="text-[11px] text-slate-400">
                {isCyrl
                  ? 'Бино қурилиши, 4* пардозлаш, MEP, лифтлар, мебел ва жиҳозлаш билан'
                  : 'Bino qurilishi, 4* pardozlash, MEP, liftlar, mebel va jihozlash bilan'}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-semibold">
                {isCyrl ? 'Йиллик соф фойда (EBITDA):' : 'Yillik sof foyda (EBITDA):'}
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {formatMoney(results.netAnnualProfitUSD, currency)}
              </div>
              <p className="text-[11px] text-slate-400">
                {isCyrl
                  ? `Ялпи тушум: ${formatMoney(results.annualGrossRevenueUSD, currency)} • Маржа: ${results.netProfitMargin.toFixed(1)}%`
                  : `Yalpi tushum: ${formatMoney(results.annualGrossRevenueUSD, currency)} • Marja: ${results.netProfitMargin.toFixed(1)}%`}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block font-semibold">
                {isCyrl ? 'Ўзини оқлаш муддати (Payback):' : 'O\'zini oqlash muddati (Payback):'}
              </span>
              <div className="text-2xl font-black text-blue-400 font-mono flex items-baseline gap-1">
                {results.simplePaybackYears.toFixed(1)} {isCyrl ? 'йил' : 'yil'}
              </div>
              <p className="text-[11px] text-slate-400">
                ROI: <strong className="text-white">{results.roiPercent.toFixed(1)}%</strong> • IRR: <strong className="text-white">{results.irrPercent.toFixed(1)}%</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Exact Capital Allocation Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {isCyrl ? '3. Пулни Ажратиш Бўйича Аниқ Смета (Тақсимот)' : '3. Pulni Ajratish Bo\'yicha Aniq Smeta (Taqsimot)'}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">№</th>
                  <th className="py-2.5 px-3">{isCyrl ? 'Йўналиш (Босқич)' : 'Yo\'nalish (Bosqich)'}</th>
                  <th className="py-2.5 px-3 text-right">{isCyrl ? 'Сумма (USD)' : 'Summa (USD)'}</th>
                  <th className="py-2.5 px-3 text-right">{isCyrl ? 'Сумма (Сўм)' : 'Summa (So\'m)'}</th>
                  <th className="py-2.5 px-3 text-right">{isCyrl ? 'Улуш' : 'Ulush'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                <tr>
                  <td className="py-2 px-3 text-slate-400">1</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Қурилиш-монтаж (каркас, том, фасад)' : 'Qurilish-montaj (karkas, tom, fasad)'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexBuildingUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexBuildingUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexBuildingUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">2</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Ички пардозлаш (4★ акустика ва стандарт)' : 'Ichki pardozlash (4★ akustika va standart)'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexFinishingUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexFinishingUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexFinishingUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">3</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Муҳандислик тармоқлари (HVAC, 3 та лифт, генератор)' : 'Muhandislik tarmoqlari (HVAC, 3 ta lift, generator)'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexEngineeringMepUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexEngineeringMepUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexEngineeringMepUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">4</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Мебел ва жиҳозлаш (FF&E - 48 хона, ресторан)' : 'Mebel va jihozlash (FF&E - 48 xona, restoran)'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexFFEUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexFFEUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexFFEUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">5</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Инвентар ва тўқимачилик (OS&E)' : 'Inventar va to\'qimachilik (OS&E)'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexOSEUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexOSEUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexOSEUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">6</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Ер инфратузилмаси ва ташқи тармоқлар' : 'Yer infratuzilmasi va tashqi tarmoqlar'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexLandAndInfraUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexLandAndInfraUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexLandAndInfraUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">7</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Лойиҳалаш, экспертиза ва лицензиялар' : 'Loyihalash, ekspertiza va litsenziyalar'}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexSoftCostsUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexSoftCostsUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{((results.capexSoftCostsUSD / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-slate-400">8</td>
                  <td className="py-2 px-3 font-medium text-white">{isCyrl ? 'Кутилмаган харажатлар захираси ва айланма маблағ' : 'Kutilmagan xarajatlar zaxirasi va aylanma mablag\''}</td>
                  <td className="py-2 px-3 text-right font-mono">{formatMoneyExact(results.capexContingencyUSD + results.capexWorkingCapitalUSD, 'USD')}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-300">{formatMoney(results.capexContingencyUSD + results.capexWorkingCapitalUSD, 'UZS')}</td>
                  <td className="py-2 px-3 text-right font-mono">{(((results.capexContingencyUSD + results.capexWorkingCapitalUSD) / results.capexTotalUSD) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-950 font-bold border-t border-slate-700 text-white">
                <tr>
                  <td className="py-3 px-3" colSpan={2}>{isCyrl ? 'ЖАМИ ИНВЕСТИЦИЯ БЮДЖЕТИ' : 'JAMI INVESTITSIYA BYUDJETI'}</td>
                  <td className="py-3 px-3 text-right font-mono text-amber-400 text-sm">{formatMoneyExact(results.capexTotalUSD, 'USD')}</td>
                  <td className="py-3 px-3 text-right font-mono text-amber-400 text-sm">{formatMoneyExact(results.capexTotalUSD, 'UZS')}</td>
                  <td className="py-3 px-3 text-right font-mono">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section 4: Risk Mitigation & Recommendations */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            {isCyrl ? '4. Хавфлар Таҳлили ва Инвестор учун Тавсиялар' : '4. Xavflar Tahlili va Investor uchun Tavsiyalar'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300">{isCyrl ? 'Мавсумийлик (Сезонность) хавфи:' : 'Mavsumiylik (Sezonnost) xavfi:'}</span>
              <p className="text-slate-400">
                {isCyrl
                  ? 'Баҳор ва куз туризм мавсумида бандлик 85-90% га етади, қишда 45-50% га тушиши мумкин. Зарарсизлик чегараси (34%) паст бўлгани боис қиш ойларида ҳам меҳмонхона зарарга кирмайди.'
                  : 'Bahor va kuz turizm mavsumida bandlik 85-90% ga yetadi, qishda 45-50% ga tushishi mumkin. Zararsizlik chegarasi (34%) past bo\'lgani bois qish oylarida ham mehmonxona zararga kirmaydi.'}
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-300">{isCyrl ? 'Пулни босқичма-босқич ажратиш:' : 'Pulni bosqichma-bosqich ajratish:'}</span>
              <p className="text-slate-400">
                {isCyrl
                  ? 'Маблағни бирданига эмас, 3 босқичда ажратиш тавсия этилади: 1-босқич (бино каркаси ва томи 40%), 2-босқич (инженерлик ва пардозлаш 35%), 3-босқич (мебел ва очилиш 25%).'
                  : 'Mablag\'ni birdaniga emas, 3 bosqichda ajratish tavsiya etiladi: 1-bosqich (bino karkasi va tomi 40%), 2-bosqich (injenerlik va pardozlash 35%), 3-bosqich (mebel va ochilish 25%).'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
