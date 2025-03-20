
import React from 'react';
import { Shield, Clock, Tool, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: 'Trusted Experts',
      description: 'Our team consists of certified technicians with years of experience solving complex tech issues.'
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: 'Fast Response',
      description: 'We understand the urgency of tech problems and pride ourselves on our quick response and resolution times.'
    },
    {
      icon: <Tool className="h-8 w-8 text-blue-500" />,
      title: 'Quality Service',
      description: 'Using only the best tools and parts, we ensure that all repairs and services meet the highest standards.'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: 'Customer Satisfaction',
      description: 'Our priority is your satisfaction, which is why we offer a 30-day warranty on all our services.'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className="animate-slide-right"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              About TechPals
            </span>
            <h2 className="text-3xl font-bold mb-6">Your Technology Problems, Our Expertise</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Founded with a passion for technology and a commitment to exceptional service, TechPals is your trusted partner for all tech-related needs. We believe that technology should simplify your life, not complicate it.
            </p>
            <p className="text-gray-600 mb-8">
              Our team of experienced technicians specializes in a wide range of services, from smartphone repairs to complex network setups. We stay updated with the latest technological developments to provide you with the best solutions for your unique needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {['Experienced Technicians', 'Quality Repairs', 'Affordable Rates', 'Fast Turnaround'].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#services" 
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-300 font-medium"
            >
              Explore Our Services
            </a>
          </div>
          
          <div 
            className="relative animate-slide-left"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative z-10 glass rounded-3xl overflow-hidden border border-white/20 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-6 w-full">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="glass p-6 rounded-2xl border border-white/20 transform transition duration-300 hover:translate-y-[-5px] hover:shadow-lg"
                    >
                      <div className="bg-blue-50 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-100 rounded-3xl filter blur-3xl opacity-20 transform -translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
