import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Smartphone, Computer, Network, HelpCircle, Shield, Wifi, Database, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const servicesData = [
  {
    icon: <Computer className="h-12 w-12" />,
    title: 'Computer Repair',
    description: 'Affordable computer repair services for desktops and laptops.',
    slug: 'computer-repair',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    icon: <Smartphone className="h-12 w-12" />,
    title: 'Mobile Device Support',
    description: 'Expert help with smartphones and tablets of all brands.',
    slug: 'mobile-support',
    color: 'bg-green-100 text-green-700'
  },
  {
    icon: <Wifi className="h-12 w-12" />,
    title: 'Home Network Setup',
    description: 'Get your home network running smoothly with our expert setup service.',
    slug: 'network-setup',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: 'Security Solutions',
    description: 'Protect your digital life with our basic security services.',
    slug: 'security-solutions',
    color: 'bg-red-100 text-red-700'
  },
  {
    icon: <Database className="h-12 w-12" />,
    title: 'Data Recovery',
    description: 'Recover your important files and photos from damaged devices.',
    slug: 'data-recovery',
    color: 'bg-amber-100 text-amber-700'
  },
  {
    icon: <Wrench className="h-12 w-12" />,
    title: 'Hardware Upgrades',
    description: 'Boost your computer performance with affordable hardware upgrades.',
    slug: 'hardware-upgrades',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    icon: <HelpCircle className="h-12 w-12" />,
    title: 'Tech Consultation',
    description: 'Get expert advice on technology purchases and solutions.',
    slug: 'tech-consultation',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    icon: <Network className="h-12 w-12" />,
    title: 'Remote Support',
    description: 'Get help without leaving your home with our remote support service.',
    slug: 'remote-support',
    color: 'bg-cyan-100 text-cyan-700'
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Tech Support Services</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Tech Pals provides affordable, reliable tech support services in Scranton, PA. 
              From computer repairs to network setup, we've got you covered.
            </p>
            <div className="flex justify-center gap-4">
              <a href="tel:5705352472">
                <Button size="lg" variant="default">
                  Call (570) 535-2472
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <Link 
                  to={`/services/${service.slug}`} 
                  key={index}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                >
                  <div className="p-8">
                    <div className={`${service.color} rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="mt-auto pt-4 flex items-center text-blue-600 font-medium">
                      <span>Learn more</span>
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
        <div className="bg-blue-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Need tech help right away?</h2>
                  <p className="text-blue-100 text-lg mb-6">
                    We offer same-day service for many issues. Contact us now to get your tech problems solved quickly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:5705352472">
                      <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        Call Now
                      </Button>
                    </a>
                    <a href="#contact">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                        Send a Message
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
