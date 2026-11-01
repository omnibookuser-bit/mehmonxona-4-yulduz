import React from 'react';
import { Star, ShieldCheck, CheckCircle2, AlertTriangle, FileCheck, Award, Zap, Droplets, Building2 } from 'lucide-react';
import { Language } from '../types/hotel';
import { FOUR_STAR_STANDARDS } from '../utils/calculations';

interface FourStarStandardsProps {
  language: Language;
}

export const FourStarStandards: React.FC<FourStarStandardsProps> = ({ language }) => {
  const isCyrl = language === 'uz_cyrl';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4★ МЕҲМОНХОНА ДАВЛАТ СТАНДАРТИ</span>
              </span>
              <span className="text-xs text-slate-400">
                O'zDSt 3220 & Hotelstars Union
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              {isCyrl ? '4 Юлдуз Сертификатини Олиш учун Мажбурий Талаблар' : '4 Yulduz Sertifikatini Olish uchun Majburiy Talablar'}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              {isCyrl
                ? 'Ушбу лойиҳа Туризм қўмитаси ва Халқаро меҳмонхоналар ассоциацияси талабларига 100% мувофиқлаштирилган. Лойиҳа қурилиб битказилгач, 4 юлдуз сертификати тўсиқсиз берилади.'
                : 'Ushbu loyiha Turizm qo\'mitasi va Xalqaro mehmonxonalar assotsiatsiyasi talablariga 100% muvofiqlashtirilgan. Loyiha qurilib bitkazilgach, 4 yulduz sertifikati to\'siqsiz beriladi.'}
            </p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 uppercase font-bold block">
                {isCyrl ? 'Мувофиқлик Даражаси' : 'Muvofiqlik Darajasi'}
              </span>
              <span className="text-base font-black text-white">100% Тасдиқланган</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Infrastructure Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pillar 1: Backup Power */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Zap className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">{isCyrl ? '100% Захира Электр' : '100% Zaxira Elektr'}</h4>
          </div>
          <p className="text-xs text-slate-300">
            {isCyrl
              ? '250 кВА автоматик дизель генератори — шаҳар тармоғи ўчганда 15 сонияда бутун бинони (лифт, кондиционер, ёритиш) таъминлайди.'
              : '250 kVA avtomatik dizel generatori — shahar tarmog\'i o\'chganda 15 soniyada butun binoni (lift, konditsioner, yoritish) ta\'minlaydi.'}
          </p>
        </div>

        {/* Pillar 2: Water Autonomy */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <Droplets className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">{isCyrl ? '48 Соатлик Сув Захираси' : '48 Soatlik Suv Zaxirasi'}</h4>
          </div>
          <p className="text-xs text-slate-300">
            {isCyrl
              ? '40 м³ ер ости ичимлик сув резервуари ва частотали насос станцияси — шаҳар суви ўчса ҳам меҳмонлар 2 сутка узлуксиз таъминланади.'
              : '40 m³ yer osti ichimlik suv rezervuari va chastotali nasos stansiyasi — shahar suvi o\'chsa ham mehmonlar 2 sutka uzluksiz ta\'minlanadi.'}
          </p>
        </div>

        {/* Pillar 3: Vertical Transportation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Building2 className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">{isCyrl ? '3 Та Тезюрар Лифт' : '3 Ta Tezyurar Lift'}</h4>
          </div>
          <p className="text-xs text-slate-300">
            {isCyrl
              ? '2 та 1000 кг люкс йўловчи лифти + 1 та алоҳида хизматчи/юк лифти. Меҳмон ва хизматчи йўллари 100% ажратилган.'
              : '2 ta 1000 kg lyuks yo\'lovchi lifti + 1 ta alohida xizmatchi/yuk lifti. Mehmon va xizmatchi yo\'llari 100% ajratilgan.'}
          </p>
        </div>

        {/* Pillar 4: Fire & Safety */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <ShieldCheck className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">{isCyrl ? 'Тўлиқ Ёнғин Хавфсизлиги' : 'To\'liq Yong\'in Xavfsizligi'}</h4>
          </div>
          <p className="text-xs text-slate-300">
            {isCyrl
              ? 'Автоматик спринклер тизими, тутун датчиклари, тутун чиқариш шахталари ва 2 та тутунсиз эвакуация зинапояси.'
              : 'Avtomatik sprinkler tizimi, tutun datchiklari, tutun chiqarish shaxtalari va 2 ta tutunsiz evakuatsiya zinapoyasi.'}
          </p>
        </div>
      </div>

      {/* Detailed Standards Audit Groups */}
      <div className="space-y-5">
        {FOUR_STAR_STANDARDS.map((group, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              {isCyrl ? group.category : group.categoryLatn}
            </h3>

            <div className="divide-y divide-slate-800/80">
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {isCyrl ? item.rule : item.ruleLatn}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <span className="self-start sm:self-center text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    {isCyrl ? 'Стандартга мос' : 'Standartga mos'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
