import React, { useState } from 'react';
import { Bed, Users, Shield, Tv, Sparkles, Check, Info, Maximize } from 'lucide-react';
import { Currency, Language, RoomConfig } from '../types/hotel';
import { HOTEL_ROOMS, formatMoney } from '../utils/calculations';

interface RoomInventoryProps {
  language: Language;
  currency: Currency;
}

export const RoomInventory: React.FC<RoomInventoryProps> = ({ language, currency }) => {
  const isCyrl = language === 'uz_cyrl';
  const [selectedRoom, setSelectedRoom] = useState<RoomConfig>(HOTEL_ROOMS[0]);

  const totalBeds = HOTEL_ROOMS.reduce((sum, r) => sum + r.totalBeds, 0);
  const totalRooms = HOTEL_ROOMS.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isCyrl ? '100 ТА КОЙКА (ЎРИН) • 48 ХОНА' : '100 TA KOYKA (O\'RIN) • 48 XONA'}
              </span>
              <span className="text-xs text-slate-400">
                {isCyrl ? '4 Юлдузли Меҳмонхона Хоналар Фонди' : '4 Yulduzli Mehmonxona Xonalar Fondi'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              {isCyrl ? 'Хоналар Тоифалари ва 4★ Жиҳозланиш Стандартлари' : 'Xonalar Toifalari va 4★ Jihozlanish Standartlari'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isCyrl
                ? 'Барча хоналар халқаро 4-юлдуз стандарти талабларига кўра камида 26-56 м² майдонга эга, овоз изоляцияси (42dB), индивидуал иқлим тизими ва ортопедик кароватлар билан жиҳозланади.'
                : 'Barcha xonalar xalqaro 4-yulduz standarti talablariga ko\'ra kamida 26-56 m² maydonga ega, ovoz izolyatsiyasi (42dB), individual iqlim tizimi va ortopedik karavotlar bilan jihozlanadi.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/90 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{isCyrl ? 'Жами Ўрин' : 'Jami O\'rin'}</span>
              <span className="text-2xl font-black text-amber-400">{totalBeds} та койка</span>
            </div>
            <div className="bg-slate-800/90 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{isCyrl ? 'Хоналар' : 'Xonalar'}</span>
              <span className="text-2xl font-black text-emerald-400">{totalRooms} та хона</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HOTEL_ROOMS.map((room) => {
          const isSelected = selectedRoom.id === room.id;
          return (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/95 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {room.floor}-{isCyrl ? 'Қават' : 'Qavat'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <Bed className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {room.bedsPerRoom} {isCyrl ? 'койка' : 'koyka'} / {room.count} {isCyrl ? 'хона' : 'xona'}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {isCyrl ? room.name : room.nameLatn}
                </h3>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                  {isCyrl ? room.description : room.descriptionLatn}
                </p>

                {/* Features chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.features.slice(0, 4).map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {isCyrl ? 'Майдон / Нарх:' : 'Maydon / Narx:'}
                  </span>
                  <span className="font-bold text-white">
                    {room.areaSqM} м² • {formatMoney(room.basePriceUSD, currency)}/сутка
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-medium">
                    {isCyrl ? 'Жами койкалар:' : 'Jami koykalar:'}
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {room.totalBeds} та ўрин
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Room Detailed Spec Sheet (4-Star Fit-out) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block mb-1">
              {isCyrl ? '4★ ЖИҲОЗЛАНИШ ВА МЕБЕЛ ТАСНИФИ (FF&E СПЕЦИФИКАЦИЯСИ)' : '4★ JIHOZLANISH VA MEBEL TASNIFI (FF&E SPETSIFIKATSIYASI)'}
            </span>
            <h3 className="text-lg font-bold text-white">
              {isCyrl ? selectedRoom.name : selectedRoom.nameLatn}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              {isCyrl ? 'Хоналар сони:' : 'Xonalar soni:'} <strong className="text-white">{selectedRoom.count} та</strong>
            </span>
            <span className="text-xs text-slate-400">
              {isCyrl ? 'Умумий ўринлар:' : 'Umumiy o\'rinlar:'} <strong className="text-emerald-400">{selectedRoom.totalBeds} та</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {/* Column 1: Sleep & Comfort */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
              <Bed className="w-4 h-4" />
              <span>{isCyrl ? 'Уйқу ва Мебел (4★)' : 'Uyqu va Mebel (4★)'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>32 см премиум мустақил пружинали ортопедик матрас</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Ёғоч каркасли бошлиқ, 2 та тумбочка, бра чироқлари</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Иш столи, эргономик кресло, гардероб шкафи ва ойна</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Юз фоиз ёруғлик ўтказмайдиган Blackout пардалар</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Tech & Electronics */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wide">
              <Tv className="w-4 h-4" />
              <span>{isCyrl ? 'Техника ва Электроника' : 'Texnika va Elektronika'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>43"-55" 4K Smart TV меҳмонхона IPTV тизими билан</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Шовқинсиз мини-бар (абсорбцион совутгич)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>15 дюймли ноутбук сиғадиган электрон сейф</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>RFID карта-қулф ва Master Switch энерготежам тизими</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Bathroom & Amenities */}
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>{isCyrl ? 'Санузел ва Пардоз' : 'Sanuzel va Pardoz'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Тропик душ (Rain Shower) ва Grohe/Hansgrohe сантехникаси</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Иситиладиган пол, буғланмайдиган LED ойна, фен (1800W)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Люкс пахта халатлар, бир марталик шиппаклар ва косметика тўплами</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Сув тошқинига қарши автоматик трап ва соч тутгич</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
