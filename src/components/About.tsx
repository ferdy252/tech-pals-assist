import React from 'react';
import { Shield, Clock, Wrench, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: t('aboutPage.featureCards.0.title'),
      description: t('aboutPage.featureCards.0.description')
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: t('aboutPage.featureCards.1.title'),
      description: t('aboutPage.featureCards.1.description')
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-500" />,
      title: t('aboutPage.featureCards.2.title'),
      description: t('aboutPage.featureCards.2.description')
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: t('aboutPage.featureCards.3.title'),
      description: t('aboutPage.featureCards.3.description')
    }
  ];

  // Get feature items with proper typing
  const featureItems = t('aboutPage.features', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-gradient-to-b from-blue-50 dark:from-blue-950 to-white dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className="animate-slide-right"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {t('aboutPage.header')}
            </span>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">{t('aboutPage.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              {t('aboutPage.mainDescription')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('aboutPage.secondaryDescription')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {featureItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#services" 
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 font-medium"
            >
              {t('aboutPage.exploreServices')}
            </a>
          </div>
          
          <div 
            className="relative animate-slide-left"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative z-10 glass rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/30 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-6 w-full">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="glass p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 transform transition duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                    >
                      <div className="bg-blue-50 dark:bg-blue-900/30 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-800/30 rounded-3xl filter blur-3xl opacity-20 transform -translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
