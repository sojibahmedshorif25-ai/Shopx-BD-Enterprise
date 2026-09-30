import React from 'react';
import { Palette, Check } from 'lucide-react';
import { useThemeAccentStore, ACCENTS, AccentColor } from '../store/useThemeAccentStore';
import { useLanguageStore } from '../store/useLanguageStore';

export const ThemeAccentPicker: React.FC = () => {
  const { accent, setAccent } = useThemeAccentStore();
  const { lang } = useLanguageStore();

  return (
    <div className="flex items-center space-x-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
      {(Object.keys(ACCENTS) as AccentColor[]).map((c) => {
        const item = ACCENTS[c];
        const isSelected = accent === c;
        return (
          <button
            key={c}
            onClick={() => setAccent(c)}
            className={`w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center relative ${
              isSelected ? 'scale-110 ring-2 ring-white/60 shadow-lg' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            style={{ backgroundColor: item.primary }}
            title={lang === 'bn' ? item.banglaName : item.name}
          >
            {isSelected && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
          </button>
        );
      })}
    </div>
  );
};
