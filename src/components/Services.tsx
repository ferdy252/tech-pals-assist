
import React from 'react';
import ServiceCard from './ServiceCard';
import { Smartphone, Computer, Network, HelpCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Smartphone Repair',
      description: 'Professional repair service for all smartphone brands and models.',
      features: [
        'Screen replacement',
        'Battery replacement',
        'Camera repair',
        'Software issues',
        'Water damage assessment'
      ],
      price: 'From $40'
    },
    {
      icon: <Computer className="h-8 w-8" />,
      title: 'Computer Troubleshooting',
      description: 'Fix issues with desktop and laptop computers for optimal performance.',
      features: [
        'Hardware diagnosis',
        'Software troubleshooting',
        'Virus & malware removal',
        'Data recovery',
        'System optimization'
      ],
      price: 'From $60'
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: 'Home Network Setup',
      description: 'Professional installation and configuration of home networks.',
      features: [
        'Wi-Fi setup & optimization',
        'Network security',
        'Device connection',
        'Mesh network setup',
        'Smart home integration'
      ],
      price: 'From $80'
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: 'Tech Consultation',
      description: 'Expert advice on technology purchases, setups, and solutions.',
      features: [
        'Product recommendations',
        'Setup guidance',
        'Technology education',
        'Security assessment',
        'Custom tech solutions'
      ],
      price: 'From $50'
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 animate-slide-up">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We offer a comprehensive range of tech support services to keep your devices running smoothly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
