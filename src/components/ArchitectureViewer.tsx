import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  Compass,
  VolumeX,
  Wind,
  ShieldCheck,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { Currency, FloorData, Language } from '../types/hotel';
import { HOTEL_FLOORS } from '../utils/calculations';

interface ArchitectureViewerProps {
  language: Language;
  currency: Currency;
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ language, currency }) => {
  const isCyrl = language === 'uz_cyrl';
  const [selectedFloorNum, setSelectedFloorNum] = useState<number>(1);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const currentFloor: FloorData =
    HOTEL_FLOORS.find((f) => f.floorNumber === selectedFloorNum) || HOTEL_FLOORS[0];

  const selectedZone = currentFloor.zones.find((z) => z.id === selectedZoneId) || currentFloor.zones[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isCyrl ? '4 ҚАВАТЛИ МЕЪМОРИЙ ЛОЙИҲА' : '4 QAVATLI ME\'MORIY LOYIHA'}
              </span>
              <span className="text-[11px] text-slate-400">
                2,950 м²
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">
              {isCyrl ? 'Қаватлар Архитектураси ва Чизмалари' : 'Qavatlar Arxitekturasi va Chizmalari'}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              {isCyrl
                ? '4 қават • 100 койка • 3 та лифт • Овоз изоляцияси (42dB) • Алоҳида оқимлар'
                : '4 qavat • 100 koyka • 3 ta lift • Ovoz izolyatsiyasi (42dB) • Alohida oqimlar'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 shrink-0">
            <div className="bg-slate-800/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-700 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold block">
                {isCyrl ? 'Қаватлар' : 'Qavatlar'}
              </span>
              <span className="text-sm sm:text-lg font-black text-amber-400">4 Қават</span>
            </div>
            <div className="bg-slate-800/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-700 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold block">
                {isCyrl ? 'Жами Ўрин' : 'Jami O\'rin'}
              </span>
              <span className="text-sm sm:text-lg font-black text-emerald-400">100 Койка</span>
            </div>
            <div className="bg-slate-800/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-700 text-center">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold block">
                {isCyrl ? 'Хоналар' : 'Xonalar'}
              </span>
              <span className="text-sm sm:text-lg font-black text-blue-400">48 Хона</span>
            </div>
          </div>
        </div>

        {/* Floor Selection Buttons (Thumb-friendly on mobile) */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800">
          {HOTEL_FLOORS.map((floor) => {
            const isSelected = selectedFloorNum === floor.floorNumber;
            return (
              <button
                key={floor.floorNumber}
                onClick={() => {
                  setSelectedFloorNum(floor.floorNumber);
                  setSelectedZoneId(null);
                  setZoomScale(1);
                }}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                    : 'bg-slate-800/70 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] sm:text-xs uppercase font-mono font-bold">
                    {floor.floorNumber}-{isCyrl ? 'Қават' : 'Qavat'}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {floor.totalAreaSqM} м²
                  </span>
                </div>
                <div className="text-[11px] font-bold truncate">
                  {floor.floorNumber === 1 && (isCyrl ? 'Лобби, Ресторан' : 'Lobbi, Restoran')}
                  {floor.floorNumber === 2 && (isCyrl ? '18 Хона (36 Койка)' : '18 Xona (36 Koyka)')}
                  {floor.floorNumber === 3 && (isCyrl ? '18 Хона (36 Койка)' : '18 Xona (36 Koyka)')}
                  {floor.floorNumber === 4 && (isCyrl ? '12 Сьют + СПА' : '12 Suite + SPA')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Floor Blueprint Visualizer & Zone Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: Architectural Floor Blueprint Canvas */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-amber-400" />
                  {isCyrl ? currentFloor.name : currentFloor.nameLatn}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {isCyrl ? currentFloor.purpose : currentFloor.purposeLatn}
                </p>
              </div>

              {/* Mobile Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setZoomScale((s) => Math.max(0.8, s - 0.2))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Кичиклаштириш"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Асл ҳолати"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomScale((s) => Math.min(1.8, s + 0.2))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Катталаштириш"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Room Selector Chips for Smartphones */}
            <div className="mb-3">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1.5">
                {isCyrl ? 'Хонани танлаш (Смартфонда тез кўриш):' : 'Xonani tanlash (Smartfonda tez ko\'rish):'}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {currentFloor.zones.map((zone) => {
                  const isZoneSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                        isZoneSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:text-white'
                      }`}
                    >
                      {zone.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive SVG Blueprint Canvas with Horizontal Scroll / Pan */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 sm:p-4 overflow-x-auto shadow-inner">
              <div style={{ minWidth: '550px', transform: `scale(${zoomScale})`, transformOrigin: 'top left' }}>
                {/* FLOOR 1 BLUEPRINT */}
                {selectedFloorNum === 1 && (
                  <svg viewBox="0 0 800 480" className="w-full h-auto select-none font-sans">
                    <rect x="20" y="20" width="760" height="440" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                    <line x1="20" y1="240" x2="780" y2="240" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="400" y1="20" x2="400" y2="460" stroke="#1e293b" strokeDasharray="4 4" />

                    {/* Lobby */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_lobby')}>
                      <rect
                        x="280"
                        y="260"
                        width="240"
                        height="190"
                        fill={selectedZoneId === 'f1_lobby' ? '#3b82f6' : '#1e293b'}
                        stroke="#475569"
                        strokeWidth="2"
                        rx="4"
                      />
                      <text x="400" y="330" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15">
                        {isCyrl ? 'БОШ ЛОББИ & РЕСЕПШН' : 'BOSH LOBBI & RESEPSHN'}
                      </text>
                      <text x="400" y="355" textAnchor="middle" fill="#94a3b8" fontSize="12">
                        90 м² • 24/7 Front Desk
                      </text>
                      <circle cx="400" cy="445" r="16" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
                      <text x="400" y="449" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">КИРИШ</text>
                    </g>

                    {/* Restaurant */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_restaurant')}>
                      <rect
                        x="30"
                        y="30"
                        width="350"
                        height="210"
                        fill={selectedZoneId === 'f1_restaurant' ? '#10b981' : '#132e2b'}
                        stroke="#10b981"
                        strokeWidth="2"
                        rx="4"
                      />
                      <text x="205" y="110" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="15">
                        {isCyrl ? '70 ЎРИНЛИ РЕСТОРАН' : '70 O\'RINLI RESTORAN'}
                      </text>
                      <text x="205" y="135" textAnchor="middle" fill="#94a3b8" fontSize="12">
                        210 м² • А-ла-карт & Швед столи
                      </text>
                      <circle cx="90" cy="70" r="10" fill="#047857" />
                      <circle cx="160" cy="70" r="10" fill="#047857" />
                      <circle cx="250" cy="70" r="10" fill="#047857" />
                      <circle cx="320" cy="70" r="10" fill="#047857" />
                      <circle cx="90" cy="180" r="10" fill="#047857" />
                      <circle cx="160" cy="180" r="10" fill="#047857" />
                      <circle cx="250" cy="180" r="10" fill="#047857" />
                      <circle cx="320" cy="180" r="10" fill="#047857" />
                    </g>

                    {/* Kitchen */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_kitchen')}>
                      <rect
                        x="30"
                        y="260"
                        width="230"
                        height="190"
                        fill={selectedZoneId === 'f1_kitchen' ? '#f59e0b' : '#272015'}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        rx="4"
                      />
                      <text x="145" y="340" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="14">
                        {isCyrl ? 'ОШХОНА (F&B)' : 'OSHXONA (F&B)'}
                      </text>
                      <text x="145" y="365" textAnchor="middle" fill="#94a3b8" fontSize="11">
                        110 м² • Иссиқ/Совуқ цехлар
                      </text>
                    </g>

                    {/* Conference Hall */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_conference')}>
                      <rect
                        x="400"
                        y="30"
                        width="370"
                        height="170"
                        fill={selectedZoneId === 'f1_conference' ? '#8b5cf6' : '#231b38'}
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        rx="4"
                      />
                      <text x="585" y="100" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="15">
                        {isCyrl ? 'КОНФЕРЕНЦ-ЗАЛ (50 КИШИ)' : 'KONFERENS-ZAL (50 KISHI)'}
                      </text>
                      <text x="585" y="125" textAnchor="middle" fill="#94a3b8" fontSize="12">
                        85 м² • Проектор & Аудио тизим
                      </text>
                    </g>

                    {/* Elevators */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_stairs')}>
                      <rect x="540" y="220" width="230" height="100" fill="#1e293b" stroke="#475569" strokeWidth="2" rx="4" />
                      <rect x="555" y="240" width="45" height="55" fill="#334155" stroke="#94a3b8" rx="2" />
                      <text x="577" y="272" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">ЛИФТ 1</text>
                      <rect x="615" y="240" width="45" height="55" fill="#334155" stroke="#94a3b8" rx="2" />
                      <text x="637" y="272" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">ЛИФТ 2</text>
                      <rect x="675" y="240" width="40" height="55" fill="#475569" stroke="#f59e0b" rx="2" />
                      <text x="695" y="272" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">ХИЗМАТ</text>
                      <rect x="725" y="240" width="35" height="55" fill="#1e293b" stroke="#ef4444" rx="2" />
                      <text x="742" y="272" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">ЗИНА</text>
                    </g>

                    {/* Admin */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f1_admin')}>
                      <rect x="540" y="340" width="230" height="110" fill="#11222e" stroke="#06b6d4" strokeWidth="2" rx="4" />
                      <text x="655" y="390" textAnchor="middle" fill="#22d3ee" fontWeight="bold" fontSize="13">
                        {isCyrl ? 'МАЪМУРИЯТ' : 'MA\'MURIYAT'}
                      </text>
                      <text x="655" y="415" textAnchor="middle" fill="#94a3b8" fontSize="11">50 м²</text>
                    </g>
                  </svg>
                )}

                {/* FLOOR 2 & 3 BLUEPRINT */}
                {(selectedFloorNum === 2 || selectedFloorNum === 3) && (
                  <svg viewBox="0 0 800 480" className="w-full h-auto select-none font-sans">
                    <rect x="20" y="20" width="760" height="440" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                    <rect x="30" y="210" width="740" height="60" fill="#1e293b" stroke="#334155" strokeDasharray="4 2" />
                    <text x="400" y="246" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="2">
                      {isCyrl ? 'КЕНГ КОВРОЛАН ҚОПЛАМАЛИ ЙЎЛАК (1.8 М)' : 'KENG KOVROLAN QOPLAMALI YO\'LAK (1.8 M)'}
                    </text>

                    {[...Array(9)].map((_, i) => {
                      const roomNum = selectedFloorNum * 100 + i + 1;
                      const isSelected = selectedZone?.roomNumbers?.includes(String(roomNum));
                      return (
                        <g key={i} className="cursor-pointer" onClick={() => setSelectedZoneId(selectedFloorNum === 2 ? 'f2_twins' : 'f3_kings')}>
                          <rect
                            x={30 + i * 81}
                            y="30"
                            width="78"
                            height="170"
                            fill={isSelected ? '#3b82f6' : '#1e293b'}
                            stroke="#475569"
                            strokeWidth="1.5"
                            rx="3"
                          />
                          <text x={30 + i * 81 + 39} y="70" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                            №{roomNum}
                          </text>
                          <text x={30 + i * 81 + 39} y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">
                            {selectedFloorNum === 2 ? 'Twin' : 'King'}
                          </text>
                          <rect x={30 + i * 81 + 14} y="115" width="22" height="35" fill="#334155" rx="2" />
                          <rect x={30 + i * 81 + 42} y="115" width="22" height="35" fill="#334155" rx="2" />
                          <text x={30 + i * 81 + 39} y="180" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                            2 Койка
                          </text>
                        </g>
                      );
                    })}

                    {[...Array(9)].map((_, i) => {
                      const roomNum = selectedFloorNum * 100 + i + 10;
                      const isElevatorZone = i === 4;
                      if (isElevatorZone) {
                        return (
                          <g key={i} onClick={() => setSelectedZoneId(selectedFloorNum === 2 ? 'f2_elevators' : 'f3_elevators')}>
                            <rect x={30 + i * 81} y="280" width="78" height="170" fill="#334155" stroke="#64748b" strokeWidth="2" rx="3" />
                            <text x={30 + i * 81 + 39} y="340" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="11">ЛИФТЛАР</text>
                            <text x={30 + i * 81 + 39} y="375" textAnchor="middle" fill="#ef4444" fontSize="9">ЗИНА</text>
                          </g>
                        );
                      }

                      return (
                        <g key={i} className="cursor-pointer" onClick={() => setSelectedZoneId(selectedFloorNum === 2 ? 'f2_doubles' : 'f3_superiors')}>
                          <rect x={30 + i * 81} y="280" width="78" height="170" fill="#1e293b" stroke="#475569" strokeWidth="1.5" rx="3" />
                          <text x={30 + i * 81 + 39} y="325" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                            №{roomNum}
                          </text>
                          <text x={30 + i * 81 + 39} y="350" textAnchor="middle" fill="#94a3b8" fontSize="10">
                            {selectedFloorNum === 2 ? 'Double' : 'Superior'}
                          </text>
                          <rect x={30 + i * 81 + 18} y="370" width="42" height="35" fill="#334155" rx="2" />
                          <text x={30 + i * 81 + 39} y="435" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                            2 Койка
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                )}

                {/* FLOOR 4 BLUEPRINT */}
                {selectedFloorNum === 4 && (
                  <svg viewBox="0 0 800 480" className="w-full h-auto select-none font-sans">
                    <rect x="20" y="20" width="760" height="440" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                    <rect x="30" y="215" width="480" height="50" fill="#1e293b" stroke="#334155" strokeDasharray="4 2" />

                    {[...Array(5)].map((_, i) => (
                      <g key={i} className="cursor-pointer" onClick={() => setSelectedZoneId('f4_junior')}>
                        <rect x={30 + i * 95} y="30" width="90" height="175" fill="#1e293b" stroke="#475569" rx="3" />
                        <text x={30 + i * 95 + 45} y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">№40{i + 1}</text>
                        <text x={30 + i * 95 + 45} y="100" textAnchor="middle" fill="#a855f7" fontSize="11">Junior Suite</text>
                      </g>
                    ))}

                    {[...Array(5)].map((_, i) => (
                      <g key={i} className="cursor-pointer" onClick={() => setSelectedZoneId('f4_junior')}>
                        <rect x={30 + i * 95} y="275" width="90" height="175" fill="#1e293b" stroke="#475569" rx="3" />
                        <text x={30 + i * 95 + 45} y="325" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">№40{i + 6}</text>
                        <text x={30 + i * 95 + 45} y="350" textAnchor="middle" fill="#a855f7" fontSize="11">Junior Suite</text>
                      </g>
                    ))}

                    {/* Gym */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f4_gym')}>
                      <rect x="520" y="30" width="250" height="130" fill="#042f2e" stroke="#14b8a6" strokeWidth="2" rx="4" />
                      <text x="645" y="85" textAnchor="middle" fill="#2dd4bf" fontWeight="bold" fontSize="15">
                        {isCyrl ? 'ФИТНЕС ЗАЛИ (GYM)' : 'FITNES ZALI (GYM)'}
                      </text>
                      <text x="645" y="110" textAnchor="middle" fill="#94a3b8" fontSize="12">55 м²</text>
                    </g>

                    {/* Sauna */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f4_spa')}>
                      <rect x="520" y="175" width="250" height="130" fill="#291b25" stroke="#f43f5e" strokeWidth="2" rx="4" />
                      <text x="645" y="235" textAnchor="middle" fill="#fb7185" fontWeight="bold" fontSize="15">
                        {isCyrl ? 'ФИН САУНАСИ & СПА' : 'FIN SAUNASI & SPA'}
                      </text>
                      <text x="645" y="260" textAnchor="middle" fill="#94a3b8" fontSize="12">50 м²</text>
                    </g>

                    {/* VIP Terrace */}
                    <g className="cursor-pointer" onClick={() => setSelectedZoneId('f4_terrace')}>
                      <rect x="520" y="320" width="250" height="130" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" rx="4" />
                      <text x="645" y="380" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" fontSize="15">
                        {isCyrl ? 'ВИП ОЧИҚ ТЕРАССА' : 'VIP OCHIQ TERASSA'}
                      </text>
                      <text x="645" y="405" textAnchor="middle" fill="#94a3b8" fontSize="12">40 м²</text>
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-3 pt-3 border-t border-slate-800">
            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isCyrl ? 'Қаватнинг Меъморий Хусусиятлари:' : 'Qavatning Me\'moriy Xususiyatlari:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
              {currentFloor.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Specifications & Zone Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {/* Zone Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
              {isCyrl ? 'ТАНЛАНГАН ХОНА / ЗОНА' : 'TANLANGAN XONA / ZONA'}
            </span>
            <h4 className="text-base font-bold text-white mb-2.5">
              {isCyrl ? selectedZone.name : selectedZone.nameLatn}
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span className="text-slate-400">{isCyrl ? 'Майдони:' : 'Maydoni:'}</span>
                <span className="font-bold text-white">{selectedZone.areaSqM} м²</span>
              </div>

              {selectedZone.beds && (
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span className="text-slate-400">{isCyrl ? 'Ўрин (койка):' : 'O\'rin (koyka):'}</span>
                  <span className="font-bold text-emerald-400">{selectedZone.beds} та койка</span>
                </div>
              )}

              {selectedZone.roomNumbers && (
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span className="text-slate-400">{isCyrl ? 'Хона рақамлари:' : 'Xona raqamlari:'}</span>
                  <span className="font-bold text-amber-300 font-mono">№{selectedZone.roomNumbers}</span>
                </div>
              )}

              <div className="pt-2 text-slate-300 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <VolumeX className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isCyrl ? 'Овоз изоляцияси: 42dB' : 'Ovoz izolyatsiyasi: 42dB'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                  <span>{isCyrl ? 'Марказий чиллер-фанкойл' : 'Markaziy chiller-fankoyl'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isCyrl ? 'Спринклер ва RFID қулф' : 'Sprinkler va RFID qulf'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Building Elevation Mockup */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isCyrl ? 'Бино Қаватлари (Баландлиги)' : 'Bino Qavatlari (Balandligi)'}
            </h4>

            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <div
                onClick={() => setSelectedFloorNum(4)}
                className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  selectedFloorNum === 4
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>4-ҚАВАТ: Сьютлар + СПА</span>
                <span className="text-slate-500 font-sans">h=3.3m</span>
              </div>

              <div
                onClick={() => setSelectedFloorNum(3)}
                className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  selectedFloorNum === 3
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>3-ҚАВАТ: 18 Хона (Кинг)</span>
                <span className="text-slate-500 font-sans">h=3.3m</span>
              </div>

              <div
                onClick={() => setSelectedFloorNum(2)}
                className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  selectedFloorNum === 2
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>2-ҚАВАТ: 18 Хона (Твин)</span>
                <span className="text-slate-500 font-sans">h=3.3m</span>
              </div>

              <div
                onClick={() => setSelectedFloorNum(1)}
                className={`p-2 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                  selectedFloorNum === 1
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>1-ҚАВАТ: Лобби & Ресторан</span>
                <span className="text-slate-500 font-sans font-bold text-amber-400">h=4.2m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
