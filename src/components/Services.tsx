import React from 'react';
import ServiceCard from './ServiceCard';
import { Smartphone, Computer, Network, HelpCircle, Shield, Wifi, Database, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: <Computer className="h-8 w-8" />,
      title: 'Computer Repair',
      description: 'Affordable computer repair services for desktops and laptops.',
      features: [
        'Virus & malware removal',
        'Hardware diagnostics',
        'Software troubleshooting',
        'System optimization',
        'Windows & Mac support'
      ],
      price: 'From $45',
      slug: 'computer-repair'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Mobile Device Support',
      description: 'Expert help with smartphones and tablets of all brands.',
      features: [
        'Screen troubleshooting',
        'Battery issues',
        'Software updates',
        'Data transfer',
        'App configuration'
      ],
      price: 'From $35',
      slug: 'mobile-support'
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: 'Home Network Setup',
      description: 'Get your home network running smoothly with our expert setup service.',
      features: [
        'Wi-Fi optimization',
        'Router configuration',
        'Device connectivity',
        'Network security',
        'Printer setup'
      ],
      price: 'From $65',
      slug: 'network-setup'
    }
  ];

  // Only showing the top 3 most popular services on the home page
  // The full list is available on the services page

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 animate-slide-up">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tech Pals provides affordable tech support services in Scranton, PA. 
            Call us at <a href="tel:5705352472" className="text-blue-600 hover:underline">(570) 535-2472</a> for all your tech needs.
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
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
