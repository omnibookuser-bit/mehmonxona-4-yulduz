import React from 'react';
import { DollarSign, Building, Bed, Star, FileText } from 'lucide-react';
import { Language } from '../types/hotel';

interface MobileBottomNavProps {
  language: Language;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  language,
  activeTab,
  setActiveTab,
}) => {
  const isCyrl = language === 'uz_cyrl';

  const tabs = [
    {
      id: 'financial',
      label: isCyrl ? 'Молия' : 'Moliya',
      sub: 'CAPEX',
      icon: DollarSign,
    },
    {
      id: 'architecture',
      label: isCyrl ? '4 Қават' : '4 Qavat',
      sub: 'Планлар',
      icon: Building,
    },
    {
      id: 'rooms',
      label: isCyrl ? '100 Ўрин' : '100 O\'rin',
      sub: 'Хоналар',
      icon: Bed,
    },
    {
      id: 'standards',
      label: isCyrl ? '4★ Аудит' : '4★ Audit',
      sub: 'ГОСТ',
      icon: Star,
    },
    {
      id: 'memorandum',
      label: isCyrl ? 'Хулоса' : 'Xulosa',
      sub: 'Инвестор',
      icon: FileText,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center h-full transition cursor-pointer relative ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-2 right-2 h-0.5 bg-amber-400 rounded-full" />
              )}
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="text-[10px] leading-tight tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
