import React, { useState } from 'react';
import {
  Utensils,
  Sparkles,
  HeartPulse,
  Leaf,
  X,
  CheckCircle,
  Clock,
  Flame,
  Plus,
} from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';

interface AIRecipeDietPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIRecipeDietPlannerModal: React.FC<AIRecipeDietPlannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { lang } = useLanguageStore();
  const isBn = lang === 'bn';
  const [selectedGoal, setSelectedGoal] = useState<'immunity' | 'weight' | 'energy'>('immunity');

  if (!isOpen) return null;

  const recipes = [
    {
      goal: 'immunity',
      title: isBn ? 'খাঁটি মধু ও কালোজিরা রোগপ্রতিরোধক ডিটক্স' : 'Raw Honey & Blackseed Immunity Tonic',
      time: '5 Mins',
      calories: '120 kcal',
      ingredients: [
        'সুন্দরবনের প্রাকৃতিক খলিশা মধু - ২ চা চামচ',
        'ঘানিভাঙ্গা কালোজিরা তেল - আধ চা চামচ',
        'হালকা কুসুম গরম পানি - ১ গ্লাস',
        'লেবুর রস - ১ চা চামচ',
      ],
      benefits: isBn
        ? 'সর্দি-কাশি প্রতিরোধ করে এবং শরীরের প্রাকৃতিকভাবে রোগপ্রতিরোধ ক্ষমতা বৃদ্ধি করে।'
        : 'Boosts natural cellular immunity, soothes throat, and detoxifies metabolism.',
    },
    {
      goal: 'weight',
      title: isBn ? 'চিয়া সিড ও মধুর ফাইবার সমৃদ্ধ স্মুদি' : 'Organic Chia Seed & Honey Slimming Drink',
      time: '10 Mins',
      calories: '180 kcal',
      ingredients: [
        'অর্গানিক প্রিমিয়াম চিয়া সিড - ১ টেবিল চামচ',
        'খাঁটি সরিষা ফুলের মধু - ১ চা চামচ',
        'টক দই অথবা নারকেলের পানি - ১ কাপ',
      ],
      benefits: isBn
        ? 'দীর্ঘক্ষণ পেট ভরা রাখে, হজমশক্তি বাড়ায় এবং ওজন নিয়ন্ত্রণে সাহায্য করে।'
        : 'High soluble dietary fiber, reduces visceral fat, and balances insulin.',
    },
    {
      goal: 'energy',
      title: isBn ? 'ঘি ও ড্রাই ফ্রুটস প্রিমিয়াম এনার্জি বাইটস' : 'Pure Ghee & Dry Fruits Super-Energy Power',
      time: '15 Mins',
      calories: '280 kcal',
      ingredients: [
        'খাঁটি গাওয়া গাভি ঘি - ১ টেবিল চামচ',
        'মরিয়ম খেজুর ও কাজুবাদাম - ৫০ গ্রাম',
        'হিমালয়ান পিঙ্ক সল্ট - সামান্য এক চিমটি',
      ],
      benefits: isBn
        ? 'মস্তিষ্কের কর্মক্ষমতা বাড়ায় এবং সারাদিনের ক্লান্তি দূর করে প্রাকৃতিক এনার্জি দেয়।'
        : 'Rich in good fats, omega-3, improves memory, and fuels workout performance.',
    },
  ];

  const currentRecipe = recipes.find((r) => r.goal === selectedGoal) || recipes[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  {isBn ? 'এআই নিউট্রিশন ও হেলথ প্ল্যানার' : 'AI Nutrition & Organic Diet Guide'}
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                {isBn ? 'অর্গানিক ফুড রেসিপি ও ডায়েট চার্ট' : 'Organic Health Recipes & Diet Plan'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Goal Selector Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedGoal('immunity')}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
              selectedGoal === 'immunity'
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            🌿 {isBn ? 'রোগপ্রতিরোধ' : 'Immunity'}
          </button>

          <button
            onClick={() => setSelectedGoal('weight')}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
              selectedGoal === 'weight'
                ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            ⚡ {isBn ? 'ওজন নিয়ন্ত্রণ' : 'Weight Loss'}
          </button>

          <button
            onClick={() => setSelectedGoal('energy')}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
              selectedGoal === 'energy'
                ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            💪 {isBn ? 'শক্তি ও ব্রেন' : 'High Energy'}
          </button>
        </div>

        {/* Recipe Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h4 className="text-sm font-bold text-white">{currentRecipe.title}</h4>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> {currentRecipe.time}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-400" /> {currentRecipe.calories}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">উপকরণ ও মাপ (Ingredients):</p>
            {currentRecipe.ingredients.map((ing, i) => (
              <p key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{ing}</span>
              </p>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs leading-relaxed">
            <strong>স্বাস্থ্য উপকারিতা:</strong> {currentRecipe.benefits}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition shadow-lg shadow-emerald-700/20"
        >
          {isBn ? 'অর্গানিক উপাদানগুলো কিনুন' : 'Explore Organic Ingredients in Shop'}
        </button>
      </div>
    </div>
  );
};
