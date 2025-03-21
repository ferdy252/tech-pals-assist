import React from 'react';
import ServiceCard from './ServiceCard';
import { Smartphone, Computer, Network, HelpCircle, Shield, Wifi, Database, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  // Define features arrays directly to avoid type issues
  const computerRepairFeatures = t('services.items.computerRepair.features', { returnObjects: true }) as string[];
  const mobileSupportFeatures = t('services.items.mobileSupport.features', { returnObjects: true }) as string[];
  const networkSetupFeatures = t('services.items.networkSetup.features', { returnObjects: true }) as string[];

  const services = [
    {
      icon: <Computer className="h-8 w-8" />,
      title: t('services.items.computerRepair.title'),
      description: t('services.items.computerRepair.description'),
      features: computerRepairFeatures,
      price: t('services.items.computerRepair.price'),
      slug: 'computer-repair'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t('services.items.mobileSupport.title'),
      description: t('services.items.mobileSupport.description'),
      features: mobileSupportFeatures,
      price: t('services.items.mobileSupport.price'),
      slug: 'mobile-support'
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: t('services.items.networkSetup.title'),
      description: t('services.items.networkSetup.description'),
      features: networkSetupFeatures,
      price: t('services.items.networkSetup.price'),
      slug: 'network-setup'
    }
  ];

  // Only showing the top 3 most popular services on the home page
  // The full list is available on the services page

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white dark:from-gray-900 to-blue-50 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 animate-slide-up dark:text-white">{t('services.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={`/services/${service.slug}`} key={index} className="block h-full">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                price={service.price}
                index={index}
                slug={service.slug}
              />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md">
              {t('services.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
