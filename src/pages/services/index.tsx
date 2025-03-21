import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Smartphone, Computer, Network, HelpCircle, Shield, Wifi, Database, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
  const { t } = useTranslation();

  const servicesData = [
    {
      icon: <Computer className="h-12 w-12" />,
      title: t('servicesPage.servicesList.0.title'),
      description: t('servicesPage.servicesList.0.description'),
      slug: 'computer-repair',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: t('servicesPage.servicesList.1.title'),
      description: t('servicesPage.servicesList.1.description'),
      slug: 'mobile-support',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
    },
    {
      icon: <Wifi className="h-12 w-12" />,
      title: t('servicesPage.servicesList.2.title'),
      description: t('servicesPage.servicesList.2.description'),
      slug: 'network-setup',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: t('servicesPage.servicesList.3.title'),
      description: t('servicesPage.servicesList.3.description'),
      slug: 'security-solutions',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: t('servicesPage.servicesList.4.title'),
      description: t('servicesPage.servicesList.4.description'),
      slug: 'data-recovery',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: t('servicesPage.servicesList.5.title'),
      description: t('servicesPage.servicesList.5.description'),
      slug: 'hardware-upgrades',
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
    },
    {
      icon: <HelpCircle className="h-12 w-12" />,
      title: t('servicesPage.servicesList.6.title'),
      description: t('servicesPage.servicesList.6.description'),
      slug: 'tech-consultation',
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
    },
    {
      icon: <Network className="h-12 w-12" />,
      title: t('servicesPage.servicesList.7.title'),
      description: t('servicesPage.servicesList.7.description'),
      slug: 'remote-support',
      color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-50 dark:from-blue-950 to-white dark:to-gray-900 py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 dark:text-white">{t('servicesPage.hero.title')}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              {t('servicesPage.hero.description')}
            </p>
            <div className="flex justify-center gap-4">
              <a href="tel:5705352472">
                <Button size="lg" variant="default">
                  {t('servicesPage.hero.callButton')}
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline" className="dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                  {t('servicesPage.hero.contactButton')}
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="py-16 px-6 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <Link 
                  to={`/services/${service.slug}`} 
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                >
                  <div className="p-8">
                    <div className={`${service.color} rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 dark:text-white">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                    <div className="mt-auto pt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      <span>{t('servicesPage.learnMore')}</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-50 dark:bg-gray-800 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t('servicesPage.ctaSection.title')}</h2>
                  <p className="text-blue-100 text-lg mb-6">
                    {t('servicesPage.ctaSection.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:5705352472">
                      <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        {t('servicesPage.ctaSection.callNowButton')}
                      </Button>
                    </a>
                    <a href="#contact">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                        {t('servicesPage.ctaSection.sendMessageButton')}
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="/images/tech-support-illustration.svg" 
                    alt="Tech Support" 
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;
