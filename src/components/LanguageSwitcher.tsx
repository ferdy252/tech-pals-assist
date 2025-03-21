import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
    // Add logging to help with debugging
    console.log(`Language changed to: ${newLanguage}`);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">{t('common.switchLanguage')}</span>
    </Button>
  );
};

export default LanguageSwitcher;
