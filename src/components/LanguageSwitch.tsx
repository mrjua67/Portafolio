import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitchProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <button
      onClick={() => onLanguageChange(currentLanguage === 'en' ? 'es' : 'en')}
      className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
      aria-label="Switch Language"
    >
      <Globe className="w-6 h-6" />
      <span className="ml-2 text-sm font-medium">
        {currentLanguage.toUpperCase()}
      </span>
    </button>
  );
};