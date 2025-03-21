import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
  price?: string;
  slug?: string;
}

const ServiceCard = ({ icon, title, description, features, index, price, slug }: ServiceCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBookService = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the parent Link from navigating
    navigate('/contact');
  };

  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-2xl transition-all duration-300 p-8 h-full glass dark:bg-gray-800/80 dark:backdrop-blur-md border",
        "border-white/20 dark:border-gray-700/40 hover:border-blue-200/50 dark:hover:border-blue-900/50 hover:shadow-lg"
      )}
      style={{ 
        transform: 'translateY(20px)',
        opacity: 0,
        animation: 'slideUp 0.6s ease-out forwards',
        animationDelay: `${index * 0.15}s`,
      }}
    >
      <div className="relative z-10">
        <div className="bg-blue-50 dark:bg-blue-900/30 w-16 h-16 rounded-2xl mb-5 flex items-center justify-center text-blue-500">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{description}</p>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {price && (
          <div className="mb-6">
            <span className="block text-2xl font-bold text-gray-900 dark:text-white">{price}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{t('services.perService')}</span>
          </div>
        )}
        
        <button 
          onClick={handleBookService}
          className="inline-block w-full py-3 px-6 text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-200 font-medium"
        >
          {t('services.bookService')}
        </button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/20 dark:from-blue-900/0 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default ServiceCard;
